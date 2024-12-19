import React from 'react';
import {useSelector} from "react-redux";
import ServiceItem from "./ServiceItem";
import "../../../../styles/font.css"

const Services = ({style}) => {
    const services = useSelector(state => state.service.services || [])
    return (
        <div style={{display: "flex", flexWrap: "wrap"}}>
            {services.length > 0 ? (
                services.map(service => (
                    <ServiceItem key={service.id} service={service} style={style}/>
                ))
            ) : (
                    <p className="text-common">Нет доступных услуг</p>
            )}
        </div>
    );
};

export default Services;