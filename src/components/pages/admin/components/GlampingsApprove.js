import React, {useEffect} from 'react';
import {fetchAccounts, fetchGlampingsForReview} from "../../../../redux/adminSlice";
import {useDispatch, useSelector} from "react-redux";
import AccountLine from "./AccountLine";
import GlampingReviewItem from "./GlampingReviewItem";

const GlampingsApprove = () => {
    const dispatch = useDispatch();
    const token = useSelector(state => state.auth.token)
    const glampingsForReview = useSelector(state => state.admin.glampingsForReview)

    useEffect(() => {
        dispatch(fetchGlampingsForReview(token))
    }, []);

    return (
        <div>
            {glampingsForReview.length > 0 ? (
                glampingsForReview.map((glamping) => (
                    <div key={glamping.id}>
                        <GlampingReviewItem glamping={glamping}/>
                    </div>
                ))
            ) : (
                <p className="text-common">Нет глэмпингов для рассмотрения</p>
            )}
        </div>
    );
};

export default GlampingsApprove;