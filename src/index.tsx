import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthenticationResult, Configuration, EventMessage, EventType, PublicClientApplication } from '@azure/msal-browser';
import { MsalProvider } from '@azure/msal-react';

const redirectUri = () => {
  const location = document.location;
  if (location.hostname === 'localhost') {
    return `${location.protocol}//${location.hostname}:${location.port}${location.pathname}`
  }
  
  return `${location.protocol}//${location.hostname}${location.pathname}`
}
const configuration: Configuration = {
  auth: {
    clientId: 'f25898ed-4118-46ab-b231-49d16e4c5c6a',
    authority: 'https://login.microsoftonline.com/625ef37f-e858-4339-9db6-5cb143aead1a',
    redirectUri: redirectUri()
  },
}

const pca = new PublicClientApplication(configuration);

const accounts = pca.getAllAccounts();
if (accounts.length > 0) {
  pca.setActiveAccount(accounts[0]);
}
pca.addEventCallback((event: EventMessage) => {
if (event.eventType === EventType.LOGIN_SUCCESS && event.payload) {
    const payload = event.payload as AuthenticationResult;
    const account = payload.account;
    pca.setActiveAccount(account);
}
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <MsalProvider instance={pca}>
      <App />
    </MsalProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
