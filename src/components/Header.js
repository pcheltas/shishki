import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import "../styles/header.css"
import {IoPersonOutline} from "react-icons/io5";
import {Link} from "react-router-dom";
// import {fetchUserRole, logout, requestAdminRole} from "../redux/authSlice";

const Header = () => {
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
    // const isAuthenticated = true
    // const login = useSelector(state => state.auth.login);
    // const role = useSelector(state => state.auth.role);
    // const token = useSelector(state => state.auth.token)
    // const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);


    const toggleDropdown = async () => {
        // if (!isOpen) {
        //     await dispatch(fetchUserRole([role, token]));
        // }
        setIsOpen(!isOpen);
    };
    //
    // const handleLogout = () => {
    //     toggleDropdown();
    //     dispatch(logout());
    // };
    //
    // const handleAdminSubmit = () => {
    //     dispatch(requestAdminRole(token))
    //     dispatch(fetchUserRole([role, token]))
    // }

    return (
        <header className="header">
            <Link to="/" style={{textDecoration: 'none'}}>
                <h1 className="ruslan-display-regular">ШИШКИ</h1>
            </Link>
            <div>
                <Link to="/glampings" style={{textDecoration: 'none'}}>
                    <h2>глэмпинги</h2>
                </Link>
                <Link to="/additional" style={{textDecoration: 'none'}}>
                    <h2>услуги</h2>
                </Link>
                <Link to="/faq" style={{textDecoration: 'none'}}>
                    <h2>FAQ</h2>
                </Link>
                <Link to="/contacts" style={{textDecoration: 'none'}}>
                    <h2>контакты</h2>
                </Link>
                <Link to="/reviews" style={{textDecoration: 'none'}}>
                    <h2>отзывы</h2>
                </Link>
            </div>
            <div className="user-dropdown" onClick={toggleDropdown}>

                {isAuthenticated ? (
                    <Link to="/account" style={{textDecoration: "none", color: "antiquewhite"}}>
                        <span className="icon"><IoPersonOutline/></span>
                    </Link>
                ) : (<Link to="/login" style={{textDecoration: "none", color: "antiquewhite"}}>
                        <span className="icon"><IoPersonOutline/></span>
                    </Link>
                )}
            </div>
        </header>
    );
};

export default Header;