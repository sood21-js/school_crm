import React, {useState} from 'react';

import { Tabs, ITabs, IBtn, changeButtons } from '#src/libs/ui/Tabs';
import { Users } from './components/Users';

import { CommonSettings } from './components/CommonSettings';
import { LogsList } from './components/LogsList';
import { DEFAULT_TABS } from './config/tab';

export function SettingsPage(){

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