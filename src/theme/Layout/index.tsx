import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import clsx from 'clsx';
import ErrorBoundary from '@docusaurus/ErrorBoundary';
import {
    PageMetadata,
    SkipToContentFallbackId,
    ThemeClassNames,
} from '@docusaurus/theme-common';
import { useKeyboardNavigation } from '@docusaurus/theme-common/internal';

import SkipToContent from '@theme/SkipToContent';
import AnnouncementBar from '@theme/AnnouncementBar';
import Navbar from '@theme/Navbar';
import Footer from '@theme/Footer';
import ColorModeToggle from '@theme/ColorModeToggle';
import LayoutProvider from '@theme/Layout/Provider';
import ErrorPageContent from '@theme/ErrorPageContent';
import styles from './styles.module.css';

function NavbarTogglePortal() {
    const [slot, setSlot] = useState<HTMLElement | null>(null);
    useEffect(() => {
        // Re-check for slot on every render cycle and after DOM mutations
        const findSlot = () => {
            const el = document.getElementById('navbar-toggle-slot');
            if (el && el !== slot) setSlot(el);
        };
        findSlot();
        const observer = new MutationObserver(findSlot);
        observer.observe(document.body, { childList: true, subtree: true });
        return () => observer.disconnect();
    }, [slot]);
    if (!slot) return null;
    return createPortal(<ColorModeToggle />, slot);
}

export default function Layout(props: any) {
    const {
        children,
        noFooter,
        wrapperClassName,
        title,
        description,
    } = props;
    useKeyboardNavigation();

    // Hide outer footer on doc pages — it's rendered inside the main scroll area instead
    // All pages are doc pages now — footer is rendered inside the doc scroll area
    const shouldHideFooter = true;

    return (
        <LayoutProvider>
            <PageMetadata title={title} description={description} />
            <SkipToContent />
            <AnnouncementBar />
            <Navbar />
            <NavbarTogglePortal />
            <div
                id={SkipToContentFallbackId}
                className={clsx(
                    ThemeClassNames.layout.main.container,
                    ThemeClassNames.wrapper.main,
                    styles.mainWrapper,
                    styles.docPageWrapper,
                    wrapperClassName,
                )}>
                <ErrorBoundary fallback={(params) => <ErrorPageContent {...params} />}>
                    {children}
                </ErrorBoundary>
            </div>
            {!shouldHideFooter && <Footer />}
        </LayoutProvider>
    );
}
