import React from 'react';

const MenuCard = ({ item, restaurantId, onAddToCart }) => {
    const imagePath = require(`../img/restaurant/${restaurantId}/${item.id-(restaurantId-1)*6}.png`);
    return (
        <div className="menu-card">
            <img src={imagePath} alt={item.name} />
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <p>{item.price} руб.</p>
            <button onClick={() => onAddToCart(item)}>Добавить в корзину</button>
        </div>
    );
};

export default MenuCard;