import React, { useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { compose } from "redux";
import { withRouter } from 'react-router-dom';

import { pages, TPage } from '#src/components/pages.config';
import { RoleContext, TRoleContext } from '#src/libs/providers/Role';
import { Message } from '#src/libs/ui/Message';
import { useDispatch, useSelector } from 'react-redux';
import { AppStateType } from '#src/redux/types/common_types';
import { IAlertState } from '#src/redux/reducers/alert';
import { hideAlert } from '#src/redux/actions/alert';
import { IConfirmState } from '#src/redux/reducers/confirm';
import { Confirm } from '#src/libs/ui/Confirm';

const Content: React.FC = () => {
    const { role } = useContext<TRoleContext>(RoleContext)
    const dispatch = useDispatch()
    const { message, variant } = useSelector((state: AppStateType): IAlertState => state.alert)
    const confirm = useSelector((state: AppStateType): IConfirmState => state.confirm)
    return (
        <div className="content">
            <Message
                variant={variant}
                text={message}
                onClose={() => dispatch(hideAlert())}
            />
            <Confirm
                onOk={confirm.onOk}
                open={confirm.open}
                cancelText={confirm.cancelText}
                okText={confirm.okText}
                dialogText={confirm.dialogText}
            />
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