import React from 'react';
import logo from './logo.svg';
import './App.css';
import { MsalAuthenticationTemplate, useMsal } from '@azure/msal-react';
import { InteractionType } from '@azure/msal-browser';

const authRequest = {
  scopes: ["api://1bdd612d-ff67-409b-b453-7fa378427afe/read"],
};

function App() {
  const { instance } = useMsal();

  async function getWeatherForecast() {
    const account = instance.getActiveAccount();
    if(account==null) throw Error("No active account!");

    const tokenResponse = await instance.acquireTokenSilent({
      ...authRequest,
      account
    });

    const headers = new Headers();
    const bearer = `Bearer ${tokenResponse.accessToken}`;
    headers.append("Authorization", bearer);

    const options = {
      method: 'GET',
      cors: 'cors',
      headers
    };

    var response = await fetch('https://workshop1-web-api.azurewebsites.net/WeatherForecast', options);
    alert(await response.text());
  }
    
  return (
    <MsalAuthenticationTemplate
    interactionType={InteractionType.Redirect}
    authenticationRequest={authRequest}
    >
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>Logged in as { instance.getActiveAccount()?.username || 'none' }</p>
          <button
            className="App-link"
            onClick={getWeatherForecast}
          >
            Get weather forecast
          </button>
        </header>
      </div>
    </MsalAuthenticationTemplate>
  );
}

export default App;
