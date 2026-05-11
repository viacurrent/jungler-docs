import React, { useCallback, useRef, useEffect } from 'react';
import clsx from 'clsx';
import { useDocsSidebar } from '@docusaurus/plugin-content-docs/client';
import { useLocation } from '@docusaurus/router';
import styles from './styles.module.css';

export default function DocRootLayoutMain({
    hiddenSidebarContainer,
    children,
}: {
    hiddenSidebarContainer: boolean;
    children: React.ReactNode;
}) {
    const sidebar = useDocsSidebar();
    const { pathname, hash } = useLocation();
    const mainRef = useRef<HTMLElement>(null);
    const rafRef = useRef<number>(0);

    const handleScroll = useCallback(() => {
        if (rafRef.current) return;
        rafRef.current = requestAnimationFrame(() => {
            document.dispatchEvent(new Event('scroll'));
            rafRef.current = 0;
        });
    }, []);

    // Reset scroll to top on path change — but not when navigating to a hash,
    // since in that case the caller wants us at that section, not at top.
    useEffect(() => {
        if (mainRef.current && !hash) {
            mainRef.current.scrollTop = 0;
        }
    }, [pathname, hash]);

    return (
        <main
            ref={mainRef}
            className={clsx(
                styles.docMainContainer,
                (hiddenSidebarContainer || !sidebar) && styles.docMainContainerEnhanced,
            )}
            onScroll={handleScroll}>
            <div
                className={clsx(
                    'padding-top--md padding-bottom--lg',
                    hiddenSidebarContainer && styles.docItemWrapperEnhanced,
                )}>
                {children}
            </div>
        </main>
    );
}
