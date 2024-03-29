import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import reportWebVitals from './reportWebVitals.ts';
import { MoralisProvider } from "react-moralis";
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <React.StrictMode>
        <BrowserRouter>
            <RecoilRoot>
                <MoralisProvider serverUrl={process.env.REACT_APP_MORALIS_SERVER_URL || ''} appId={process.env.REACT_APP_MORALIS_APP_ID || ''}>
                    <App />
                </MoralisProvider>
            </RecoilRoot>
        </BrowserRouter>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

reportWebVitals();
