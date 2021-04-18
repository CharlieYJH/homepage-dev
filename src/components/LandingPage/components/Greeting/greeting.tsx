import React from 'react';
import classnames from 'classnames';
import { Carousel } from '../../../Carousel';
import styles from './greeting.module.scss';

const titles = [
  'backend developer',
  'Linux programmer',
  'design enthusiast',
  'lifelong student',
];

export const Greeting: React.FC<React.HTMLAttributes<HTMLDivElement>> = (props) => {
  return (
    <div className={classnames(props.className, styles.container)}>
      <div className={styles.name}>{`Hi, I'm Charlie, a`}</div>
      <div className={styles.titleContainer}>
        <p>.</p>
        <div className={styles.carouselContainer}>
          <Carousel
            className={styles.carousel}
            scrollTimeout={3000}
            transitionDuration={200}
            overflow={0}
          >
            {titles.map((title) => (
              <div className={styles.title} key={title}>
                {title}
              </div>
            ))}
          </Carousel>
        </div>
      </div>
    </div>
  );
};
