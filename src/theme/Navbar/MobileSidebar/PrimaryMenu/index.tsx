import React, { type ReactNode, useState } from 'react';
import clsx from 'clsx';
import { useNavbarMobileSidebar } from '@docusaurus/theme-common/internal';
import { Collapsible } from '@docusaurus/theme-common';
import { useLocation } from '@docusaurus/router';
import Link from '@docusaurus/Link';

type MenuItem = {
    label: string;
    href: string;
    iconClass?: string;
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
            { label: 'Profile engagement', href: '/guide/profile-monitoring', iconClass: 'sidebar-icon sidebar-icon-profile' },
            { label: 'Post engagement', href: '/guide/post-engagement', iconClass: 'sidebar-icon sidebar-icon-post' },
            { label: 'Keyword monitoring', href: '/guide/keyword-monitoring', iconClass: 'sidebar-icon sidebar-icon-keyword' },
        ],
    },
    {
        label: 'Integrations',
        items: [
            { label: 'Clay', href: '/integrations/clay', iconClass: 'sidebar-icon sidebar-icon-clay' },
            { label: 'Slack', href: '/integrations/slack', iconClass: 'sidebar-icon sidebar-icon-slack' },
            { label: 'Google Sheets', href: '/integrations/google-sheets', iconClass: 'sidebar-icon sidebar-icon-sheets' },
            { label: 'HeyReach', href: '/integrations/heyreach', iconClass: 'sidebar-icon sidebar-icon-heyreach' },
            { label: 'Expandi', href: '/integrations/expandi', iconClass: 'sidebar-icon sidebar-icon-expandi' },
            { label: 'Webhooks', href: '/integrations/webhooks', iconClass: 'sidebar-icon sidebar-icon-webhook' },
        ],
    },
    {
        label: 'API',
        items: [
            { label: 'Overview', href: '/api' },
            { label: 'Quick Start', href: '/api/quick-start' },
            { label: 'Workspaces', href: '/api/workspaces' },
            { label: 'Signals', href: '/api/signals' },
            { label: 'Posts', href: '/api/posts' },
            { label: 'Engagers', href: '/api/engagers' },
            { label: 'Workbooks', href: '/api/workbooks' },
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
    const [expanded, setExpanded] = useState(true);

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
                    <li key={item.href} className={clsx('menu__list-item', item.iconClass)}>
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
