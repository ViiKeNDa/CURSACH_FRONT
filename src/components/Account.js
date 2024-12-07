import React, { useEffect, useState } from 'react';

const Account = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserInfo = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                alert('Пользователь не авторизован');
                setLoading(false);
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
                    const errorText = await response.text();
                    console.error('Error response:', errorText);
                    setError('Ошибка при получении информации о пользователе');
                }
            } catch (error) {
                console.error('Ошибка при отправке запроса:', error);
                setError('Ошибка при отправке запроса');
            } finally {
                setLoading(false);
            }
        };

        fetchUserInfo();
    }, []);

    if (loading) {
        return <div>Загрузка...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="account">
            <h2>Аккаунт</h2>
            <div className="account-info">
                <p><strong>Имя пользователя:</strong> {user.username}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Имя:</strong> {user.name}</p>
                <p><strong>Фамилия:</strong> {user.surname}</p>
                <p><strong>Отчество:</strong> {user.patronymic}</p>
                <p><strong>Номер телефона:</strong> {user.phone}</p>
            </div>
        </div>
    );
};

export default Account;