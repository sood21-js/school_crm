import React, { useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { compose } from "redux";
import { withRouter } from 'react-router-dom';

import { pages, TPage } from '#src/components/pages.config';
import { RoleContext, TRoleContext } from '#src/libs/context/Role';

const Content: React.FC = () => {
    const  { role } = useContext<TRoleContext>(RoleContext)
    return (
        <div className="content">
            <Switch>
                {pages.map(({ component, role_access, ...args }: TPage) => {
                    if (role && role_access.includes(role)) {
                        return (
                            <Route {...args} key={args.path}>
                                {component}
                            </Route>
                        )
                    }
                })}
                <Redirect to='/' />
            </Switch>
        </div>
    )
}

export default compose(withRouter)(Content)