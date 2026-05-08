import { themes as prismThemes } from 'prism-react-renderer';

const posthogKey = process.env.NODE_ENV === 'production' ? process.env.POSTHOG_KEY : undefined;

const config = {
    title: 'Jungler Docs',
    tagline: '',
    favicon: 'img/favicon.svg',

    // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
    future: {
        v4: true, // Improve compatibility with the upcoming Docusaurus v4
    },

    url: 'https://docs.jungler.ai',
    baseUrl: '/',

    trailingSlash: false,

    // GitHub pages deployment config.
    organizationName: 'viacurrent',
    projectName: 'jungler-docs',

    onBrokenLinks: 'throw',

    i18n: {
        defaultLocale: 'en',
        locales: ['en'],
    },

    clientModules: posthogKey ? ['./src/posthog.js'] : [],

    customFields: posthogKey ? { posthogKey } : {},

    plugins: [
        './plugins/raw-docs.js',
        [
            '@docusaurus/plugin-client-redirects',
            {
                redirects: [
                    // Pre-refresh URLs under the old /docs/* prefix (before routeBasePath: '/' was set on 2026-04-02)
                    { from: '/docs/intro', to: '/' },
                    { from: '/docs/quick-start', to: '/api/quick-start' },
                    { from: '/docs/how-it-works', to: '/' },
                    { from: '/docs/ai-filtering', to: '/guide/keyword-monitoring' },
                    { from: '/docs/search-ideas', to: '/guide/keyword-monitoring' },
                    { from: '/docs/search-syntax', to: '/guide/keyword-monitoring' },
                    { from: '/docs/api', to: '/api' },
                    { from: '/docs/api/posts', to: '/api/posts' },
                    { from: '/docs/api/signals', to: '/api/signals' },
                    { from: '/docs/api/searches', to: '/api/signals' },
                    { from: '/docs/api/workbooks', to: '/api/workbooks' },
                    { from: '/docs/api/engagers', to: '/api/engagers' },
                    { from: '/docs/api/workspaces', to: '/api/workspaces' },
                    { from: '/docs/api/webhooks', to: '/integrations/webhooks' },

                    // Post-routeBasePath, pre-refresh URLs that now 404
                    { from: '/quick-start', to: '/api/quick-start' },
                    { from: '/how-it-works', to: '/' },
                    { from: '/ai-filtering', to: '/guide/keyword-monitoring' },
                    { from: '/search-ideas', to: '/guide/keyword-monitoring' },
                    { from: '/search-syntax', to: '/guide/keyword-monitoring' },
                    { from: '/api/webhooks', to: '/integrations/webhooks' },
                ],
            },
        ],
    ],

    presets: [
        [
            'classic',
            {
                docs: {
                    sidebarPath: './sidebars.mjs',
                    routeBasePath: '/',
                },
                blog: false, // Disable blog
                theme: {
                    customCss: './src/css/custom.css',
                },
                sitemap: {
                    changefreq: 'weekly',
                    priority: 0.5,
                    ignorePatterns: ['/search', '/404.html'],
                    filename: 'sitemap.xml',
                },
            },
        ],
    ],

    themeConfig: {
        image: 'img/jungler-social-card.png',
        colorMode: {
            respectPrefersColorScheme: true,
        },
        algolia: {
            appId: '61LGGO91N7',
            apiKey: '3d8a2523209b7d5057cd93b8f5aef146',
            indexName: 'jungler',
            contextualSearch: false,
        },
        navbar: {
            title: '',
            logo: {
                alt: 'Jungler',
                src: 'img/logo.svg',
                srcDark: 'img/logo-dark.svg',
            },
            items: [
                {
                    type: 'html',
                    position: 'right',
                    value: '<div class="navbar__right-group"><a href="https://app.jungler.ai/login" target="_blank" rel="noopener noreferrer" class="navbar__item--login">Log in</a><a href="https://app.jungler.ai/signup" target="_blank" rel="noopener noreferrer" class="navbar__item--cta">Start for free</a></div>',
                },
            ],
        },
        prism: {
            theme: prismThemes.github,
            darkTheme: prismThemes.oceanicNext,
        },
    },
};

export default config;
