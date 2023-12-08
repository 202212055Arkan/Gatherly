import React from "react";
import { Link, useHistory } from "react-router-dom";
import logoImage from "../../../Images/logo.png";

const CommonTop = () => {
  const navigate = useHistory();

  const handleRedirect = () => {
    navigate.push("/home");
  };

  React.useEffect(() => {
    document.title = "Create a Meet Up group - Gatherly";
  }, []);

  return (
    <div>
      <div style={{ margin: "10px auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <img
            style={{ width: "11%", padding: "12px 16px", cursor: "pointer" }}
            src={logoImage}
            alt="meet-up-logo"
            onClick={handleRedirect}
          />
        </div>
        <div>
          <Link to="/">
            <button
              style={{
                padding: "10px 15px",
                backgroundColor: "white",
                border: "0",
                cursor: "pointer"
              }}
            >
              Save and Exit
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export { CommonTop };
