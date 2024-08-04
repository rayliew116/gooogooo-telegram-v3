import React, { useEffect, useState, useRef } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Countdown, { zeroPad } from 'react-countdown';
import Moment from 'moment';
import { useSwipeable } from 'react-swipeable'
// import { CopyToClipboard } from 'react-copy-to-clipboard';
import MainLogo from './assets/img/logo.png';
import MenuIcon from './assets/img/menu.png';
import UserIcon from './assets/img/user-icon.png';
import LoginHeader from './assets/img/login-header-text.png';
import LoginButton from './assets/img/login-button.png';
import LoginGooGoo from './assets/img/googoo-welcome.png';
import CheckInHeader from './assets/img/checkin.png';
import CheckInGooGoo from './assets/img/googoo-checkin.png';
import CheckInBtn1 from './assets/img/checkinBtn1.png';
import CheckInBtn2 from './assets/img/checkinBtn2.png';
import CheckInBtn3 from './assets/img/checkinBtn3.png';
import Checked from './assets/img/checked.png';
import ClaimBtn from './assets/img/claim.png';
import BoosterIcon from './assets/img/booster.png';
import ArrowDownBtn from './assets/img/arrow-down.png';
import ReferralHeader from './assets/img/referral-header.png';
import CopyBtn from './assets/img/copy.png';
import ShareBtn from './assets/img/share.png';
import SmallCashSound from './assets/sound/cash-register-small.mp3';
import LoudCashSound from './assets/sound/cash-register-loud.mp3';
import { useClaim } from './hooks/useClaim';


interface UserData {
  _id: string;
  profileImageUrl: string;
  username: string;
  boosters: number;
  points: number;
  lastClaim: string;
}

interface LeaderboardData {
  currentUser: {
    rank: number;
  };
  leaderboard: Array<{
    _id: string;
    username: string;
    points: number;
    referrals: number;
  }>;
}

const defaultUserData: UserData = {
  _id: '',
  profileImageUrl: '',
  username: '',
  boosters: 0,
  points: 0,
  lastClaim: ''
}

const defaultLeaderboardData: LeaderboardData = {
  currentUser: {
    rank: 0
  },
  leaderboard: []
}

