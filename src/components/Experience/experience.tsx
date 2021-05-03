import React from 'react';
import { Sidebar } from './components/Sidebar';
import { ExperienceItem } from './components/ExperienceItem';
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
  },
];

export const Experience: React.FC<{}> = () => {
  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <Sidebar />
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
