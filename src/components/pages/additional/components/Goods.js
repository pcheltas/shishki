import React from 'react';
import GoodsItem from "./GoodsItem";
import {useSelector} from "react-redux";

const Goods = ({style}) => {
    const goods = useSelector(state => state.shop.goods || [])
    return (
        <div style={{display: "flex", flexWrap: "wrap"}}>
            {goods.length > 0 ? (
                goods.map(item => (
                    <GoodsItem key={item.id} goods={item} style={style} />
                ))
            ) : (
                <p className="text-common">Нет доступных товаров</p>
            )}
        </div>
    );
};

export default Goods;