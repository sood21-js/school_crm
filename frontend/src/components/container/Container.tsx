import React from 'react';
import { Menu } from './menu/Menu';
import Content from './content/Content';
import { Role } from '#src/libs/providers/Role';

export const Container: React.FC = () => {
    return (
        <Role>
            <div className="container">
                <Menu />
                <Content />
            </div>
        </Role>
    )
}
