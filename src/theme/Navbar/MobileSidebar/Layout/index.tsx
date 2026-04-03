import React, {type ReactNode} from 'react';
import clsx from 'clsx';
import {ThemeClassNames} from '@docusaurus/theme-common';
import type {Props} from '@theme/Navbar/MobileSidebar/Layout';

export default function NavbarMobileSidebarLayout({
    header,
    primaryMenu,
}: Props): ReactNode {
    return (
        <div
            className={clsx(
                ThemeClassNames.layout.navbar.mobileSidebar.container,
                'navbar-sidebar',
            )}>
            {header}
            <div className="navbar-sidebar__items" style={{flex: 1, overflowY: 'auto'}}>
                <div className="navbar-sidebar__item menu">
                    {primaryMenu}
                </div>
            </div>
            <div
                style={{
                    borderTop: '1px solid var(--card-border)',
                    padding: '12px 16px',
                    display: 'flex',
                    gap: '12px',
                }}
            >
                <a
                    href="https://app.jungler.ai/login"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                        flex: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '2.5rem',
                        border: '1px solid var(--card-border)',
                        borderRadius: '0.5rem',
                        fontSize: '0.875rem',
                        fontWeight: 500,
                        color: 'var(--ifm-font-color-base)',
                        textDecoration: 'none',
                    }}
                >
                    Log in
                </a>
                <a
                    href="https://app.jungler.ai/register"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                        flex: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '2.5rem',
                        backgroundColor: '#2B9C64',
                        borderRadius: '0.5rem',
                        fontSize: '0.875rem',
                        fontWeight: 500,
                        color: 'white',
                        textDecoration: 'none',
                    }}
                >
                    Start for free
                </a>
            </div>
        </div>
    );
}
