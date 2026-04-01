import React, { useRef, useState, useEffect } from 'react';
import clsx from 'clsx';
import { useThemeConfig } from '@docusaurus/theme-common';
import Logo from '@theme/Logo';
import CollapseButton from '@theme/DocSidebar/Desktop/CollapseButton';
import Content from '@theme/DocSidebar/Desktop/Content';
import ColorModeToggle from '@theme/ColorModeToggle';
import SearchBar from '@theme/SearchBar';
import styles from './styles.module.css';

function DocSidebarDesktop({ path, sidebar, onCollapse, isHidden }: any) {
    const {
        navbar: { hideOnScroll },
        docs: {
            sidebar: { hideable },
        },
    } = useThemeConfig();

    const contentRef = useRef<HTMLDivElement>(null);
    const [isOverflowing, setIsOverflowing] = useState(false);

    useEffect(() => {
        const el = contentRef.current?.querySelector('nav');
        if (!el) return;
        const check = () => {
            setIsOverflowing(el.scrollHeight > el.clientHeight);
        };
        check();
        const observer = new ResizeObserver(check);
        observer.observe(el);
        return () => observer.disconnect();
    }, [path]);

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
            <div ref={contentRef} className={styles.contentWrapper}>
                <Content path={path} sidebar={sidebar} className={styles.content} />
            </div>
            <div className={clsx(styles.bottomBar, isOverflowing && styles.bottomBarBorder)}>
                <ColorModeToggle />
            </div>
            {hideable && <CollapseButton onClick={onCollapse} />}
        </div>
    );
}

export default React.memo(DocSidebarDesktop);
