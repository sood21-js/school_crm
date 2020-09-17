import React, { useEffect, useState } from 'react';

export interface IMsg {
    text: string,
    status: string,
    show: boolean
}

export const Message: React.FC<IMsg> = ({text, status, show}: IMsg) => {
    const [showMsg, setShowMsg] = useState<boolean>(show)
    useEffect(() => {
        console.log(show)
        setShowMsg(show)
        if (show){
            const timer = setTimeout(() => {
                console.log('запускаю таймер')
                setShowMsg(false)
            }, 5000)
            return () => clearTimeout(timer)
        }
    }, [show])

    console.log(text, status, show, showMsg)
    return (
        <>
            {showMsg && 
            <div className={`module__message ${status === 'primary'
                ? 'module__message__primary'
                : 'module__message__error'}`
            }>
                {text}
            </div>}
        </>
    )
}