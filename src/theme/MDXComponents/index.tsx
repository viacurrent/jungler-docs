import React from 'react';
import MDXComponents from '@theme-original/MDXComponents';
import { Search, Sparkles, BookOpen, Code } from 'lucide-react';

function Icon({ children, ...props }: any) {
    return (
        <span style={{ display: 'inline-flex', verticalAlign: 'middle', marginRight: '8px' }}>
            {children}
        </span>
    );
}

function SearchIcon() { return <Icon><Search size={20} color="var(--brand-green)" /></Icon>; }
function SparklesIcon() { return <Icon><Sparkles size={20} color="var(--brand-green)" /></Icon>; }
function BookOpenIcon() { return <Icon><BookOpen size={20} color="var(--brand-green)" /></Icon>; }
function CodeIcon() { return <Icon><Code size={20} color="var(--brand-green)" /></Icon>; }

export default {
    ...MDXComponents,
    SearchIcon,
    SparklesIcon,
    BookOpenIcon,
    CodeIcon,
};
