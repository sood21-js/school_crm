import { ITabs } from "#src/libs/ui/Tabs";

export const ClASSROOM_TABS: ITabs = {
    btns: [
        {
            title: 'Классы',
            name: 'classrooms',
            options: {
                size: 'small',
                color: 'primary',
                variant: 'contained',
            }
        },
        {title: 'Уровни', name: 'levels', options: {size: 'small'}}
    ],
    options: {},
    onClick: () => {},
}