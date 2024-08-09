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

// Import sound effects
import GGSound from './assets/sound/gg-sound.mp3'

// Import pages here
import GooGooPage from './pages/GooGooPage/GooGoo';
import ReferralPage from './pages/ReferralPage/Referral';
import EarnPage from './pages/EarnPage/Earn';
import FriendsPage from './pages/FriendsPage/Friends';
import AirdropPage from './pages/AirdropPage/Airdrop';

const App: React.FC = () => {
  
  const [points, setPoints] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);
  const lastSwipeDirectionRef = useRef<string | null>(null);
  const lastSwipeTimeRef = useRef(Date.now());
  const swipeSound = useRef<HTMLAudioElement | null>(null);
  const holdIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const playSwipeSound = () => {
    if (swipeSound.current && !swipeSound.current.onplaying) {
      swipeSound.current.currentTime = 0;
      swipeSound.current.play();
    }
  };
  const stopSwipeSound = () => {
    if (swipeSound.current) {
      swipeSound.current.pause(); 
      swipeSound.current.currentTime = 0; 
    }
  };
  const handleSoundEnd = () => {
    if (isSwiping && swipeSound.current) {
      swipeSound.current.play(); 
    }
  };
  const startHoldInterval = () => {
    holdIntervalRef.current = setInterval(() => {
      setPoints((prevPoints) => prevPoints + 1);
    }, 300); // Increment every 100ms
  };

  const stopHoldInterval = () => {
    if (holdIntervalRef.current) {
      clearInterval(holdIntervalRef.current);
      holdIntervalRef.current = null;
    }
  };
  

  const swiperNoSwiping = useSwipeable({
    onSwiping: (eventData) => {
      const now = Date.now();
      if (!isSwiping) {
        setIsSwiping(true);
        playSwipeSound();
        startHoldInterval();
      }
      if (
        eventData.dir !== lastSwipeDirectionRef.current ||
        now - lastSwipeTimeRef.current > 300
      ) {
        setPoints((prevPoints) => prevPoints + 1);
        lastSwipeDirectionRef.current = eventData.dir;
        lastSwipeTimeRef.current = now;
      }
    },
    onSwiped: () => {
      setIsSwiping(false);
      stopSwipeSound();
    
      stopHoldInterval();
  
    },
    trackMouse: true,
  });
  
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('referral_code');
    return () => {
      stopHoldInterval(); // Cleanup interval on component unmount
    };
  }, []);

  return (
    <Router>
      <div className="container game-container">
        <div className="row">
          <div className="col-12 px-0">
            <div className="game-bg">
              <div className="row header-section">
                <div className="col-3"></div>
                <div className="col-6 text-center">
                  <img className="header-logo" src={MainLogo} style={{display:"block"}} />
                </div>
                <div className="col-3 text-right">
                  {/* <button className="btn p-0" style={{backgroundColor:"transparent"}}><img className="header-icons" src={LanguageIcon} alt="" /></button> */}
                  <button className="btn p-0" style={{backgroundColor:"transparent"}}><img className="header-icons" src={MusicIcon} alt="" /></button>
                </div>
                {/* <div className="col-12 header-box">
                </div> */}
              </div>
              <Routes>
                <Route path="/" element={
                  <>
                    <div className="row">
                      <div className="col-12 text-center mb-5">
                        <div className="total-earned">
                          <img className="total-earned" src={TotalPoints} alt="" />
                          <h2 className="m-0">{points.toLocaleString()}</h2>
                        </div>
                        <div className="gg-swipe" {...swiperNoSwiping} style={{touchAction: 'pan-y'}}>
                        <audio ref={swipeSound} src={GGSound} onEnded={handleSoundEnd}/>
                        {isSwiping ? (
                           <img src={GoooGoooGif} alt="" />
                        ) : (
                          <img src={GoooGooo} alt="" />
                        )}
                         
                        </div>
                      </div>
                    </div>
                  </>
                }/>
                <Route path="/googoo" element={<GooGooPage/>}/>
                <Route path="/referral" element={<ReferralPage/>}/>
                <Route path="/earn" element={<EarnPage/>}/>
                <Route path="/friends" element={<FriendsPage/>}/>
                <Route path="/airdrop" element={<AirdropPage/>}/>
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </div>
            <div className="navbar p-0" id='navbar'>
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
                    <p>Gooo Gooo</p>
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
