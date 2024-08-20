// import Countdown, { zeroPad } from 'react-countdown';
// import Moment from 'moment';
// import { useClaim } from './hooks/useClaim';
// import { CopyToClipboard } from 'react-copy-to-clipboard';
import React, { useEffect, useState, useRef } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, NavLink, useLocation } from 'react-router-dom';

// Import images
import StartGame from './assets/img/start-now.png';
import MainLogo from './assets/img/logo.png';
import GoooGooo from './assets/img/gg-main.png';
import GoooGoooGif from './assets/img/gg-resized.gif';
import NavHome from './assets/img/nav-home.png';
import NavGG from './assets/img/nav-gooogooo.png';
import NavEarn from './assets/img/nav-earn.png';
import NavFriends from './assets/img/nav-friends.png';
import NavAirdrop from './assets/img/nav-airdrop.png';
import PointsBar from './assets/img/points-bar.png';
import LanguageIcon from './assets/img/language-icon.png';
import MusicIcon from './assets/img/music-icon.png';
import ExpBar from './assets/img/expbar-empty.png';
import ExpBarProgress from './assets/img/expbar-progress.png';
import ExpBarIcon from './assets/img/expbar-icon.png';
// import AlienBig from './assets/img/new-alien.png';
// import AlienMedium from './assets/img/new-alien.png';
// import AlienSmall from './assets/img/new-alien.png';
import Pop from './assets/img/pop.png';
import Explode1 from './assets/img/explosion-resize.gif';
import AlienNormal from './assets/img/alien-new.png'
import AlienBomber from './assets/img/bomber-new.png'
import BiteEffect from './assets/img/bite.gif'

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

type AlienType = 'normal' | 'bomber' ;

interface Alien {
  id: number;
  x: number;
  y: number;
  type: AlienType;
  collided?: boolean;
  animation?: boolean;
  showPlusOne? : boolean;
  bomber? : boolean;
}

