import React from 'react';
import styles from './styles.module.css';

const resources = [
    { href: 'https://jungler.ai/pricing', label: 'Pricing', external: true },
    { href: 'https://jungler.ai/playbooks', label: 'Playbooks', external: true },
    { href: 'https://jungler.ai/api', label: 'API', external: true },
    { href: 'https://jungler.ai/faq', label: 'FAQ', external: true },
    { href: '/docs/intro', label: 'Docs' },
];

const legal = [
    { href: 'https://jungler.ai/privacy', label: 'Privacy', external: true },
    { href: 'https://jungler.ai/terms', label: 'Terms', external: true },
];

const socials = [
    { href: 'https://www.linkedin.com/company/junglerai/', label: 'LinkedIn', external: true },
    { href: 'https://x.com/jungler_ai', label: 'X', external: true },
];

function LinkColumn({ title, links }: { title: string; links: { href: string; label: string; external?: boolean }[] }) {
    return (
        <div>
            <p className={styles.columnTitle}>{title}</p>
            <div className={styles.columnLinks}>
                {links.map(({ href, label, external }) => (
                    <a
                        key={label}
                        href={href}
                        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                        className={styles.link}
                    >
                        {label}
                    </a>
                ))}
            </div>
        </div>
    );
}

export default function Footer(): JSX.Element {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.top}>
                    <a href="/" className={styles.logo}>
                        <img src="/img/logo.svg" alt="Jungler" height={22} />
                    </a>
                    <div className={styles.columns}>
                        <LinkColumn title="Resources" links={resources} />
                        <LinkColumn title="Legal" links={legal} />
                        <LinkColumn title="Socials" links={socials} />
                    </div>
                </div>
                <div className={styles.bottom}>
                    <p className={styles.copyright}>© {new Date().getFullYear()} Jungler</p>
                </div>
            </div>
        </footer>
    );
}
