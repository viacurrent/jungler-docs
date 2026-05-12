import React, {
    useCallback,
    useMemo,
    useRef,
    useState,
    type ReactNode,
} from 'react';
import { createPortal } from 'react-dom';
import { DocSearchButton } from '@docsearch/react/button';
import { useDocSearchKeyboardEvents } from '@docsearch/react/useDocSearchKeyboardEvents';
import Head from '@docusaurus/Head';
import Link from '@docusaurus/Link';
import { useHistory } from '@docusaurus/router';
import {
    isRegexpStringMatch,
    useSearchLinkCreator,
} from '@docusaurus/theme-common';
import {
    useAlgoliaContextualFacetFilters,
    useSearchResultUrlProcessor,
    useAlgoliaAskAi,
    mergeFacetFilters,
} from '@docusaurus/theme-search-algolia/client';
import Translate from '@docusaurus/Translate';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import translations from '@theme/SearchTranslations';

let DocSearchModal: any = null;

function importDocSearchModalIfNeeded() {
    if (DocSearchModal) return Promise.resolve();
    return Promise.all([
        import('@docsearch/react/modal'),
        import('@docsearch/react/style'),
        import('./styles.css'),
    ]).then(([{ DocSearchModal: Modal }]) => {
        DocSearchModal = Modal;
    });
}

// Strip #anchor from a URL so headings on the same page collapse to one hit.
function stripAnchor(url: string): string {
    const i = url.indexOf('#');
    return i === -1 ? url : url.slice(0, i);
}

// Docusaurus's built-in scroll-after-navigation fires once, synchronously,
// before the lazy-loaded destination route mounts. On top of that, when the
// new doc page does mount its internal scroll container resets to top — so
// even if we scrolled correctly on the first try, the mount blows it away.
// Poll for the anchor element and keep re-scrolling until the position
// stabilises (or we give up after 2s).
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
            // Once the element's viewport position has held steady across a
            // few frames we know mounting is done — stop polling.
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

function useNavigator({ externalUrlRegex }: { externalUrlRegex?: string }) {
    const history = useHistory();
    const [navigator] = useState<any>(() => ({
        navigate(params: { itemUrl: string }) {
            if (isRegexpStringMatch(externalUrlRegex, params.itemUrl)) {
                window.location.href = params.itemUrl;
                return;
            }
            history.push(params.itemUrl);
            const hashIndex = params.itemUrl.indexOf('#');
            if (hashIndex !== -1) {
                scrollToHashWhenReady(params.itemUrl.slice(hashIndex));
            }
        },
    }));
    return navigator;
}

function useTransformSearchClient() {
    const {
        siteMetadata: { docusaurusVersion },
    } = useDocusaurusContext();
    return useCallback(
        (searchClient: any) => {
            searchClient.addAlgoliaAgent('docusaurus', docusaurusVersion);
            return searchClient;
        },
        [docusaurusVersion],
    );
}

// Drop body-content matches and dedupe by page URL. The Algolia index has one
// record per heading plus one per content snippet — without filtering, the
// popup shows the same page many times and is dominated by passing mentions
// in body text rather than pages that are actually about the query.
function useTransformItems() {
    const processSearchResultUrl = useSearchResultUrlProcessor();
    const [transformItems] = useState<any>(() => {
        return (items: Array<{ url: string; type?: string;[k: string]: any }>) => {
            const headingItems = items.filter(
                (item) => item.type !== 'content',
            );
            // If a query only matches body text, fall back to those hits
            // rather than show "no results".
            const source = headingItems.length > 0 ? headingItems : items;
            const seen = new Set<string>();
            const out: any[] = [];
            for (const item of source) {
                const key = stripAnchor(item.url);
                if (seen.has(key)) continue;
                seen.add(key);
                out.push({ ...item, url: processSearchResultUrl(item.url) });
            }
            return out;
        };
    });
    return transformItems;
}

function useResultsFooterComponent({ closeModal }: { closeModal: () => void }) {
    return useMemo(
        () =>
            ({ state }: { state: any }) =>
                <ResultsFooter state={state} onClose={closeModal} />,
        [closeModal],
    );
}

function Hit({ hit, children }: { hit: { url: string }; children: ReactNode }) {
    return <Link to={hit.url}>{children}</Link>;
}

