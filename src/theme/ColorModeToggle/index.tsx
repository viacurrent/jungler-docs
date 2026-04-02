import React from 'react';
import { useColorMode } from '@docusaurus/theme-common';
import { Sun, Moon } from 'lucide-react';
import styles from './styles.module.css';

type ThemeMode = 'light' | 'dark';

export default function ColorModeToggle(): JSX.Element {
    const { colorMode, setColorMode } = useColorMode();

    const handleSwitch = (mode: ThemeMode) => {
        document.documentElement.setAttribute('data-theme-switching', '');
        setColorMode(mode);
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                document.documentElement.removeAttribute('data-theme-switching');
            });
        });
    };

    const modes: { key: ThemeMode; icon: React.ReactNode; label: string }[] = [
        { key: 'light', icon: <Sun size={12} />, label: 'Light mode' },
        { key: 'dark', icon: <Moon size={12} />, label: 'Dark mode' },
    ];

    return (
        <div className={styles.toggle} role="radiogroup" aria-label="Color mode">
            {modes.map(({ key, icon, label }) => (
                <button
                    key={key}
                    className={`${styles.btn} ${colorMode === key ? styles.active : ''}`}
                    onClick={() => handleSwitch(key)}
                    aria-label={label}
                    aria-checked={colorMode === key}
                    role="radio"
                    type="button"
                >
                    {icon}
                </button>
            ))}
        </div>
    );
}
