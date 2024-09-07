// import Countdown, { zeroPad } from 'react-countdown';
// import Moment from 'moment';
// import { useClaim } from './hooks/useClaim';
// import { CopyToClipboard } from 'react-copy-to-clipboard';
import React, { useEffect, useState, useRef } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, NavLink, useLocation } from 'react-router-dom';

// Import images
import StartCover from './assets/img/start-cover.png'
import StartGame from './assets/img/start-button.png';
import StartModal from './assets/img/start-modal.png';
import MainLogo from './assets/img/header-logo.png';
import LanguageIcon from './assets/img/language-icon.png';
import MusicIcon from './assets/img/music-icon.png';
import ChangeSkinIcon from './assets/img/change-skin-icon.png';

import GoooGooo from './assets/img/gg-main.png';
import PointsBar from './assets/img/points-bar.png';

import NavHome from './assets/img/nav-home.png';
import NavGG from './assets/img/nav-gooogooo.png';
import NavEarn from './assets/img/nav-earn.png';
import NavFriends from './assets/img/nav-friends.png';
import NavBuild from './assets/img/nav-build.png';

// import AlienCoin from './assets/img/alien-coin.png'
import Explode from './assets/img/explode.gif';
import CoinBubble from './assets/img/coin-bubble.png';
import AlienCoinBag from './assets/img/alien-coinbag.gif'
import CoinFlushImage from './assets/img/money-flush.png'

import SFXOne from './assets/sound/coin-3.mp3';
import SFXTwo from './assets/sound/jackpot.mp3';
import BGMusic from './assets/sound/bgm-reduced.mp3';

import GooGooPage from './pages/GooGooPage/GooGoo';
import ReferralPage from './pages/ReferralPage/Referral';
import EarnPage from './pages/EarnPage/Earn';
import FriendsPage from './pages/FriendsPage/Friends';
import AirdropPage from './pages/AirdropPage/Airdrop';

type AlienType = 'normal';

interface Alien {
  id: number;
  x: number;
  y: number;
  type: AlienType;
  collided?: boolean;
  animation?: boolean;
  showPlusOne? : boolean;
}

interface ClickImage {
  id: number;
  x: number;
  y: number;
}

