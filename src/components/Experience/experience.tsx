import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { ExperienceItem } from './components/ExperienceItem';
import { useScrollPosition } from '../../hooks/ScrollPosition';
import styles from './experience.module.scss';

const entries = [
  {
    title: 'Fortinet',
    subtitle: 'Software Development Team Lead',
    content: [
      'Managed the FortiClient Linux development team and helped team members improve their abilities',
      'Analyzed product requirements and designed solutions to successfully deliver crucial features',
      'Participated in cross-team discussions to evaluate project feasibilities and identify potential issues',
      'Balanced multiple projects while ensuring high code quality and on-time completion of requirements',
    ],
    from: '2021',
    to: 'present',
  },
  {
    title: 'Fortinet',
    subtitle: 'Software Development Engineer I - II',
    content: [
      'Implemented a reliable database daemon in C++ which serves data to local processes via REST API',
      'Designed a fault-tolerant and fast webserver for log aggregation which can handle high data volumes',
      'Improved the stability of FortiClient Linux significantly by fixing critical issues raised by various users',
      'Stayed up-to-date with and learned new technologies that can better improve product performance',
    ],
    from: '2018',
    to: '2021',
  },
  {
    title: 'UBC Sailbot',
    subtitle: 'Software Developer',
    content: [
      'Researched and taught 3 other team members about the CAN bus and the CANopen protocol',
      'Planned the control system architecture with a team of 5 ensuring easy scaling and maintenance',
      'Developed and debugged embedded firmware for the STM32F4 microcontroller using Linux tools',
      'Implemented reliable data transfer in a real-time system for up to 127 separate data nodes using C',
    ],
    from: '2016',
    to: '2017',
  },
];

export const Experience: React.FC<{}> = () => {
  const fromTags: string[] = [];
  const toTags: string[] = [];

  entries.forEach((entry) => {
    fromTags.push(entry.from);
    toTags.push(entry.to);
  });

  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [active, setActive] = useState({ from: fromTags[0], to: toTags[0] });

  const setActiveTags = (pos: number): void => {
    let idx = 0;

    if (pos > 2500) {
      idx = 1;
    }

    setActive({ from: fromTags[idx], to: toTags[idx] });
  };

  useScrollPosition(
    (currpos: { x: number; y: number }) => setPos(currpos),
    [pos],
    document.getElementById('root'),
    50
  );

  useEffect(() => setActiveTags(Math.abs(pos.y)), [pos]);

  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <Sidebar
          fromTags={fromTags}
          toTags={toTags}
          activeFrom={active.from}
          activeTo={active.to}
        />
      </div>
      <div className={styles.contentContainer}>
        <div className={styles.content}>
          {entries.map((entry, i) => (
            <ExperienceItem
              key={i}
              title={entry.title}
              subtitle={entry.subtitle}
              content={entry.content}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
