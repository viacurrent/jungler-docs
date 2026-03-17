import type { ReactNode } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
    const { siteConfig } = useDocusaurusContext();
    return (
        <header className={clsx('hero', styles.heroBanner)}>
            <div className={styles.heroBackground}>
                <img src="/img/jungler-orbit.png" alt="" className={styles.orbitImage} />
            </div>
            <div className="container">
                <Heading as="h1" className={styles.heroTitle}>
                    {siteConfig.title}
                </Heading>
                <div className={styles.buttons}>
                    <Link
                        className="button button--primary button--lg"
                        to="/docs/intro">
                        Explore →
                    </Link>
                    <Link
                        className="button button--secondary button--lg"
                        to="/docs/quick-start"
                        style={{ marginLeft: '1rem' }}>
                        Quick Start
                    </Link>
                </div>
            </div>
        </header>
    );
}

function FeatureCard({ title, description, iconSrc }: { title: string; description: string; iconSrc: string }) {
    return (
        <div className={styles.featureCard}>
            <div className={styles.featureIcon}>
                <img src={iconSrc} alt="" />
            </div>
            <h3>{title}</h3>
            <p>{description}</p>
        </div>
    );
}

function FeaturesSection() {
    return (
        <section className={styles.features}>
            <div className="container">
                <div className={styles.featuresGrid}>
                    <FeatureCard
                        iconSrc="/img/icon-search.svg"
                        title="Search Posts"
                        description="Filter posts by function, seniority level, company size, and industry."
                    />
                    <FeatureCard
                        iconSrc="/img/icon-workbooks.svg"
                        title="Extract Insights"
                        description="Create workbooks to collect engagement data, comments, and reactions from posts."
                    />
                    <FeatureCard
                        iconSrc="/img/icon-api.svg"
                        title="Simple API"
                        description="RESTful API with clear documentation and code examples in multiple languages."
                    />
                </div>
            </div>
        </section>
    );
}

export default function Home(): ReactNode {
    const { siteConfig } = useDocusaurusContext();
    return (
        <Layout
            title={`Welcome`}
            description="Social intelligence platform API documentation">
            <HomepageHeader />
            <FeaturesSection />
        </Layout>
    );
}
