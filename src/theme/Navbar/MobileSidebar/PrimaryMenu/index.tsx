import React, { type ReactNode, useState } from 'react';
import clsx from 'clsx';
import { useNavbarMobileSidebar } from '@docusaurus/theme-common/internal';
import { Collapsible } from '@docusaurus/theme-common';
import { useLocation } from '@docusaurus/router';
import Link from '@docusaurus/Link';

type MenuItem = {
    label: string;
    href: string;
};

type MenuCategory = {
    label: string;
    items: MenuItem[];
};

const menu: (MenuItem | MenuCategory)[] = [
    { label: 'Welcome to Jungler', href: '/' },
    {
        label: 'Guide',
        items: [
            { label: 'How Jungler Works', href: '/how-it-works' },
            { label: 'What to Search For', href: '/search-ideas' },
            { label: 'Search Syntax', href: '/search-syntax' },
            { label: 'AI Filtering', href: '/ai-filtering' },
        ],
    },
    {
        label: 'API Reference',
        items: [
            { label: 'Quick Start', href: '/quick-start' },
            { label: 'Workspaces API', href: '/api/workspaces' },
            { label: 'Searches API', href: '/api/searches' },
            { label: 'Posts API', href: '/api/posts' },
            { label: 'Workbooks API', href: '/api/workbooks' },
            { label: 'Webhooks', href: '/api/webhooks' },
        ],
    },
];

function isActive(href: string, pathname: string) {
    if (href === '/') return pathname === '/' || pathname === '';
    return pathname === href || pathname === href + '/';
}

function CategoryItem({
    category,
    pathname,
    onNavigate,
}: {
    category: MenuCategory;
    pathname: string;
    onNavigate: () => void;
}) {
    const hasActive = category.items.some((item) => isActive(item.href, pathname));
    const [expanded, setExpanded] = useState(hasActive);

    return (
        <li className={clsx('menu__list-item', { 'menu__list-item--collapsed': !expanded })}>
            <button
                className={clsx('menu__link menu__link--sublist menu__link--sublist-caret', {
                    'menu__link--active': hasActive,
                })}
                onClick={() => setExpanded(!expanded)}
                type="button"
            >
                {category.label}
            </button>
            <Collapsible lazy as="ul" className="menu__list" collapsed={!expanded}>
                {category.items.map((item) => (
                    <li key={item.href} className="menu__list-item">
                        <Link
                            className={clsx('menu__link', {
                                'menu__link--active': isActive(item.href, pathname),
                            })}
                            to={item.href}
                            onClick={onNavigate}
                        >
                            {item.label}
                        </Link>
                    </li>
                ))}
            </Collapsible>
        </li>
    );
}

export default function NavbarMobilePrimaryMenu(): ReactNode {
    const mobileSidebar = useNavbarMobileSidebar();
    const { pathname } = useLocation();

    return (
        <ul className="menu__list">
            {menu.map((item, i) => {
                if ('items' in item) {
                    return (
                        <CategoryItem
                            key={item.label}
                            category={item}
                            pathname={pathname}
                            onNavigate={() => mobileSidebar.toggle()}
                        />
                    );
                }
                return (
                    <li key={item.href} className="menu__list-item">
                        <Link
                            className={`menu__link ${isActive(item.href, pathname) ? 'menu__link--active' : ''}`}
                            to={item.href}
                            onClick={() => mobileSidebar.toggle()}
                        >
                            {item.label}
                        </Link>
                    </li>
                );
            })}
        </ul>
    );
}
