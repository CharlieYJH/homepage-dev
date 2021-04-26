import React, { useState } from 'react';
import classnames from 'classnames';
import styles from './profile-info.module.scss';

export const ProfileInfo: React.FC<{}> = () => {
  const pages = [
    [
      {
        question: `Who am I?`,
        answer: `I’m Charlie Yin, a software developer currently based in Vancouver, BC, Canada.`,
      },
      {
        question: `What do I do?`,
        answer: `I’m currently working at Fortinet as a software development team lead for one of our product’s Linux team.`,
      },
      {
        question: `What's my expertise?`,
        answer: `I specialise in backend development for applications running on Linux environments. My languages of choice are C and C++, but I also have a good working knowledge of Golang.`,
      },
      {
        question: `Any other interests?`,
        answer: `I’m a big fan of music, especially jazz. I also like to dabble in design sometimes, like this website you’re looking at right now.`,
      },
    ],
    [
      {
        question: `Languages I know`,
        answer: `C++, C, Golang, Bash, JavaScript/TypeScript`,
      },
      {
        question: `Technologies and frameworks I've used`,
        answer: `Docker, Linux, OpenSSL, CMake, Git, SVN, React, Node.js, Elasticsearch`,
      },
      {
        question: `Protocols and standards that I'm familiar with`,
        answer: `OSI Model, TCP/IP, UDP, TLS, HTTP/HTTPS, REST API, Protocol Buffers, Flatbuffers`,
      },
      {
        question: `Other general knowledge I have`,
        answer: `Backend development, daemon development, Linux kernel modules, multithreading and concurrency, computer networks`,
      },
    ],
  ];

  const [page, setPage] = useState(0);

  return (
    <div className={styles.container}>
      <div className={styles.title}>about me</div>
      <div className={styles.dotsContainer}>
        {[...Array(pages.length)].map((x, i) => (
          <div
            key={i}
            className={classnames(styles.dot, i === page ? styles.dotActive : '')}
            onClick={(): void => setPage(i)}
          />
        ))}
      </div>
      <div className={styles.info}>
        {pages.map((info, i) => (
          <div
            key={i}
            className={classnames(
              styles.entryContainer,
              page !== i ? styles.entryInactive : ''
            )}
          >
            {info.map((entry) => (
              <div key={entry.question} className={styles.entry}>
                <div className={styles.question}>{entry.question}</div>
                <div className={styles.answer}>{entry.answer}</div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
