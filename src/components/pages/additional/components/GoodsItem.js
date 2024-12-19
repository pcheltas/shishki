import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import Description from "../../../Description";
import {addItemToCart} from "../../../../redux/shopSlice";

const GoodsItem = ({goods, style}) => {
    const dispatch = useDispatch();
    const [isHovered, setIsHovered] = useState(false);
    const [descriptionPosition, setDescriptionPosition] = useState({x: 0, y: 0});
    const cart = useSelector(state => state.shop.cart)
    const exists = cart.some(item => item.id === goods.id)

    const handleMouseEnter = (e) => {
        setDescriptionPosition({x: e.pageX, y: e.pageY});
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const handleCartAdding = () => {
        dispatch(addItemToCart(goods))
    }

    return (
        <div
            className={`frame-element ${style ? style : "square-element"}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <h1 className="title-common">{goods.name}</h1>
            <p className="text-common" style={{flex: 1, textAlign: "center"}}>{goods.price} p.</p>
            <div>
                {!exists ?
                    <button onClick={handleCartAdding} className="add-button">В корзину</button>
                    : <p className="subtext">В корзине</p>
                }
            </div>
            {isHovered && <Description text={goods.description} position={descriptionPosition}/>}
        </div>
    );
};

export default GoodsItem;