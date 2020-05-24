import React from 'react';
import { SvgTitle } from './svg-title';
import { Carousel } from '../../../Carousel';
import styles from './subtitle.module.scss';

interface Title {
    titles: string[];
}

export const Subtitle: React.FC<Title> = ({ titles }) => (
    <div className={styles.container}>
        <div className={styles.title}>
            <div className={styles.spacer}>
                <SvgTitle title={''} />
            </div>
            <Carousel
                className={styles.carousel}
                scrollTimeout={3000}
                transitionDuration={300}
            >
                {titles.map((title) => (
                    <SvgTitle key={title} title={title} />
                ))}
            </Carousel>
        </div>
    </div>
);
