import React, { type ReactNode } from 'react';
import clsx from 'clsx';
import { translate } from '@docusaurus/Translate';
import { useAnchorTargetClassName } from '@docusaurus/theme-common';
import Link from '@docusaurus/Link';
import useBrokenLinks from '@docusaurus/useBrokenLinks';
import type { Props } from '@theme/Heading';

function LinkIcon() {
    return (
        <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ verticalAlign: 'middle' }}
        >
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
        </svg>
    );
}

export default function Heading({ as: As, id, ...props }: Props): ReactNode {
    const brokenLinks = useBrokenLinks();
    const anchorTargetClassName = useAnchorTargetClassName(id);

    if (As === 'h1' || !id) {
        return <As {...props} id={undefined} />;
    }

    brokenLinks.collectAnchor(id);

    const anchorTitle = translate(
        {
            id: 'theme.common.headingLinkTitle',
            message: 'Direct link to {heading}',
            description: 'Title for link to heading',
        },
        {
            heading: typeof props.children === 'string' ? props.children : id,
        },
    );

    return (
        <As
            {...props}
            className={clsx('anchor', anchorTargetClassName, props.className)}
            id={id}>
            {props.children}
            <a
                className="hash-link"
                href={`#${id}`}
                aria-label={anchorTitle}
                title={anchorTitle}
                translate="no"
                onClick={(e) => {
                    e.preventDefault();
                    const url = `${window.location.origin}${window.location.pathname}#${id}`;
                    navigator.clipboard.writeText(url).catch(() => { });
                    window.history.replaceState(null, '', `#${id}`);
                    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
                }}>
                <LinkIcon />
            </a>
        </As>
    );
}
