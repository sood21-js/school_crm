import React from 'react';
import { ClassroomsPage } from './pages/classroom/Classroom';
import { LibaryPage } from './pages/libary/Libary';
import { ManagementPage } from './pages/management/Management';
import { ProfilePage } from './pages/profile/Profile';
import { ReportsPage } from './pages/reports/Reports';
import { SettingsPage } from './pages/settings/Settings';
import { TasksPage } from './pages/tasks/Tasks';

export type TPage = {
    component: React.ReactNode
    path: string,
    exact?: boolean,
}

export const pages: TPage[] = [
    {   
        component: <ProfilePage />,
        path: '/',
        exact: true,
    },
    {   
        component: <ClassroomsPage />,
        path: '/classroom'
    },
    {   
        component: <LibaryPage />,
        path: '/libary'
    },
    {   
        component: <ManagementPage />,
        path: '/management'
    },
    {   
        component: <ReportsPage />,
        path: '/reports'
    },
    {   
        component: <SettingsPage />,
        path: '/settings'
    },
    {   
        component: <TasksPage />,
        path: '/tasks'
    }
]