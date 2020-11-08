import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { pages, TPage } from '#src/components/pages.config';
import { RoleContext, TRoleContext } from '#src/libs/context/Role';
import config from '#src/config.app';
import { fetchAuth } from '#src/redux/actions/auth';


export const Menu: React.FC = () => {
    const  { role } = useContext<TRoleContext>(RoleContext)
    const dispatch = useDispatch()

    const exitHandler = () => {
        dispatch(fetchAuth({}, config.url.logout))
    }

    return (
        <div className="menu">
            <div className="menu__logo">
                ПАРТА
            </div>
            <div className="menu__table">
                {pages.map((page: TPage) => {
                    if (role && page.role_access.includes(role)) {
                        return (
                            <NavLink
                                key={page.path}
                                exact to={page.path}
                                activeClassName="menu__item__active"
                            >
                                <div className="menu__item">
                                    <i className={page.menu.icon}></i>
                                    {page.menu.title}
                                </div>
                            </ NavLink>
                        )
                    }
                })}
                <NavLink exact to={`/logout`} activeClassName="menu__item__active">
                    <div className="menu__item" onClick={exitHandler}>
                        <i className="fas fa-sign-out-alt"></i>
                        Выход
                    </div>
                </NavLink>
            </div>
        </div>
    )
}