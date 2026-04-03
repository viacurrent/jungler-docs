import React, {type ReactNode, useMemo, useEffect, useRef} from 'react';
import {useThemeConfig} from '@docusaurus/theme-common';
import {useFilteredAndTreeifiedTOC} from '@docusaurus/theme-common/internal';
import TOCItemTree from '@theme/TOCItems/Tree';
import type {Props} from '@theme/TOCItems';

function getVisibleBoundingClientRect(element: HTMLElement): DOMRect {
    const rect = element.getBoundingClientRect();
    if (rect.top === rect.bottom) {
        return getVisibleBoundingClientRect(element.parentNode as HTMLElement);
    }
    return rect;
}

function getAnchors(minHeadingLevel: number, maxHeadingLevel: number): HTMLElement[] {
    const selectors = [];
    for (let i = minHeadingLevel; i <= maxHeadingLevel; i++) {
        selectors.push(`h${i}.anchor`);
    }
    return Array.from(document.querySelectorAll(selectors.join(',')));
}

/**
 * Find the lowest (last) heading that is in the upper half of the viewport.
 * This means the active heading is the one the user is currently reading,
 * not the first visible one.
 */
function getActiveAnchor(anchors: HTMLElement[]): HTMLElement | null {
    const threshold = window.innerHeight * 0.5;
    let activeAnchor: HTMLElement | null = null;
    for (const anchor of anchors) {
        const rect = getVisibleBoundingClientRect(anchor);
        if (rect.top < threshold) {
            activeAnchor = anchor;
        }
    }
    return activeAnchor ?? anchors[0] ?? null;
}

function useTOCHighlightCustom(config: {
    linkClassName: string;
    linkActiveClassName: string;
    minHeadingLevel: number;
    maxHeadingLevel: number;
} | undefined) {
    const lastActiveLinkRef = useRef<HTMLAnchorElement | undefined>(undefined);

    useEffect(() => {
        if (!config) return;
        const {linkClassName, linkActiveClassName, minHeadingLevel, maxHeadingLevel} = config;

        function updateActiveLink() {
            const links = Array.from(
                document.getElementsByClassName(linkClassName),
            ) as HTMLAnchorElement[];
            const anchors = getAnchors(minHeadingLevel, maxHeadingLevel);
            const activeAnchor = getActiveAnchor(anchors);
            const activeLink = links.find(
                (link) =>
                    activeAnchor &&
                    activeAnchor.id === decodeURIComponent(link.href.substring(link.href.indexOf('#') + 1)),
            );

            links.forEach((link) => {
                if (link === activeLink) {
                    if (lastActiveLinkRef.current && lastActiveLinkRef.current !== link) {
                        lastActiveLinkRef.current.classList.remove(linkActiveClassName);
                    }
                    link.classList.add(linkActiveClassName);
                    lastActiveLinkRef.current = link;
                } else {
                    link.classList.remove(linkActiveClassName);
                }
            });
        }

        document.addEventListener('scroll', updateActiveLink);
        document.addEventListener('resize', updateActiveLink);
        updateActiveLink();

        return () => {
            document.removeEventListener('scroll', updateActiveLink);
            document.removeEventListener('resize', updateActiveLink);
        };
    }, [config]);
}

export default function TOCItems({
    toc,
    className = 'table-of-contents table-of-contents__left-border',
    linkClassName = 'table-of-contents__link',
    linkActiveClassName = undefined,
    minHeadingLevel: minHeadingLevelOption,
    maxHeadingLevel: maxHeadingLevelOption,
    ...props
}: Props): ReactNode {
    const themeConfig = useThemeConfig();

    const minHeadingLevel =
        minHeadingLevelOption ?? themeConfig.tableOfContents.minHeadingLevel;
    const maxHeadingLevel =
        maxHeadingLevelOption ?? themeConfig.tableOfContents.maxHeadingLevel;

    const tocTree = useFilteredAndTreeifiedTOC({
        toc,
        minHeadingLevel,
        maxHeadingLevel,
    });

    const tocHighlightConfig = useMemo(() => {
        if (linkClassName && linkActiveClassName) {
            return {linkClassName, linkActiveClassName, minHeadingLevel, maxHeadingLevel};
        }
        return undefined;
    }, [linkClassName, linkActiveClassName, minHeadingLevel, maxHeadingLevel]);

    useTOCHighlightCustom(tocHighlightConfig);

    return (
        <TOCItemTree
            toc={tocTree}
            className={className}
            linkClassName={linkClassName}
            {...props}
        />
    );
}
