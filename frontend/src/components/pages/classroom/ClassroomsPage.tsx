import React, {useState} from 'react';

import { ClASSROOM_TABS } from './config/tab';
import { Tabs, ITabs, changeButtons } from '#src/libs/ui/Tabs';
import { Classrooms } from './components/Classroms';
import { Levels } from './components/Levels';

export type TMode = 'classrooms' | 'levels'

export function ClassroomsPage(){
    const [mode, setMode] = useState<TMode>('classrooms')
    const [tabs, setTabs] = useState<ITabs>(ClASSROOM_TABS)

    const changeHandler = (mode: any) => {
        setMode(mode)
        const newTanbs: ITabs = {
            ...tabs,
            btns: changeButtons(tabs.btns, mode)
        }
        setTabs(newTanbs)
    }

    return (
        <>
            <h1>Настройки классов</h1>
            <hr/>

            <Tabs {...tabs} onClick={changeHandler}/>

            {mode === 'classrooms' && <Classrooms />}
            {mode === 'levels' && <Levels />}
        </>
    )
}