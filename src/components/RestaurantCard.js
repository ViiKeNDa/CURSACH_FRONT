import React from 'react';
import { Link } from 'react-router-dom';

const RestaurantCard = ({ restaurant }) => {
    const imagePath = require(`../img/restaurant/${restaurant.id}.png`);

    return (
        <div className="restaurant-card">
            <img src={imagePath} alt={restaurant.name} />
            <h3>{restaurant.name}</h3>
            <Link to={`/menu/${restaurant.id}`}>Перейти в меню</Link>
        </div>
    );
};

export default RestaurantCard;