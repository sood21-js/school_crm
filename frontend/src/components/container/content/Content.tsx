import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { compose } from "redux";
import { withRouter } from 'react-router-dom';

import { pages, TPage } from '#src/components/pages.config';

const Content: React.FC = () => {
    return (
        <div className="content">
            <Switch>
                {pages.map(({ component, ...args }: TPage) => (
                    <Route {...args} key={args.path}>
                        {component}
                    </Route>
                ))}
                <Redirect to='/' />
            </Switch>
        </div>
    )
}

export default compose(withRouter)(Content)