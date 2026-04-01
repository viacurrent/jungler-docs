import React, { useCallback } from 'react';
import clsx from 'clsx';
import { useDocsSidebar } from '@docusaurus/plugin-content-docs/client';
import Footer from '@theme/Footer';
import styles from './styles.module.css';

export default function DocRootLayoutMain({
    hiddenSidebarContainer,
    children,
}: {
    hiddenSidebarContainer: boolean;
    children: React.ReactNode;
}) {
    const sidebar = useDocsSidebar();

    // Forward scroll events to document so TOC highlight works
    const handleScroll = useCallback(() => {
        document.dispatchEvent(new Event('scroll'));
    }, []);

    return (
        <main
            className={clsx(
                styles.docMainContainer,
                (hiddenSidebarContainer || !sidebar) && styles.docMainContainerEnhanced,
            )}
            onScroll={handleScroll}>
            <div
                className={clsx(
                    'container padding-top--md padding-bottom--lg',
                    styles.docItemWrapper,
                    hiddenSidebarContainer && styles.docItemWrapperEnhanced,
                )}>
                {children}
            </div>
            <Footer />
        </main>
    );
}
