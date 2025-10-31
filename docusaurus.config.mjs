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

    presets: [
        [
            'classic',
            {
                docs: {
                    sidebarPath: './sidebars.mjs',
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
            title: 'Jungler',
            logo: {
                alt: 'Jungler Logo',
                src: 'img/logo.svg',
            },
            items: [
                {
                    type: 'docSidebar',
                    sidebarId: 'tutorialSidebar',
                    position: 'left',
                    label: 'Docs',
                },
                {
                    href: 'https://github.com/viacurrent/jungler-docs',
                    label: 'GitHub',
                    position: 'right',
                },
            ],
        },
        footer: {
            style: 'dark',
            links: [
                {
                    title: 'Docs',
                    items: [
                        {
                            label: 'Getting Started',
                            to: '/docs/intro',
                        },
                    ],
                },
                {
                    title: 'Community',
                    items: [
                        {
                            label: 'GitHub',
                            href: 'https://github.com/viacurrent/jungler-docs',
                        },
                    ],
                },
            ],
            copyright: `Copyright © ${new Date().getFullYear()} Jungler. Built with Docusaurus.`,
        },
        prism: {
            theme: prismThemes.github,
            darkTheme: prismThemes.dracula,
        },
    },
};

export default config;
