import React from 'react';
import clsx from 'clsx';
import { useThemeConfig } from '@docusaurus/theme-common';
import Logo from '@theme/Logo';
import ColorModeToggle from '@theme/ColorModeToggle';
import CollapseButton from '@theme/DocSidebar/Desktop/CollapseButton';
import Content from '@theme/DocSidebar/Desktop/Content';
import SearchBar from '@theme/SearchBar';
import styles from './styles.module.css';

function DocSidebarDesktop({ path, sidebar, onCollapse, isHidden }: any) {
    const {
        navbar: { hideOnScroll },
        docs: {
            sidebar: { hideable },
        },
    } = useThemeConfig();

    return (
        <div
            className={clsx(
                styles.sidebar,
                hideOnScroll && styles.sidebarWithHideableNavbar,
                isHidden && styles.sidebarHidden,
            )}>
            {hideOnScroll && <Logo tabIndex={-1} className={styles.sidebarLogo} />}
            <div className={styles.searchContainer}>
                <SearchBar />
            </div>
            <div className={styles.contentWrapper}>
                <Content path={path} sidebar={sidebar} className={styles.content} />
            </div>
            <div className={styles.toggleContainer}>
                <ColorModeToggle />
            </div>
            {hideable && <CollapseButton onClick={onCollapse} />}
        </div>
    );
}

export default React.memo(DocSidebarDesktop);
