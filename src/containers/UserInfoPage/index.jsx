import React, { useState, useEffect } from "react";
import { useDispatch, useSelector }   from 'react-redux';
import Layout                         from "../../components/Layout/index";
import { 
    getUserInfomation,
    sendRelationshipRequest,
    acceptRelationshipReqest,
    getRequestingUsers
}                                     from "../../actions/relation.action";
import IconImage                      from "../../images/f_f_health_50_s512_f_health_50_2bg.png";
import                                     "./style.css";

const SendingRequestUser = (props) => {

    const { user, onClick } = props;

    return (
        <div onClick={() => onClick(user.uid)} className="displayName" >
            <div className="displayPic">
                <img src={ IconImage } alt="" />
            </div>
            <div style={{ display: 'flex', flex: 1, justifyContent: 'space-between', margin: '0 10px'}}>
                <span style={{fontWeight: 500}}>{user.firstName} {user.lastName}</span>
            </div>
        </div>
    );
};

const SendedRequestUser = (props) => {

    const { user, onClick } = props;

    return (
        <div onClick={() => onClick(user.uid)} className="displayName" >
            <div className="displayPic">
                <img src={ IconImage } alt="" />
            </div>
            <div style={{ display: 'flex', flex: 1, justifyContent: 'space-between', margin: '0 10px'}}>
                <span style={{fontWeight: 500}}>{user.firstName} {user.lastName}</span>
            </div>
        </div>
    );
};

const ConectedUser = (props) => {
    const { user, onClick } = props;

    return (
        <div onClick={() => onClick(user.uid)} className="displayName" >
            <div className="displayPic">
                <img src={ IconImage } alt="" />
            </div>
            <div style={{ display: 'flex', flex: 1, justifyContent: 'space-between', margin: '0 10px'}}>
                <span style={{fontWeight: 500}}>{user.firstName} {user.lastName}</span>
            </div>
        </div>
    );
};

const SwitchSection = (props) => {

    const { relation, sendRelationshipReq, acceptRelationshipReq } = props;

    if (relation.isMyself === true) {
        return (
            <p>?????????????????????</p>
        );
    } else if (relation.isMyself === null) {
        return null;
    } else if (relation.isAccepted === null && relation.isGetStartRelation === null) {
        return (
            <button className="userInfoTouch" onClick={() => sendRelationshipReq()}>???????????????????????????</button>
        );
    } else if (relation.isAccepted === false && relation.isGetStartRelation === null) {
        return (
            <p>???????????????????????????</p>
        );
    } else if (relation.isAccepted === null && relation.isGetStartRelation === false) {
        return (
            <button className="userInfoTouch" onClick={() => acceptRelationshipReq()}>?????????????????????????????????</button>
        );
    } else if (relation.isAccepted === true || relation.isGetStartRelation === true) {
        return (
            <p>????????????????????????????????????</p>
        );
    } else {
        return null;
    }
};

const UserInfoPage = (props) => {

    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);
    const user = useSelector(state => state.user);
    const relation = useSelector(state => state.relation);
    const [userID, setUserID] = useState('');
    const [unsubscribe, setUnsubscribe] = useState(null);

    useEffect(() => {
        const _ununsubscribe = dispatch(getRequestingUsers(auth.uid))
            .then(unsubscribe => {
                return unsubscribe;
            })
            .catch(error => {
                console.log(error);
            });
        setUnsubscribe(_ununsubscribe);
    }, [auth.uid, dispatch]);

    useEffect(() => {
        return () => {
            setUnsubscribe((__unsubscribe) => {
                __unsubscribe
                    .then(f => f())
                    .catch(error => console.log(error));
            });
        };
    }, []);

    const getUserInfo = (event) => {
        const uid_1 = auth.uid;
        const uid_2 = userID;
        event.preventDefault();
        if (uid_2 === "") {
            alert('UserID???????????????????????????');
            return;
        }
        dispatch(getUserInfomation({uid_1, uid_2}));
    };

    const sendRelationshipReq = () => {
        const uid_1 = auth.uid;
        const uid_2 = userID;
        dispatch(sendRelationshipRequest({uid_1, uid_2}));
        setUserID('');
    };

    const acceptRelationshipReq = () => {
        const uid_1 = auth.uid;
        const uid_2 = userID;
        dispatch(acceptRelationshipReqest({uid_1, uid_2}));
        setUserID('');
    };

    if (false) {
        // ??????????????????????????????
        console.log(unsubscribe);
    };

    return (
        <Layout>
            <section className="container">
                <div className="listOfUsers">
                    <div 
                        onClick={() => setUserID(auth.uid)} 
                        className="displayName My"  
                    >
                        <div className="displayPic">
                            <img src={ IconImage } alt="" />
                        </div>
                        <div style={{ display: 'flex', flex: 1, justifyContent: 'space-between', margin: '0 10px'}}>
                            <span style={{fontWeight: 500}}>?????? ???????????????</span>
                        </div>
                    </div>
                    {
                        relation.SendingUsers.length > 0 ?
                        <div className="displayHeader">?????????????????????...</div> : null
                    }
                    {
                        relation.SendingUsers.length > 0 ?
                        relation.SendingUsers.map(user => {
                            return (
                                <SendingRequestUser 
                                    key={ user.uid } 
                                    user={ user } 
                                    onClick={ setUserID }
                                />
                            );
                        }) : null
                    }   

                    {
                        relation.SendedUsers.length > 0 ?
                        <div className="displayHeader start">????????????????????????...</div> : null
                    }
                    {
                        relation.SendedUsers.length > 0 ?
                        relation.SendedUsers.map(user => {
                            return (
                                <SendedRequestUser 
                                    key={ user.uid } 
                                    user={ user } 
                                    onClick={ setUserID }
                                />
                            );
                        }) : null
                    }     

                    {
                        user.users.length > 0 ?
                        <div className="displayHeader done">??????????????????</div> : null
                    }
                    {
                        user.users.length > 0 ?
                        user.users.map(user => {
                            return (
                                <ConectedUser 
                                    onClick={ setUserID }       
                                    key={ user.uid } 
                                    user={ user } 
                                />
                            );
                        }) : null
                    }

                </div>
                <div className="userInfoArea">
                    <div className="userInfoHeader">
                        <form onSubmit={getUserInfo}>
                            <input 
                                name="userID"
                                type="text"
                                value={ userID }
                                onChange={(event) => setUserID(event.target.value)}
                                placeholder=" ????????????ID?????????"
                                className="userIDinput"
                            />
                            <button className="userInfoButton">??????</button>
                        </form>
                    </div>
                        { 
                            relation.firstName !== '' ?
                            <div className="userInfoSections">
                                <div className="userInfoPic">
                                    <img src={ IconImage } alt="" />
                                </div>
                                <div className="userInfoName">{ `${relation.firstName} ${relation.lastName}` }</div>
                                <div className="userInfoDonuts">DonutPoint : { relation.donutPoint }</div>
                                <div className="userInfoCreatedAt">???????????????????????? : { relation.createdAt }</div>
                                <div>
                                    <SwitchSection 
                                        relation={ relation } 
                                        sendRelationshipReq={ sendRelationshipReq } 
                                        acceptRelationshipReq={ acceptRelationshipReq }  
                                    />
                                </div>
                            </div> : null 
                        }
                        {
                            relation.error !== null ?
                            <div className="userInfoSections">
                                <p className="errorMessage">{ relation.error }</p>
                            </div> : null
                        }
                </div>
            </section>
        </Layout>
    );
};

export default UserInfoPage;