import React, {useState} from 'react';

import { ClASSROOM_TABS } from './config/tab';
import { Tabs, ITabs, changeButtons } from '#src/libs/ui/Tabs';
import { Classrooms } from './components/Classroms';
import { Levels } from './components/Levels';

export enum ClassroomPageMode {
    classrooms = 'classrooms',
    levels = 'levels'
}

export function ClassroomsPage(){
    const [mode, setMode] = useState<ClassroomPageMode>(ClassroomPageMode.classrooms)
    const [tabs, setTabs] = useState<ITabs>(ClASSROOM_TABS)

    const changeHandler = (mode: string) => {
        setMode(mode as ClassroomPageMode)
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

            {mode === ClassroomPageMode.classrooms && <Classrooms />}
            {mode === ClassroomPageMode.levels && <Levels />}
        </>
    )
}