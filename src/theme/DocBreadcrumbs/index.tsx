import React, { useCallback, useState, useRef, useEffect, type ReactNode } from 'react';
import clsx from 'clsx';
import { ThemeClassNames } from '@docusaurus/theme-common';
import { useSidebarBreadcrumbs } from '@docusaurus/plugin-content-docs/client';
import { useHomePageRoute } from '@docusaurus/theme-common/internal';
import Link from '@docusaurus/Link';
import { translate } from '@docusaurus/Translate';
import HomeBreadcrumbItem from '@theme/DocBreadcrumbs/Items/Home';
import DocBreadcrumbsStructuredData from '@theme/DocBreadcrumbs/StructuredData';

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

function CopyIcon() {
    return (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
        </svg>
    );
}

function CheckIcon() {
    return (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
        </svg>
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

function FileTextIcon() {
    return (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
        </svg>
    );
}

function OpenAIIcon() {
    return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" fillRule="evenodd" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.205 8.658v-2.26c0-.19.072-.333.238-.428l4.543-2.616c.619-.357 1.356-.523 2.117-.523 2.854 0 4.662 2.212 4.662 4.566 0 .167 0 .357-.024.547l-4.71-2.759a.797.797 0 00-.856 0l-5.97 3.473zm10.609 8.8V12.06c0-.333-.143-.57-.429-.737l-5.97-3.473 1.95-1.118a.433.433 0 01.476 0l4.543 2.617c1.309.76 2.189 2.378 2.189 3.948 0 1.808-1.07 3.473-2.76 4.163zM7.802 12.703l-1.95-1.142c-.167-.095-.239-.238-.239-.428V5.899c0-2.545 1.95-4.472 4.591-4.472 1 0 1.927.333 2.712.928L8.23 5.067c-.285.166-.428.404-.428.737v6.898zM12 15.128l-2.795-1.57v-3.33L12 8.658l2.795 1.57v3.33L12 15.128zm1.796 7.23c-1 0-1.927-.332-2.712-.927l4.686-2.712c.285-.166.428-.404.428-.737v-6.898l1.974 1.142c.167.095.238.238.238.428v5.233c0 2.545-1.974 4.472-4.614 4.472zm-5.637-5.303l-4.544-2.617c-1.308-.761-2.188-2.378-2.188-3.948A4.482 4.482 0 014.21 6.327v5.423c0 .333.143.571.428.738l5.947 3.449-1.95 1.118a.432.432 0 01-.476 0zm-.262 3.9c-2.688 0-4.662-2.021-4.662-4.519 0-.19.024-.38.047-.57l4.686 2.71c.286.167.571.167.856 0l5.97-3.448v2.26c0 .19-.07.333-.237.428l-4.543 2.616c-.619.357-1.356.523-2.117.523zm5.899 2.83a5.947 5.947 0 005.827-4.756C22.287 18.339 24 15.84 24 13.296c0-1.665-.713-3.282-1.998-4.448.119-.5.19-.999.19-1.498 0-3.401-2.759-5.947-5.946-5.947-.642 0-1.26.095-1.88.31A5.962 5.962 0 0010.205 0a5.947 5.947 0 00-5.827 4.757C1.713 5.447 0 7.945 0 10.49c0 1.666.713 3.283 1.998 4.448-.119.5-.19 1-.19 1.499 0 3.401 2.759 5.946 5.946 5.946.642 0 1.26-.095 1.88-.309a5.96 5.96 0 004.162 1.713z" />
        </svg>
    );
}

function ClaudeIcon() {
    return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" fillRule="evenodd" xmlns="http://www.w3.org/2000/svg">
            <path d="M4.709 15.955l4.72-2.647.08-.23-.08-.128H9.2l-.79-.048-2.698-.073-2.339-.097-2.266-.122-.571-.121L0 11.784l.055-.352.48-.321.686.06 1.52.103 2.278.158 1.652.097 2.449.255h.389l.055-.157-.134-.098-.103-.097-2.358-1.596-2.552-1.688-1.336-.972-.724-.491-.364-.462-.158-1.008.656-.722.881.06.225.061.893.686 1.908 1.476 2.491 1.833.365.304.145-.103.019-.073-.164-.274-1.355-2.446-1.446-2.49-.644-1.032-.17-.619a2.97 2.97 0 01-.104-.729L6.283.134 6.696 0l.996.134.42.364.62 1.414 1.002 2.229 1.555 3.03.456.898.243.832.091.255h.158V9.01l.128-1.706.237-2.095.23-2.695.08-.76.376-.91.747-.492.584.28.48.685-.067.444-.286 1.851-.559 2.903-.364 1.942h.212l.243-.242.985-1.306 1.652-2.064.73-.82.85-.904.547-.431h1.033l.76 1.129-.34 1.166-1.064 1.347-.881 1.142-1.264 1.7-.79 1.36.073.11.188-.02 2.856-.606 1.543-.28 1.841-.315.833.388.091.395-.328.807-1.969.486-2.309.462-3.439.813-.042.03.049.061 1.549.146.662.036h1.622l3.02.225.79.522.474.638-.079.485-1.215.62-1.64-.389-3.829-.91-1.312-.329h-.182v.11l1.093 1.068 2.006 1.81 2.509 2.33.127.578-.322.455-.34-.049-2.205-1.657-.851-.747-1.926-1.62h-.128v.17l.444.649 2.345 3.521.122 1.08-.17.353-.608.213-.668-.122-1.374-1.925-1.415-2.167-1.143-1.943-.14.08-.674 7.254-.316.37-.729.28-.607-.461-.322-.747.322-1.476.389-1.924.315-1.53.286-1.9.17-.632-.012-.042-.14.018-1.434 1.967-2.18 2.945-1.726 1.845-.414.164-.717-.37.067-.662.401-.589 2.388-3.036 1.44-1.882.93-1.086-.006-.158h-.055L4.132 18.56l-1.13.146-.487-.456.061-.746.231-.243 1.908-1.312-.006.006z" />
        </svg>
    );
}

