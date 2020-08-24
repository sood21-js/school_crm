import React from 'react';

type TMenu = unknown

export const Menu: React.FC<TMenu> = () => {
    const Num = 12
    return (
        <div className="container">
            {Num}
        </div>
    )
}