const App: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [copyText, setCopyText] = useState('');
  const [referralCode, setReferralCode] = useState('');
  const [userData, setUserData] = useState<UserData>(defaultUserData);
  const [totalPlayers, setTotalPlayers] = useState('');
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardData>(defaultLeaderboardData);
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);
  const [checked3, setChecked3] = useState(false);
  const [referralPage, setReferralPage] = useState(false);
  const [pointsEarned, setPointsEarned] = useState(0);
  const [boostedPoints, setBoostedPoints] = useState(0);
  const [checkedIn, setCheckedIn] = useState(false);
  const { claimRewardPoints } = useClaim();
  const lastSwipeDirectionRef = useRef<string | null>(null);
  const lastSwipeTimeRef = useRef<number>(0);

  const copyReferral = () => {
    setCopied(true);
    setCopyText('Copied');
    setTimeout(() => setCopied(false), 3000);
  };

  const playSmallSFX = () => {
    new Audio(SmallCashSound).play();
  };

  const playLoudSFX = () => {
    new Audio(LoudCashSound).play();
  };

  const handleLogin = () => {
    window.location.href = `https://gooodjob.xyz/api/auth/twitter?referral_code=${referralCode}`;
  };

  const fetchUserData = () => {
    fetch("https://gooodjob.xyz/api/auth/current_user", {
      method: 'GET',
      credentials: 'include',
    })
      .then((response) => response.json())
      .then((user) => {
        if (user) {
          setUserData(user);
          getTotalPlayers();
        }
      })
      .catch((error) => console.error('Error fetching user:', error));
  };

  const getTotalPlayers = async () => {
    const response = await fetch('https://gooodjob.xyz/api/user/total');
    const json = await response.json();
    if (response.ok) {
      setTotalPlayers(json);
      console.log(json);
    }
  };

  const [points, setPoints] = useState(0);
  const clickTheFuckOutOfIt = async () => {
    setPoints(points+1);
  };

  // const swiperNoSwiping = useSwipeable({
  //   onSwiped: (eventData) => {
  //     console.log("User Swiped!", eventData);
  //     setPoints(points+1);
  //   },
  // });
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
    }
  });


  const fetchLeaderboard = async () => {
    if (!userData) {
      fetchUserData();
    }
    const response = await fetch('https://gooodjob.xyz/api/user/leaderboard/'+userData._id);
    const json = await response.json();
    if (response.ok) {
      setLeaderboardData(json);
    }
  };

  const randomPoints = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const handleClaimPoints = async () => {
    fetchUserData();
    if (!userData) {
      return;
    }
    setCheckedIn(true);
    const pts = randomPoints(1, 99);
    setPointsEarned(pts);
    if (userData.boosters > 0) {
      setBoostedPoints(pts * 2);
      await claimRewardPoints(userData._id, userData.points, pts, userData.boosters, true);
    } else {
      setBoostedPoints(pts);
      await claimRewardPoints(userData._id, userData.points, pts, userData.boosters, false);
    }
    fetchUserData();
  };

  const missionCountdown = ({ hours, minutes, seconds, completed }: { hours: number; minutes: number; seconds: number; completed: boolean }) => {
    if (!completed) {
      return (
        <>
          <div className="col-12 mt-3 text-center timer-padding mb-3">
            <h6 className="short-text text-white mb-3" style={{ fontSize: '10px' }}>CHECK-IN AVAILABLE IN...</h6>
            <h3 className="countdown-timer text-white"><span>{zeroPad(hours)}:{zeroPad(minutes)}:{zeroPad(seconds)}</span></h3>
          </div>
        </>
      );
    } else {
      return (
        <>
          <div className="col-12 text-center">
            <h6 className="short-text text-white mb-3" style={{ fontSize: '10px' }}>HELP GOOOGOOO, CLICK & EARN POINTS.</h6>
            {!checkedIn ? (
              <div className="row checkin-btn-cont-padding">
                <div className="col-4 text-center px-0">
                  <button className="btn checkin-btn p-0" onClick={(e) => {
                    setTimeout(() => setChecked1(true), 500);
                    setTimeout(() => playSmallSFX(), 700);
                  }}>
                    <img className="w-100" src={CheckInBtn1}></img>
                  </button>
                  {checked1 ? <img className="checked-tick" src={Checked}></img> : <></>}
                </div>
                <div className="col-4 text-center px-0">
                  <button disabled={!checked1} className="btn checkin-btn p-0" onClick={(e) => {
                    setTimeout(() => setChecked2(true), 500);
                    setTimeout(() => playSmallSFX(), 700);
                  }}>
                    <img className="w-100" src={CheckInBtn2}></img>
                  </button>
                  {checked2 ? <img className="checked-tick" src={Checked}></img> : <></>}
                </div>
                <div className="col-4 text-center px-0">
                  <button disabled={!checked2} className="btn checkin-btn p-0" data-bs-toggle="modal" data-bs-target="#claimModal" onClick={(e) => {
                    setChecked3(true);
                    setTimeout(() => handleClaimPoints(), 800);
                    setTimeout(() => playLoudSFX(), 1000);
                  }}>
                    <img className="w-100" src={CheckInBtn3}></img>
                  </button>
                  {checked3 ? <img className="checked-tick" src={Checked}></img> : <></>}
                </div>
              </div>
            ) : (
              <h5 className="text-white">Check-in Success!</h5>
            )}
          </div>
        </>
      );
    }
  };

  useEffect(() => {
    fetchUserData();
    fetchLeaderboard();
    getTotalPlayers();
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('referral_code');
    setReferralCode(code ?? '');
  }, []);

  return (
    <Router>
      <div className="container game-container">
        <div className="row">
          <div className="col-12 px-0">
            <div className="game-bg pb-5">
              <div className="row header-section">
                <div className="col-6">
                  <img className="header-logo" src={MainLogo} alt="Logo"></img>
                  <button className="btn p-0" onClick={(e) => {
                    fetchUserData();
                    setReferralPage(false);
                  }}>
                  </button>
                </div>
                <div className="col-6 text-right">
                  {userData ? (
                    <button className="btn p-0" onClick={(e) => {
                      fetchUserData();
                      fetchLeaderboard();
                      setReferralPage(true);
                    }}>
                      <img className="header-menu" src={MenuIcon} alt="Menu"></img>
                    </button>
                    
                  ) : (
                    <></>
                    
                  )}
                </div>
              </div>
              {userData ? (
                <>
                  {referralPage ? (
                    <>
                      <div className="col-12 mt-3 text-center">
                        <img className="referral-header w-75" src={ReferralHeader}></img>
                      </div>
                      <div className="col-12 mt-4 mb-2 text-center">
                        <p className="text-white">Share your referral link and earn more points!</p>
                      </div>
                      <div className="col-12 mt-1 mb-2 text-center">
                        <div className="row">
                          <div className="col-2"></div>
                          <div className="col-8">
                            <div className="row referral-container mx-auto py-3">
                              <div className="col-12 text-center mb-3">
                                <input
                                  className="referral-input w-100"
                                  type="text"
                                  readOnly
                                  value={`http://localhost:3000/?referral_code=${userData._id}`}
                                  style={{ backgroundColor: '#222', color: '#fff' }}
                                />
                              </div>
                              {/* <div className="col-6 text-center">
                                <CopyToClipboard text={`http://localhost:3000/?referral_code=${userData._id}`} onCopy={copyReferral}>
                                  <button className="btn btn-referral px-1 py-0">
                                    <img className="referral-icon" src={CopyBtn}></img>
                                  </button>
                                </CopyToClipboard>
                              </div> */}
                              <div className="col-6 text-center">
                                <button className="btn btn-referral px-1 py-0" onClick={() => {
                                  const text = `Check out this cool game! Use my referral link to get started: http://localhost:3000/?referral_code=${userData._id}`;
                                  if (navigator.share) {
                                    navigator.share({ title: 'Join GooodJob!', text: text, url: `http://localhost:3000/?referral_code=${userData._id}` });
                                  } else {
                                    alert('Sharing is not supported in this browser.');
                                  }
                                }}>
                                  <img className="referral-icon" src={ShareBtn}></img>
                                </button>
                              </div>
                              {copied ? (
                                <div className="col-12 text-center mt-3">
                                  <p className="text-white">{copyText}</p>
                                </div>
                              ) : (
                                <></>
                              )}
                            </div>
                          </div>
                          <div className="col-2"></div>
                        </div>
                      </div>
                      <div className="col-12 mt-3 text-center">
                        <h5 className="text-white">Leaderboard</h5>
                        <ul className="leaderboard-list">
                          {leaderboardData?.leaderboard.map((player, index) => (
                            <li key={index} className={`leaderboard-item ${userData._id === player._id ? 'leaderboard-item-current' : ''}`}>
                              <div className="row">
                                <div className="col-2">{index + 1}</div>
                                <div className="col-8">{player.username}</div>
                                <div className="col-2">{player.points}</div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="col-12 mt-3 text-center">
                        <p className="text-white">Your Rank: {leaderboardData?.currentUser.rank}</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="col-12 mt-3 text-center">
                        <img className="login-header w-75" src={LoginHeader}></img>
                      </div>
                      <div className="col-12 text-center mb-5" {...swiperNoSwiping} style={{ touchAction: 'pan-y' }}>
                        <img className="login-googoo" src={LoginGooGoo}></img>
                        <h4 className="text-white">Swipe on GoooGooo!</h4>
                        <h4 className="text-white">{points}</h4>
                      </div>
                      {/* <div className="col-12 text-center mb-5">
                        <button className="btn login-btn p-0" onClick={handleLogin}>
                          <img className="w-100" src={LoginButton}></img>
                        </button>
                      </div> */}
                      {/* <div className="col-12 text-center mb-4" {...swiperNoSwiping} style={{ touchAction: 'pan-y' }}>
                        <h4 className="text-white">{points}</h4>
                        <button className="btn p-0 w-100" style={{height:"400px"}}>
                          Swipe Me
                        </button>
                      </div> */}
                    </>
                  )}
                </>
              ) : (
                <>
                  <div className="col-12 mt-3 text-center">
                    <img className="checkin-header w-75" src={CheckInHeader}></img>
                  </div>
                  {/* <div className="col-12 mt-3 text-center">
                    <img className="checkin-googoo" src={CheckInGooGoo}></img>
                  </div> */}
                  {/* <div className="col-12 text-center mb-4">
                    <h4 className="text-white">{points}</h4>
                    <button className="btn p-0 w-100" style={{height:"400px"}} onClick={(e) => {
                      clickTheFuckOutOfIt();
                    }}>
                      Click Me
                    </button>
                  </div> */}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="modal fade" id="claimModal" tabIndex={-1} aria-labelledby="claimModalLabel" aria-hidden="true">
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
      </div>
    </Router>
  );

};


