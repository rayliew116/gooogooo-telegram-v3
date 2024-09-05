// import Countdown, { zeroPad } from 'react-countdown';
// import Moment from 'moment';
// import { useClaim } from './hooks/useClaim';
// import { CopyToClipboard } from 'react-copy-to-clipboard';
import React, { useEffect, useState, useRef } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, NavLink, useLocation } from 'react-router-dom';

// Import images
import StartGame from './assets/img/start-button.png';
import StartModal from './assets/img/start-modal.png';
import MainLogo from './assets/img/header-logo.png';
import GoooGooo from './assets/img/gg-main.png';
import ChangeSkinIcon from './assets/img/change-skin-icon.png';
import NavHome from './assets/img/nav-home.png';
import NavGG from './assets/img/nav-gooogooo.png';
import NavEarn from './assets/img/nav-earn.png';
import NavFriends from './assets/img/nav-friends.png';
import NavBuild from './assets/img/nav-build.png';
import PointsBar from './assets/img/points-bar.png';
import LanguageIcon from './assets/img/language-icon.png';
import MusicIcon from './assets/img/music-icon.png';
// import AlienCoin from './assets/img/alien-coin.png'
import Explode from './assets/img/explode.gif';
import CoinBubble from './assets/img/coin-bubble.png';
import AlienCoinBag from './assets/img/alien-coinbag.gif'


// Import sound effects
import Kaching from './assets/sound/coin.mp3';
import BGMusic from './assets/sound/Gold Coins - Rolla Coasta (reduced).mp3';

// Import pages here
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
  const [points, setPoints] = useState(0);
  const [aliens, setAliens] = useState<Alien[]>([]);
  const alienIdRef = useRef(0);  // To keep track of unique IDs for aliens

  const [clickImages, setClickImages] = useState<ClickImage[]>([]);

  const bgm = useRef<HTMLAudioElement | null>(null);
  const [bgmIsPlaying, setBgmIsPlaying]= useState(false);

  const alienPop = useRef<HTMLAudioElement | null>(null);

  const gameWidth = window.innerWidth;
  const gameHeight = window.innerHeight * 0.5;

  const generateRandomPosition = (size: number, max: number) => {
    const margin = 5;
    return Math.random() * (max - size - margin * 2) + margin;
  };

  const getAlienSizeAndImage = (type: AlienType) => {
    return { size: 80, image: AlienCoinBag };
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
  
  const handleAlienClick = (event: React.MouseEvent) => {
    const alienBox = event.currentTarget as HTMLElement;
    const rect = alienBox.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    if (alienPop.current) {
      alienPop.current.play().catch(error => {
          console.error('Error playing sound:', error);
      });
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
              alienPop.current.play().catch(error => {
                  console.error('Failed to play audio:', error);
              });
          }
          return { ...alien, animation: true, showPlusOne: true, collided: true };
      }
      return alien;
    }));
  
    setPoints(prevPoints => prevPoints + (isAlienClicked ? 100 : 1));

    if (isAlienClicked) {
        setTimeout(() => {
        setAliens([]);
        const regenerationDelay = Math.random() * (2 - 1) * 60 * 1000 + 1 * 60 * 1000;
        setTimeout(() => {
            generateAlien();
        }, regenerationDelay); 
    }, 1000);
    }
  };

  useEffect(() => {
    bgm.current = new Audio(BGMusic);
    bgm.current.loop = true;
    alienPop.current = new Audio(Kaching);

    const initialDelay = Math.random() * (2 - 1) * 60 * 1000 + 1 * 60 * 1000;

    const initialAlienTimeout = setTimeout(() => {
      generateAlien();
    }, initialDelay);
    // generateAlien();
    return () => {
      clearTimeout(initialAlienTimeout);
      setAliens([]);
    };
  }, [gameWidth, gameHeight]);

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
      <div className="row">
        <div className="col-12 px-0">
          <div className="game-bg">
            <div className="row header-box">
              {/* <div className="col-3"></div> */}
              <div className="col-6 text-center">
                <img className="header-logo" src={MainLogo} />
              </div>
              <div className="col-6 header-icons-box">
                <button disabled className="btn p-0">
                  <img className="header-icons" src={LanguageIcon}/>
                </button>
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
                      >
                        <div 
                          className="aliens-box" 
                          style={{
                            position: 'relative',
                            width: '100%', 
                            height: '100%',
                            zIndex: 2, 
                          }}
                          onClick={handleAlienClick}
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
                          {clickImages.map(image => (
                            <img
                              className="plus-one-animation"
                              key={image.id}
                              src={CoinBubble}
                              style={{
                                position: 'absolute',
                                left: image.x,
                                  top: image.y,
                                  width: '50px', // Adjust size as needed
                                  height: '50px',
                                transform: 'translate(-50%, -50%)',
                                pointerEvents: 'none',
                                transition: 'transform 0.5s ease, opacity 0.5s ease'
                              }}
                            />
                          ))}
                        </div>
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