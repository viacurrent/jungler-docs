import React, { useCallback, useRef, useEffect, useState } from 'react';
import clsx from 'clsx';
import { useDocsSidebar } from '@docusaurus/plugin-content-docs/client';
import { useLocation } from '@docusaurus/router';
import Footer from '@theme/Footer';
import styles from './styles.module.css';

function CopyPageButton() {
    const [copied, setCopied] = useState(false);

    const handleCopy = useCallback(() => {
        const article = document.querySelector('article');
        if (!article) return;

        // Get text content, clean up whitespace
        const text = article.innerText
            .replace(/\n{3,}/g, '\n\n')
            .trim();

        navigator.clipboard.writeText(text).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    }, []);

    return (
        <button
            onClick={handleCopy}
            className={styles.copyPageButton}
            title="Copy page content"
            type="button"
        >
            {copied ? (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                </svg>
            ) : (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                </svg>
            )}
            <span>{copied ? 'Copied' : 'Copy page'}</span>
        </button>
    );
}

export default function DocRootLayoutMain({
    hiddenSidebarContainer,
    children,
}: {
    hiddenSidebarContainer: boolean;
    children: React.ReactNode;
}) {
    const sidebar = useDocsSidebar();
    const { pathname } = useLocation();
    const mainRef = useRef<HTMLElement>(null);

    const handleScroll = useCallback(() => {
        document.dispatchEvent(new Event('scroll'));
    }, []);

    useEffect(() => {
        if (mainRef.current) {
            mainRef.current.scrollTop = 0;
        }
    }, [pathname]);

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
