import React from 'react';
import { NavContainer } from './NavContainer';

const navlinks = ['about me', 'experience', 'contact me'];

export const Header: React.FC<{}> = () => (
    <div>
        <NavContainer links={navlinks} />
    </div>
);
