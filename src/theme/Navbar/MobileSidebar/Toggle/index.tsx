import React, {type ReactNode} from 'react';
import {useNavbarMobileSidebar} from '@docusaurus/theme-common/internal';
import {Menu} from 'lucide-react';

export default function MobileSidebarToggle(): ReactNode {
    const {toggle, shown} = useNavbarMobileSidebar();
    return (
        <button
            onClick={toggle}
            aria-label="Toggle navigation bar"
            aria-expanded={shown}
            className="navbar__toggle clean-btn"
            type="button"
        >
            <Menu size={24} />
        </button>
    );
}