const App: React.FC = () => {

  const location = useLocation();
  const [startGame, setStartGame] = useState(false);
  const [toGame, setToGame] = useState(false);
  const [points, setPoints] = useState(0);
  const [aliens, setAliens] = useState<Alien[]>([]);
  const alienIdRef = useRef(0);
  const [clickImages, setClickImages] = useState<ClickImage[]>([]);

  const [isFlushing, setIsFlushing] = useState(false);
  const [gamePaused, setGamePaused] = useState(false);

  const bgm = useRef<HTMLAudioElement | null>(null);
  const [bgmIsPlaying, setBgmIsPlaying]= useState(false);
  const alienPop = useRef<HTMLAudioElement | null>(null);
  const coinSFX = useRef<HTMLAudioElement | null>(null);

  const gameWidth = window.innerWidth;
  const gameHeight = window.innerHeight * 0.5;

  const isTouchRef = useRef(false);

  const generateRandomPosition = (size: number, max: number) => {
    const margin = 5;
    return Math.random() * (max - size - margin * 2) + margin;
  };

  const getAlienSizeAndImage = (type: AlienType) => {
    return { size: 140, image: AlienCoinBag };
  };

  const generateAlien = () => {
    const alienBox = document.querySelector('.aliens-box');
    const boxWidth = alienBox?.clientWidth || gameWidth;
    const boxHeight = alienBox?.clientHeight || gameHeight;
    const { size } = getAlienSizeAndImage('normal');
    const newAlien: Alien = {
      id: alienIdRef.current++,
      x: generateRandomPosition(size, boxWidth),
      y: generateRandomPosition(size, boxHeight),
      type: 'normal',
      collided: false,
      animation: false,
      showPlusOne: false,
    };
    setAliens([newAlien]);
  };
  
  const handleAlienClick = (event: React.TouchEvent | React.MouseEvent) => {
    if (gamePaused) return;

    if (event.type === 'touchstart') {
      isTouchRef.current = true; // Set flag for touch event
    } else if (isTouchRef.current) {
      return; // Skip mouse event if touch event occurred
    }

    const alienBox = event.currentTarget as HTMLElement;
    const rect = alienBox.getBoundingClientRect();

    let touches = [];

    if (event.type === 'touchstart') {
      // Handle touch events
      touches = Array.from((event as React.TouchEvent).touches);
    } else {
      // Handle mouse events (convert the mouse position to mimic a touch point)
      const mouseEvent = event as React.MouseEvent;
      touches = [{ clientX: mouseEvent.clientX, clientY: mouseEvent.clientY }];
    }

    touches.forEach((touch) => {
      const x = touch.clientX - rect.left;
      const y = touch.clientY - rect.top;

      if (coinSFX.current) {
        const newSound = coinSFX.current.cloneNode(true) as HTMLAudioElement;
        newSound.play();
      }

      const goooGoooElement = document.querySelector('.gooogooo-game img');

      if (goooGoooElement) {
        goooGoooElement.classList.add('glow');

        setTimeout(() => {
          goooGoooElement.classList.remove('glow');
        }, 100);
      }

      const newImage: ClickImage = { id: Date.now(), x, y };
      setClickImages(prevImages => [...prevImages, newImage]);
      
      setTimeout(() => {
        setClickImages(prevImages => prevImages.filter(image => image.id !== newImage.id));
      }, 1000);

      let isAlienClicked = false;

      setAliens(prevAliens => prevAliens.map(alien => {
        const { size } = getAlienSizeAndImage(alien.type);
        const isColliding = x >= alien.x && x <= alien.x + size && y >= alien.y && y <= alien.y + size;

        if (isColliding && !alien.collided) {
          isAlienClicked = true;
          
          if (alienPop.current) {
            const newSound = alienPop.current.cloneNode(true) as HTMLAudioElement;
            newSound.play();
          }

          setGamePaused(true);
          setIsFlushing(true);

          setTimeout(() => {
            setGamePaused(false);
            setIsFlushing(false);
            
            const regenerationDelay = Math.random() * (2 - 1) * 60 * 1000 + 1 * 60 * 1000;
            setTimeout(() => {
              generateAlien();
            }, regenerationDelay);
          }, 4000);

          return { ...alien, animation: true, showPlusOne: true, collided: true };
        }
        return alien;
      }));
  
      setTimeout(() => {
        setPoints(prevPoints => prevPoints + (isAlienClicked ? 100 : 1));
        // console.log(`Alien clicked: ${isAlienClicked}, points added: ${isAlienClicked ? 100 : 1}`);
      }, 0); // This ensures it runs after setAliens is processed
    });
  };

  useEffect(() => {
    bgm.current = new Audio(BGMusic);
    bgm.current.loop = true;
    coinSFX.current = new Audio(SFXOne);
    alienPop.current = new Audio(SFXTwo);

    const initialDelay = Math.random() * (2 - 1) * 60 * 1000 + 1 * 60 * 1000;

    const initialAlienTimeout = setTimeout(() => {
      generateAlien();
    }, initialDelay);
    // }, );
    return () => {
      clearTimeout(initialAlienTimeout);
      setAliens([]);
    };
  }, [gamePaused, gameWidth, gameHeight]);

  useEffect(() => {
    // const urlParams = new URLSearchParams(window.location.search);
    // const code = urlParams.get('referral_code');
    if (location.pathname === "/") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [location.pathname]);

  return (
    <div className="container game-container">
      {isFlushing && (
        <img src={CoinFlushImage} className="coin-flush-animation" />
      )}

      <div className="row">
        <div className="col-12 px-0">
          <div className="row header-box">
            {/* <div className="col-3"></div> */}
            <div className="col-6 text-center">
              <img className="header-logo" src={MainLogo} />
            </div>
            <div className="col-6 header-icons-box">
              {/* <button disabled className="btn p-0">
                <img className="header-icons" src={LanguageIcon}/>
              </button> */}
              <button className="btn p-0" onClick={(e) => {
                if (bgm.current && bgmIsPlaying) {
                    bgm.current.pause();
                    setBgmIsPlaying(false);
                } else if (bgm.current && !bgmIsPlaying) {
                    bgm.current.play();
                    setBgmIsPlaying(true);
                }
              }}>
                <img className="header-icons" src={MusicIcon}/>
              </button>
            </div>
          </div>
          <div className="game-bg">
            <Routes>
              <Route path="/" element={
                <>
                  <div className={"modal fade" + (!startGame ? " show d-block" : " d-none")} id="claimModal" aria-labelledby="claimModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                      <div className="modal-content start-game-modal">
                        <div className="modal-body text-center">
                          <button className="btn p-0" data-dismiss="modal" onClick={(e) => {
                            setStartGame(true);
                            if (bgm.current && !bgmIsPlaying) {
                              bgm.current.play();
                              setBgmIsPlaying(true);
                            } 
                          }}>
                            <img style={{width:'100%'}} src={StartModal} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12 text-center">
                      <div className="total-earned">
                        <img className="total-earned" src={PointsBar} alt="" />
                        <h2 className="m-0">{points.toLocaleString()}</h2>
                      </div>
                    </div>
                    <div className="col-12">
                      <div           
                        className='gg-swipe' 
                        style={{
                          width: `${gameWidth}px`,
                          maxWidth: '768px',
                          height: `${gameHeight}px`,
                          position: 'relative', 
                          margin: '0 auto',  
                        }}
                        onMouseDown={handleAlienClick}
                        onTouchStart={handleAlienClick}
                      >
                        <div 
                          className="aliens-box" 
                          style={{
                            position: 'relative',
                            width: '100%', 
                            height: '100%',
                            zIndex: 2, 
                          }}
                        >
                          {aliens.map(alien => {
                            const { size, image } = getAlienSizeAndImage(alien.type);
                            return (
                              <React.Fragment key={alien.id}> 
                                <img
                                  src={alien.animation ? Explode : image}
                                  alt="Alien"
                                  className={alien.animation ? 'pan-animation' : 'pop-animation-pan-left'}
                                  style={{
                                    position: 'absolute',
                                    left: alien.x,
                                    top: alien.y,
                                    width: `${size}px`,
                                    height: 'auto',
                                    transform: 'translate(-50%, -50%)',
                                    transition: alien.animation ? 'transform 0.5s ease, opacity 0.5s ease' : 'none',
                                  }}
                                />
                                {alien.showPlusOne && (
                                  <span
                                    className="plus-one-animation"
                                    style={{
                                      position: 'absolute',
                                      left: alien.x,
                                      top: alien.y,
                                      transform: 'translate(-50%, -50%)',
                                      fontSize: '30px',
                                      color: 'white',
                                    }}
                                  >
                                    +100
                                  </span>
                                )}
                              </React.Fragment>
                            );
                          })}
                        </div>
                          {clickImages.map(image => (
                              <img
                                className="plus-one-animation"
                                key={image.id}
                                src={CoinBubble}
                                style={{
                                  position: 'absolute',
                                  left: image.x,
                                    top: image.y,
                                    width: '90px', // Adjust size as needed
                                    height: '90px',
                                  transform: 'translate(-50%, -50%)',
                                  pointerEvents: 'none',
                                  transition: 'transform 0.5s ease, opacity 0.5s ease'
                                }}
                              />
                          ))}
                      </div>
                    </div>
                      
                    {/* <div className='corner-gooogooo'>
                      <img src={ChangeSkinIcon} alt="GoooGooo" />
                    </div> */}
                  </div>
                  <div className='gooogooo-game'>
                    <img src={GoooGooo} />
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
                <NavLink to="/" className={({ isActive }) => (isActive ? 'active-link' : '')}
                  onClick={(e) => {
                    window.scrollTo(0, 0);
                  }}>
                  <img className="nav-img "src={NavHome} />
                  <p>Home</p>
                </NavLink>
              </li>
              <li>
                <NavLink to="/googoo" className={({ isActive }) => (isActive ? 'active-link' : '')}
                  onClick={(e) => {
                    window.scrollTo(0, 0);
                  }}>
                  <img className="nav-img "src={NavGG} />
                  <p>Gooo Gooo</p>
                </NavLink>
              </li>
              <li>
                <NavLink to="/earn" className={({ isActive }) => (isActive ? 'active-link' : '')}
                  onClick={(e) => {
                    window.scrollTo(0, 0);
                  }}>
                  <img className="nav-img "src={NavEarn} />
                  <p>Earn</p>
                </NavLink>
              </li>
              <li>
                {/* <NavLink to="/friends" className={({ isActive }) => (isActive ? 'active-link' : '')}
                  onClick={(e) => {
                    window.scrollTo(0, 0);
                  }}>
                    <img className="nav-img "src={NavFriends} />
                    <p>Friends</p>
                </NavLink> */}
                <button disabled className="btn">
                  <img className="nav-img "src={NavFriends} />
                  <p className="text-white" style={{fontFamily:"Bebas Neue",letterSpacing:"1px"}}>Coming Soon</p>
                </button>
              </li>
              <li>
                {/* <NavLink to="/airdrop" className={({ isActive }) => (isActive ? 'active-link' : '')}
                  onClick={(e) => {
                    window.scrollTo(0, 0);
                  }}>
                  <img className="nav-img "src={NavBuild} />
                  <p>Airdrop</p>
                </NavLink> */}
                <button disabled className="btn">
                  <img className="nav-img "src={NavBuild} />
                  <p className="text-white" style={{fontFamily:"Bebas Neue",letterSpacing:"1px"}}>Coming Soon</p>
                </button>
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