import React, { useEffect, useState, useRef } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Countdown, { zeroPad } from 'react-countdown';
import Moment from 'moment';
import { useSwipeable } from 'react-swipeable'
// import { CopyToClipboard } from 'react-copy-to-clipboard';
import MainLogo from './assets/img/old/logo.png';
import MenuIcon from './assets/img/old/menu.png';
import UserIcon from './assets/img/old/user-icon.png';
import LoginHeader from './assets/img/old/login-header-text.png';
import LoginButton from './assets/img/old/login-button.png';
import LoginGooGoo from './assets/img/old/googoo-welcome.png';
import CheckInHeader from './assets/img/old/checkin.png';
import CheckInGooGoo from './assets/img/old/googoo-checkin.png';
import CheckInBtn1 from './assets/img/old/checkinBtn1.png';
import CheckInBtn2 from './assets/img/old/checkinBtn2.png';
import CheckInBtn3 from './assets/img/old/checkinBtn3.png';
import Checked from './assets/img/old/checked.png';
import ClaimBtn from './assets/img/old/claim.png';
import BoosterIcon from './assets/img/old/booster.png';
import ArrowDownBtn from './assets/img/old/arrow-down.png';
import ReferralHeader from './assets/img/old/referral-header.png';
import CopyBtn from './assets/img/old/copy.png';
import ShareBtn from './assets/img/old/share.png';
import SmallCashSound from './assets/sound/cash-register-small.mp3';
import LoudCashSound from './assets/sound/cash-register-loud.mp3';
import { useClaim } from './hooks/useClaim';


const App: React.FC = () => {
  const lastSwipeDirectionRef = useRef<string | null>(null);
  const lastSwipeTimeRef = useRef<number>(0);

 
  const [points, setPoints] = useState(0);
  const clickTheFuckOutOfIt = async () => {
    setPoints(points+1);
  };

  const swiperNoSwiping = useSwipeable({
    onSwiping: (eventData) => {
      const now = Date.now();
      if (
        eventData.dir !== lastSwipeDirectionRef.current &&
        now - lastSwipeTimeRef.current > 400 // 500ms debounce time
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
                <div className="total-earned">
                  <h4>Total coins earned here</h4>
                </div>
              </div>
            
              <div className="col-12 text-center mb-5">
                <div className="p-0 w-100" {...swiperNoSwiping} style={{touchAction: 'pan-y', height:'400px', backgroundColor:'white'}}></div>
                <h4 className="text-white">Swipe Me!</h4>
                <h4 className="text-white">{points}</h4>
              </div>
              {/* <div className="col-12 text-center mb-5">
                <button className="btn login-btn p-0" onClick={handleLogin}>
                  <img className="w-100" src={LoginButton}></img>
                </button>
              </div> */}

              <div className="navbar">
                <ul>
                  <li><a href="#">Home</a></li>
                  <li><a href="#">Gooo<br></br>Gooo</a></li>
                  <li><a href="#">Earn</a></li>
                  <li><a href="#">Friends</a></li>
                  <li><a href="#">Airdrop</a></li>
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
