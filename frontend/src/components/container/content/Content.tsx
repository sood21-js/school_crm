import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { compose } from "redux";
import { withRouter } from 'react-router-dom';

import { SettingsPage } from '../../pages/settings/Settings';
import { ClassroomsPage } from '../../pages/classroom/Classroom';
import { LibaryPage } from '../../pages/libary/Libary';
import { ManagementPage } from '../../pages/management/Management';
import { ReportsPage } from '../../pages/reports/Reports';
import { TasksPage } from '../../pages/tasks/Tasks';
import { ProfilePage } from '../../pages/profile/Profile';

const Content: React.FC = () => {
    return (
        <div className="content">
            <Switch>
                <Route exact path="/classroom" >
                    <ClassroomsPage />
                </Route>

                <Route path="/libary" >
                    <LibaryPage />
                </Route>

                <Route path="/management" >
                    <ManagementPage />
                </Route>

                <Route path="/reports" exact>
                    <ReportsPage />
                </Route>

                <Route path="/settings" exact>
                    <SettingsPage />
                </Route>

                <Route path="/tasks" exact>
                    <TasksPage />
                </Route>
                
                <Route exact path="/">
                    <ProfilePage />
                </Route>
                <Redirect to="/" />
            </Switch>
        </div>
    )
}

export default compose(withRouter)(Content)