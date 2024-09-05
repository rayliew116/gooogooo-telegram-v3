import React from "react";
import './earn-page.css';

// Import images here
import TwitterIcon from './img/twitter-icon.png'
import RetweetIcon from './img/retweet-icon.png'
import CommentIcon from './img/comment-icon.png'
import TelegramIcon from './img/telegram-icon.png'
import GroupIcon from './img/group-icon.png'
import PlayIcon from './img/play-icon.png'
import EarnMore from './img/earn-more.png'
import Coin from './img/coin.png'
import StartButton from './img/start-button.png'


interface Props {}

const EarnPage = (props: Props) => {
  return (
    <>
      <div className="row">
        <div className="col-12 text-center">
          <img src={EarnMore} style={{width:"46%", marginBottom:"10px"}} />
        </div>
        <div className="col-12">
          <div className="earn-container">
            <h3>EXPLORE</h3>
            <div className="earn-list">
              <ul>
                <li>
                  <div className="earn-content">
                    <div className="item-icon">
                      <img src={TwitterIcon} />
                    </div>
                    <div className="earn-task-content">
                      <p>Follow Twitter Account</p>
                      <div className="earn-des">
                        <img src={Coin} />
                        <p>+500,000 GoooCoin</p>
                      </div>
                    </div>
                    <div className="action-icon">
                      <img src={StartButton} />
                    </div>
                  </div>
                  <div className="earn-content">
                    <div className="item-icon">
                      <img src={RetweetIcon} />
                    </div>
                    <div className="earn-task-content">
                      <p>Retweet/Share Twitter Post</p>
                      <div className="earn-des">
                        <img src={Coin} />
                        <p>+500,000 GoooCoin</p>
                      </div>
                    </div>
                    <div className="action-icon">
                      <img src={StartButton} />
                    </div>
                  </div>
                  <div className="earn-content">
                    <div className="item-icon">
                      <img src={CommentIcon} />
                    </div>
                    <div className="earn-task-content">
                      <p>Follow Twitter Account</p>
                      <div className="earn-des">
                        <img src={Coin} />
                        <p>+500,000 GoooCoin</p>
                      </div>
                    </div>
                    <div className="action-icon">
                      <img src={StartButton} />
                    </div>
                  </div>
                  <div className="earn-content">
                    <div className="item-icon">
                      <img src={TelegramIcon} />
                    </div>
                    <div className="earn-task-content">
                      <p>Follow Twitter Account</p>
                      <div className="earn-des">
                        <img src={Coin} />
                        <p>+500,000 GoooCoin</p>
                      </div>
                    </div>
                    <div className="action-icon">
                      <img src={StartButton} />
                    </div>
                  </div>
                  <div className="earn-content">
                    <div className="item-icon">
                      <img src={GroupIcon} />
                    </div>
                    <div className="earn-task-content">
                      <p>Follow Twitter Account</p>
                      <div className="earn-des">
                        <img src={Coin} />
                        <p>+500,000 GoooCoin</p>
                      </div>
                    </div>
                    <div className="action-icon">
                      <img src={StartButton} />
                    </div>
                  </div>
                  <div className="earn-content">
                    <div className="item-icon">
                      <img src={PlayIcon} />
                    </div>
                    <div className="earn-task-content">
                      <p>Follow Twitter Account</p>
                      <div className="earn-des">
                        <img src={Coin} />
                        <p>+500,000 GoooCoin</p>
                      </div>
                    </div>
                    <div className="action-icon">
                      <img src={StartButton} />
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default EarnPage;