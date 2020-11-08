import { ITabs } from "#src/libs/ui/Tabs";

export const DEFAULT_TABS: ITabs = {
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