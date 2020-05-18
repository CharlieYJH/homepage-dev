import React, { useContext } from 'react';
import { ThemeContext } from '../../../providers/ThemeProvider';
import './nav-container.scss';

interface LinkList {
    links: string[];
}

export const NavContainer: React.FC<LinkList> = ({ links }) => (
    <div
        className={`nav-container${
            useContext(ThemeContext).useLight ? '' : ' dark'
        }`}
    >
        <ul className="nav-list">
            {links.map((link) => (
                <li key={link}>
                    <a href="#">
                        <div>{link}</div>
                    </a>
                </li>
            ))}
        </ul>
    </div>
);
