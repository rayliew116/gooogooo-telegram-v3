// import Countdown, { zeroPad } from 'react-countdown';
// import Moment from 'moment';
// import { useClaim } from './hooks/useClaim';
// import { CopyToClipboard } from 'react-copy-to-clipboard';
import React, { useEffect, useState, useRef } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, NavLink, useLocation } from 'react-router-dom';

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
import AlienMedium from './assets/img/new/alien-medium.png'
import AlienSmall from './assets/img/new/alien-small.png'
import Pop from './assets/img/new/pop.png'
import Explode1 from './assets/img/new/exposion.gif'

// Import sound effects
// import GGSound from './assets/sound/gg-sound.mp3';
// import BubblePop from './assets/sound/bubble.mp3';
import BubblePop from './assets/sound/continuous-bubble-pop.mp3';
import CrystalPop from './assets/sound/crystal2.mp3';
import BGMusic from './assets/sound/gooogoooplanet-low.mp3';

// Import pages here
import GooGooPage from './pages/GooGooPage/GooGoo';
import ReferralPage from './pages/ReferralPage/Referral';
import EarnPage from './pages/EarnPage/Earn';
import FriendsPage from './pages/FriendsPage/Friends';
import AirdropPage from './pages/AirdropPage/Airdrop';

type AlienType = 'large' | 'medium' | 'small';

  interface Alien {
    id: number;
    x: number;
    y: number;
    type: AlienType;
    collided?: boolean;
    animation?: boolean;
  }

