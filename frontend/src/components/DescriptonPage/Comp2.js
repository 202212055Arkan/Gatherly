import styled from "styled-components";

function Comp2() {
  const networkingGroupDetails = {
    data: {
      details: [
        "Welcome to the Manhattan Professional Networking Group!",
        "Connect with professionals from various industries in the heart of Manhattan.",
        "Our group aims to create a vibrant community where professionals can network, share insights, and foster valuable connections.",
        "Whether you're an entrepreneur, a seasoned professional, or someone just starting in your career, our events provide opportunities for growth and collaboration.",
        "Join us for engaging discussions, informative workshops, and networking sessions in the bustling city of New York.",
      ],
      groupDetail: {
        groupName: "Manhattan Professional Networking Group",
        groupPrivate: "Open to all professionals in the Manhattan area.",
      },
      dateAndTime: "Next Event: November 22, 2023, at 6:00 PM",
    },
  };

  return (
    <Comp2Styled>
      <div className="content">
        <div className="left">
          <div className="heading">Details</div>
          {networkingGroupDetails.data.details.map((el, index) => (
            <div key={index} className="details">
              {el}
            </div>
          ))}
          <div className="heading1">Attendees: 409</div>
        </div>
        <div className="right">
          <div className="rightbox1">
            <img
              className="line1"
              alt="event pic"
              src="https://secure-content.meetupstatic.com/images/https%3A%2F%2Fsecure.meetupstatic.com%2Fphotos%2Fevent%2F5%2F9%2F7%2F1%2Fhighres_499462897.jpeg/56x56.jpg"
            />
            <div className="line2">
              <div style={{ fontSize: "0.8rem", fontWeight: "bold" }}>
                {networkingGroupDetails.data.groupDetail.groupName}
              </div>
              <div
                style={{
                  color: "#757575",
                  fontSize: "0.9rem",
                  marginTop: "5px",
                }}
              >
                {networkingGroupDetails.data.groupDetail.groupPrivate}
              </div>
            </div>
          </div>
          <div className="rightbox2">
            <div style={{ fontSize: "0.9rem" }} className="one">
              {networkingGroupDetails.data.dateAndTime}
            </div>
            <div
              style={{ fontSize: "0.9rem", color: " #757575" }}
              className="two"
            >
              New York
            </div>
          </div>
        </div>
      </div>
    </Comp2Styled>
  );
}

const Comp2Styled = styled.div`
  width: 80%;
  margin: auto;
  margin-top: 20px; /* Added top margin */
  background-color: #f5f5f5;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .left {
    width: 60%;
    padding-right: 20px;

    .heading {
      font-size: 1.5rem;
      font-weight: bold;
      margin-bottom: 15px;
    }

    .details {
      margin-bottom: 15px;
    }

    .heading1 {
      font-size: 1.3rem;
      font-weight: bold;
      margin-top: 20px;
    }
  }

  .right {
    width: 40%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    .rightbox1 {
      display: flex;
      align-items: center;
      margin-bottom: 20px;

      .line1 {
        border-radius: 50%;
        width: 56px;
        height: 56px;
        margin-right: 15px;
      }

      .line2 {
        div {
          font-size: 1rem;
          font-weight: bold;
        }

        div:last-child {
          color: #757575;
          font-size: 0.9rem;
          margin-top: 5px;
        }
      }
    }

    .rightbox2 {
      div {
        font-size: 0.9rem;
        margin-bottom: 8px;
      }

      .one {
        color: #757575;
      }

      .two {
        color: #757575;
      }
    }
  }
`;

export default Comp2;
