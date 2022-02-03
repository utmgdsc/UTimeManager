import React from 'react';
import clsx from 'clsx';
import styles from './HomepageFeatures.module.css';

const FeatureList = [
    {
        title: 'Easy to Use',
        Svg: require('../../static/img/projectboard.svg').default,
        description: (
            <>
                In just a few clicks, you can plan out your schedule for the week to follow!
            </>
        ),
    },
    {
        title: 'Focus on What Matters',
        Svg: require('../../static/img/focus.svg').default,
        description: (
            <>
                From your planned out time schedule, you can spend more time focusing on your studies!
            </>
        ),
    }
];

function Feature({Svg, title, description}) {
    return (
        <div className={clsx('col col--6')}>
            <div className="text--center">
                <Svg className={styles.featureSvg} alt={title}/>
            </div>
            <div className="text--center padding-horiz--md">
                <h3>{title}</h3>
                <p>{description}</p>
            </div>
        </div>
    );
}

export default function HomepageFeatures() {
    return (
        <section className={styles.features}>
            <div className="container">
                <div className="row">
                    {FeatureList.map((props, idx) => (
                        <Feature key={idx} {...props} />
                    ))}
                </div>
            </div>
        </section>
    );
}
