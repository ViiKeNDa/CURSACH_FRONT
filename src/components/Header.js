import React from 'react';
import logo from '../img/Dd.png'
import {Link} from "react-router-dom";

const Header = ({ userRole }) => {
    return (
        <header className="header">
            <div className="header-content">
                <Link to="/" className="header-logo">
                    <img src={logo} alt="Иконка сайта" className="header-icon" />
                    <span className="header-text">Delish Delivery</span>
                </Link>
                {/*<input type="text" placeholder="Поиск ресторана" className="header-search" />*/}
                {/*<button className="header-button">Укажите адрес доставки</button>*/}
                <nav className="header-nav">
                    <ul>
                        {(userRole === 'ROLE_DELIVERY' || userRole === 'ROLE_ADMIN') && <li><a href="/delivery">Доставка</a></li>}
                        {(userRole === 'ROLE_ADMIN' || userRole === 'ROLE_USER') && <li><a href="/orders">Заказы</a></li>}
                        {!(userRole === 'ROLE_ADMIN' || userRole === 'ROLE_USER' || userRole === 'ROLE_DELIVERY') && <li><a href="/login">Авторизация</a></li>}
                        {(userRole === 'ROLE_ADMIN' || userRole === 'ROLE_USER' || userRole === 'ROLE_DELIVERY') && <li><a href="/account">Аккаунт</a></li>}
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;