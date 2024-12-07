import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [patronymic, setPatronymic] = useState('');
    const [phone, setPhone] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const [deliveryAddress, setDeliveryAddress] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Проверка совпадения паролей
        if (password !== confirmPassword) {
            alert('Пароли не совпадают');
            return;
        }

        const userData = {
            name: name,
            surname: surname,
            patronymic: patronymic,
            phone: phone,
            username: username,
            password: password,
            confirmPassword: confirmPassword,
            email: email,
            address: deliveryAddress,
        };

        try {
            const response = await fetch('http://localhost:8080/registration', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (response.ok) {
                alert('Регистрация успешна!');
                navigate('/login'); // Перенаправление на страницу авторизации после успешной регистрации
            } else {
                alert('Ошибка регистрации');
            }
        } catch (error) {
            console.error('Ошибка при отправке запроса:', error);
            alert('Ошибка при отправке запроса');
        }
    };

    return (
        <div className="register">
            <h2>Регистрация</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Имя:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Фамилия:</label>
                    <input
                        type="text"
                        value={surname}
                        onChange={(e) => setSurname(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Отчество:</label>
                    <input
                        type="text"
                        value={patronymic}
                        onChange={(e) => setPatronymic(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Номер телефона:</label>
                    <input
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                    />
                </div>
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
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Адрес доставки:</label>
                    <input
                        type="text"
                        value={deliveryAddress}
                        onChange={(e) => setDeliveryAddress(e.target.value)}
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
                <div>
                    <label>Подтвердите пароль:</label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Зарегистрироваться</button>
            </form>
        </div>
    );
};

export default Register;