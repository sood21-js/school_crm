import React, {useState} from 'react';

import { ClassroomsTable } from './ClassroomsTable';

export type TMode = 'classroomsTable' | 'classroomForm'
type TClassrooms = {}

export const Classrooms: React.FC<TClassrooms> = () =>{
    const [mode, setMode] = useState<TMode>('classroomsTable')
    const clickHandler = (mode: any) => {}
    return (
        <>
            {mode === 'classroomsTable' &&
            <ClassroomsTable changeMode={clickHandler} />}
        </>
    )
}