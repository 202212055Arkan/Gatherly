import styled from "styled-components";
import { AuthContext } from "../../Context/AuthContextProvider";
import { useContext } from "react";
import { Link } from "react-router-dom";

function Comp() {
  const { event, token } = useContext(AuthContext);

  // Replace dynamic data with static values
  const staticEvent = {
    data: {
      groupDetail: {
        groupName: "Manhattan Networking Group",
      },
      dateAndTime: "2023-11-22 18:00:00",
    },
  };

  return (
    <CompStyled>
      <div className="box">
        <div className="one">
          <div>{staticEvent.data.dateAndTime}</div>
          <div style={{ fontWeight: "bold" }}>
            {staticEvent.data.groupDetail.groupName}
          </div>
        </div>
        <div className="two">FREE</div>
        <button className="share">
          <img
          // https://img.icons8.com/ios-filled/50/000000/search.png
            src="https://img.icons8.com/ios-filled/50/000000/share.png"
            alt="share icon"
          />
          Share
        </button>
        <button className="attend">
          <img
            src="https://img.icons8.com/ios-filled/50/000000/event.png"
            alt="attend icon"
          />
          <Link to={token === "" ? "/login" : "/attend"}>Attend</Link>
        </button>
      </div>
    </CompStyled>
  );
}

const CompStyled = styled.div`
  width: 60%;
  margin: auto;
  margin-top: 20px;
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  .box {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .one {
      div {
        font-size: 1rem;
        color: #757575;
      }

      div:last-child {
        font-weight: bold;
      }
    }

    .two {
      font-weight: bold;
      color: #00a2c7;
    }

    .share,
    .attend {
      height: 50px;
      font-weight: bold;
      border: none;
      display: flex;
      align-items: center;
      cursor: pointer;
      padding: 10px;
      border-radius: 5px;
    }

    .share {
      background-color: #007bff;
      color: white;
      margin-right: 10px;
    }

    .attend {
      background-color: #28a745;
      color: white;
    }

    img {
      width: 20px;
      height: 20px;
      margin-right: 10px;
    }
  }
`;

export default Comp;
