import styled from "styled-components";
import background from "./main-bg.png";
import boosterIcon from "./googoo-checkin.png"

// export const Card = styled.div`
//   padding: 18px 20px;
//   border-radius: 8px;
//   background-color: white;

//   @media (prefers-color-scheme: dark) {
//     background-color: #111;
//   }
// `;

export const FlexBoxRow = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: center;
`;

export const FlexBoxCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const Button = styled.button`
  background-color: ${(props) =>
    props.disabled ? "#6e6e6e" : "var(--tg-theme-button-color)"};
  border: 0;
  border-radius: 8px;
  padding: 10px 20px;
  color: var(--tg-theme-button-text-color);
  font-weight: 700;
  cursor: pointer;
  pointer-events: ${(props) => (props.disabled ? "none" : "inherit")};
`;

// export const Ellipsis = styled.div`
//   text-overflow: ellipsis;
//   overflow: hidden;
//   white-space: nowrap;
// `;

// export const Input = styled("input")`
//   padding: 10px 20px;
//   border-radius: 10px;
//   width: 100%;
//   border: 1px solid #c2c2c2;

//   @media (prefers-color-scheme: dark) {
//     border: 1px solid #fefefe;
//   }
// `;

export const Timer = styled.div`
    font-size: 48px;
    margin-bottom: 20px;
`;

const Container = styled.div`
    text-align: center;
    color: white;
    padding: 20px;
    background: url(${background}) no-repeat center center fixed;
    background-size: cover;
    height: 100vh;
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
`;

const Logo = styled.div`
    font-size: 24px;
    font-weight: bold;
`;

const Profile = styled.div`
    font-size: 18px;
`;

const Content = styled.div`
    margin-top: 50px;
`;

const Title = styled.h1`
    font-size: 36px;
    margin-bottom: 20px;
`;


const BoosterSection = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
`;

const BoosterIcon = styled.div`
    background: url(${boosterIcon}) no-repeat center center;
    background-size: contain;
    width: 64px;
    height: 64px;
`;

const BoosterInfo = styled.div`
    margin-left: 10px;
`;

const BoosterCount = styled.div`
    font-size: 24px;
`;

const BoosterText = styled.div`
    font-size: 14px;
    line-height: 1.2;
`;

const GetBoostersButton = styled.button`
    font-size: 18px;
    padding: 10px 20px;
    border: none;
    background-color: #ffd700;
    color: black;
    cursor: pointer;
    border-radius: 5px;

    &:hover {
        background-color: #ffa500;
    }
`;
