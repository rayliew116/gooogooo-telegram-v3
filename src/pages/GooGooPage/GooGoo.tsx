import React from "react";

// Import images here
import NavAirdrop from '../../assets/img/new/nav-airdrop.png';
import ProfilePic from '../../assets/img/new/profile-pic.png';
import LevelBox from '../../assets/img/new/level-box.png';
import ReferralButton from '../../assets/img/new/referral-button.png';
import LockedItem from '../../assets/img/new/locked.png';
import SampleOne from '../../assets/img/new/item-sample1.png';
import SampleTwo from '../../assets/img/new/item-sample2.png';
import SampleThree from '../../assets/img/new/item-sample3.png';
import SampleFour from '../../assets/img/new/item-sample4.png';

interface Props {}

const GooGooPage = (props: Props) => {
  return (
    <>
      <div className="row">
        <div>
          <div>
            <img src={ProfilePic} alt="" />
            <img src={LevelBox} alt="" />
          </div>
          <div>
            <img src={NavAirdrop} alt="" />
          </div>
          <div>
            <button>
              <img src={ReferralButton} alt="" />
            </button>
          </div>
        </div>
        <div className="col-12 text-center">
            <img src={SampleOne} alt="" />
            <img src={SampleTwo} alt="" />
            <img src={SampleThree} alt="" />
            <img src={SampleFour} alt="" />
            <img src={LockedItem} alt="" />
            <img src={LockedItem} alt="" />
            <img src={LockedItem} alt="" />
            <img src={LockedItem} alt="" />
            <img src={LockedItem} alt="" />
            <img src={LockedItem} alt="" />
            <img src={LockedItem} alt="" />
            <img src={LockedItem} alt="" />
        </div>
      </div>
    </>
  )
}

export default GooGooPage;