import React, { useEffect, useState } from "react";
import {Principal} from '@dfinity/principal';
import {token} from '../../../declarations/token';

function Balance() {
  
  const [inputValue,setInputValue] = useState("");
  const [fbalance,setFBalance] = useState("");
  const [sym,SetSym] = useState("");

  const getSymbol = async ()=>{
    const symbol = await token.getSymbol();
    console.log(symbol);
    SetSym(symbol);
  };
  
  useEffect(()=>{
    getSymbol();
  },[]);

  const handleChange = (e) => {
    setInputValue(e.target.value);
  }

  async function handleClick() {
    console.log("Balance Button Clicked");
    const principal = Principal.fromText(inputValue);
    const balance = await token.balanceOf(principal);
    setFBalance(balance.toLocaleString());
  }


  return (
    <div className="window white">
      <label>Check account token balance:</label>
      <p>
        <input
          id="balance-principal-id"
          type="text"
          placeholder="Enter a Principal ID"
          value={inputValue}
          onChange={handleChange}
        />
      </p>
      <p className="trade-buttons">
        <button
          id="btn-request-balance"
          onClick={handleClick}
        >
          Check Balance
        </button>
      </p>
      {fbalance&&<p>This account has a balance of {fbalance} {sym}.</p>}
    </div>
  );
}

export default Balance;
