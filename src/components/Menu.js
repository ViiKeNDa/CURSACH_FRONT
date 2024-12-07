import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MenuCard from './MenuCard';
import Cart from './Cart';

const Menu = ({ userRole }) => {
    const { id } = useParams();
    const [menuItems, setMenuItems] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [restaurantName, setRestaurantName] = useState('ПИПИПУПУ');
    const [user, setUser] = useState(null);
    const [restaurant, setRestaurant] = useState(null);

    useEffect(() => {
        const fetchMenuItems = async () => {
            try {
                const response = await fetch(`http://localhost:8082/api/menu-items/restaurant/${id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setMenuItems(data);
                    setRestaurantName(data[0].restaurant.name);
                    console.log(data);
                } else {
                    console.error('Ошибка при получении меню ресторана');
                }
            } catch (error) {
                console.error('Ошибка при отправке запроса:', error);
            }
        };

        const fetchUserInfo = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                alert('Пожалуйста, авторизуйтесь для создания заказа');
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

        const fetchRestaurantInfo = async () => {
            try {
                const response = await fetch(`http://localhost:8081/api/restaurants/${id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setRestaurant(data);
                } else {
                    console.error('Ошибка при получении информации о ресторане');
                }
            } catch (error) {
                console.error('Ошибка при отправке запроса:', error);
            }
        };

        fetchMenuItems();
        fetchUserInfo();
        fetchRestaurantInfo();
    }, [id]);

    const addToCart = (item) => {
        const existingItem = cartItems.find(cartItem => cartItem.id === item.id);
        if (existingItem) {
            setCartItems(cartItems.map(cartItem =>
                cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
            ));
        } else {
            setCartItems([...cartItems, { ...item, quantity: 1 }]);
        }
    };

    const increaseQuantity = (itemId) => {
        setCartItems(cartItems.map(cartItem =>
            cartItem.id === itemId ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
        ));
    };

    const decreaseQuantity = (itemId) => {
        setCartItems(cartItems.map(cartItem =>
            cartItem.id === itemId ? { ...cartItem, quantity: Math.max(cartItem.quantity - 1, 0) } : cartItem
        ).filter(cartItem => cartItem.quantity > 0));
    };

    const removeFromCart = (itemId) => {
        setCartItems(cartItems.filter(cartItem => cartItem.id !== itemId));
    };

    const createOrder = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            alert('Пожалуйста, авторизуйтесь для создания заказа');
            return;
        }

        if (!user || !restaurant) {
            alert('Ошибка при получении информации о пользователе или ресторане');
            return;
        }

        const orderData = {
            userId: user.id,
            deliveryAddress: user.address,
            restaurantAddress: restaurant.address,
            items: cartItems.map(item => ({
                id: item.id,
                quantity: item.quantity,
            })),
        };

        try {
            const response = await fetch('http://localhost:8083/api/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(orderData),
            });

            if (response.ok) {
                alert('Заказ успешно создан!');
                setCartItems([]); // Очистка корзины после создания заказа
            } else {
                alert('Ошибка при создании заказа');
            }
        } catch (error) {
            console.error('Ошибка при отправке запроса:', error);
            alert('Ошибка при создании заказа');
        }
    };

    return (
        <div className="menu-container">
            <div className="menu">
                <h2>Меню ресторана {restaurantName}</h2>
                <div className="menu-list">
                    {menuItems.map(item => (
                        <MenuCard key={item.id} restaurantId={id} item={item} onAddToCart={addToCart} />
                    ))}
                </div>
            </div>
            <Cart
                cartItems={cartItems}
                onIncrease={increaseQuantity}
                onDecrease={decreaseQuantity}
                onRemove={removeFromCart}
                onCreateOrder={userRole !== 'ROLE_DELIVERY' ? createOrder : null}
            />
        </div>
    );
};

export default Menu;

