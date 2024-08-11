import React from "react";
import './friends-page.css';

//Import images here
import Title1 from './img/title-1.png'
import Gift1 from './img/gift-1.png'
import Gift2 from './img/gift-2.png'
import Crystal from './img/crystal-icon.png'

interface Props {}

const FriendsPage = (props: Props) => {
    return (
        <>
            <div className="row">
                <div className="col-12 text-center">
                    <img src={Title1} alt="" />
                    <h5 className="text-white">INVITE A FRIEND</h5>
                    <h5>You and your friend will receive bonuses</h5>
                </div>
                <div className="col-12">
                    <div className="task-container">
                        <div className="row tasklist-box mt-2 px-3 py-2">
                            <div className="col-2 p-0">
                                <img className="task-icon" src={Gift1}></img>
                            </div>
                            <div className="col-8 ml-0 pl-2">
                                <p className="task-title text-white mb-2">Invite a friend</p>
                                <div className="row">
                                    <img className="crys" src={Crystal} alt="" />
                                    <p className="task-des text-white mb-2"><em>+5K</em> for you and your friend</p>
                                </div>
                            </div>
                            <div className="col-2 text-right p-0">
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default FriendsPage;