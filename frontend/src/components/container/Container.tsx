import React from 'react';
import { Menu } from './menu/Menu';
import Content from './content/Content';

export const Container: React.FC = () => {
    return (
        <div className="container">
            <Menu />
            <Content />
        </div>
    )
}
