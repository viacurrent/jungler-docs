import React, { useRef, useEffect, useState } from 'react';
import clsx from 'clsx';
import { TextAlignStart } from 'lucide-react';
import TOCItems from '@theme/TOCItems';
import styles from './styles.module.css';

const LINK_CLASS_NAME = 'table-of-contents__link toc-highlight';
const LINK_ACTIVE_CLASS_NAME = 'table-of-contents__link--active';

function useScrollActiveIntoView(containerRef: React.RefObject<HTMLDivElement | null>) {
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const observer = new MutationObserver(() => {
            const active = container.querySelector(`.${LINK_ACTIVE_CLASS_NAME}`);
            if (active) {
                const containerRect = container.getBoundingClientRect();
                const activeRect = active.getBoundingClientRect();
                const isAbove = activeRect.top < containerRect.top;
                const isBelow = activeRect.bottom > containerRect.bottom;
                if (isAbove || isBelow) {
                    active.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
                }
            }
        });

        observer.observe(container, { attributes: true, subtree: true, attributeFilter: ['class'] });
        return () => observer.disconnect();
    }, [containerRef]);
}

function useActiveIndicator(
    containerRef: React.RefObject<HTMLDivElement | null>,
    indicatorRef: React.RefObject<HTMLDivElement | null>,
) {
    useEffect(() => {
        const container = containerRef.current;
        const indicator = indicatorRef.current;
        if (!container || !indicator) return;

        const update = () => {
            const tocList = container.querySelector('.table-of-contents');
            let active = container.querySelector(`.${LINK_ACTIVE_CLASS_NAME}`) as HTMLElement | null;

            // Default to first link if none is active
            if (!active) {
                const firstLink = container.querySelector('.table-of-contents__link') as HTMLElement | null;
                if (firstLink) {
                    firstLink.classList.add(LINK_ACTIVE_CLASS_NAME);
                    active = firstLink;
                }
            }

            if (!active || !tocList) {
                indicator.style.opacity = '0';
                return;
            }
            const tocRect = tocList.getBoundingClientRect();
            const activeRect = active.getBoundingClientRect();
            // Use line-height to size the indicator to just the text
            const lineHeight = parseFloat(getComputedStyle(active).lineHeight) || activeRect.height;
            const textTop = activeRect.top + (activeRect.height - lineHeight) / 2;
            indicator.style.opacity = '1';
            indicator.style.top = `${textTop - tocRect.top}px`;
            indicator.style.height = `${lineHeight}px`;
        };

        update();

        const observer = new MutationObserver(update);
        observer.observe(container, { attributes: true, subtree: true, attributeFilter: ['class'] });
        return () => observer.disconnect();
    }, [containerRef, indicatorRef]);
}

export default function TOC({ className, ...props }: any) {
    const containerRef = useRef<HTMLDivElement>(null);
    const indicatorRef = useRef<HTMLDivElement>(null);
    useScrollActiveIntoView(containerRef);
    useActiveIndicator(containerRef, indicatorRef);

    return (
        <div ref={containerRef} className={clsx(styles.tableOfContents, 'thin-scrollbar', className)}>
            <div className={styles.title}>
                <TextAlignStart size={14} />
                <span>On this page</span>
            </div>
            <div style={{ position: 'relative' }}>
                <div
                    ref={indicatorRef}
                    style={{
                        position: 'absolute',
                        left: 0,
                        width: '2px',
                        background: 'var(--ifm-font-color-base)',
                        transition: 'top 0.15s ease, height 0.15s ease, opacity 0.15s ease',
                        opacity: 0,
                        zIndex: 1,
                    }}
                />
                <TOCItems
                    {...props}
                    linkClassName={LINK_CLASS_NAME}
                    linkActiveClassName={LINK_ACTIVE_CLASS_NAME}
                />
            </div>
        </div>
    );
}
