// import Countdown, { zeroPad } from 'react-countdown';
// import Moment from 'moment';
// import { useClaim } from './hooks/useClaim';
// import { CopyToClipboard } from 'react-copy-to-clipboard';
import React, { useEffect, useState, useRef } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useSwipeable } from 'react-swipeable'

// Import images
import MainLogo from './assets/img/new/logo.png';
import GoooGooo from './assets/img/new/gg-main.png';
import NavHome from './assets/img/new/nav-home.png'
import NavGG from './assets/img/new/nav-gooogooo.png'
import NavEarn from './assets/img/new/nav-earn.png'
import NavFriends from './assets/img/new/nav-friends.png'
import NavAirdrop from './assets/img/new/nav-airdrop.png'



const App: React.FC = () => {
  
  
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
                <div className="header-logo">
                  <img className="header-logo" src={MainLogo} />
                </div>
                {/* <div className="total-earned">
                  <h4>Total coins earned here</h4>
                </div> */}
              </div>
            
              <div className="col-12 text-center mb-5">
                <img></img>
                <h4 className="text-white">Swipe Me!</h4>
                <h4 className="text-white">{points}</h4>
                <div className="gg-swipe" {...swiperNoSwiping} style={{touchAction: 'pan-y'}}>
                  <img src={GoooGooo} alt="" />
                </div>
              </div>
              {/* <div className="col-12 text-center mb-5">
                <button className="btn login-btn p-0" onClick={handleLogin}>
                  <img className="w-100" src={LoginButton}></img>
                </button>
              </div> */}
              <div className="navbar p-0" id='navbar'>
                <ul>
                  <li>
                    <a href="#">
                      <img src={NavHome} style={{width:"70px"}}alt="" />
                      Home
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <img src={NavGG} style={{width:"70px"}}alt="" />
                      Gooo Gooo
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <img src={NavEarn} style={{width:"70px"}}alt="" />
                      Earn
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <img src={NavFriends} style={{width:"70px"}}alt="" />
                      Friends
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <img src={NavAirdrop} style={{width:"70px"}}alt="" />
                      Airdrop
                    </a>
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
