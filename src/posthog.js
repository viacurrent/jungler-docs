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
    posthog.init(POSTHOG_KEY, {
        api_host: POSTHOG_HOST,
        session_recording: {
            sampleRate: 0.2,
        },
    });
}

export function onRouteDidUpdate({ location, previousLocation }) {
    if (enabled && previousLocation && location.pathname !== previousLocation.pathname) {
        posthog.capture('$pageview');
    }
}
