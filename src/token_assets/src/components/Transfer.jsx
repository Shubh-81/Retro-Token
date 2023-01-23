import React, { useState } from "react";
import {token} from "../../../declarations/token";
import {Principal} from '@dfinity/principal';
import { AuthClient } from "../../../../node_modules/@dfinity/auth-client/lib/cjs/index";

function Transfer() {

  const [recipientId,setRecipientId] = useState("");
  const [transferAmount,setTransferAmount] = useState(0);
  const [message,setMessage] = useState("");
  const [isLoaded,setIsLoaded] = useState(false);
  
  async function handleClick() {
    setIsLoaded(true);
    const principal = Principal.fromText(recipientId);
    const authClient = await AuthClient.create();
    const identity = await authClient.getIdentity();
    const authenticatedCanister = createActor(canisterId,{
      agentOptions: {
        identity,
      },
    });
    const response = await authenticatedCanister.transfer(principal,Number(transferAmount));
    console.log(response);
    setMessage(response);
    setIsLoaded(false);
  }

  return (
    <div className="window white">
      <div className="transfer">
        <fieldset>
          <legend>To Account:</legend>
          <ul>
            <li>
              <input
                type="text"
                id="transfer-to-id"
                value={recipientId}
                onChange={(e)=>{
                  setRecipientId(e.target.value);
                }}
              />
            </li>
          </ul>
        </fieldset>
        <fieldset>
          <legend>Amount:</legend>
          <ul>
            <li>
              <input
                type="number"
                id="amount"
                value={transferAmount}
                onChange={(e)=>{
                  setTransferAmount(e.target.value)
                }}
              />
            </li>
          </ul>
        </fieldset>
        <p className="trade-buttons">
          <button id="btn-transfer" onClick={handleClick} disabled={isLoaded}>
            Transfer
          </button>
        </p>
        {message&&<p>{message}</p>}
      </div>
    </div>
  );
}

export default Transfer;
