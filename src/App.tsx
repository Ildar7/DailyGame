import React, { useEffect, useState } from 'react';
import { useMoralis } from "react-moralis";
import { useRecoilState } from "recoil";
import AccountStore, { loggedInAccountAtom, isRegisteredAtom } from "./stores/account.tsx";
import Main from './components/Main.tsx';
import './styles/style.scss';
import { Toaster } from "react-hot-toast";
import { DGIsRegisteredUser } from "./contract/DailyGame.ts";
import Modals from './components/Modals.tsx';
import Preloader from './components/Preloader.tsx';

const App = () => {
    const { isWeb3Enabled, enableWeb3, isWeb3EnableLoading, isInitialized, isAuthenticated, account, logout } = useMoralis();
    const [isRegistered, setRegistered] = useState<boolean>();
    const [loggedInAccount, setLoggedInAccount] = useRecoilState(loggedInAccountAtom);
    const [isRegisteredMoralis, setRegisteredMoralis] = useState<boolean>();
    const [isRegisteredState, setRegisteredState] = useRecoilState(isRegisteredAtom);

    const isLoggedIn = isAuthenticated && account && loggedInAccount && loggedInAccount === account;

    useEffect(() => {
        const connectorId = window.localStorage.getItem("connectorId");
        if (isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading) {
            // @ts-ignore
            enableWeb3({ provider: connectorId, chainId: process.env.REACT_APP_CHAIN_ID });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuthenticated, isWeb3Enabled]);

    useEffect(() => {
        if (isAuthenticated && !loggedInAccount && account) {
            setLoggedInAccount(account);
        }
    }, [setLoggedInAccount, isAuthenticated, loggedInAccount, account]);

    useEffect(() => {
        if (isAuthenticated && loggedInAccount && account && loggedInAccount !== account) {
            logout();
            setLoggedInAccount(null);
        }
    }, [setLoggedInAccount, isAuthenticated, loggedInAccount, account]);

    useEffect(() => {
        if (isRegistered === undefined && account) {
            DGIsRegisteredUser(account).then(setRegistered);
        }
    }, [account, isRegistered]);

    useEffect(() => {
        if (isRegisteredMoralis === undefined && account) {
            DGIsRegisteredUser(account).then(setRegisteredMoralis);
        } else if (!isRegisteredState && isRegisteredMoralis) {
            setRegisteredState(true);
        }
    }, [account, isRegisteredMoralis, isRegisteredState, setRegisteredState]);


    if (isInitialized) {
        return (
            <div className='app'>
                <React.Suspense fallback={<Preloader />}>
                    <AccountStore />
                    {isRegisteredMoralis === undefined && !isLoggedIn && <Modals isRegistered={false} isLoginned={false} />}
                    {isRegisteredMoralis === false && !isRegisteredState && !isLoggedIn && (<Modals isRegistered={false} isLoginned={false} />)}
                    {isRegisteredMoralis === false && !isRegisteredState && isLoggedIn && (<Modals isRegistered={false} isLoginned={true} />)}

                    {(isRegisteredMoralis === true || isRegisteredState) && !isLoggedIn && (
                        <Modals isRegistered={true} isLoginned={false} />
                    )}
                    {(isRegisteredMoralis === true || isRegisteredState) && isLoggedIn && (
                        <Main />
                    )}
                    <Toaster />
                </React.Suspense>
            </div>
        )
    } else {
        return (<Preloader />)
    }
}

export default App;
