import React from "react";
import './earn-page.css';

// Import images here
import PointsBar from './img/points-bar.png'
import BorderFrame from './img/border-frame.png'
import TwitterIcon from './img/twitter-icon.png'
import RetweetIcon from './img/retweet-icon.png'
import CommentIcon from './img/comment-icon.png'
import TelegramIcon from './img/telegram-icon.png'
import GroupIcon from './img/group-icon.png'
import PlayIcon from './img/play-icon.png'
import Arrow from './img/arrow.png'
import Crystal from './img/crystal.png'
import Complete from './img/tick-icon.png'

interface Props {}

const EarnPage = (props: Props) => {
    return (
        <>
            <div className="row">
                <div className="col-12 text-center">
                    <div className="total-earned">
                        <div className="points-bar">
                            <img className="total-earned" src={PointsBar} />
                        </div>
                        <h2 className="m-0">0</h2>
                    </div>
                </div>
                <div className="col-12">
                    <div className="earn-container">
                        <div className="row mt-5">
                            <img src={BorderFrame} style={{width:"100%"}}/>
                            <div className="earn">
                                <div className="earn-items">
                                    <button className="btn">TASKS</button>
                                    <button className="btn">TOP REWARDS</button>
                                    <button className="btn">REFERRAL</button>
                                </div>
                                <div className="earn-list">
                                    <ul>
                                        <li>
                                            <img src={TwitterIcon} style={{width:"13%"}} />
                                            <div>
                                                <p>Follow Twitter Account</p>
                                                <div className="earn-des">
                                                    <img src={Crystal} />
                                                    <p className="brand-yellow m-0">+100K</p>
                                                </div>
                                            </div>
                                            <img src={Arrow} style={{width:"11%"}}/>
                                        </li>
                                        <li>
                                            <img src={RetweetIcon} style={{width:"13%"}} />
                                            <div>
                                                <p>Retweet/Share Twitter Post</p>
                                                <div className="earn-des">
                                                    <img src={Crystal} />
                                                    <p className="brand-yellow m-0">+100K</p>
                                                </div>
                                            </div>
                                            <img src={Arrow} style={{width:"11%"}}/>
                                        </li>
                                        <li>
                                            <img src={CommentIcon} style={{width:"13%"}} />
                                            <div>
                                                <p>Comment on Twitter Post</p>
                                                <div className="earn-des">
                                                    <img src={Crystal} />
                                                    <p className="brand-yellow m-0">+100K</p>
                                                </div>
                                            </div>
                                            <img src={Arrow} style={{width:"11%"}}/>
                                        </li>
                                        <li>
                                            <img src={TelegramIcon} style={{width:"13%"}} />
                                            <div>
                                                <p>Join Telegram Channel</p>
                                                <div className="earn-des">
                                                    <img src={Crystal} />
                                                    <p className="brand-yellow m-0">+100K</p>
                                                </div>
                                            </div>
                                            <img src={Complete} style={{width:"11%"}}/>
                                        </li>
                                        <li>
                                            <img src={GroupIcon} style={{width:"13%"}} />
                                            <div>
                                                <p>Join Telegram Group</p>
                                                <div className="earn-des">
                                                    <img src={Crystal} />
                                                    <p className="brand-yellow m-0">+100K</p>
                                                </div>
                                            </div>
                                            <img src={Complete} style={{width:"11%"}}/>
                                        </li>
                                        <li>
                                            <img src={PlayIcon} style={{width:"13%"}} />
                                            <div>
                                                <p>Watch Ads</p>
                                                <div className="earn-des">
                                                    <img src={Crystal} />
                                                    <p className="brand-yellow m-0">+100K</p>
                                                </div>
                                            </div>
                                            <img src={Complete} style={{width:"11%"}}/>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EarnPage;