import React from 'react';

import { ClassroomsPage } from './pages/classroom/ClassroomsPage';
import { LibaryPage } from './pages/libary/Libary';
import { ManagementPage } from './pages/management/Management';
import { ProfilePage } from './pages/profile/Profile';
import { ReportsPage } from './pages/reports/Reports';
import { SettingsPage } from './pages/settings/Settings';
import { TasksPage } from './pages/tasks/Tasks';

import { FULL_ACCESS, TFullAccess, TRole } from '#src/redux/types/role';

export type TPage = {
    component: React.ReactNode
    path: string
    exact?: boolean
    role_access: TRole[] | TFullAccess
    menu: {
        title: string
        icon: string
    }
}

export const pages: TPage[] = [
    {
        component: <ProfilePage />,
        path: '/',
        exact: true,
        role_access: FULL_ACCESS,
        menu: {
            title: 'Профиль',
            icon: 'far fa-user-circle'
        }
    },
    {
        component: <ClassroomsPage />,
        path: '/classroom',
        role_access: FULL_ACCESS,
        menu: {
            title: 'Классы',
            icon: 'fas fa-pencil-ruler'
        }
    },
    {
        component: <LibaryPage />,
        path: '/libary',
        role_access: FULL_ACCESS,
        menu: {
            title: 'База знаний',
            icon: 'fas fa-book-reader'
        }
    },
    {
        component: <ManagementPage />,
        path: '/management',
        role_access: ['admin', 'senior'],
        menu: {
            title: 'Управление',
            icon: 'fas fa-pencil-ruler'
        }
    },
    {
        component: <ReportsPage />,
        path: '/reports',
        role_access: FULL_ACCESS,
        menu: {
            title: 'Отчеты',
            icon: 'fas fa-chart-line'
        }
    },
    {
        component: <SettingsPage />,
        path: '/settings',
        role_access: ['admin'],
        menu: {
            title: 'Администрация',
            icon: 'fas fa-cogs'
        }
    },
    {
        component: <TasksPage />,
        path: '/tasks',
        role_access: FULL_ACCESS,
        menu: {
            title: 'Задания',
            icon: 'fas fa-tasks'
        }
    }
]