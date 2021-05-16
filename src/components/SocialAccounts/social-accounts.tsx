import React from 'react';
import EmailIcon from '../../resources/images/email.svg';
import GitHubIcon from '../../resources/images/github.svg';
import LinkedInIcon from '../../resources/images/linkedin.svg';
import styles from './social-accounts.module.scss';

const accounts = [
  {
    name: 'E-Mail',
    href: 'mailto:charlieyinjunhao@hotmail.com',
    component: EmailIcon,
  },
  {
    name: 'GitHub',
    href: 'https://github.com/charlieyjh',
    component: GitHubIcon,
  },
  {
    name: 'LinkedIn',
    href: 'https://ca.linkedin.com/in/charlieyin',
    component: LinkedInIcon,
  },
];

export const SocialAccounts: React.FC<{}> = () => (
  <div className={styles.container}>
    <div className={styles.title}>Other places you can reach me at:</div>
    <div className={styles.linksContainer}>
      {accounts.map((account, i) => {
        const Component = account.component;
        return (
          <a
            key={i}
            href={account.href}
            target="_blank"
            rel="noreferrer"
            className={styles.link}
          >
            <Component className={styles.account} />
          </a>
        );
      })}
    </div>
  </div>
);
