import React, {useState} from 'react';

import { Tabs, ITabs, IBtn } from '#src/libs/components/Tabs';
import { Users } from './users/components/Users';
import { CommonSettings } from './common_settings/CommonSettings';
import { LogsList } from './logs_list/LogsList';

const changeButtons = (buttons: Array<IBtn>, mode: string) => {
    return buttons.map((btn: IBtn) => {
        const newButton: IBtn = {
            ...btn,
            options: { size: 'small'}
        }
        if (btn.name === mode) {
            newButton.options.color = 'primary',
            newButton.options.variant = 'contained'
        }
        return newButton
    })
}

export function SettingsPage(){

    const DEFAULT_TABS: ITabs = {
        btns: [
            {
                title: 'Список пользователей', 
                name: 'users',
                options: {
                    size: 'small', 
                    color: 'primary', 
                    variant: 'contained',
                }
            },
            {title: 'Общие настройки', name: 'common_settings', options: {size: 'small'}},
            {title: 'Логи операций', name: 'logs', options: {size: 'small'}}
        ],
        options: {},
        onClick: () => {},
    }
    const [tabs, setTabs] = useState<ITabs>(DEFAULT_TABS)
    const [mode, setMode] = useState<String>('users')
    
    const changeHandler = (mode: string) => {
        setMode(mode)
        const newTanbs: ITabs = {
            ...tabs,
            btns: changeButtons(tabs.btns, mode)
        }
        setTabs(newTanbs)
    }

    const disableButtons = (disabled: boolean) => {
        setTabs({
            ...tabs,
            btns: tabs.btns.map((btn: IBtn) => {
                return {...btn, options: {...btn.options,disabled}} as IBtn
            })
        })
    }

    return (
        <>
            <h1>Настройки сервиса</h1>
            <hr/>
            <Tabs {...tabs} onClick={changeHandler}/>

            {mode === 'users' && <Users disableButtons={disableButtons}/>}
            {mode === 'common_settings' && <CommonSettings />}
            {mode === 'logs' && <LogsList />}
        </>
    )
}