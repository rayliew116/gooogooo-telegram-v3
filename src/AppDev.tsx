// import Countdown, { zeroPad } from 'react-countdown';
// import Moment from 'moment';
// import { useClaim } from './hooks/useClaim';
// import { CopyToClipboard } from 'react-copy-to-clipboard';
import React, { useEffect, useState, useRef } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, NavLink, useLocation } from 'react-router-dom';
import { useSwipeable, SwipeableHandlers } from 'react-swipeable'
import Hammer from 'hammerjs';


// Import images
import MainLogo from './assets/img/new/logo.png';
import GoooGooo from './assets/img/new/gg-main.png';
import GoooGoooGif from './assets/img/new/gg.gif';
import NavHome from './assets/img/new/nav-home.png';
import NavGG from './assets/img/new/nav-gooogooo.png';
import NavEarn from './assets/img/new/nav-earn.png';
import NavFriends from './assets/img/new/nav-friends.png';
import NavAirdrop from './assets/img/new/nav-airdrop.png';
import PointsBar from './assets/img/new/points-bar.png';
import LanguageIcon from './assets/img/new/language-icon.png'
import MusicIcon from './assets/img/new/music-icon.png'
import ExpBar from './assets/img/new/expbar-empty.png'
import ExpBarProgress from './assets/img/new/expbar-progress.png'
import ExpBarIcon from './assets/img/new/expbar-icon.png'
import AlienBig from './assets/img/new/alien-big.png'

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
  const location = useLocation();
  // const [imageKey, setImageKey] = useState(0);

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
  const handleSwipe: SwipeableHandlers = useSwipeable({
    onSwiped: () => {
      setPoints((prevPoints) => prevPoints + 1);
      // setImageKey((prevKey) => prevKey + 1); // Force re-render to add a new image
    },
    trackMouse: true, // Optional: allows mouse swiping
  });
  // const generateRandomPosition = (): { top: number; left: number } => {
  //   const top = Math.random() * (window.innerHeight - 100); // Adjust 100 to your image height
  //   const left = Math.random() * (window.innerWidth - 100);  // Adjust 100 to your image width
  //   return { top, left };
  // };
  
  const swiperNoSwiping = useSwipeable({
    onSwiping: (eventData) => {
      const now = Date.now();
      if (!isSwiping) {
        setIsSwiping(true);
        playSwipeSound();
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
    },
    trackMouse: true,
  });

  // useEffect(() => {
  //   const addImageToGameArea = () => {
  //     const gameArea = document.getElementById('gameArea');
  //     if (gameArea) {
  //       const img = document.createElement('img');
  //       img.src = AlienBig; // Replace with your image path
  //       img.style.position = 'absolute';
  //       img.style.width = '20%'

  //       const { top, left } = generateRandomPosition();
  //       img.style.top = `${top}px`;
  //       img.style.left = `${left}px`;
  //       img.style.zIndex = '1000'; // Ensure image is on top

  //       // Attach swipeable behavior directly using the handlers
  //       Object.assign(img, handleSwipe);

  //       gameArea.appendChild(img);
  //     }
  //   };
  //   addImageToGameArea(); // Add the image when the component mounts or when imageKey changes
  // }, [imageKey]);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('referral_code');
    if (location.pathname === "/") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";  // Reset to default when not on the specific page
    }
    // Cleanup when the component is unmounted or the path changes
    return () => {
      document.body.style.overflow = "";
    };
  }, [location.pathname]);
  


  return (
    <div className="container game-container">
      <div className="row">
        <div className="col-12 px-0">
          <div className="game-bg">
            <div className="row header-section">
              <div className="col-3"></div>
              <div className="col-6 text-center">
                <img className="header-logo" src={MainLogo} />
              </div>
              <div className="col-3 header-icons-box">
                <button className="btn p-0"><img className="header-icons" src={LanguageIcon} alt="" /></button>
                <button className="btn p-0"><img className="header-icons" src={MusicIcon} alt="" /></button>
              </div>
            </div>
            <Routes>
              <Route path="/" element={
                <>
                  <div className="row">
                    <div className="col-12 text-center mb-5">
                      <div className="exp-bar">
                        <div className='exp-bar-text'>
                          <h6>STEEL</h6>
                          <h6>TIERS 4/10</h6>
                        </div>
                        <div className='exp-bar-level'>
                          <img className="exp-icon" src={ExpBarIcon} />
                          <img className="exp-empty" src={ExpBar} />
                          <img className="exp-progress" src={ExpBarProgress} />
                        </div>
                      </div>
                      <div className="total-earned">
                        <img className="total-earned" src={PointsBar} alt="" />
                        <h2 className="m-0">{points.toLocaleString()}</h2>
                      </div>
                      <div id="gameArea" className="gg-swipe" {...swiperNoSwiping} style={{touchAction: 'pan-y'}}>
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
                  <img className="nav-img "src={NavHome} />
                  <p>Home</p>
                </NavLink>
              </li>
              <li>
                <NavLink to="/googoo" className={({ isActive }) => (isActive ? 'active-link' : '')}>
                  <img className="nav-img "src={NavGG} />
                  <p>Gooo Gooo</p>
                </NavLink>
              </li>
              <li>
                <NavLink to="/earn" className={({ isActive }) => (isActive ? 'active-link' : '')}>
                  <img className="nav-img "src={NavEarn} />
                  <p>Earn</p>
                </NavLink>
              </li>
              <li>
                <NavLink to="/friends" className={({ isActive }) => (isActive ? 'active-link' : '')}>
                  <img className="nav-img "src={NavFriends} />
                  <p>Friends</p>
                </NavLink>
              </li>
              <li>
                <NavLink to="/airdrop" className={({ isActive }) => (isActive ? 'active-link' : '')}>
                  <img className="nav-img "src={NavAirdrop} />
                  <p>Airdrop</p>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
      /* <div className="modal fade" id="claimModal" tabIndex={-1} aria-labelledby="claimModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="claimModalLabel">Claim Your Points</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body text-center">
            <p> You have earned {pointsEarned} points!</p>
            {boostedPoints > 0 && <p>With your boosters, you earned a total of {boostedPoints} points!</p>}
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-primary" data-bs-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div> */

  );
}


export default App;
