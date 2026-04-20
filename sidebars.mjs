// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars = {
    tutorialSidebar: [
        'intro',
        {
            type: 'category',
            label: 'Guide',
            collapsed: false,
            items: [
                'how-it-works',
                'search-ideas',
                'search-syntax',
                'ai-filtering',
            ],
        },
        {
            type: 'category',
            label: 'Guide (Draft)',
            collapsed: false,
            items: [
                'guide/profile-monitoring',
                'guide/post-engagement',
                'guide/keyword-monitoring',
            ],
        },
        {
            type: 'category',
            label: 'Integrations',
            collapsed: false,
            items: [
                { type: 'doc', id: 'integrations/clay', className: 'sidebar-icon sidebar-icon-clay' },
                { type: 'doc', id: 'integrations/slack', className: 'sidebar-icon sidebar-icon-slack' },
                { type: 'doc', id: 'integrations/google-sheets', className: 'sidebar-icon sidebar-icon-sheets' },
                { type: 'doc', id: 'integrations/heyreach', className: 'sidebar-icon sidebar-icon-heyreach' },
                { type: 'doc', id: 'integrations/expandi', className: 'sidebar-icon sidebar-icon-expandi' },
                { type: 'doc', id: 'integrations/webhooks', className: 'sidebar-icon sidebar-icon-webhook' },
            ],
        },
        {
            type: 'category',
            label: 'API',
            collapsed: false,
            items: [
                'api/index',
                'quick-start',
                'api/workspaces',
                'api/signals',
                'api/posts',
                'api/engagers',
                'api/workbooks',
            ],
        },
    ],
};

export default sidebars;
