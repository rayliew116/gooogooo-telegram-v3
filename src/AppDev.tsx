// import Countdown, { zeroPad } from 'react-countdown';
// import Moment from 'moment';
// import { useClaim } from './hooks/useClaim';
// import { CopyToClipboard } from 'react-copy-to-clipboard';
import React, { useEffect, useState, useRef } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, NavLink } from 'react-router-dom';
import { useSwipeable } from 'react-swipeable'

// Import images
import MainLogo from './assets/img/new/logo.png';
import GoooGooo from './assets/img/new/gg-main.png';
import GoooGoooGif from './assets/img/new/gg.gif';
import NavHome from './assets/img/new/nav-home.png';
import NavGG from './assets/img/new/nav-gooogooo.png';
import NavEarn from './assets/img/new/nav-earn.png';
import NavFriends from './assets/img/new/nav-friends.png';
import NavAirdrop from './assets/img/new/nav-airdrop.png';
import TotalPoints from './assets/img/new/total-points.png';
import LanguageIcon from './assets/img/new/language-icon.png'
import MusicIcon from './assets/img/new/music-icon.png'

// import pages here
import GooGooPage from './pages/GooGooPage/GooGoo';
import EarnPage from './pages/EarnPage/Earn';
import FriendsPage from './pages/FriendsPage/Friends';
import AirdropPage from './pages/AirdropPage/Airdrop';

const App: React.FC = () => {
  
  // Menu State
  const [activeLink, setActiveLink] = useState<string | null>(null);
  
  const [points, setPoints] = useState(0);
  const lastSwipeDirectionRef = useRef<string | null>(null);
  const lastSwipeTimeRef = useRef(Date.now());
  const swiperNoSwiping = useSwipeable({
    onSwiping: (eventData) => {
      const now = Date.now();
      if (
        eventData.dir !== lastSwipeDirectionRef.current ||
        now - lastSwipeTimeRef.current > 600
      ) {
        setPoints(points+1);
        lastSwipeDirectionRef.current = eventData.dir;
        lastSwipeTimeRef.current = now;
      }
    },
    trackMouse: true,
  });
  
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('referral_code');
  }, []);

  return (
    <Router>
      <div className="container game-container">
        <div className="row">
          <div className="col-12 px-0">
            <div className="game-bg pb-5">
              <div className="row header-section">
                <div className="col-12 header-box">
                  <div className="header-logo">
                    <img className="header-logo" src={MainLogo} style={{display:"block"}} />
                  </div>
                  <div className="header-icons">
                    <button className="btn" style={{backgroundColor:"transparent"}}><img src={LanguageIcon} alt="" /></button>
                    <button className="btn" style={{backgroundColor:"transparent"}}><img src={MusicIcon} alt="" /></button>
                  </div>
                </div>
              </div>

              <Routes>
                <Route path="/" element={
                  <>
                    <div className="row">
                      <div className="col-12 text-center mb-5">
                        <h4 className="text-white">Swipe Me!</h4>
                        <div className="total-earned">
                          <img className="total-earned" src={TotalPoints} alt="" />
                          <h2 className="m-0">{points.toLocaleString()}</h2>
                        </div>
                        <div className="gg-swipe" {...swiperNoSwiping} style={{touchAction: 'pan-y'}}>
                          <img src={GoooGoooGif} alt="" />
                        </div>
                      </div>
                    </div>
                  </>
                }/>
                <Route path="/googoo" element={<GooGooPage/>}/>
                <Route path="/earn" element={<EarnPage/>}/>
                <Route path="/friends" element={<FriendsPage/>}/>
                <Route path="/airdrop" element={<AirdropPage/>}/>
              </Routes>

              <div className="navbar py-0" id='navbar'>
                <ul>
                  <li>
                    <NavLink to="/" className={({ isActive }) => (isActive ? 'active-link' : '')}>
                      <img src={NavHome} style={{width:"70px"}}alt="" />
                      <p>Home</p>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/googoo" className={({ isActive }) => (isActive ? 'active-link' : '')}>
                      <img src={NavGG} style={{width:"70px"}}alt="" />
                      <p>Goo Goo</p>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/earn" className={({ isActive }) => (isActive ? 'active-link' : '')}>
                      <img src={NavEarn} style={{width:"70px"}}alt="" />
                      <p>Earn</p>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/friends" className={({ isActive }) => (isActive ? 'active-link' : '')}>
                      <img src={NavFriends} style={{width:"70px"}}alt="" />
                      <p>Friends</p>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/airdrop" className={({ isActive }) => (isActive ? 'active-link' : '')}>
                      <img src={NavAirdrop} style={{width:"70px"}}alt="" />
                      <p>Airdrop</p>
                    </NavLink>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="modal fade" id="claimModal" tabIndex={-1} aria-labelledby="claimModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="claimModalLabel">Claim Your Points</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body text-center">
              <p>You have earned {pointsEarned} points!</p>
              {boostedPoints > 0 && <p>With your boosters, you earned a total of {boostedPoints} points!</p>}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div> */}
    </Router>
  );

}


export default App;