function ResultsFooter({ state, onClose }: { state: any; onClose: () => void }) {
    const createSearchLink = useSearchLinkCreator();
    return (
        <Link to={createSearchLink(state.query)} onClick={onClose}>
            {/* Intentionally no count: state.context.nbHits is the raw Algolia
                hit total, which is inflated relative to what users actually
                see after we filter content-type hits and dedupe by page. */}
            <Translate id="theme.SearchBar.seeAll">
                See all results
            </Translate>
        </Link>
    );
}

function useSearchParameters({ contextualSearch, ...props }: any) {
    const contextualSearchFacetFilters = useAlgoliaContextualFacetFilters();
    const configFacetFilters = props.searchParameters?.facetFilters ?? [];
    const facetFilters = contextualSearch
        ? mergeFacetFilters(contextualSearchFacetFilters, configFacetFilters)
        : configFacetFilters;
    return { ...props.searchParameters, facetFilters };
}

function DocSearch({ externalUrlRegex, ...props }: any) {
    const navigator = useNavigator({ externalUrlRegex });
    const searchParameters = useSearchParameters({ ...props });
    const transformItems = useTransformItems();
    const transformSearchClient = useTransformSearchClient();

    const searchContainer = useRef<HTMLDivElement | null>(null);
    const searchButtonRef = useRef<HTMLButtonElement | null>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [initialQuery, setInitialQuery] = useState<string | undefined>(undefined);

    const { isAskAiActive, currentPlaceholder, onAskAiToggle, extraAskAiProps } =
        useAlgoliaAskAi(props);

    const prepareSearchContainer = useCallback(() => {
        if (!searchContainer.current) {
            const divElement = document.createElement('div');
            searchContainer.current = divElement;
            document.body.insertBefore(divElement, document.body.firstChild);
        }
    }, []);

    const openModal = useCallback(() => {
        prepareSearchContainer();
        importDocSearchModalIfNeeded().then(() => setIsOpen(true));
    }, [prepareSearchContainer]);

    const closeModal = useCallback(() => {
        setIsOpen(false);
        searchButtonRef.current?.focus();
        setInitialQuery(undefined);
        onAskAiToggle(false);
    }, [onAskAiToggle]);

    const handleInput = useCallback(
        (event: KeyboardEvent) => {
            if (event.key === 'f' && (event.metaKey || event.ctrlKey)) return;
            event.preventDefault();
            setInitialQuery(event.key);
            openModal();
        },
        [openModal],
    );

    const resultsFooterComponent = useResultsFooterComponent({ closeModal });

    useDocSearchKeyboardEvents({
        isOpen,
        onOpen: openModal,
        onClose: closeModal,
        onInput: handleInput,
        searchButtonRef,
        isAskAiActive: isAskAiActive ?? false,
        onAskAiToggle: onAskAiToggle ?? (() => { }),
    } as any);

    return (
        <>
            <Head>
                <link
                    rel="preconnect"
                    href={`https://${props.appId}-dsn.algolia.net`}
                    crossOrigin="anonymous"
                />
            </Head>

            <DocSearchButton
                onTouchStart={importDocSearchModalIfNeeded}
                onFocus={importDocSearchModalIfNeeded}
                onMouseOver={importDocSearchModalIfNeeded}
                onClick={openModal}
                ref={searchButtonRef}
                translations={props.translations?.button ?? translations.button}
            />

            {isOpen &&
                DocSearchModal &&
                searchContainer.current &&
                createPortal(
                    <DocSearchModal
                        onClose={closeModal}
                        initialScrollY={window.scrollY}
                        initialQuery={initialQuery}
                        navigator={navigator}
                        transformItems={transformItems}
                        hitComponent={Hit}
                        transformSearchClient={transformSearchClient}
                        {...(props.searchPagePath && { resultsFooterComponent })}
                        placeholder={currentPlaceholder}
                        {...props}
                        translations={props.translations?.modal ?? translations.modal}
                        searchParameters={searchParameters}
                        {...extraAskAiProps}
                    />,
                    searchContainer.current,
                )}
        </>
    );
}

export default function SearchBar(): ReactNode {
    const { siteConfig } = useDocusaurusContext();
    return <DocSearch {...(siteConfig.themeConfig.algolia as any)} />;
}