const App: React.FC = () => {

  const location = useLocation();
  const [points, setPoints] = useState(0);
  const [aliens, setAliens] = useState<Alien[]>([]);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isMoving, setIsMoving] = useState(false);
  const movementTimeoutRef = useRef<number | null>(null);
  const alienIdRef = useRef(0);  // To keep track of unique IDs for aliens

  const bgm = useRef<HTMLAudioElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const alienPop = useRef<HTMLAudioElement | null>(null);

  const gameWidth = window.innerWidth;
  const gameHeight = window.innerHeight * 0.5;

  useEffect(() => {

    bgm.current = new Audio(BGMusic);
    bgm.current.loop = true;

    alienPop.current = new Audio(CrystalPop);

    audioRef.current = new Audio(BubblePop);
    // audioRef.current.loop = true;  // Loop the audio while moving

    const alienBox = document.querySelector('.aliens-box');
    const boxWidth = alienBox?.clientWidth || gameWidth;
    const boxHeight = alienBox?.clientHeight || gameHeight;

    const generateRandomPosition = (size: number, max: number) => {
      const margin = 5;  // Adjusted margin to prevent clustering
      return Math.random() * (max - size - margin * 2) + margin;  // Ensures the alien stays within bounds
    };

    
    // Generate random aliens on load
    const generatedAliens: Alien[] = [];
    for (let i = 0; i < 10; i++) { // You can adjust the number of aliens
      const type: AlienType = Math.random() < 0.33 ? 'large' : Math.random() < 0.5 ? 'medium' : 'small';
      const { size } = getAlienSizeAndImage(type);
      generatedAliens.push({
        id: alienIdRef.current++,
        x: generateRandomPosition(size, boxWidth),
        y: generateRandomPosition(size, boxHeight),
        type,
      });

    }
    setAliens(generatedAliens);

    const maxAliens = 25;

    // Set up interval to generate new aliens
    const alienInterval = setInterval(() => {
      const type: AlienType = Math.random() < 0.33 ? 'large' : Math.random() < 0.5 ? 'medium' : 'small';
      const { size } = getAlienSizeAndImage(type);

      setAliens(prevAliens => {
        const activeAliens = prevAliens.filter(alien => !alien.collided);

        if (activeAliens.length >= maxAliens) {
          return activeAliens;  // Do not add more aliens if the limit is reached
        }
  
        return [
          ...activeAliens,
        // if (prevAliens.length >= maxAliens) {
        //   return prevAliens;  // Do not add more aliens if the limit is reached
        // }
  
        // return [
        //   ...prevAliens,
          {
            id: alienIdRef.current++,
            x: generateRandomPosition(size, boxWidth),
            y: generateRandomPosition(size, boxHeight),
            type,
            collided: false,
            animation: false,
          },
        ];
      });

    }, 500);

    // Clean up interval on component unmount
    return () => clearInterval(alienInterval);


  }, [gameWidth, gameHeight]);

  const handleMovement = (x: number, y: number) => {
    setCursorPosition({ x, y });
    setIsMoving(true);

    // Clear previous timeout if it exists
    if (movementTimeoutRef.current) {
      clearTimeout(movementTimeoutRef.current);
    }

    // Set a timeout to detect when movement stops
    movementTimeoutRef.current = window.setTimeout(() => {
      setIsMoving(false);
      // if (audioRef.current) {
      //   audioRef.current.pause();
      //   audioRef.current.currentTime = 0;  // Reset sound to the beginning
      // }
    }, 200);  // Adjust the delay as needed


    // Check for collisions and update points and alien list
    setAliens(prevAliens =>
      // prevAliens.filter(alien => {
      prevAliens.map(alien => {
        const { size } = getAlienSizeAndImage(alien.type);
        const isColliding =
          x >= alien.x &&
          x <= alien.x + size &&
          y >= alien.y &&
          y <= alien.y + size;
        

        if (isColliding && !alien.collided ) {

          if (!alien.animation) {
            setPoints(prevPoints => prevPoints + 1);
          }

          if (alienPop.current) {
            alienPop.current.play().catch(error => {
              console.error('Failed to play audio:', error);
            });
          }
        
          const updatedAlien = { ...alien, animation: true };

          // Delay setting collided to true
          setTimeout(() => {
            setAliens(prevAliens => 
              prevAliens.map(a => 
                a.id === alien.id ? { ...a, collided: true } : a
              )
            );
          }, 1000);
        
          return updatedAlien;
        }

        return alien;
      })
    );



  };

  const handleMouseMove = (event: React.MouseEvent) => {
    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    handleMovement(x, y);
  };

  const handleTouchMove = (event: React.TouchEvent) => {
    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
    const touch = event.touches[0];
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;
    handleMovement(x, y);
  };

  const getAlienSizeAndImage = (type: AlienType) => {
    switch (type) {
      case 'large':
        return { size: 125, image: AlienBig };
      case 'medium':
        return { size: 105, image: AlienMedium };
      case 'small':
        return { size: 85, image: AlienSmall };
      default:
        return { size: 75, image: AlienMedium };
    }
  };

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
            <div className="row header-section">
              <div className="col-3"></div>
              <div className="col-6 text-center">
                <img className="header-logo" src={MainLogo} />
              </div>
              <div className="col-3 header-icons-box">
                <button className="btn p-0"><img className="header-icons" src={LanguageIcon}/></button>
                <button className="btn p-0" onClick={(e) => {
                  if (bgm.current && bgm.current.paused) {
                    bgm.current.play();
                  }

                }}>
                  <img className="header-icons" src={MusicIcon}/>

                </button>
              </div>
            </div>
            <Routes>
              <Route path="/" element={
                <>
                  <div className="row">
                    <div className="col-12 text-center">
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
                    </div>
                    <div className="col-12 mb-5">
                      <div 
                        onMouseMove={handleMouseMove} 
                        onTouchMove={handleTouchMove} 
                        className='gg-swipe' 
                        style={{
                          width: `${gameWidth}px`,
                          height: `${gameHeight}px`,
                          position: 'relative', 
                          // overflow: 'hidden',
                          margin: '0 auto',  
                          display: 'flex', 
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        {/* <img 
                          src={GoooGoooGif} 
                          alt="GoooGooo Gif" 
                          style={{
                            position: 'absolute',
                            left: '50%', 
                            top: '50%', 
                            transform: 'translate(-50%, -50%)', 
                            zIndex: 1, 
                            width: '280px', 
                            height: 'auto',
                          }}
                        /> */}
                          <img
                          src={GoooGoooGif}
                          alt="GoooGooo"
                          style={{
                            position: 'absolute',
                            left: cursorPosition.x - 50, // Centering GoooGooo on the cursor
                            top: cursorPosition.y - 50,
                            zIndex: 1000,
                            width: '180px',
                            height: '180px',
                            pointerEvents: 'none', // Prevent interfering with cursor interaction
                          }}
                        />
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
                              <img 
                                key={alien.id} 
                                src={alien.animation ? Explode1 : image} 
                                alt="Alien" 
                                className={alien.animation ? 'pan-animation' : ''}
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
                            );
                          })}
                        </div>
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
                <NavLink to="/friends" className={({ isActive }) => (isActive ? 'active-link' : '')}
                  onClick={(e) => {
                    window.scrollTo(0, 0);
                  }}>
                  <img className="nav-img "src={NavFriends} />
                  <p>Friends</p>
                </NavLink>
              </li>
              <li>
                <NavLink to="/airdrop" className={({ isActive }) => (isActive ? 'active-link' : '')}
                  onClick={(e) => {
                    window.scrollTo(0, 0);
                  }}>
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
