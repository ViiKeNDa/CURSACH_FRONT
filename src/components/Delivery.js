import React, { useEffect, useState } from 'react';

const Delivery = () => {
    const [orders, setOrders] = useState([]);
    const [deliveries, setDeliveries] = useState([]);
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
            try {
                const response = await fetch('http://localhost:8083/api/orders', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
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

        fetchOrders();
    }, []);

    useEffect(() => {
        const fetchDeliveries = async () => {
            try {
                const response = await fetch('http://localhost:8084/api/deliveries', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setDeliveries(data);
                } else {
                    console.error('Ошибка при получении данных о доставках');
                }
            } catch (error) {
                console.error('Ошибка при отправке запроса:', error);
            }
        };

        fetchDeliveries();
    }, []);

    const takeOrder = async (orderId) => {
        if (!user) {
            alert('Ошибка при получении информации о пользователе');
            return;
        }

        try {
            const response = await fetch(`http://localhost:8084/api/deliveries/${orderId}/status`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: 'DELIVERY', deliverer_id: user.id }),
            });

            if (response.ok) {
                alert(`Заказ ${orderId} взят в доставку`);
                // Обновить статус заказа в состоянии
                setDeliveries(deliveries.map(delivery =>
                    delivery.orderId === orderId ? { ...delivery, status: 'DELIVERY' } : delivery
                ));
            } else {
                alert('Ошибка при взятии заказа в доставку');
            }
        } catch (error) {
            console.error('Ошибка при отправке запроса:', error);
            alert('Ошибка при взятии заказа в доставку');
        }
    };

    const deliverOrder = async (orderId) => {
        if (!user) {
            alert('Ошибка при получении информации о пользователе');
            return;
        }

        try {
            const response = await fetch(`http://localhost:8084/api/deliveries/${orderId}/status`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: 'DELIVERED', deliverer_id: user.id }),
            });

            if (response.ok) {
                alert(`Заказ ${orderId} доставлен`);
                // Обновить статус заказа в состоянии
                setDeliveries(deliveries.map(delivery =>
                    delivery.orderId === orderId ? { ...delivery, status: 'DELIVERED' } : delivery
                ));
            } else {
                alert('Ошибка при доставке заказа');
            }
        } catch (error) {
            console.error('Ошибка при отправке запроса:', error);
            alert('Ошибка при доставке заказа');
        }
    };

    const getDeliveryStatus = (orderId) => {
        const delivery = deliveries.find(delivery => delivery.orderId === orderId);
        return delivery ? delivery.status : 'Неизвестно';
    };

    return (
        <div className="delivery">
            <h2>Доставка</h2>
            {orders.length === 0 ? (
                <p>Нет заказов для доставки</p>
            ) : (
                <ul>
                    {orders.map(order => (
                        <li key={order.id} className={`delivery-item ${getDeliveryStatus(order.id).toLowerCase()}`}>
                            <h3>Заказ #{order.id}</h3>
                            <p>Адрес доставки: {order.deliveryAddress}</p>
                            <p>Статус: {getDeliveryStatus(order.id)}</p>
                            <ul>
                                {order.items.map(item => (
                                    <li key={item.id}>
                                        {item.name} - {item.quantity} шт.
                                    </li>
                                ))}
                            </ul>
                            <div className="delivery-controls">
                                <button onClick={() => takeOrder(order.id)}>Взять заказ</button>
                                <button onClick={() => deliverOrder(order.id)}>Доставлено</button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Delivery;
