import React from 'react';
import { NavLink } from 'react-router-dom';

export const Menu: React.FC = () => {
    return (
        <div className="menu">
            <div className="menu__logo">
                ПАРТА
            </div>
            <div className="menu__table">
                <NavLink exact to="/" activeClassName="menu__item__active" >
                    <div className="menu__item">
                        <i className="far fa-user-circle"></i>
                    Профиль
                    </div>
                </ NavLink>
                
                <NavLink exact to="/management" activeClassName="menu__item__active" >
                    <div className="menu__item">
                        <i className="fas fa-pencil-ruler"></i>
                    Управление
                    </div>
                </NavLink>
                

                <NavLink exact to="/classroom" activeClassName="menu__item__active" >
                    <div className="menu__item">
                        <i className="fas fa-user-graduate"></i>
                    Классы
                    </div>
                </NavLink>
                
                <NavLink exact to={`/settings`} activeClassName="menu__item__active">
                    <div className="menu__item">
                        <i className="fas fa-cogs"></i>
                    Администрация
                    </div>
                </NavLink>
                
                <NavLink exact to={`/reports`} activeClassName="menu__item__active">
                    <div className="menu__item">
                        <i className="fas fa-chart-line"></i>
                    Отчеты
                    </div>
                </NavLink>

                <NavLink exact to={`/libary`} activeClassName="menu__item__active">
                    <div className="menu__item">
                        <i className="fas fa-book-reader"></i>
                    База знаний
                    </div>
                </NavLink>
                
                <NavLink exact to={`/tasks`} activeClassName="menu__item__active">
                    <div className="menu__item">
                        <i className="fas fa-tasks"></i>
                    Задания
                    </div>
                </NavLink>
                

                <NavLink exact to={`/logout`} activeClassName="menu__item__active">
                    <div className="menu__item">
                        <i className="fas fa-sign-out-alt"></i>
                    Выход
                    </div>
                </NavLink>
                
            </div>
        </div>
    )
}