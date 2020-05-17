import React from 'react';
import './nav-container.scss';

interface LinkList {
    links: string[];
}

export const NavContainer: React.FC<LinkList> = ({ links }) => (
    <div className="nav-container">
        <ul className="nav-list">
            {links.map((link) => (
                <li key={link}>
                    <a href="#">{link}</a>
                </li>
            ))}
        </ul>
    </div>
);
