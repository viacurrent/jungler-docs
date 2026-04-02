import { themes as prismThemes } from 'prism-react-renderer';

const config = {
    title: 'Jungler Docs',
    tagline: '',
    favicon: 'img/favicon.ico',

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

    plugins: ['./plugins/raw-docs.js'],

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
            },
        ],
    ],

    themeConfig: {
        image: 'img/jungler-social-card.jpg',
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
                    value: '<div class="navbar__right-group"><div class="navbar__toggle-slot" id="navbar-toggle-slot"></div><div class="navbar__divider"></div><a href="https://app.jungler.ai/login" target="_blank" rel="noopener noreferrer" class="navbar__item--login">Log in</a><a href="https://app.jungler.ai/register" target="_blank" rel="noopener noreferrer" class="navbar__item--cta">Start for free</a></div>',
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
