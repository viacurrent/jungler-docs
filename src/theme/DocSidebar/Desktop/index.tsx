import React, { useEffect, useRef, useState } from 'react';
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

    const contentWrapperRef = useRef<HTMLDivElement>(null);
    const [hasContentBelow, setHasContentBelow] = useState(false);
    const [hasContentAbove, setHasContentAbove] = useState(false);

    useEffect(() => {
        const wrapper = contentWrapperRef.current;
        if (!wrapper) return;

        const pickScroller = (): HTMLElement => {
            const nav = wrapper.querySelector<HTMLElement>('nav');
            if (nav && nav.scrollHeight > nav.clientHeight) return nav;
            return wrapper;
        };

        let scroller = pickScroller();

        const update = () => {
            scroller = pickScroller();
            const scrollable = scroller.scrollHeight > scroller.clientHeight;
            const atTop = scroller.scrollTop <= 0;
            const atBottom =
                scroller.scrollTop + scroller.clientHeight >= scroller.scrollHeight - 1;
            setHasContentBelow(scrollable && !atBottom);
            setHasContentAbove(scrollable && !atTop);
        };

        const onScroll = () => update();

        update();
        wrapper.addEventListener('scroll', onScroll, { passive: true, capture: true });
        const ro = new ResizeObserver(update);
        ro.observe(wrapper);
        for (const child of Array.from(wrapper.querySelectorAll('*'))) ro.observe(child);

        return () => {
            wrapper.removeEventListener('scroll', onScroll, { capture: true } as any);
            ro.disconnect();
        };
    }, []);

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
            <div
                className={clsx(
                    styles.scrollDivider,
                    hasContentAbove && styles.scrollDividerVisible,
                )}
                aria-hidden="true"
            />
            <div ref={contentWrapperRef} className={styles.contentWrapper}>
                <Content path={path} sidebar={sidebar} className={styles.content} />
            </div>
            <div
                className={clsx(
                    styles.toggleContainer,
                    hasContentBelow && styles.toggleContainerScrolled,
                )}>
                <ColorModeToggle />
            </div>
            {hideable && <CollapseButton onClick={onCollapse} />}
        </div>
    );
}

export default React.memo(DocSidebarDesktop);
