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
                    type: 'html',
                    position: 'right',
                    value: '<div class="navbar__buttons"><a href="https://app.jungler.ai/login" target="_blank" rel="noopener noreferrer" class="navbar__item--login">Log in</a><a href="https://app.jungler.ai/register" target="_blank" rel="noopener noreferrer" class="navbar__item--cta">Start for free</a></div>',
                },
            ],
        },
        footer: {
            links: [
                {
                    title: 'Resources',
                    items: [
                        {
                            label: 'Documentation',
                            to: '/docs/intro',
                        },
                        {
                            label: 'API Reference',
                            to: '/docs/quick-start',
                        },
                    ],
                },
                {
                    title: 'Legal',
                    items: [
                        {
                            label: 'Privacy Policy',
                            href: 'https://jungler.ai/privacy',
                        },
                        {
                            label: 'Terms of Service',
                            href: 'https://jungler.ai/terms',
                        },
                    ],
                },
                {
                    title: 'Socials',
                    items: [
                        {
                            label: 'LinkedIn',
                            href: 'https://linkedin.com/company/jungler',
                        },
                    ],
                },
            ],
            copyright: `© ${new Date().getFullYear()} Jungler`,
        },
        prism: {
            theme: prismThemes.github,
            darkTheme: prismThemes.dracula,
        },
    },
};

export default config;
