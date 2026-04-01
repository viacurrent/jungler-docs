import React from 'react';
import { useColorMode } from '@docusaurus/theme-common';
import styles from './styles.module.css';

type ThemeMode = 'light' | 'system' | 'dark';

function SunIcon() {
    return (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="5" />
            <line x1="12" y1="1" x2="12" y2="3" />
            <line x1="12" y1="21" x2="12" y2="23" />
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
            <line x1="1" y1="12" x2="3" y2="12" />
            <line x1="21" y1="12" x2="23" y2="12" />
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </svg>
    );
}

function MonitorIcon() {
    return (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
            <line x1="8" y1="21" x2="16" y2="21" />
            <line x1="12" y1="17" x2="12" y2="21" />
        </svg>
    );
}

function MoonIcon() {
    return (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
    );
}

function getStoredMode(): ThemeMode {
    if (typeof window === 'undefined') return 'system';
    return (localStorage.getItem('jungler-theme-mode') as ThemeMode) || 'system';
}

export default function ColorModeToggle(): JSX.Element {
    const { colorMode, setColorMode } = useColorMode();
    const [mode, setMode] = React.useState<ThemeMode>('system');

    React.useEffect(() => {
        setMode(getStoredMode());
    }, []);

    const handleSetMode = (m: ThemeMode) => {
        setMode(m);
        localStorage.setItem('jungler-theme-mode', m);

        if (m === 'system') {
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            setColorMode(prefersDark ? 'dark' : 'light');
        } else {
            setColorMode(m);
        }
    };

    // Listen for system preference changes when in system mode
    React.useEffect(() => {
        if (mode !== 'system') return;
        const mq = window.matchMedia('(prefers-color-scheme: dark)');
        const handler = (e: MediaQueryListEvent) => {
            setColorMode(e.matches ? 'dark' : 'light');
        };
        mq.addEventListener('change', handler);
        return () => mq.removeEventListener('change', handler);
    }, [mode, setColorMode]);

    const modes: { key: ThemeMode; icon: React.ReactNode; label: string }[] = [
        { key: 'light', icon: <SunIcon />, label: 'Light mode' },
        { key: 'system', icon: <MonitorIcon />, label: 'System mode' },
        { key: 'dark', icon: <MoonIcon />, label: 'Dark mode' },
    ];

    return (
        <div className={styles.toggle} role="radiogroup" aria-label="Color mode">
            {modes.map(({ key, icon, label }) => (
                <button
                    key={key}
                    className={`${styles.btn} ${mode === key ? styles.active : ''}`}
                    onClick={() => handleSetMode(key)}
                    aria-label={label}
                    aria-checked={mode === key}
                    role="radio"
                    type="button"
                >
                    {icon}
                </button>
            ))}
        </div>
    );
}
