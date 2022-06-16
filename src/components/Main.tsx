import React, { useEffect } from 'react';
import { useRecoilState, useSetRecoilState } from "recoil";
import { useMoralis } from 'react-moralis';
import {
    refState,
    viewAccountAddressAtom,
} from "../stores/account.tsx";
import { Routes, Route, useParams, useNavigate } from 'react-router-dom';
import Header from './Header.tsx';
import Navigation from './Navigation.tsx';
import About from './About.tsx';
import Dashboard from './Dashboard.tsx';
import Statistics from './Statistics.tsx';
import Referral from './Referral.tsx';
import Roadmap from './Roadmap.tsx';
import Follow from './Follow.tsx';
import Error from './Error.tsx';
import '@progress/kendo-theme-material/dist/all.css';
import 'hammerjs';

const Main = () => {
    const setRef = useSetRecoilState(refState);
    const navigate = useNavigate();
    const { refId } = useParams();

    useEffect(() => {
        if (refId && parseInt(refId).toString() === refId) {
            setRef(refId);
            navigate('/');
        }
    }, [refId, setRef, navigate]);

    return (
        <>
            <div className='main'>
                <div className='main__left'>
                    <Navigation />
                </div>
                <div className='main__right'>
                    <Header />
                    <Routes>
                        <Route path="/" element={<About />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/statistics" element={<Statistics />} />
                        <Route path="/referral" element={<Referral />} />
                        <Route path="/roadmap" element={<Roadmap />} />
                        <Route path="/follow" element={<Follow />} />
                        <Route path="*" element={<Error />} />
                    </Routes>
                    <footer className='footer'>
                        <span>© 2022 DailyGame</span>
                        <span>All Rights Reserved</span>
                    </footer>
                </div>
            </div>
        </>
    )
}

export default Main;