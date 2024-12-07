import React, { useEffect, useState } from 'react';
import RestaurantCard from './RestaurantCard';

const RestaurantList = () => {
    const [restaurants, setRestaurants] = useState([]);

    useEffect(() => {
        const fetchRestaurants = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await fetch('http://localhost:8081/api/restaurants', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                    mode: 'cors',
                });

                if (response.ok) {
                    const data = await response.json();
                    setRestaurants(data);
                } else {
                    console.error('Ошибка при получении списка ресторанов');
                }
            } catch (error) {
                console.error('Ошибка при отправке запроса:', error);
            }
        };

        fetchRestaurants();
    }, []);

    return (
        <div className="restaurant-list">
            {restaurants.map(restaurant => (
                <RestaurantCard key={restaurant.id} restaurant={restaurant}/>
            ))}
        </div>
    );
};

export default RestaurantList;