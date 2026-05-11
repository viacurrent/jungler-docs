/* eslint-disable jsx-a11y/no-autofocus */
import React, {
    type ReactNode,
    useEffect,
    useReducer,
} from 'react';

import algoliaSearchHelper from 'algoliasearch-helper';
import { liteClient } from 'algoliasearch/lite';

import Head from '@docusaurus/Head';
import Link from '@docusaurus/Link';
import {
    HtmlClassNameProvider,
    PageMetadata,
    useEvent,
    usePluralForm,
    useSearchQueryString,
} from '@docusaurus/theme-common';
import Translate, { translate } from '@docusaurus/Translate';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {
    useAlgoliaThemeConfig,
    useSearchResultUrlProcessor,
} from '@docusaurus/theme-search-algolia/client';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

function useDocumentsFoundPlural() {
    const { selectMessage } = usePluralForm();
    return (count: number) =>
        selectMessage(
            count,
            translate(
                {
                    id: 'theme.SearchPage.documentsFound.plurals',
                    message: 'One document found|{count} documents found',
                },
                { count },
            ),
        );
}

type SearchItem = {
    title: string;
    url: string;
    summary: string;
    breadcrumbs: string[];
};

type ResultDispatcherState = {
    items: SearchItem[];
    query: string | null;
    totalResults: number | null;
    loading: boolean | null;
};

type ResultDispatcher =
    | { type: 'reset'; value?: undefined }
    | { type: 'loading'; value?: undefined }
    | { type: 'update'; value: ResultDispatcherState };

function getSearchPageTitle(searchQuery: string | undefined): string {
    return searchQuery
        ? translate(
            {
                id: 'theme.SearchPage.existingResultsTitle',
                message: 'Search results for "{query}"',
            },
            { query: searchQuery },
        )
        : translate({
            id: 'theme.SearchPage.emptyResultsTitle',
            message: 'Search the documentation',
        });
}

// Strip the #anchor portion of a URL so we can group hits that all point to
// different headings on the same page.
function stripAnchor(url: string): string {
    const hashIndex = url.indexOf('#');
    return hashIndex === -1 ? url : url.slice(0, hashIndex);
}

