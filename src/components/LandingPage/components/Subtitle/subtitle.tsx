import React, { useContext } from 'react';
import { SvgTitle } from './svg-title';
import { Carousel } from '../../../Carousel';
import { ThemeContext } from '../../../../providers/ThemeProvider';
import styles from './subtitle.module.scss';

interface Title {
  titles: string[];
}

export const Subtitle: React.FC<Title> = ({ titles }) => {
  const context = useContext(ThemeContext);
  return (
    <div className={styles.container}>
      <div className={context.lightTheme ? styles.spacerLight : styles.spacerDark}>
        <SvgTitle title={''} />
      </div>
      <Carousel
        className={styles.carousel}
        scrollTimeout={3000}
        transitionDuration={300}
        classActive={
          context.lightTheme
            ? styles.carouselItemActiveLight
            : styles.carouselItemActiveDark
        }
        classInactive={
          context.lightTheme
            ? styles.carouselItemInactiveLight
            : styles.carouselItemInactiveDark
        }
        overflow={2}
      >
        {titles.map((title) => (
          <SvgTitle key={title} title={title} className={styles.carouselItem} />
        ))}
      </Carousel>
    </div>
  );
};
