import React, { JSX, useEffect, useState } from 'react';
import { useColorMode } from '@docusaurus/theme-common';
import { Sun, Monitor, Moon } from 'lucide-react';
import styles from './styles.module.css';

type ThemeMode = 'light' | 'system' | 'dark';

const STORAGE_KEY = 'theme-preference';
const MODES: ThemeMode[] = ['light', 'system', 'dark'];
const ICONS: Record<ThemeMode, React.ComponentType<{ size?: number }>> = {
    light: Sun,
    system: Monitor,
    dark: Moon,
};

function getSystemMode(): 'light' | 'dark' {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export default function ColorModeToggle(): JSX.Element {
    const { setColorMode } = useColorMode();
    const [mode, setMode] = useState<ThemeMode>('system');

    const applyMode = (m: ThemeMode) => {
        const effective = m === 'system' ? getSystemMode() : m;
        document.documentElement.setAttribute('data-theme-switching', '');
        setColorMode(effective);
        if (m === 'system') {
            // Clear Docusaurus's persisted theme so its boot script falls back to
            // prefers-color-scheme on the next load (avoids a flash if the OS changed).
            localStorage.removeItem('theme');
        }
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                document.documentElement.removeAttribute('data-theme-switching');
            });
        });
    };

    useEffect(() => {
        const stored = localStorage.getItem(STORAGE_KEY) as ThemeMode | null;
        const initial = stored && MODES.includes(stored) ? stored : 'system';
        setMode(initial);
        applyMode(initial);
    }, []);

    useEffect(() => {
        if (mode !== 'system') return;
        const mq = window.matchMedia('(prefers-color-scheme: dark)');
        const handler = () => applyMode('system');
        mq.addEventListener('change', handler);
        return () => mq.removeEventListener('change', handler);
    }, [mode]);

    const handleSwitch = (m: ThemeMode) => {
        setMode(m);
        localStorage.setItem(STORAGE_KEY, m);
        applyMode(m);
    };

    return (
        <div className={styles.toggle} role="radiogroup" aria-label="Color mode">
            {MODES.map((m) => {
                const Icon = ICONS[m];
                return (
                    <button
                        key={m}
                        className={`${styles.btn} ${mode === m ? styles.active : ''}`}
                        onClick={() => handleSwitch(m)}
                        aria-label={`${m} mode`}
                        aria-checked={mode === m}
                        role="radio"
                        type="button"
                    >
                        <Icon size={12} />
                    </button>
                );
            })}
        </div>
    );
}
