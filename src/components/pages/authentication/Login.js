import React, {useState} from 'react';
import Header from "../../Header";
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import { useNavigate } from 'react-router-dom';
import {login} from "../../../redux/authSlice";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate(); // для доступа к истории
    const [formData, setFormData] = useState({
        login: '',
        password: '',
    });
    const [errors, setErrors] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = validateForm();
        setErrors(newErrors);
        if (Object.keys(newErrors).length === 0) {
            const action = await dispatch(login(JSON.stringify(formData)));
            if (login.fulfilled.match(action)) {
                // Редирект после успешного входа
                navigate('/account'); // Замените на желаемый путь
            } else {
                // Обработка ошибок, если вход не удался
                console.error(action.payload);
            }
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.login) newErrors.login = 'Логин обязателен';
        if (!formData.password) newErrors.password = 'Пароль обязателен';
        return newErrors;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="overlay" style={{
            display: "flex",
            flexDirection: "column",
        }}>
            <Header/>
            <div className="mainPage" style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                <div className="frame-element"
                     style={{
                         display: "flex",
                         flexDirection: "column",
                         justifyContent: "center",
                         alignItems: "center",
                         width: "max-content",
                         padding: "80px"
                     }}>
                    <h1 className="title-common">Вход</h1>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="login" className="text-common">Логин</label>
                            <input
                                type="text"
                                id="login"
                                name="login"
                                value={formData.login}
                                onChange={handleChange}
                                required
                                style={{borderRadius: "15px", borderStyle: "none", height: "30px", width: "100%"}}
                            />
                        </div>
                        {errors.login && <span className="error">{errors.login}</span>}
                        <div style={{marginTop: "20px"}}>
                            <label htmlFor="password" className="text-common">Пароль</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                style={{borderRadius: "15px", borderStyle: "none", height: "30px", width: "100%"}}
                            />
                        </div>
                        {errors.password && <span className="error">{errors.password}</span>}
                        <div style={{display: "flex", justifyContent: "center", marginTop: "20px"}}>
                            <button type="submit" className="add-button">
                                Войти
                            </button>
                        </div>
                        <p className="text-common" style={{fontSize: "15px", textAlign: "end"}}>
                            Нет аккаунта? <Link to="/register" style={{textDecoration: "underline", fontSize: "15px"}}
                                                className="text-common">Зарегистрироваться</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;