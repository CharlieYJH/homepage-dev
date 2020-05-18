import React from 'react';
import { NavContainer } from './NavContainer';
import { ThemeIcon } from './ThemeIcon';
import './header.scss';

const navlinks = ['about me', 'experience', 'contact me'];

export const Header: React.FC<{}> = () => (
    <div className="header-container">
        <NavContainer links={navlinks} />
        <ThemeIcon />
    </div>
);
