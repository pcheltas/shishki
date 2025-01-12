import React, {useEffect, useState} from 'react';
import {fetchHouses} from "../../../../redux/housesSlice";
import {fetchHouseTypes} from "../../../../redux/houseTypeSlice";
import {fetchGlampings} from "../../../../redux/glampingsSlice";
import {useDispatch, useSelector} from "react-redux";
import {fetchAccounts} from "../../../../redux/adminSlice";
import AccountLine from "./AccountLine";

const Roles = () => {
    const [activeTab, setActiveTab] = useState('stuff');
    const [searchTerm, setSearchTerm] = useState('');
    const dispatch = useDispatch();
    const token = useSelector(state => state.auth.token);
    const accounts = useSelector(state => state.admin.accounts)
    const userAccounts = accounts.filter(account => account.role === 'USER');
    const filteredAccounts = userAccounts.filter(account =>
        account.login.toLowerCase().includes(searchTerm.toLowerCase())
    );

    useEffect(() => {
        dispatch(fetchAccounts(token))
    }, []);

    const renderContent = () => {
        switch (activeTab) {
            case 'stuff':
                return <div>
                    {filteredAccounts.length > 0 ? (
                        filteredAccounts.map(account => (
                            <div key={account.id}>
                                <AccountLine account={account} role={"STUFF"}/>
                            </div>
                        ))
                    ) : (
                        <p className="text-common">Нет доступных аккаунтов</p>
                    )}
                </div>;
            case 'admin':
                return <div>
                    {filteredAccounts.length > 0 ? (
                        filteredAccounts.map(account => (
                            <div key={account.id}>
                                <AccountLine account={account} role={"ADMIN"}/>
                            </div>
                        ))
                    ) : (
                        <p className="text-common">Нет доступных аккаунтов</p>
                    )}
                </div>;
            default:
                return null;
        }
    };

    return (
        <div>
            <div style={{display: 'flex', marginBottom: '10px', flexDirection: "column"}}>
                <input
                    type="text"
                    placeholder="Поиск по логину..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{marginBottom: '10px', padding: '8px', borderRadius: '15px', borderStyle: "none"}}
                />
                <div style={{display: 'flex', marginBottom: '10px', justifyContent: "center"}}>
                    <button
                        onClick={() => setActiveTab('stuff')}
                        style={{
                            // marginRight: '10px',
                            padding: '10px',
                            marginRight: "10px",
                            cursor: 'pointer',
                            borderRadius: "15px",
                            borderColor: activeTab === 'stuff' ? "antiquewhite" : "none",
                            borderStyle: activeTab === 'stuff' ? "solid" : "none",
                            backgroundColor: activeTab === 'stuff' ? 'rgba(20, 35, 27, 0.88)' : '#1C3025',
                            color: '#fff',
                            flex: 1
                        }}
                    >
                        Stuff
                    </button>
                    <button
                        onClick={() => setActiveTab('admin')}
                        style={{
                            padding: '10px',
                            marginLeft: "10px",
                            cursor: 'pointer',
                            borderRadius: "15px",
                            borderColor: activeTab === 'admin' ? "antiquewhite" : "none",
                            borderStyle: activeTab === 'admin' ? "solid" : "none",
                            backgroundColor: activeTab === 'admin' ? 'rgba(20, 35, 27, 0.88)' : '#1C3025',
                            color: '#fff',
                            flex: 1
                        }}
                    >
                        Admin
                    </button>
                </div>
            </div>
            <div>
                {renderContent()}
            </div>
        </div>
    );
};

export default Roles;