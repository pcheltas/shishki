import React from 'react';
import {useSelector} from "react-redux";
import GlampingItem from "./GlampingItem";

const GlampingsArray = () => {
    const glampings = useSelector(state => state.glampings.glampings)

    return (
        <div>
            {glampings.length > 0 ? (
                glampings.map(glamping => (
                    <div key={glamping.id}>
                        <GlampingItem  glamping={glamping}/>
                    </div>
                ))
            ) : (
                <p className="text-common">Нет доступных глэмпингов</p>
            )}
        </div>
    );
};

export default GlampingsArray;