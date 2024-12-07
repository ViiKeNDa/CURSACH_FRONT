import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const userData = {
            username,
            password,
        };

        try {
            const response = await fetch('http://localhost:8080/auth', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',

                },
                mode: 'cors',
                body: JSON.stringify(userData),
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('token', data.token); // Сохраняем JWT токен в localStorage
                alert('Авторизация успешна!');
                navigate('/'); // Перенаправление на главную страницу после успешной авторизации
                window.location.reload();
            } else {
                alert('Неверное имя пользователя или пароль');
            }
        } catch (error) {
            console.error('Ошибка при отправке запроса:', error);
            alert('Ошибка при отправке запроса');
        }
    };

    return (
        <div className="login">
            <h2>Авторизация</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Имя пользователя:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Пароль:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Отправить</button>
            </form>
            <p>
                Нет аккаунта? <Link to="/register">Зарегистрироваться</Link>
            </p>
        </div>
    );
};

export default Login;