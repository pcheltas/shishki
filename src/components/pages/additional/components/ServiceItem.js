import React, {useState} from 'react';
import "../../../../styles/font.css"
import {useDispatch, useSelector} from "react-redux";
import {addServiceToCart} from "../../../../redux/servicesSlice";
import Description from "../../../Description";

const ServiceItem = ({service, style}) => {
    const dispatch = useDispatch();
    const [isHovered, setIsHovered] = useState(false);
    const [descriptionPosition, setDescriptionPosition] = useState({x: 0, y: 0});
    const cart = useSelector(state => state.service.cart)
    const exists = cart.some(item => item.id === service.id)

    const handleMouseEnter = (e) => {
        setDescriptionPosition({x: e.pageX, y: e.pageY});
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const handleCartAdding = () => {
        dispatch(addServiceToCart(service))
    }

    return (
        <div
            className={`frame-element ${style ? style : "square-element"}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <h1 className="title-common">{service.name}</h1>
            <p className="text-common" style={{flex: 1, textAlign: "center"}}>{service.cost} p.</p>
            <div>
                {!exists ?
                    <button onClick={handleCartAdding} className="add-button">В корзину</button>
                    : <p className="subtext">В корзине</p>
                }
            </div>
            {isHovered && <Description text={service.description} position={descriptionPosition}/>}
        </div>
    );
};

export default ServiceItem;