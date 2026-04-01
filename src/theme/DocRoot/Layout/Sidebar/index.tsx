import React, { useState, useCallback } from 'react';
import clsx from 'clsx';
import { prefersReducedMotion, ThemeClassNames } from '@docusaurus/theme-common';
import { useDocsSidebar } from '@docusaurus/plugin-content-docs/client';
import { useLocation } from '@docusaurus/router';
import DocSidebar from '@theme/DocSidebar';
import ExpandButton from '@theme/DocRoot/Layout/Sidebar/ExpandButton';
import styles from './styles.module.css';

function ResetOnSidebarChange({ children }: { children: React.ReactNode }) {
    const sidebar = useDocsSidebar();
    return (
        <React.Fragment key={sidebar?.name ?? 'noSidebar'}>
            {children}
        </React.Fragment>
    );
}

export default function DocRootLayoutSidebar({
    sidebar,
    hiddenSidebarContainer,
    setHiddenSidebarContainer,
}: any) {
    const { pathname } = useLocation();
    const [hiddenSidebar, setHiddenSidebar] = useState(false);
    const toggleSidebar = useCallback(() => {
        if (hiddenSidebar) {
            setHiddenSidebar(false);
        }
        if (!hiddenSidebar && prefersReducedMotion()) {
            setHiddenSidebar(true);
        }
        setHiddenSidebarContainer((value: boolean) => !value);
    }, [setHiddenSidebarContainer, hiddenSidebar]);

    return (
        <aside
            className={clsx(
                ThemeClassNames.docs.docSidebarContainer,
                styles.docSidebarContainer,
                hiddenSidebarContainer && styles.docSidebarContainerHidden,
            )}
            onTransitionEnd={(e) => {
                if (!e.currentTarget.classList.contains(styles.docSidebarContainer)) {
                    return;
                }
                if (hiddenSidebarContainer) {
                    setHiddenSidebar(true);
                }
            }}>
            <ResetOnSidebarChange>
                <DocSidebar
                    sidebar={sidebar}
                    path={pathname}
                    onCollapse={toggleSidebar}
                    isHidden={hiddenSidebar}
                />
                {hiddenSidebar && <ExpandButton toggleSidebar={toggleSidebar} />}
            </ResetOnSidebarChange>
        </aside>
    );
}
