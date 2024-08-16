import React from "react";
import './friends-page.css';

//Import images here
import Title from './img/title-1.png'
import Gift1 from './img/gift-1.png'
import Gift2 from './img/gift-2.png'
import Crystal from './img/crystal-icon.png'
import LeaderboardBg from './img/leaderboard-bg.png'
import ProfilePic from './img/profile-pic.png'
import InviteButton from './img/invite-button.png'
import CopyButton from './img/copy-button.png'
import PurpleBar from './img/leaderboard-item-bg-top.png'
import BlackBar from './img/leaderboard-item-bg.png'
import TasklistBg from './img/task-bg.png'

interface Props {}

const FriendsPage = (props: Props) => {
    return (
        <>
            <div className="row friends-container">
                <div className="col-12 text-center friends-container-header">
                    <img src={Title} />
                    <h5 className="brand-yellow mt-1 mb-0">INVITE A FRIEND</h5>
                    <h5 className="text-white">You and your friend will receive bonuses</h5>
                </div>
                <div className="col-12">
                    <div className="task-container">
                        <div className="row tasklist mx-auto mb-2">
                            <img className="tasklist-bg" src={TasklistBg} />
                            <div className="tasklist-content">
                                <img className="present-icon" style={{transform:"rotate(18deg)"}} src={Gift1} ></img>
                                <div className="ml-0 pl-3">
                                    <p className="text-white m-0">Invite a friend</p>
                                    <div className="task-des">
                                        <img src={Crystal} />
                                        <p className="text-white m-0"><em>+5K</em> for you and your friend</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row tasklist mx-auto mb-2">
                            <img className="tasklist-bg" src={TasklistBg} />
                            <div className="tasklist-content">
                                <img className="present-icon" src={Gift2} ></img>
                                <div className="ml-0 pl-3">
                                    <p className="text-white m-0">Invite a friend with Telegram</p>
                                    <div className="task-des">
                                        <img src={Crystal} />
                                        <p className="text-white m-0"><em>+25K</em> for you and your friend</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row mt-3">
                            <img src={LeaderboardBg} style={{width:"100%"}}/>
                            <div className="leaderboard">
                                <div className="leaderboard-items">
                                    <h5 style={{width:"20%"}}>Rank</h5>
                                    <h5 style={{width:"39%"}}>Nickname</h5>
                                    <h5 style={{width:"19%"}}>Refs</h5>
                                    <h5 style={{width:"22%"}}>Ref Earnings</h5>
                                </div>
                                <div className="leaderboard-list">
                                    <ul>
                                        <li>
                                            <img className="leaderboard-item-bg" src={PurpleBar} />
                                            <div className="item-content">
                                                <p style={{width:"8%"}}>1</p>
                                                <div className="user-details">
                                                    <img className="profile-icon" src={ProfilePic} />
                                                    <p>Layla</p>
                                                </div>
                                                <p style={{width:"19%"}}>12345</p>
                                                <div className="ref-earnings">
                                                    <img src={Crystal} />
                                                    <p>+8.787</p>
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <img className="leaderboard-item-bg" src={PurpleBar} />
                                            <div className="item-content">
                                                <p style={{width:"8%"}}>1</p>
                                                <div className="user-details">
                                                    <img className="profile-icon" src={ProfilePic} />
                                                    <p>Layla</p>
                                                </div>
                                                <p style={{width:"19%"}}>12345</p>
                                                <div className="ref-earnings">
                                                    <img src={Crystal} />
                                                    <p>+8.787</p>
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <img className="leaderboard-item-bg" src={PurpleBar} />
                                            <div className="item-content">
                                                <p style={{width:"8%"}}>1</p>
                                                <div className="user-details">
                                                    <img className="profile-icon" src={ProfilePic} />
                                                    <p>Layla</p>
                                                </div>
                                                <p style={{width:"19%"}}>12345</p>
                                                <div className="ref-earnings">
                                                    <img src={Crystal} />
                                                    <p>+8.787</p>
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <img className="leaderboard-item-bg" src={BlackBar} />
                                            <div className="item-content">
                                                <p style={{width:"8%"}}>1</p>
                                                <div className="user-details">
                                                    <img className="profile-icon" src={ProfilePic} />
                                                    <p>Layla</p>
                                                </div>
                                                <p style={{width:"19%"}}>12345</p>
                                                <div className="ref-earnings">
                                                    <img src={Crystal} />
                                                    <p>+8.787</p>
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <img className="leaderboard-item-bg" src={BlackBar} />
                                            <div className="item-content">
                                                <p style={{width:"8%"}}>1</p>
                                                <div className="user-details">
                                                    <img className="profile-icon" src={ProfilePic} />
                                                    <p>Layla</p>
                                                </div>
                                                <p style={{width:"19%"}}>12345</p>
                                                <div className="ref-earnings">
                                                    <img src={Crystal} />
                                                    <p>+8.787</p>
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <img className="leaderboard-item-bg" src={BlackBar} />
                                            <div className="item-content">
                                                <p style={{width:"8%"}}>1</p>
                                                <div className="user-details">
                                                    <img className="profile-icon" src={ProfilePic} />
                                                    <p>Layla</p>
                                                </div>
                                                <p style={{width:"19%"}}>12345</p>
                                                <div className="ref-earnings">
                                                    <img src={Crystal} />
                                                    <p>+8.787</p>
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <img className="leaderboard-item-bg" src={BlackBar} />
                                            <div className="item-content">
                                                <p style={{width:"8%"}}>1</p>
                                                <div className="user-details">
                                                    <img className="profile-icon" src={ProfilePic} />
                                                    <p>Layla</p>
                                                </div>
                                                <p style={{width:"19%"}}>12345</p>
                                                <div className="ref-earnings">
                                                    <img src={Crystal} />
                                                    <p>+8.787</p>
                                                </div>
                                            </div>
                                        </li>      
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="invite-friends">
                        <div style={{width:'80%',margin:'auto', display:'flex'}}>
                            
                            <button className="btn p-0" style={{backgroundColor:"transparent"}}>
                                <img src={InviteButton} style={{width:"100%"}}/>
                            </button>
                            <button className="btn p-0" style={{backgroundColor:"transparent"}}>
                                <img src={CopyButton} style={{width:"100%"}}/>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default FriendsPage;