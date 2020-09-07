import React from 'react';

export const Module: React.FC = ({children}: any) => {
    console.log(children)
    return (
        <div className="module">
            {children}
        </div>
    )
}