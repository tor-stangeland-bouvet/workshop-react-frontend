import React from 'react';
import logo from './logo.svg';
import './App.css';
import { MsalAuthenticationTemplate, useMsal } from '@azure/msal-react';
import { InteractionType } from '@azure/msal-browser';

const authRequest = {
  scopes: ["User.Read"],
};

function App() {
  const { instance } = useMsal();
  
  return (
    <MsalAuthenticationTemplate
    interactionType={InteractionType.Redirect}
    authenticationRequest={authRequest}
    >
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>Logged in as { instance.getActiveAccount()?.username || 'none' }</p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    </MsalAuthenticationTemplate>
  );
}

export default App;
