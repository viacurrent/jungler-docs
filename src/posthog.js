import posthog from 'posthog-js';
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';
import siteConfig from '@generated/docusaurus.config';

const POSTHOG_KEY = siteConfig.customFields?.posthogKey;
const POSTHOG_HOST = 'https://eu.i.posthog.com';

const enabled =
    ExecutionEnvironment.canUseDOM &&
    process.env.NODE_ENV === 'production' &&
    Boolean(POSTHOG_KEY);

if (enabled) {
    // Cookieless-by-default config for the docs site (same posture as jungler.ai):
    //   - cookieless_mode: 'always' -> server-side daily-salted hash, stable within a day
    //   - autocapture / heatmaps / replay / surveys off
    //   - $pageview is fired manually below + on route change
    posthog.init(POSTHOG_KEY, {
        api_host: POSTHOG_HOST,
        capture_pageview: false,
        cookieless_mode: 'always',
        autocapture: false,
        capture_heatmaps: false,
        disable_session_recording: true,
        disable_surveys: true,
    });

    posthog.capture('$pageview');
}

export function onRouteDidUpdate({ location, previousLocation }) {
    if (enabled && previousLocation && location.pathname !== previousLocation.pathname) {
        posthog.capture('$pageview');
    }
}
