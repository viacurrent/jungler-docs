import React, { useCallback, useState, useRef, useEffect, type ReactNode } from 'react';
import clsx from 'clsx';
import { ThemeClassNames } from '@docusaurus/theme-common';
import { useSidebarBreadcrumbs } from '@docusaurus/plugin-content-docs/client';
import { useHomePageRoute } from '@docusaurus/theme-common/internal';
import Link from '@docusaurus/Link';
import { translate } from '@docusaurus/Translate';
import IconCopy from '@theme/Icon/Copy';
import IconSuccess from '@theme/Icon/Success';
import IconOpenAI from '@theme/Icon/OpenAI';
import IconClaude from '@theme/Icon/Claude';

function BreadcrumbsItemLink({
    children,
    href,
    isLast,
}: {
    children: ReactNode;
    href: string | undefined;
    isLast: boolean;
}): ReactNode {
    const className = 'breadcrumbs__link';
    if (isLast) {
        return <span className={className}>{children}</span>;
    }
    return href ? (
        <Link className={className} href={href}>
            <span>{children}</span>
        </Link>
    ) : (
        <span className={className}>{children}</span>
    );
}

function BreadcrumbsItem({
    children,
    active,
}: {
    children: ReactNode;
    active?: boolean;
}): ReactNode {
    return (
        <li
            className={clsx('breadcrumbs__item', {
                'breadcrumbs__item--active': active,
            })}>
            {children}
        </li>
    );
}

function ChevronIcon({ open }: { open: boolean }) {
    return (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            style={{ transform: open ? 'rotate(180deg)' : 'none' }}>
            <path d="m6 9 6 6 6-6" />
        </svg>
    );
}

async function fetchRawMd(): Promise<string> {
    const pathname = window.location.pathname.replace(/\/$/, '') || '/intro';
    const candidates = [
        `/raw${pathname}.md`,
        `/raw/intro.md`,
    ];
    for (const url of candidates) {
        try {
            const res = await fetch(url);
            if (res.ok) {
                const text = await res.text();
                if (!text.startsWith('<!DOCTYPE')) {
                    return text.replace(/^---\n[\s\S]*?\n---\n*/, '').trim();
                }
            }
        } catch { }
    }
    return '';
}

function CopyDropdown() {
    const [open, setOpen] = useState(false);
    const [copied, setCopied] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClick(e: MouseEvent) {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClick);
        return () => document.removeEventListener('mousedown', handleClick);
    }, []);

    const handleCopy = useCallback(async () => {
        const md = await fetchRawMd();
        if (!md) return;
        try {
            await navigator.clipboard.writeText(md);
            setCopied(true);
            setOpen(false);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            // Clipboard API unavailable (non-secure context or permission denied)
        }
    }, []);

    const handleOpenChatGPT = useCallback(() => {
        const pageUrl = `https://docs.jungler.ai${window.location.pathname}`;
        const prompt = `Read ${pageUrl} and answer questions about the content.`;
        window.open(`https://chatgpt.com/?q=${encodeURIComponent(prompt)}`, '_blank');
        setOpen(false);
    }, []);

    const handleOpenClaude = useCallback(() => {
        const pageUrl = `https://docs.jungler.ai${window.location.pathname}`;
        const prompt = `Read ${pageUrl} and answer questions about the content.`;
        window.open(`https://claude.ai/new?q=${encodeURIComponent(prompt)}`, '_blank');
        setOpen(false);
    }, []);

    return (
        <div className="copy-dropdown" ref={ref}>
            <div className="copy-dropdown-trigger">
                <button
                    onClick={handleCopy}
                    className="copy-page-button copy-page-main"
                    type="button"
                >
                    {copied ? <IconSuccess /> : <IconCopy />}
                    <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
                <button
                    onClick={() => setOpen(!open)}
                    className="copy-page-button copy-page-chevron"
                    type="button"
                >
                    <ChevronIcon open={open} />
                </button>
            </div>
            {open && (
                <div className="copy-dropdown-menu">
                    <button className="copy-dropdown-item" onClick={handleCopy}>
                        <IconCopy />
                        <div>
                            <div className="copy-dropdown-item-title">Copy page</div>
                            <div className="copy-dropdown-item-desc">Copy page as Markdown for LLMs</div>
                        </div>
                    </button>
                    <button className="copy-dropdown-item copy-dropdown-external" onClick={handleOpenChatGPT}>
                        <IconOpenAI />
                        <div>
                            <div className="copy-dropdown-item-title">Open in ChatGPT</div>
                            <div className="copy-dropdown-item-desc">Ask ChatGPT about this page</div>
                        </div>
                        <span className="copy-dropdown-arrow">&#8599;</span>
                    </button>
                    <button className="copy-dropdown-item copy-dropdown-external" onClick={handleOpenClaude}>
                        <IconClaude />
                        <div>
                            <div className="copy-dropdown-item-title">Open in Claude</div>
                            <div className="copy-dropdown-item-desc">Ask Claude about this page</div>
                        </div>
                        <span className="copy-dropdown-arrow">&#8599;</span>
                    </button>
                </div>
            )}
        </div>
    );
}

export default function DocBreadcrumbs(): ReactNode {
    const breadcrumbs = useSidebarBreadcrumbs();
    const homePageRoute = useHomePageRoute();

    if (!breadcrumbs) {
        return null;
    }

    return (
        <nav
            className={clsx(
                ThemeClassNames.docs.docBreadcrumbs,
                'breadcrumbs-row',
            )}
            aria-label={translate({
                id: 'theme.docs.breadcrumbs.navAriaLabel',
                message: 'Breadcrumbs',
                description: 'The ARIA label for the breadcrumbs',
            })}>
            <ul className="breadcrumbs">
                {homePageRoute && (
                    <BreadcrumbsItem>
                        <Link className="breadcrumbs__link" href={Array.isArray(homePageRoute.path) ? homePageRoute.path[0] : homePageRoute.path}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                                <polyline points="9 22 9 12 15 12 15 22" />
                            </svg>
                        </Link>
                    </BreadcrumbsItem>
                )}
                {breadcrumbs.map((item, idx) => {
                    const isLast = idx === breadcrumbs.length - 1;
                    const href =
                        item.type === 'category' && item.linkUnlisted
                            ? undefined
                            : item.href;
                    return (
                        <BreadcrumbsItem key={idx} active={isLast}>
                            <BreadcrumbsItemLink href={href} isLast={isLast}>
                                {item.label}
                            </BreadcrumbsItemLink>
                        </BreadcrumbsItem>
                    );
                })}
            </ul>
            <CopyDropdown />
        </nav>
    );
}
