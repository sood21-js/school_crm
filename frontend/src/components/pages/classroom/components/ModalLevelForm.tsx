import React, { useEffect } from 'react';

import { Modal } from '#src/libs/ui/Modal';
import { Button } from '#src/libs/ui/Button';
import { useInput } from '#src/libs/hooks/useInput';
import { Grid } from '#src/libs/ui/Grid';
import { Input } from '#src/libs/ui/Input';
import { useDispatch, useSelector } from 'react-redux';
import { clearLevel, fetchLevel } from '#src/redux/actions/level';
import { AppStateType, TState } from '#src/redux/types/common_types';
import { showAlert } from '#src/redux/actions/alert';
import { ILevel, LevelKeys } from '#src/redux/types/level';

type TLevels = {
    level?: ILevel
    visible: boolean
    onClose: () => void
}

export const ModalLevelForm: React.FC<TLevels> = ({
    level,
    visible,
    onClose
}: TLevels) => {
    const method = level ? 'put' : 'add'
    const dispatch = useDispatch()
    const { isFetching, data } = useSelector((state: AppStateType): TState => state.level)

    const fieldData = {
        name: useInput(level?.name || '', LevelKeys.name, {required: true, maxLength: 20}),
    }

    const saveHandler = () => {
        const newLevel = {}
        Object.keys(fieldData).forEach((key) => {
            (newLevel as any)[key] = (fieldData as any)[key].getValue()
        })
        dispatch(fetchLevel({ data: newLevel, method }))
    }

    useEffect(() => {
        dispatch(fetchLevel())
    }, [dispatch])

    useEffect(() => {
        if (!isFetching && data?.success) {
            onClose()
            dispatch(fetchLevel())
        }
    }, [data, dispatch, isFetching, onClose])
    return (
        <Modal
            open={visible}
            onClose={onClose}
        >
            <Grid modifier='module__border module__name'>
                <div className='module__input'>
                    <Input
                        name={LevelKeys.name}
                        placeholder="Введите название уровня"
                        {...fieldData.name.bind}
                    />
                </div>
            </Grid>
            <Grid
                gridTemplateColumns='1fr 1fr'
                gridColumnGap='0.5rem'
                justifyContent='flex-end'
            >
                <Button
                    disabled={isFetching}
                    isFetching={isFetching}
                    className='ml05'
                    onClick={saveHandler}
                    variant='outlined'
                    size='small'
                    content="Сохранить"
                />
                <Button
                    disabled={isFetching}
                    onClick={onClose}
                    variant='outlined'
                    size='small'
                    content="Назад"
                />
            </Grid>
        </Modal>
    )
}