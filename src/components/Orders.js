import React, { useEffect, useState } from 'react';

const Orders = () => {
    const [orders, setOrders] = useState([]);
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

    useEffect(() => {
        const fetchOrders = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                return;
            }

            let url;
            if (user && user.roles[0].name === 'ROLE_ADMIN') {
                url = 'http://localhost:8083/api/orders';
            } else if (user && user.roles[0].name === 'ROLE_USER') {
                url = `http://localhost:8083/api/orders/user/${user.id}`;
            } else {
                return;
            }

            try {
                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setOrders(data);
                } else {
                    console.error('Ошибка при получении заказов');
                }
            } catch (error) {
                console.error('Ошибка при отправке запроса:', error);
            }
        };

        if (user) {
            fetchOrders();
        }
    }, [user]);

    return (
        <div className="orders">
            <h2>Заказы</h2>
            {orders.length === 0 ? (
                <p>У вас нет заказов</p>
            ) : (
                <ul>
                    {orders.map(order => (
                        <li key={order.id} className={`order-item ${order.status.toLowerCase()}`}>
                            <h3>Заказ #{order.id}</h3>
                            <p>Адрес доставки: {order.deliveryAddress}</p>
                            <p>Статус: {order.status}</p>
                            <ul>
                                {order.items.map(item => (
                                    <li key={item.id}>
                                        {item.name} - {item.quantity} шт.
                                    </li>
                                ))}
                            </ul>
                            <p>Итоговая стоимость: {order.totalPrice} руб.</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Orders;


