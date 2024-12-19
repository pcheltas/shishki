import React, {useRef, useState} from 'react';
import Header from "../../Header";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {login, register} from "../../../redux/authSlice";

const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate(); // для доступа к истории
    const [formData, setFormData] = useState({
        login: '',
        password: '',
        guest: {
            name: '',
            surname: '',
            phone: '',
            email: ''
        },
        role: "USER"
    });
    const [isGlampingOwner, setIsGlampingOwner] = useState(true);
    // const checkboxRef = useRef(null);
    const [errors, setErrors] = useState('');

    const handleCheckboxChange = (event) => {
        const checked = event.target.checked;
        setIsGlampingOwner(checked);
        console.log("Checkbox changed:", checked);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = validateForm();
        setErrors(newErrors);
        setFormData({
            ...formData,
            role: isGlampingOwner ? "OWNER" : "USER",
        });
        if (Object.keys(newErrors).length === 0) {
            const action = await dispatch(register(JSON.stringify(formData)));
            console.log(formData)
            if (register.fulfilled.match(action)) {
                navigate('/account');
            } else {
                console.error(action.payload);
            }
        }

    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.login) newErrors.login = 'Логин обязателен';
        if (!formData.password) newErrors.password = 'Пароль обязателен';
        if (!formData.guest.name) newErrors.guestName = 'Имя обязательно';
        if (!formData.guest.surname) newErrors.guestSurname = 'Фамилия обязательна';
        if (!formData.guest.phone) newErrors.guestPhone = 'Телефон обязателен';
        if (!formData.guest.email) newErrors.guestEmail = 'Почта обязательна';
        return newErrors;
    };

    const handleChange = (e) => {
        const {name, value} = e.target;
        if (name.startsWith('guest.')) {
            const guestKey = name.split('.')[1];
            setFormData(prev => ({
                ...prev,
                guest: {
                    ...prev.guest,
                    [guestKey]: value
                }
            }));
        } else {
            setFormData(prev => ({...prev, [name]: value}));
        }
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
                         padding: "30px"
                     }}>
                    <h1 className="title-common">Регистрация</h1>
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
                        <div style={{marginTop: "20px"}}>
                            <label htmlFor="guest.name" className="text-common">Имя</label>
                            <input
                                type="text"
                                id="guest.name"
                                name="guest.name"
                                value={formData.guest.name}
                                onChange={handleChange}
                                required
                                style={{borderRadius: "15px", borderStyle: "none", height: "30px", width: "100%"}}
                            />
                        </div>
                        {errors.guestName && <span className="error">{errors.guestName}</span>}
                        <div style={{marginTop: "20px"}}>
                            <label htmlFor="guest.surname" className="text-common">Фамилия</label>
                            <input
                                type="text"
                                id="guest.surname"
                                name="guest.surname"
                                value={formData.guest.surname}
                                onChange={handleChange}
                                required
                                style={{borderRadius: "15px", borderStyle: "none", height: "30px", width: "100%"}}
                            />
                        </div>
                        {errors.guestSurname && <span className="error">{errors.guestSurname}</span>}
                        <div style={{marginTop: "20px"}}>
                            <label htmlFor="guest.phone" className="text-common">Телефон</label>
                            <input
                                type="tel"
                                id="guest.phone"
                                name="guest.phone"
                                value={formData.guest.phone}
                                onChange={handleChange}
                                required
                                style={{borderRadius: "15px", borderStyle: "none", height: "30px", width: "100%"}}
                            />
                        </div>
                        {errors.guestPhone && <span className="error">{errors.guestPhone}</span>}
                        <div style={{marginTop: "20px"}}>
                            <label htmlFor="guest.email" className="text-common">Почта</label>
                            <input
                                type="email"
                                id="guest.email"
                                name="guest.email"
                                value={formData.guest.email}
                                onChange={handleChange}
                                required
                                style={{borderRadius: "15px", borderStyle: "none", height: "30px", width: "100%"}}
                            />
                        </div>
                        {errors.guestEmail && <span className="error">{errors.guestEmail}</span>}
                        <div style={{marginTop: "20px"}}>
                            <label className="text-common" style={{fontSize: "18px"}}>
                                <input
                                    id="ownerCheckbox"
                                    type="checkbox"
                                    checked={isGlampingOwner}
                                    onChange={handleCheckboxChange}
                                    style={{width: "15px", height: "15px"}}
                                />
                                Я владелец глэмпинга
                            </label>
                        </div>
                        <div style={{display: "flex", justifyContent: "center", marginTop: "20px"}}>
                            <button type="submit" className="add-button">
                                Зарегистрироваться
                            </button>
                        </div>
                        <p className="text-common" style={{fontSize: "15px", textAlign: "end"}}>
                            Уже есть аккаунт? <Link to="/login"
                                                    style={{textDecoration: "underline", fontSize: "15px"}}
                                                    className="text-common">Войти</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;