function ExternalIcon() {
    return (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
        </svg>
    );
}

async function fetchRawMd(): Promise<string> {
    const pathname = window.location.pathname.replace(/\/$/, '') || '/intro';
    const candidates = [
        `/raw${pathname}.md`,
        `/raw${pathname}.mdx`,
        `/raw/intro.md`,
        `/raw/intro.mdx`,
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
        } catch {}
    }
    return '';
}

function getRawMdUrl(): string {
    const pathname = window.location.pathname.replace(/\/$/, '') || '/intro';
    return `${window.location.origin}/raw${pathname}.md`;
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
        await navigator.clipboard.writeText(md);
        setCopied(true);
        setOpen(false);
        setTimeout(() => setCopied(false), 2000);
    }, []);

    const handleViewMarkdown = useCallback(() => {
        window.open(getRawMdUrl(), '_blank');
        setOpen(false);
    }, []);

    const handleOpenChatGPT = useCallback(async () => {
        const md = await fetchRawMd();
        const url = `https://chatgpt.com/?q=${encodeURIComponent(`Help me understand this documentation:\n\n${md}`)}`;
        window.open(url, '_blank');
        setOpen(false);
    }, []);

    const handleOpenClaude = useCallback(async () => {
        const md = await fetchRawMd();
        const url = `https://claude.ai/new?q=${encodeURIComponent(`Help me understand this documentation:\n\n${md}`)}`;
        window.open(url, '_blank');
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
                    {copied ? <CheckIcon /> : <CopyIcon />}
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
                        <CopyIcon />
                        <div>
                            <div className="copy-dropdown-item-title">Copy page</div>
                            <div className="copy-dropdown-item-desc">Copy page as Markdown for LLMs</div>
                        </div>
                    </button>
                    <button className="copy-dropdown-item copy-dropdown-external" onClick={handleOpenChatGPT}>
                        <OpenAIIcon />
                        <div>
                            <div className="copy-dropdown-item-title">Open in ChatGPT</div>
                            <div className="copy-dropdown-item-desc">Ask ChatGPT about this page</div>
                        </div>
                        <span className="copy-dropdown-arrow">&#8599;</span>
                    </button>
                    <button className="copy-dropdown-item copy-dropdown-external" onClick={handleOpenClaude}>
                        <ClaudeIcon />
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
        <>
            <DocBreadcrumbsStructuredData breadcrumbs={breadcrumbs} />
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
                    {homePageRoute && <HomeBreadcrumbItem />}
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
        </>
    );
}
