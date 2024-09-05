import React, { useEffect, useState, useRef } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, NavLink } from 'react-router-dom';
import './googoo-page.css';

// Import images here
import ProfilePic from '../../assets/img/profile-pic.png';
import LevelBox from '../../assets/img/level-box.png';
import LockedItem from '../../assets/img/locked.png';
import SampleOne from '../../assets/img/item-sample1.png';
import SampleTwo from '../../assets/img/item-sample2.png';
import SampleThree from '../../assets/img/item-sample3.png';
import SampleFour from '../../assets/img/item-sample4.png';
import PointsBar from '../../assets/img/points-bar.png';

import InviteButton from './img/invite-button.png'
import CopyButton from './img/copy-button.png'
import GoldTrophy from './img/gold-trophy.png'
import SilverTrophy from './img/silver-trophy.png'
import BronzeTrophy from './img/bronze-trophy.png'
import GoldCoin from './img/gold-coin.png'

interface Props {}

const GooGooPage = (props: Props) => {

  const [openLeaderboard, setOpenLeaderboard] = useState(false);
  const [openTeam, setOpenTeam] = useState(false);


  return (
    <>
      <div className="row">
        <div className="gg-tabs">
          <button className="btn text-white" onClick={(e) => {setOpenLeaderboard(false);}}>PROFILE</button>
          <button className="btn text-white" onClick={(e) => {setOpenLeaderboard(true);}}>LEADERBOARD</button>
        </div>
        {!openLeaderboard ? (
          <> 
            <div className="col-12 text-center">
              <img className="profile-pic" src={ProfilePic} alt="" />
              <div className="lvl-container">
                <img className="profile-lvl" src={LevelBox} alt="" />
                <h5 className="brand-yellow lvl-text">LEVEL 4</h5>
              </div>
            </div>

            <div className="profile-container">
              <div className="your-points mx-auto">
                <img className="w-100" src={PointsBar} />
                <h2>500,970</h2>
              </div>
              <div className="items-collection">
                <div className="unlock-items text-center px-0">
                  <img src={SampleOne} alt="" />
                </div>
                <div className="unlock-items text-center px-0">
                  <img src={SampleTwo} alt="" />
                </div>
                <div className="unlock-items text-center px-0">
                  <img src={SampleThree} alt="" />
                </div>
                <div className="unlock-items text-center px-0">
                  <img src={SampleFour} alt="" />
                </div>
                <div className="unlock-items text-center px-0">
                  <img src={LockedItem} alt="" />
                </div>
                <div className="unlock-items text-center px-0">
                  <img src={LockedItem} alt="" />
                </div>
                <div className="unlock-items text-center px-0">
                  <img src={LockedItem} alt="" />
                </div>
                <div className="unlock-items text-center px-0">
                  <img src={LockedItem} alt="" />
                </div>
                <div className="unlock-items text-center px-0">
                  <img src={LockedItem} alt="" />
                </div>
                <div className="unlock-items text-center px-0">
                  <img src={LockedItem} alt="" />
                </div>
                <div className="unlock-items text-center px-0">
                  <img src={LockedItem} alt="" />
                </div>
                <div className="unlock-items text-center px-0">
                  <img src={LockedItem} alt="" />
                </div>
              </div>
              <div className="invite">
                <button className="btn p-0">
                  <img src={InviteButton} style={{width:"100%"}}/>
                </button>
                <button className="btn p-0" >
                  <img src={CopyButton} style={{width:"100%"}}/>
                </button>
              </div>
            </div>
          </>
        ):(
          <>
            <div className="ranking-container">
              <div className="ranking-tabs">
                <button className="btn text-white" onClick={(e) => {setOpenTeam(false);}}>INDIVIDUAL</button>
                <button className="btn text-white" onClick={(e) => {setOpenTeam(true);}}>TEAM</button>
              </div>
              <ul>
                  {!openTeam ? (
                    <>
                      <li>
                        <div className="ranking-item-top">
                          <div className="ranking-number">
                            <img src={GoldTrophy} />
                            {/* <p style={{width:"8%"}}>1</p> */}
                          </div>
                          <div className="ranking-user-details">
                            <img src={ProfilePic} />
                            <p>Layla</p>
                          </div>
                          <div className="ranking-total-points">
                            <img src={GoldCoin} />
                            <p>43652134356178321</p>
                            {/* <p>43652131</p> */}
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="ranking-item-top">
                          <div className="ranking-number">
                            <img src={SilverTrophy} />
                            {/* <p style={{width:"8%"}}>1</p> */}
                          </div>
                          <div className="ranking-user-details">
                            <img src={ProfilePic} />
                            <p>Layla</p>
                          </div>
                          <div className="ranking-total-points">
                            <img src={GoldCoin} />
                            <p>43652134356178321</p>
                            {/* <p>43652131</p> */}
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="ranking-item-top">
                          <div className="ranking-number">
                            <img src={BronzeTrophy} />
                            {/* <p style={{width:"8%"}}>1</p> */}
                          </div>
                          <div className="ranking-user-details">
                            <img src={ProfilePic} />
                            <p>Layla</p>
                          </div>
                          <div className="ranking-total-points">
                            <img src={GoldCoin} />
                            <p>43652134356178321</p>
                            {/* <p>43652131</p> */}
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="ranking-item-others">
                          <div className="ranking-number">
                            {/* <img src={GoldTrophy} /> */}
                            <p>4</p>
                          </div>
                          <div className="ranking-user-details">
                            <img src={ProfilePic} />
                            <p>Layla</p>
                          </div>
                          <div className="ranking-total-points">
                            <img src={GoldCoin} />
                            <p>43652134356178321</p>
                            {/* <p>43652131</p> */}
                          </div>
                        </div>
                      </li>
                    </>
                  ):(
                    <>
                      <li>
                        <div className="ranking-item-content">
                          <h3>TEAMS COMING SOON</h3>
                        </div>
                      </li>
                    </>
                  )} 
              </ul>
            </div>
            <div className="invite-leaderboard">
              <button className="btn p-0">
                <img src={InviteButton} style={{width:"100%"}}/>
              </button>
              <button className="btn p-0" >
                <img src={CopyButton} style={{width:"100%"}}/>
              </button>
            </div>
          </>
        )}
      </div>
    </>
  )
}

export default GooGooPage;