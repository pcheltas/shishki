import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {addAdmin, addStuff, fetchAccounts} from "../../../../redux/adminSlice";

const AccountLine = ({account, role}) => {
    const dispatch = useDispatch();
    const token = useSelector(state => state.auth.token)
    const makeStuff = async () => {
        await dispatch(addStuff([account.id, token]))
        await dispatch(fetchAccounts(token))
    }

    const makeAdmin = async () => {
        await dispatch(addAdmin([account.id, token]))
        await dispatch(fetchAccounts(token))
    }

    return (
        <div style={{
            borderRadius: "15px",
            backgroundColor: "rgb(28, 48, 37)",
            display: "flex",
            justifyContent: "space-around",
            padding: "10px"
        }}>
            <p className="text-small">{account.login}</p>
            {
                role === "STUFF" ?
                    <button className="add-button" style={{padding: "5px 10px"}} onClick={makeStuff}>Сделать стаффом</button>
                    :
                    <button className="add-button" onClick={makeAdmin}>Сделать админом</button>
            }
        </div>
    );
};

export default AccountLine;