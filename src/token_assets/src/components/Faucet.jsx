import React, { useState } from "react";
import {token} from '../../../declarations/token';
import { AuthClient } from "../../../../node_modules/@dfinity/auth-client/lib/cjs/index";


function Faucet() {

  const [isLoaded,setIsLoaded] = useState(false);
  const [message,setMessage] = useState("Gimme gimme")

  async function handleClick(event) {
    setIsLoaded(true);
    const authClient = await AuthClient.create();
    const identity = await authClient.getIdentity();
    const authenticatedCanister = createActor(canisterId,{
      agentOptions: {
        identity,
      },
    });
    const r = await authenticatedCanister.payOut();
    setMessage(r);
  }

  return (
    <div className="blue window">
      <h2>
        <span role="img" aria-label="tap emoji">
          🚰
        </span>
        Faucet
      </h2>
      <label>Get your free Retro tokens here! Claim 10,000 RET coins to your account.</label>
      <p className="trade-buttons">
        <button id="btn-payout" onClick={handleClick} disabled={isLoaded}>
          {message}
        </button>
      </p>
    </div>
  );
}

export default Faucet;
