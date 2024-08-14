// import Countdown, { zeroPad } from 'react-countdown';
// import Moment from 'moment';
// import { useClaim } from './hooks/useClaim';
// import { CopyToClipboard } from 'react-copy-to-clipboard';
import React, { useEffect, useState, useRef } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, NavLink, useLocation } from 'react-router-dom';
import { useSwipeable, SwipeableHandlers } from 'react-swipeable'


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

// Import sound effects
import GGSound from './assets/sound/gg-sound.mp3'

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
  }

const App: React.FC = () => {

  const location = useLocation();
  const [points, setPoints] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);
  const swipeSound = useRef<HTMLAudioElement | null>(null);
  const [aliens, setAliens] = useState<Alien[]>([]);
  const [showGoooGoooGif, setShowGoooGoooGif] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });


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

  useEffect(() => {
    // Generate random aliens on load
    const generatedAliens: Alien[] = [];
    for (let i = 0; i < 20; i++) { // You can adjust the number of aliens
      const type: 'large' | 'medium' | 'small' = Math.random() < 0.33 ? 'large' : Math.random() < 0.5 ? 'medium' : 'small';
      generatedAliens.push({
        id: i,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        type,
      });
    }
    setAliens(generatedAliens);
  }, []);

  const handleMouseMove = (event: React.MouseEvent) => {
    setCursorPosition({ x: event.clientX, y: event.clientY });
  };

  useEffect(() => {
    const checkCollisions = () => {
      setAliens(prevAliens =>
        prevAliens.filter(alien => {
          const { size } = getAlienSizeAndImage(alien.type);
          const isColliding =
            cursorPosition.x >= alien.x &&
            cursorPosition.x <= alien.x + size &&
            cursorPosition.y >= alien.y &&
            cursorPosition.y <= alien.y + size;

          if (isColliding) {
            setPoints(prevPoints => prevPoints + 10);
          }

          return !isColliding;
        })
      );
    };

    checkCollisions();
  }, [cursorPosition]);

  // const handleAlienSwipe = (id: number) => {
  //   setAliens(aliens.filter(alien => alien.id !== id));
  //   setPoints(points + 10); // Increment points on alien swipe
  // };

  const getAlienSizeAndImage = (type: 'large' | 'medium' | 'small') => {
    switch (type) {
      case 'large':
        return { size: 100, image: AlienBig };
      case 'medium':
        return { size: 65, image: AlienMedium };
      case 'small':
        return { size: 30, image: AlienSmall };
      default:
        return { size: 65, image: AlienMedium };
    }
  };

  // const isAlienInSwipePath = (alien: Alien, x: number, y: number) => {
  //   const { size } = getAlienSizeAndImage(alien.type);
  //   return x >= alien.x && x <= alien.x + size && y >= alien.y && y <= alien.y + size;
  // };

  // const swipeHandlers = useSwipeable({
  //   onSwiping: (eventData) => {
  //     const { absX, absY } = eventData;
  //     if (!isSwiping) {
  //       setIsSwiping(true);
  //       setShowGoooGoooGif(true);
  //       playSwipeSound();
  //       aliens.forEach(alien => {
  //         if (isAlienInSwipePath(alien, absX, absY)) {
  //           handleAlienSwipe(alien.id);
  //         }
  //       });
  //     }
  //   },
  //   onSwiped: () => {
  //     setIsSwiping(false);
  //     setShowGoooGoooGif(false);
  //     stopSwipeSound();  
  //   },
  //   trackMouse: true, // Optional: Allows swiping with mouse for testing
  // });

  // const swipeHandlers = useSwipeable({
  //   onSwiping: (eventData) => {
  //     const { absX, absY } = eventData;
  //     // Handle alien swipes along the swipe path in real-time
  //     aliens.forEach(alien => {
  //       if (isAlienInSwipePath(alien, absX, absY)) {
  //         handleAlienSwipe(alien.id);
  //       }
  //     });
  //   },
  //   onSwiped: () => {
  //     setShowGoooGoooGif(true);
      
  //     if (swipeSound.current) {
  //       swipeSound.current.play();
  //     }

  //     setTimeout(() => {
  //       setShowGoooGoooGif(false);
  //     }, 1000); // Duration for GoooGoooGif display
  //   },
  //   trackMouse: true, // Optional: Allows swiping with mouse for testing
  // });

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
                      <div onMouseMove={handleMouseMove} className="gg-swipe">
                        <audio ref={swipeSound} src={GGSound} onEnded={handleSoundEnd}/>
                        {showGoooGoooGif ? (
                          <img src={GoooGoooGif} alt="GoooGooo Gif" />
                        ) : (
                          <img src={GoooGooo} alt="GoooGooo" />
                        )}

                        {/* Render alien images */}
                          {aliens.map(alien => {
                            const { size,image } = getAlienSizeAndImage(alien.type);
                            return(
                            <img 
                              key={alien.id} 
                              src={image} 
                              alt="Alien" 
                              style={{ 
                                position: 'absolute', 
                                left: alien.x, 
                                top: alien.y, 
                                width: `${size}px`, 
                                height: 'auto',}}
                            />
                            );
                          })}
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
