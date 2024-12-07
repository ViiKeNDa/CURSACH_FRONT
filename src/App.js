import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RestaurantList from './components/RestaurantList';
import Menu from './components/Menu';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './components/Login';
import Register from './components/Register';
import Orders from './components/Orders';
import Account from './components/Account';
import Delivery from './components/Delivery';
import PrivateRoute from './components/PrivateRoute';

const App = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUserInfo = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                return;
            }

            try {
                const response = await fetch('http://localhost:8080/info', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                    mode: 'cors',
                });

                if (response.ok) {
                    const data = await response.json();
                    setUser(data);
                } else {
                    console.error('Ошибка при получении информации о пользователе');
                }
            } catch (error) {
                console.error('Ошибка при отправке запроса:', error);
            }
        };

        fetchUserInfo();
    }, []);

    const isUserRole = user && user.roles[0].name === 'ROLE_USER';
    const isDeliveryRole = user && user.roles[0].name === 'ROLE_DELIVERY';
    console.log(user);

    return (
        <Router>
            <div className="App">
                <Header userRole={user ? user.roles[0].name : null} />
                <main>
                    <Routes>
                        <Route path="/" element={<RestaurantList />} />
                        <Route path="/menu/:id" element={<Menu userRole={user ? user.roles[0].name : null} />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route element={<PrivateRoute />}>
                            {!isDeliveryRole && <Route path="/orders" element={<Orders />} />}
                            <Route path="/account" element={<Account />} />
                            {!isUserRole && <Route path="/delivery" element={<Delivery />} />}
                        </Route>
                    </Routes>
                </main>
                <Footer />
            </div>
        </Router>
    );
};

export default App;