// Docusaurus's built-in scroll-after-navigation fires synchronously on route
// change, but our destination doc page is code-split: when scrollIntoView
// runs the target heading hasn't been rendered yet, so nothing happens. On
// top of that, when the new page does mount its internal scroll container
// resets to top, blowing away a successful first scroll. Poll and keep
// re-scrolling until the element's viewport position has stabilised across
// a few frames (or 2s elapses).
function scrollToHashWhenReady(hash: string) {
    if (!hash) return;
    const id = decodeURIComponent(hash.replace(/^#/, ''));
    if (!id) return;
    const start = Date.now();
    let lastTop: number | null = null;
    let stableCount = 0;
    const tick = () => {
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView();
            const rect = el.getBoundingClientRect();
            if (lastTop !== null && Math.abs(rect.top - lastTop) < 1) {
                stableCount += 1;
                if (stableCount >= 3) return;
            } else {
                stableCount = 0;
            }
            lastTop = rect.top;
        }
        if (Date.now() - start < 2000) {
            setTimeout(tick, 50);
        }
    };
    setTimeout(tick, 50);
}

// Algolia indexes one record per heading on a page, so a single page often
// comes back as 4–10 separate hits. Keep the first (highest-ranked) hit per
// underlying page.
function dedupeByPage(items: SearchItem[]): SearchItem[] {
    const seen = new Set<string>();
    const result: SearchItem[] = [];
    for (const item of items) {
        const key = stripAnchor(item.url);
        if (seen.has(key)) continue;
        seen.add(key);
        result.push(item);
    }
    return result;
}

function SearchPageContent(): ReactNode {
    const {
        i18n: { currentLocale },
    } = useDocusaurusContext();
    const {
        algolia: { appId, apiKey, indexName, contextualSearch },
    } = useAlgoliaThemeConfig();
    const processSearchResultUrl = useSearchResultUrlProcessor();
    const documentsFoundPlural = useDocumentsFoundPlural();

    const [searchQuery, setSearchQuery] = useSearchQueryString();
    const pageTitle = getSearchPageTitle(searchQuery);

    const initialSearchResultState: ResultDispatcherState = {
        items: [],
        query: null,
        totalResults: null,
        loading: null,
    };
    const [searchResultState, searchResultStateDispatcher] = useReducer(
        (prevState: ResultDispatcherState, data: ResultDispatcher) => {
            switch (data.type) {
                case 'reset':
                    return initialSearchResultState;
                case 'loading':
                    return { ...prevState, loading: true };
                case 'update': {
                    if (searchQuery !== data.value.query) return prevState;
                    return data.value;
                }
                default:
                    return prevState;
            }
        },
        initialSearchResultState,
    );

    const disjunctiveFacets = contextualSearch
        ? ['language', 'docusaurus_tag']
        : [];

    const algoliaClient = liteClient(appId, apiKey);
    // Fetch a large batch up front so we don't need infinite scroll. The
    // index has many anchor-level records per page, and pagination through
    // those would show "Fetching new results…" while adding almost no new
    // unique pages.
    const algoliaHelper = algoliaSearchHelper(algoliaClient, indexName, {
        // @ts-ignore
        hitsPerPage: 200,
        advancedSyntax: true,
        disjunctiveFacets,
    });

    algoliaHelper.on(
        'result',
        ({ results: { query, hits, nbHits } }) => {
            if (query === '' || !Array.isArray(hits)) {
                searchResultStateDispatcher({ type: 'reset' });
                return;
            }

            const sanitizeValue = (value: string) =>
                value.replace(
                    /algolia-docsearch-suggestion--highlight/g,
                    'search-result-match',
                );

            // Drop body-content hits — they're dominated by passing mentions
            // of the term and crowd out pages that are actually about it.
            // Fall back to all hits if no headings match.
            const headingHits = hits.filter(
                (h: { type?: string }) => h.type !== 'content',
            );
            const effectiveHits = headingHits.length > 0 ? headingHits : hits;

            const items: SearchItem[] = effectiveHits.map(
                ({
                    url,
                    _highlightResult: { hierarchy },
                    _snippetResult: snippet = {},
                }: {
                    url: string;
                    _highlightResult: { hierarchy: { [key: string]: { value: string } } };
                    _snippetResult: { content?: { value: string } };
                }) => {
                    // Drop lvl0 ("Documentation") — every page has the same
                    // value there, so it's noise in the breadcrumbs.
                    const titles = Object.keys(hierarchy)
                        .filter((key) => key !== 'lvl0')
                        .map((key) => sanitizeValue(hierarchy[key]!.value));
                    return {
                        title: titles.pop()!,
                        url: processSearchResultUrl(url),
                        summary: snippet.content
                            ? `${sanitizeValue(snippet.content.value)}...`
                            : '',
                        breadcrumbs: titles,
                    };
                },
            );

            searchResultStateDispatcher({
                type: 'update',
                value: {
                    items,
                    query,
                    totalResults: nbHits,
                    loading: false,
                },
            });
        },
    );

    const makeSearch = useEvent(() => {
        if (contextualSearch) {
            algoliaHelper.addDisjunctiveFacetRefinement('docusaurus_tag', 'default');
            algoliaHelper.addDisjunctiveFacetRefinement('language', currentLocale);
        }
        algoliaHelper.setQuery(searchQuery).search();
    });

    useEffect(() => {
        searchResultStateDispatcher({ type: 'reset' });
        if (searchQuery) {
            searchResultStateDispatcher({ type: 'loading' });
            const t = setTimeout(() => {
                makeSearch();
            }, 300);
            return () => clearTimeout(t);
        }
        return undefined;
    }, [searchQuery, makeSearch]);

    const dedupedItems = dedupeByPage(searchResultState.items);

    return (
        <Layout>
            <PageMetadata title={pageTitle} />
            <Head>
                <meta property="robots" content="noindex, follow" />
            </Head>

            <div className={styles.searchPage}>
                <div className={styles.searchPageInner}>
                    <Heading as="h1" className={styles.searchPageTitle}>
                        {pageTitle}
                    </Heading>

                    <form
                        className={styles.searchForm}
                        onSubmit={(e) => e.preventDefault()}>
                        <svg
                            className={styles.searchFormIcon}
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true">
                            <circle cx="11" cy="11" r="8" />
                            <path d="m21 21-4.3-4.3" />
                        </svg>
                        <input
                            type="search"
                            name="q"
                            className={styles.searchQueryInput}
                            placeholder={translate({
                                id: 'theme.SearchPage.inputPlaceholder',
                                message: 'Type your search here',
                            })}
                            aria-label={translate({
                                id: 'theme.SearchPage.inputLabel',
                                message: 'Search',
                            })}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            value={searchQuery}
                            autoComplete="off"
                            autoFocus
                        />
                        {searchQuery && (
                            <button
                                type="button"
                                className={styles.searchFormClear}
                                aria-label={translate({
                                    id: 'theme.SearchPage.clearLabel',
                                    message: 'Clear search',
                                })}
                                onClick={() => setSearchQuery('')}>
                                {/* Same X shape DocSearch uses in the popup. */}
                                <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 20 20"
                                    aria-hidden="true">
                                    <path
                                        d="M10 10l5.09-5.09L10 10l5.09 5.09L10 10zm0 0L4.91 4.91 10 10l-5.09 5.09L10 10z"
                                        stroke="currentColor"
                                        fill="none"
                                        fillRule="evenodd"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </button>
                        )}
                    </form>

                    {!!searchResultState.totalResults && (
                        <div className={styles.searchMeta}>
                            {documentsFoundPlural(dedupedItems.length)}
                        </div>
                    )}

                    {dedupedItems.length > 0 ? (
                        <main className={styles.searchResultsList}>
                            {dedupedItems.map(
                                ({ title, url, summary, breadcrumbs }, i) => {
                                    const hashIndex = url.indexOf('#');
                                    const hash = hashIndex === -1 ? '' : url.slice(hashIndex);
                                    return (
                                        <Link
                                            to={url}
                                            key={`${url}-${i}`}
                                            className={styles.searchResultItem}
                                            onClick={() => scrollToHashWhenReady(hash)}>
                                            {breadcrumbs.length > 0 && (
                                                <div
                                                    className={styles.searchResultItemPath}
                                                    // eslint-disable-next-line react/no-danger
                                                    dangerouslySetInnerHTML={{
                                                        __html: breadcrumbs.join(' › '),
                                                    }}
                                                />
                                            )}
                                            <div
                                                className={styles.searchResultItemHeading}
                                                // eslint-disable-next-line react/no-danger
                                                dangerouslySetInnerHTML={{ __html: title }}
                                            />
                                            {summary && (
                                                <p
                                                    className={styles.searchResultItemSummary}
                                                    // eslint-disable-next-line react/no-danger
                                                    dangerouslySetInnerHTML={{ __html: summary }}
                                                />
                                            )}
                                        </Link>
                                    );
                                },
                            )}
                        </main>
                    ) : (
                        searchQuery && !searchResultState.loading && (
                            <p className={styles.noResults}>
                                <Translate id="theme.SearchPage.noResultsText">
                                    No results were found
                                </Translate>
                            </p>
                        )
                    )}

                    {!!searchResultState.loading && dedupedItems.length === 0 && (
                        <div className={styles.loadingSpinner} />
                    )}
                </div>
            </div>
        </Layout>
    );
}

export default function SearchPage(): ReactNode {
    return (
        <HtmlClassNameProvider className="search-page-wrapper">
            <SearchPageContent />
        </HtmlClassNameProvider>
    );
}
