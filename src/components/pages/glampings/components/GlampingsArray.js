import React from 'react';
import {useSelector} from "react-redux";
import GlampingItem from "./GlampingItem";

const GlampingsArray = () => {
    const approvedGlampings = useSelector(state => state.glampings.glampingsApproved)

    return (
        <div>
            {approvedGlampings.length > 0 ? (
                approvedGlampings.map(glamping => (
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