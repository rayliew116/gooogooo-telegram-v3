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
import ItemBg from './img/item-main-bg.png'
import PurpleBar from './img/purple-bar.png'
import BlackBar from './img/black-bar.png'

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
                        <div className="earn">
                            <img src={BorderFrame} style={{width:"100%"}}/>
                            <div className="earn-items">
                                <button className="btn">TASKS</button>
                                <button className="btn">TOP REWARDS</button>
                                <button className="btn">REFERRAL</button>
                            </div>
                            <div className="earn-list">
                                <ul>
                                    <li>
                                        <img className="earn-bg" src={PurpleBar} />
                                        <div className="earn-content">
                                            <img className="item-icon" src={TwitterIcon} />
                                            <div className="earn-task-content">
                                                <p>Follow Twitter Account</p>
                                                <div className="earn-des">
                                                    <img src={Crystal} />
                                                    <p className="brand-yellow m-0 font">+100K</p>
                                                </div>
                                            </div>
                                            <img className="action-icon" src={Arrow} />
                                        </div>
                                    </li>
                                    <li>
                                        <img className="earn-bg" src={PurpleBar} />
                                        <div className="earn-content">
                                            <img className="item-icon" src={RetweetIcon} />
                                            <div className="earn-task-content">
                                                <p>Retweet/Share Twitter Post</p>
                                                <div className="earn-des">
                                                    <img src={Crystal} />
                                                    <p className="brand-yellow m-0 font">+100K</p>
                                                </div>
                                            </div>
                                            <img className="action-icon" src={Arrow} />
                                        </div>
                                    </li>
                                    <li>
                                        <img className="earn-bg" src={PurpleBar} />
                                        <div className="earn-content">
                                            <img className="item-icon" src={CommentIcon} />
                                            <div className="earn-task-content">
                                                <p>Comment on Twitter Post</p>
                                                <div className="earn-des">
                                                    <img src={Crystal} />
                                                    <p className="brand-yellow m-0 font">+100K</p>
                                                </div>
                                            </div>
                                            <img className="action-icon" src={Arrow} />
                                        </div>
                                    </li>
                                    <li>
                                        <img className="earn-bg" src={BlackBar} />
                                        <div className="earn-content">
                                            <img className="item-icon" src={TelegramIcon} />
                                            <div className="earn-task-content">
                                                <p>Join Telegram Channel</p>
                                                <div className="earn-des">
                                                    <img src={Crystal} />
                                                    <p className="brand-yellow m-0 font">+100K</p>
                                                </div>
                                            </div>
                                            <img className="action-icon" src={Complete} />
                                        </div>
                                    </li>
                                    <li>
                                        <img className="earn-bg" src={BlackBar} />
                                        <div className="earn-content">
                                            <img className="item-icon" src={GroupIcon} />
                                            <div className="earn-task-content">
                                                <p>Join Telegram Group</p>
                                                <div className="earn-des">
                                                    <img src={Crystal} />
                                                    <p className="brand-yellow m-0 font">+100K</p>
                                                </div>
                                            </div>
                                            <img className="action-icon" src={Complete} />
                                        </div>
                                    </li>
                                    <li>
                                        <img className="earn-bg" src={BlackBar} />
                                        <div className="earn-content">
                                            <img className="item-icon" src={PlayIcon} />
                                            <div className="earn-task-content">
                                                <p>Watch Ads</p>
                                                <div className="earn-des">
                                                    <img src={Crystal} />
                                                    <p className="brand-yellow m-0 font">+100K</p>
                                                </div>
                                            </div>
                                            <img className="action-icon" src={Complete} />
                                        </div>
                                    </li>
                                    <li>
                                        <img className="earn-bg" src={BlackBar} />
                                        <div className="earn-content">
                                            <img className="item-icon" src={PlayIcon} />
                                            <div className="earn-task-content">
                                                <p>Watch Ads</p>
                                                <div className="earn-des">
                                                    <img src={Crystal} />
                                                    <p className="brand-yellow m-0 font">+100K</p>
                                                </div>
                                            </div>
                                            <img className="action-icon" src={Complete} />
                                        </div>
                                    </li>
                                    <li>
                                        <img className="earn-bg" src={BlackBar} />
                                        <div className="earn-content">
                                            <img className="item-icon" src={PlayIcon} />
                                            <div className="earn-task-content">
                                                <p>Watch Ads</p>
                                                <div className="earn-des">
                                                    <img src={Crystal} />
                                                    <p className="brand-yellow m-0 font">+100K</p>
                                                </div>
                                            </div>
                                            <img className="action-icon" src={Complete} />
                                        </div>
                                    </li>
                                    <li>
                                        <img className="earn-bg" src={BlackBar} />
                                        <div className="earn-content">
                                            <img className="item-icon" src={PlayIcon} />
                                            <div className="earn-task-content">
                                                <p>Watch Ads</p>
                                                <div className="earn-des">
                                                    <img src={Crystal} />
                                                    <p className="brand-yellow m-0 font">+100K</p>
                                                </div>
                                            </div>
                                            <img className="action-icon" src={Complete} />
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EarnPage;