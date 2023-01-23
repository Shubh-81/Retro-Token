import ReactDOM from 'react-dom'
import React from 'react'
import App from "./components/App";
import { AuthClient } from '../../../node_modules/@dfinity/auth-client/lib/cjs/index';


const init = async () => { 
  const authClient = await AuthClient.create();
  if(await authClient.isAuthenticated()) {
    console.log("Logged in");
    handleAuthenticated(authClient);
  }
  await authClient.login({
    identityProvider : "https://identity.ic0.app/#authorize",
    onSuccess: ()=>{
      const identity = authClient.getIdentity();
      const userPrincipal = identity._principal.toString();
      ReactDOM.render(<App client={userPrincipal}/>, document.getElementById("root"));
    }
  });

}

async function handleAuthenticated(authClient) {
  const identity = authClient.getIdentity();
  const userPrincipal = identity._principal.toString();
  ReactDOM.render(<App client={userPrincipal}/>, document.getElementById("root"));
};



init();


