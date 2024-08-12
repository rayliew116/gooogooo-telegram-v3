import React from "react";
import './friends-page.css';

//Import images here
import Title1 from './img/title-1.png'
import Gift1 from './img/gift-1.png'
import Gift2 from './img/gift-2.png'
import Crystal from './img/crystal-icon.png'
import Title2 from './img/title-2.png'
import LeaderboardBg from './img/leaderboard-bg.png'
import ProfilePic from './img/profile-pic.png'
import InviteButton from './img/invite-button.png'
import CopyButton from './img/copy-button.png'
// import LeaderboardItemBgTop from './img/leaderboard-item-bg-top.png'
// import LeaderboardItemBg from './img/leaderboard-item-bg.png'

interface Props {}

const FriendsPage = (props: Props) => {
    return (
        <>
            <div className="row">
                <div className="col-12 text-center">
                    <img src={Title1} style={{width:"38%"}} />
                    <h5 className="brand-yellow">INVITE A FRIEND</h5>
                    <h5 className="text-white">You and your friend will receive bonuses</h5>
                </div>
                <div className="col-12">
                    <div className="task-container">
                        <div className="row tasklist-box mt-2 mx-auto">
                            <div className="col-2 p-0">
                                <img className="task-icon" style={{transform:"rotate(17deg)"}} src={Gift1} ></img>
                            </div>
                            <div className="col-8 ml-0 pl-2">
                                <p className="task-title text-white m-0">Invite a friend</p>
                                <div className="task-des">
                                    <img src={Crystal} />
                                    <p className="text-white m-0"><em>+5K</em> for you and your friend</p>
                                </div>
                            </div>
                        </div>
                        <div className="row tasklist-box mt-2 mx-auto">
                            <div className="col-2 p-0">
                                <img className="task-icon" src={Gift2}></img>
                            </div>
                            <div className="col-8 ml-0 pl-2">
                                <p className="task-title text-white m-0">Invite a friend with Telegram</p>
                                <div className="task-des">
                                    <img src={Crystal} />
                                    <p className="text-white m-0"><em>+25K</em> for you and your friend</p>
                                </div>
                            </div>
                        </div>
                        <div className="row mt-5">
                            <img src={Title2} style={{width:"38%",position:"absolute",top:"28%",left:"31%"}}/>
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
                                            <p style={{width:"10%"}}>1</p>
                                            <div style={{width:"49%",display:"flex",alignItems:"center",gap:"5px"}}>
                                                <img src={ProfilePic} style={{width:"18%"}}/>
                                                <p >Layla</p>
                                            </div>
                                            <p style={{width:"19%"}}>12345</p>
                                            <p className="brand-yellow" style={{width:"22%"}}><img src={Crystal} style={{width:"20%",marginRight:"2px"}} />+ 8.787</p>

                                        </li>
                                        <li>
                                            <p style={{width:"10%"}}>1</p>
                                            <div style={{width:"49%",display:"flex",alignItems:"center",gap:"5px"}}>
                                                <img src={ProfilePic} style={{width:"18%"}}/>
                                                <p >Layla</p>
                                            </div>
                                            <p style={{width:"19%"}}>12345</p>
                                            <p className="brand-yellow" style={{width:"22%"}}><img src={Crystal} style={{width:"20%",marginRight:"2px"}} />+ 8.787</p>
                                        </li>
                                        <li>
                                            <p style={{width:"10%"}}>1</p>
                                            <div style={{width:"49%",display:"flex",alignItems:"center",gap:"5px"}}>
                                                <img src={ProfilePic} style={{width:"18%"}}/>
                                                <p >Layla</p>
                                            </div>
                                            <p style={{width:"19%"}}>12345</p>
                                            <p className="brand-yellow" style={{width:"22%"}}><img src={Crystal} style={{width:"20%",marginRight:"2px"}} />+ 8.787</p>
                                        </li>
                                        <li>
                                            <p style={{width:"10%"}}>1</p>
                                            <div style={{width:"49%",display:"flex",alignItems:"center",gap:"5px"}}>
                                                <img src={ProfilePic} style={{width:"18%"}}/>
                                                <p >Layla</p>
                                            </div>
                                            <p style={{width:"19%"}}>12345</p>
                                            <p className="brand-yellow" style={{width:"22%"}}><img src={Crystal} style={{width:"20%",marginRight:"2px"}} />+ 8.787</p>
                                        </li>
                                        <li>
                                            <p style={{width:"10%"}}>1</p>
                                            <div style={{width:"49%",display:"flex",alignItems:"center",gap:"5px"}}>
                                                <img src={ProfilePic} style={{width:"18%"}}/>
                                                <p >Layla</p>
                                            </div>
                                            <p style={{width:"19%"}}>12345</p>
                                            <p className="brand-yellow" style={{width:"22%"}}><img src={Crystal} style={{width:"20%",marginRight:"2px"}} />+ 8.787</p>
                                        </li>
                                        <li>
                                            <p style={{width:"10%"}}>1</p>
                                            <div style={{width:"49%",display:"flex",alignItems:"center",gap:"5px"}}>
                                                <img src={ProfilePic} style={{width:"18%"}}/>
                                                <p >Layla</p>
                                            </div>
                                            <p style={{width:"19%"}}>12345</p>
                                            <p className="brand-yellow" style={{width:"22%"}}><img src={Crystal} style={{width:"20%",marginRight:"2px"}} />+ 8.787</p>
                                        </li>
                                        <li>
                                            <p style={{width:"10%"}}>1</p>
                                            <div style={{width:"49%",display:"flex",alignItems:"center",gap:"5px"}}>
                                                <img src={ProfilePic} style={{width:"18%"}}/>
                                                <p >Layla</p>
                                            </div>
                                            <p style={{width:"19%"}}>12345</p>
                                            <p className="brand-yellow" style={{width:"22%"}}><img src={Crystal} style={{width:"20%",marginRight:"2px"}} />+ 8.787</p>
                                        </li>
                                        <li>
                                            <p style={{width:"10%"}}>1</p>
                                            <div style={{width:"49%",display:"flex",alignItems:"center",gap:"5px"}}>
                                                <img src={ProfilePic} style={{width:"18%"}}/>
                                                <p >Layla</p>
                                            </div>
                                            <p style={{width:"19%"}}>12345</p>
                                            <p className="brand-yellow" style={{width:"22%"}}><img src={Crystal} style={{width:"20%",marginRight:"2px"}} />+ 8.787</p>
                                        </li>
                                        <li>
                                            <p style={{width:"10%"}}>1</p>
                                            <div style={{width:"49%",display:"flex",alignItems:"center",gap:"5px"}}>
                                                <img src={ProfilePic} style={{width:"18%"}}/>
                                                <p >Layla</p>
                                            </div>
                                            <p style={{width:"19%"}}>12345</p>
                                            <p className="brand-yellow" style={{width:"22%"}}><img src={Crystal} style={{width:"20%",marginRight:"2px"}} />+ 8.787</p>
                                        </li>
                                        <li>
                                            <p style={{width:"10%"}}>1</p>
                                            <div style={{width:"49%",display:"flex",alignItems:"center",gap:"5px"}}>
                                                <img src={ProfilePic} style={{width:"18%"}}/>
                                                <p >Layla</p>
                                            </div>
                                            <p style={{width:"19%"}}>12345</p>
                                            <p className="brand-yellow" style={{width:"22%"}}><img src={Crystal} style={{width:"20%",marginRight:"2px"}} />+ 8.787</p>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="invite-friends">
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