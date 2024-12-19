import React from 'react';
import {IoPersonOutline} from "react-icons/io5";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../../../../redux/authSlice";
import {useNavigate} from "react-router-dom";

const Data = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const data = useSelector(state => state.auth.guest || [])

    const handleLogout = () => {
        dispatch(logout())
        navigate('/login')
    }

    return (
        <div>
            <div className="frame-element row-container" style={{margin: 0}}>
                <div style={{flex: 2, display: "flex", justifyContent: "center"}}>
                <span className="icon" style={{
                    display: "flex",
                    alignItems: "center",
                    fontSize: "130px",
                    color: "antiquewhite",
                    height: "200px",
                    width: "200px",
                    backgroundColor: "rgba(20, 35, 27, 0.88)",
                    justifyContent: "center",
                    borderRadius: "100px"
                }}><IoPersonOutline/></span>
                </div>
                <div style={{flex: 4, display: "flex", justifyContent: "space-around"}} className="row-container">
                    <div>
                        <p className="title-common">Имя</p>
                        <p className="text-common">{data.name}</p>
                        <p className="title-common">Фамилия</p>
                        <p className="text-common">{data.surname}</p>
                    </div>
                    <div>
                        <p className="title-common">Телефон</p>
                        <p className="text-common">{data.phone}</p>
                        <p className="title-common">Почта</p>
                        <p className="text-common">{data.email}</p>

                    </div>
                </div>
            </div>
            <div style={{display: "flex", justifyContent: "center", marginTop: "20px"}}>
                <button className="basic-button"
                        style={{backgroundColor: "rgba(20, 35, 27, 0.88)", color: "red"}}
                onClick={handleLogout}>Выйти
                </button>
            </div>
        </div>
    )
        ;
};

export default Data;