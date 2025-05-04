import React from 'react';
import {useSelector} from "react-redux";

const StaffHouseItem = ({house}) => {
    const glampings = useSelector(state => state.glampings.glampingsApproved)
    const glampingAddress = glampings.filter(glamping => house.glampingId === glamping.id)[0].address

    return (
        <div className="frame-element">
            <p className="text-common">Глэмпинг: {glampingAddress}</p>
            <div className="row-container">
                <p className="text-common" style={{marginTop: 0}}>Домик №{house.id}</p>
                <p className="text-common" style={{marginTop: 0, marginLeft: "60px"}}>Код: {house.code}</p>
            </div>
        </div>
    );
};

export default StaffHouseItem;