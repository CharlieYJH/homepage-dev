import React from 'react';
import styles from './profile-info.module.scss';

export const ProfileInfo: React.FC<{}> = () => {
  const info = [
    {
      question: `Who am I?`,
      answer: `I’m Charlie Yin, a software developer currently based in Vancouver, BC, Canada.`,
    },
    {
      question: `What do I do?`,
      answer: `I’m currently working at Fortinet as a software development team lead for one of our product’s Linux team.`,
    },
    {
      question: `What's your expertise?`,
      answer: `I specialise in backend development for applications running on Linux environments. My languages of choice are C and C++, but I’ve also got a good working knowledge of Golang.`,
    },
    {
      question: `Any other interests?`,
      answer: `I’m a big fan of music, especially jazz. I also like to dabble in design sometimes, like this website you’re looking at right now.`,
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.title}>about me</div>
      <div className={styles.info}>
        {info.map((entry) => (
          <div key={entry.question} className={styles.entry}>
            <div className={styles.question}>{entry.question}</div>
            <div className={styles.answer}>{entry.answer}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
