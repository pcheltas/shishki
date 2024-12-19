import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import GoodsItem from "./GoodsItem";
import {RiDeleteBin7Line} from "react-icons/ri";
import {deleteItemFromCart} from "../../../../redux/shopSlice";
import {deleteServiceFromCart} from "../../../../redux/servicesSlice";

const Cart = ({args}) => {
    const dispatch = useDispatch();
    const servicesCart = useSelector(state => state.service.cart || [])
    const shopCart = useSelector(state => state.shop.cart || [])

    const handleItemDelete = (id) => {
        dispatch(deleteItemFromCart({id: id}))
    }

    const handleServiceDelete = (id) => {
        dispatch(deleteServiceFromCart({id: id}))
    }

    return (
        <div className="row-container" style={{alignItems: "start"}}>
            <div style={{flex: 1, margin: "0 20px 0 20px"}}>

                <h1 className={args ? "text-common": "title-common"}> {args ? args[0] : "Услуги"}</h1>
                {servicesCart.length > 0 ? (
                    servicesCart.map(item => (
                        <div className="frame-element row-container"
                             style={{
                                 padding: "0 20px 0 20px",
                                 justifyContent: "space-between",
                                 margin: "30px 0 30px 0"
                             }}
                        key={item.id}>
                            <p className="text-common">{item.name}</p>
                            <p className="text-common">{item.cost} p</p>
                            <span className="icon" style={{margin: 0}}
                                  onClick={() => handleServiceDelete(item.id)}><RiDeleteBin7Line/></span>
                        </div>
                    ))
                ) : (
                    <p className="text-common">Нет добавленных услуг</p>
                )}
            </div>
            <div style={{flex: 1, margin: "0 20px 0 20px"}}>
                <h1 className={args ? "text-common": "title-common"}> {args ? args[1] : "Товары"}</h1>
                {shopCart.length > 0 ? (
                    shopCart.map(item => (
                        <div className="frame-element row-container"
                             style={{
                                 padding: "0 20px 0 20px",
                                 justifyContent: "space-between",
                                 margin: "30px 0 30px 0"
                             }}
                             key={item.id}>
                            <p className="text-common">{item.name}</p>
                            <p className="text-common">{item.price} p</p>
                            <span className="icon" style={{margin: 0}}
                                  onClick={() => handleItemDelete(item.id)}><RiDeleteBin7Line/></span>
                        </div>
                    ))
                ) : (
                    <p className="text-common">Нет добавленных товаров</p>
                )}
            </div>

        </div>
    );
};

export default Cart;