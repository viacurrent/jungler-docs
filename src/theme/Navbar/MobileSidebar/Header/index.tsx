import React, {type ReactNode} from 'react';
import {useNavbarMobileSidebar} from '@docusaurus/theme-common/internal';
import NavbarLogo from '@theme/Navbar/Logo';
import {X} from 'lucide-react';

export default function NavbarMobileSidebarHeader(): ReactNode {
    const mobileSidebar = useNavbarMobileSidebar();
    return (
        <div className="navbar-sidebar__brand">
            <NavbarLogo />
            <button
                type="button"
                aria-label="Close navigation"
                className="clean-btn navbar-sidebar__close"
                onClick={() => mobileSidebar.toggle()}
            >
                <X size={24} />
            </button>
        </div>
    );
}
