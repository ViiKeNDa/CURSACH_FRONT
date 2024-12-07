import React from 'react';

const Cart = ({ cartItems, onIncrease, onDecrease, onRemove, onCreateOrder }) => {
    const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    return (
        <div className="cart">
            <h2>Корзина</h2>
            {cartItems.length === 0 ? (
                <p>Корзина пуста</p>
            ) : (
                <>
                    <ul>
                        {cartItems.map(item => (
                            <li key={item.id}>
                                <h3>{item.name}</h3>
                                <p>{item.price} руб.</p>
                                <div className="cart-controls">
                                    <button onClick={() => onDecrease(item.id)}>-</button>
                                    <span>{item.quantity}</span>
                                    <button onClick={() => onIncrease(item.id)}>+</button>
                                    <button onClick={() => onRemove(item.id)}>Удалить</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <p>Итоговая стоимость: {totalPrice} руб.</p>
                    {onCreateOrder && <button className="create-order-button" onClick={onCreateOrder}>Создать заказ</button>}
                </>
            )}
        </div>
    );
};

export default Cart;
