import React, { useState, useRef, useEffect, createRef } from 'react';
import { Description } from './components/Description';
import styles from './projects.module.scss';

const projects = [
  {
    title: 'FortiClient Linux',
    description: `Fortinet's Fabric Agent which provides security and compliance of endpoints within a network by integrating with its Security Fabric.`,
    link: 'https://www.fortinet.com/products/endpoint-security/forticlient',
  },
  {
    title: 'Libcumat',
    description: `An intuitive GPU matrix library based on CUDA that offers component-wise arithmetic operations, matrix multiplcations/transposes, and a variety of different math operations.`,
    link: 'https://github.com/CharlieYJH/libcumat',
  },
  {
    title: 'Sailbot',
    description: `UBC Sailbot's autonomous sailboat which aims to navigate oceans without human assistance or feedback.`,
    link: 'https://www.ubcsailbot.org/',
  },
  {
    title: 'Kana Trainer',
    description:
      'An easy-to-use trainer used to practice Japanese Kana symbols with the ability to see user scores and areas of improvement.',
    link: 'https://www.charlieyin.com/kanatrainer',
  },
  {
    title: 'Self-Balance Platform',
    description:
      'An Arduino-driven self-balancing platform made for my ECE capstone project which corrects angular deviations using a pair of motion sensors.',
    link: 'https://www.charlieyin.com/kanatrainer',
  },
];

export const Projects: React.FC<{}> = () => {
  const [active, setActive] = useState(0);
  const [height, setHeight] = useState(0);
  const itemRefs = useRef([]);

  itemRefs.current = Array(projects.length)
    .fill(null)
    .map((_, i) => itemRefs.current[i] || createRef());

  // Set the description container height based on the description
  // with the max height because it won't be set since they're all
  // absolute DIVs
  useEffect(() => {
    let max = 0;
    for (let i = 0; i < itemRefs.current.length; i++) {
      if (!itemRefs.current[i].current) {
        continue;
      }

      const height = itemRefs.current[i].current.getBoundingClientRect().height;

      if (height > max) {
        max = height;
      }
    }

    setHeight(max);
  }, [height]);

  const containerHeight = {
    height: height.toString() + 'px',
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>projects</div>
      <div className={styles.projects}>
        <div className={styles.projectTitles}>
          {projects.map((project, i) => (
            <div key={i}>
              <div
                className={
                  active === i ? styles.projectTitleActive : styles.projectTitleInactive
                }
                onClick={(): void => setActive(i)}
              >
                {project.title}
              </div>
              <div className={active === i ? styles.arrowActive : styles.arrowInactive} />
            </div>
          ))}
        </div>
        <div className={styles.descriptionContainer} style={containerHeight}>
          {projects.map((project, i) => (
            <div
              key={i}
              ref={itemRefs.current[i]}
              className={
                active === i ? styles.descriptionActive : styles.descriptionInactive
              }
            >
              <Description description={project.description} link={project.link} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
