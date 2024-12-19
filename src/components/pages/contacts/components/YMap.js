import React from 'react';
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';

const YMap = () => {
    return (
        <div style={{borderRadius: "20px"}}>
        <YMaps>
            <Map defaultState={{ center: [60.262635, 30.460569], zoom: 12 }} width="auto" height="300px" >
                <Placemark geometry={[60.262635, 30.460569]} />
            </Map>
        </YMaps>
        </div>
    );
};

export default YMap;