const App: React.FC = () => {

  const location = useLocation();
  const [startGame, setStartGame] = useState(false);
  const [points, setPoints] = useState(0);
  const [aliens, setAliens] = useState<Alien[]>([]);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isMoving, setIsMoving] = useState(false);
  const movementTimeoutRef = useRef<number | null>(null);
  const alienIdRef = useRef(0);  // To keep track of unique IDs for aliens
  const [gamePaused, setGamePaused] = useState(false); //
  const [showWhiteScreen, setShowWhiteScreen] = useState(false); //

  const bgm = useRef<HTMLAudioElement | null>(null);
  const [bgmIsPlaying, setBgmIsPlaying]= useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const alienPop = useRef<HTMLAudioElement | null>(null);

  const gameWidth = window.innerWidth;
  const gameHeight = window.innerHeight * 0.5;

  useEffect(() => {

    bgm.current = new Audio(BGMusic);
    bgm.current.loop = true;
    alienPop.current = new Audio(CrystalPop);

    // audioRef.current = new Audio(BubblePop);
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
      const type: AlienType =  Math.random() < 0.995 ? 'normal' : 'bomber';
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
      if (gamePaused) return; //

      const type: AlienType =  Math.random() < 0.995 ? 'normal' : 'bomber';
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
            showPlusOne: false,
          },
        ];
      });

    }, 300);

    // Clean up interval on component unmount
    return () => clearInterval(alienInterval);
  }, [gamePaused, gameWidth, gameHeight]); //

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
          if (alien.type === 'bomber') { //
            handleBomberCollision();
            return { ...alien, collided: true };
          } //

          if (!alien.animation) {
            setPoints(prevPoints => prevPoints + 1);
          }

          if (alienPop.current) {
            alienPop.current.play().catch(error => {
              console.error('Failed to play audio:', error);
            });
          }
        
          const updatedAlien = { ...alien, animation: true, showPlusOne: true };

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

  const handleBomberCollision = () => { //
    setGamePaused(true);
    setShowWhiteScreen(true);

    const disappearingAliensCount = aliens.filter(alien => !alien.collided).length;
    setPoints(prevPoints => prevPoints + disappearingAliensCount);

    setAliens([]); 

    setTimeout(() => {
      setTimeout(() => {
        regenerateAliens();
        setGamePaused(false);
        setShowWhiteScreen(false);
      },500);
    }, 3000);
  };

  const regenerateAliens = () => {
    const alienBox = document.querySelector('.aliens-box');
    const boxWidth = alienBox?.clientWidth || gameWidth;
    const boxHeight = alienBox?.clientHeight || gameHeight;

    const generateRandomPosition = (size: number, max: number) => {
      const margin = 5;
      return Math.random() * (max - size - margin * 2) + margin;
    };

    const newAliens: Alien[] = [];
    for (let i = 0; i < 10; i++) {
      const type: AlienType = Math.random() < 0.995 ? 'normal' : 'bomber';
      const { size } = getAlienSizeAndImage(type);
      newAliens.push({
        id: alienIdRef.current++,
        x: generateRandomPosition(size, boxWidth),
        y: generateRandomPosition(size, boxHeight),
        type,
      });
    }
    setAliens(newAliens);
  }; //

  const handleMouseMove = (event: React.MouseEvent) => {
    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    handleMovement(x, y);
  };

  const handleTouchMove = (event: React.TouchEvent) => {
    // event.preventDefault();
    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
    const touch = event.touches[0];
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;
    handleMovement(x, y);
  };

  const getAlienSizeAndImage = (type: AlienType) => {
    switch (type) {
      case 'normal':
        return { size: 60, image: AlienNormal };
      case 'bomber':
        return { size: 75, image: AlienBomber };
      default:
        return { size: 60, image: AlienNormal };
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
      <div className={`${showWhiteScreen ? 'bomb-overlay' : ''}`}></div>
      {/* <div className="bomb-overlay"></div> */}
      <div className="row">
        <div className="col-12 px-0">
          <div className="game-bg">
            <div className="row header-section">
              <div className="col-3"></div>
              <div className="col-6 text-center">
                <img className="header-logo" src={MainLogo} />
              </div>
              <div className="col-3 header-icons-box">
                <button disabled className="btn p-0"><img className="header-icons" src={LanguageIcon}/></button>
                <button className="btn p-0" onClick={(e) => {
                  // if (bgm.current && !bgmIsPlaying) {
                  //   bgm.current.play();
                  //   setBgmIsPlaying(true);
                  // } else if (bgm.current && bgmIsPlaying) {
                  //   bgm.current.pause();
                  //   setBgmIsPlaying(false);
                  // }
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
                          // else if (bgm.current && bgmIsPlaying) {
                          //   bgm.current.pause();
                          //   setBgmIsPlaying(false);
                          // }
                        }}>
                          <img className="w-100" src={StartGame}></img>
                        </button>
                        </div>
                      </div>
                    </div>
                  </div>
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
                          maxWidth: '768px',
                          height: `${gameHeight}px`,
                          position: 'relative', 
                          // overflow: 'hidden',
                          margin: '0 auto',  
                          // display: 'flex', 
                          // justifyContent: 'center',
                          // alignItems: 'center',
                        }}
                      >
                        {/* {isMoving ? (
                          <img
                            src={GoooGoooGif}
                            alt="GoooGooo"
                            style={{
                              position: 'absolute',
                              left: cursorPosition.x - 50,
                              top: cursorPosition.y - 50,
                              zIndex: 1000,
                              width: '180px',
                              height: '180px',
                              pointerEvents: 'none', // Prevent interfering with cursor interaction
                            }}
                            className={!startGame ? "d-none" : ""}
                          />
                        ):(
                          <img
                            src={GoooGoooGif}
                            alt="GoooGooo"
                            style={{
                              position: 'absolute',
                              left: `calc(50% - 90px)`, // 50% of screen width minus half of the image width (180px / 2)
                              top: `calc(80% - 90px)`,  // 50% of screen height minus half of the image height (180px / 2)
                              zIndex: 1000,
                              width: '180px',
                              height: '180px',
                              pointerEvents: 'none', // Prevent interfering with cursor interaction
                            }}
                            className={!startGame ? "d-none" : ""}
                          />
                        )} */}
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
                                  // key={alien.id}
                                  src={alien.animation ? Explode1 : image}
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
                                      fontSize: '40px',
                                      color: 'white',
                                    }}
                                  >
                                    +1
                                  </span>
                                )}
                              </React.Fragment>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                    <div className='corner-gooogooo'>
                      <img src={GoooGoooGif} alt="GoooGooo" />
                    </div>
                    <h5 className='gj-text'>GOOOOD JOB!</h5>
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
