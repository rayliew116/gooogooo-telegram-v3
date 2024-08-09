import React from "react";

import './airdrop-page.css';

interface Props {}

// Import images here
import AirdropMainCrystal from './img/airdrop-main.png';
import TaskListBtn from './img/tasklist.png';
import WalletIcon from './img/wallet.png';
import CompletedIcon from './img/completed-check.png';



const AirdropPage = (props: Props) => {
    return (
        <>
            <div className="row">
                <div className="col-12 text-center">
                    <img className="airdrop-crystal-main" src={AirdropMainCrystal}></img>
                    <h4 className="light-yellow">AIRDROP TASK</h4>
                    <p className="text-white" style={{fontSize:"12px"}}>Listing is on its way. Tasks will appear below.<br></br>Complete them to participate in the airdrop.</p>
                </div>
                <div className="col-12 text-center mt-3">
                    <img className="tasklist-btn" src={TaskListBtn}></img>
                </div>
                <div className="col-12">
                    <div className="task-container">
                        <div className="row tasklist-box mt-2 px-3 py-2">
                            <div className="col-2 p-0">
                                <img className="task-icon" src={WalletIcon}></img>
                            </div>
                            <div className="col-8 ml-0 pl-2">
                                <p className="task-title text-white mb-2">Connect your TON wallet</p>
                            </div>
                            <div className="col-2 text-right p-0">
                                <img className="completed-icon" src={CompletedIcon}></img>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AirdropPage;