import React from "react";

function Header(props) {
  return (
    <header>
      <div className="blue window" id="logo">
        <h1>
          <span role="img" aria-label="tap emoji">
            💎
          </span>
          Retro
        </h1>
      </div>
      <p style={{justify: "center", align: "center"}}>Logged in User Principal : {props.client}</p>
    </header>
    
  );
}

export default Header;
