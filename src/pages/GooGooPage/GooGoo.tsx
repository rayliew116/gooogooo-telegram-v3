import React, { useEffect, useState, useRef } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, NavLink } from 'react-router-dom';
import './googoo-page.css';

// Import images here
import NavAirdrop from '../../assets/img/nav-airdrop.png';
import ProfilePic from '../../assets/img/profile-pic.png';
import LevelBox from '../../assets/img/level-box.png';
import ReferralButton from '../../assets/img/referral-button.png';
import LockedItem from '../../assets/img/locked.png';
import SampleOne from '../../assets/img/item-sample1.png';
import SampleTwo from '../../assets/img/item-sample2.png';
import SampleThree from '../../assets/img/item-sample3.png';
import SampleFour from '../../assets/img/item-sample4.png';

import PointsBar from '../../assets/img/points-bar.png';

import GoooGooo from '../../assets/img/gg-main.png';
import AliensGroup from './img/aliens.png';

interface Props {}

const GooGooPage = (props: Props) => {

  const [openReferral, setOpenReferral] = useState(false);

  return (
    <>
      {!openReferral ? (
        <>
          <div className="row">
    
            {/* Profile Area */}
            <div className="col-12 text-center">
              <img className="profile-pic" src={ProfilePic} alt="" />
              <br></br>
              <div className="lvl-container">
                <img className="profile-lvl" src={LevelBox} alt="" />
                <h5 className="brand-yellow lvl-text">LEVEL 4</h5>
              </div>
            </div>
    
            <div className="col-12 text-center">
              <div className="total-earned">
                <img className="total-earned" src={PointsBar} alt="" />
                <h2 className="m-0">0</h2>
              </div>
            </div>
    
            <div className="col-12 text-center">
              <button className="btn refer-btn p-0" style={{backgroundColor:"transparent"}} onClick={(e) => {
                setOpenReferral(true);
              }}>
                <img className="w-100" src={ReferralButton} alt="" />
              </button>
            </div>
    
          </div>
    
          <div className="row mt-3 px-5">
            <div className="col-3 text-center px-0">
              <img className="w-100" src={SampleOne} alt="" />
            </div>
            <div className="col-3 text-center px-0">
              <img className="w-100" src={SampleTwo} alt="" />
            </div>
            <div className="col-3 text-center px-0">
              <img className="w-100" src={SampleThree} alt="" />
            </div>
            <div className="col-3 text-center px-0">
              <img className="w-100" src={SampleFour} alt="" />
            </div>
            <div className="col-3 text-center px-0">
              <img className="w-100" src={LockedItem} alt="" />
            </div>
            <div className="col-3 text-center px-0">
              <img className="w-100" src={LockedItem} alt="" />
            </div>
            <div className="col-3 text-center px-0">
              <img className="w-100" src={LockedItem} alt="" />
            </div>
            <div className="col-3 text-center px-0">
              <img className="w-100" src={LockedItem} alt="" />
            </div>
            <div className="col-3 text-center px-0">
              <img className="w-100" src={LockedItem} alt="" />
            </div>
            <div className="col-3 text-center px-0">
              <img className="w-100" src={LockedItem} alt="" />
            </div>
            <div className="col-3 text-center px-0">
              <img className="w-100" src={LockedItem} alt="" />
            </div>
            <div className="col-3 text-center px-0">
              <img className="w-100" src={LockedItem} alt="" />
            </div>
          </div>
        </>
      ):(
        <>
          <div className="row">
    
            {/* Gooo Gooo & Friends */}
            <div className="col-12 text-center mt-3">
              <div className="aliens-container">
                <img className="w-100" src={AliensGroup} alt="" />
              </div>
              <img className="gooogooo" src={GoooGooo} alt=""/>
            </div>

            <div className="col-12 text-center">
              <p className="text-white" style={{fontSize:"14px"}}>Help Gooo Gooo find more aliens:</p>
            </div>

          </div>
        </>
      )}
    </>
  )
}

export default GooGooPage;