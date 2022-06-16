import React, { useState, useEffect } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { useMoralis } from 'react-moralis';
import { useNavigate } from 'react-router-dom';
import { DGGetUserAddress, DGRegistration } from "../contract/DailyGame.ts";
import {
    balanceUpdateIdentifier,
    isRegisteredAtom,
    loggedInAccountAtom,
    refState,
    useIsBalanceEnough
} from "../stores/account.tsx";
import { toast } from "react-hot-toast";
import modalShape from '../icons/shape.svg';
import logo from '../icons/logo.svg';
import plus from '../icons/plus.svg';
import check from '../icons/check.svg';
import tokenPocket from '../icons/token_pocket.png';
import trustWallet from '../icons/trust_wallet.png';
import walletConnect from '../icons/wallet_connect.png';
import metamask from '../icons/metamask.png';
import notification from '../icons/notification.svg';

const Modals = props => {
    const { authenticate, isAuthenticated, isAuthenticating } = useMoralis();
    const setLoggedInAccount = useSetRecoilState(loggedInAccountAtom);
    const setRef = useSetRecoilState(refState);
    const navigate = useNavigate();
    const [isLoading, setLoading] = useState<boolean>(false);
    const [show, setShow] = useState(false);
    const isWeb3Enabled = window.hasOwnProperty('web3');

    const [isRefAddressLoading, setRefAddressLoading] = useState<boolean>(false);
    const userAddress = useRecoilValue(loggedInAccountAtom);
    const setRegistered = useSetRecoilState(isRegisteredAtom);
    const refIdState = useRecoilValue(refState);
    const [shouldUpdateBalance, setShouldUpdateBalance] = useRecoilState(balanceUpdateIdentifier);
    const [refId, setRefId] = useState<string>(refIdState || '');
    const [refAddress, setRefAddress] = useState<string>('');
    const [showUpline, setShowUpline] = useState<boolean>(!!refId);
    const [regForAdmin, setForAdmin] = useState<boolean>(false);
    const isEnough = useIsBalanceEnough();

    const [connectWalletBtn, setConnectWalletBtn] = useState(false);
    const [registerWalletBtn, setRegisterWalletBtn] = useState(false);
    const [modalWalletsActive, setModalWalletsActive] = useState(false);
    const [isModalsActive, setIsModalsActive] = useState(true);
    const [isTransaction, setIsTransaction] = useState(true);

    const registrationPrice = '0.01';

    const login = async (provider: string) => {
        if (provider === 'injected') {
            if ((isWeb3Enabled || provider !== 'injected') && !isAuthenticated) {
                try {
                    // @ts-ignore
                    await authenticate({ provider, signingMessage: "Log in using your wallet", chainId: process.env.REACT_APP_CHAIN_ID })
                        .then(function (user) {
                            console.log("logged in user:", user);
                            console.log(user!.get("ethAddress"));
                            setLoggedInAccount(user!.get("ethAddress"));
                            setModalWalletsActive(false);
                            setConnectWalletBtn(true);
                            window.localStorage.setItem("connectorId", provider);
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                } catch (e) {
                    console.error(e);
                }
            } else if (!isWeb3Enabled) {
                toast.error(
                    "Please, Install Metamask!"
                );
            }
        } else if (provider === 'walletconnect') {
            try {
                // @ts-ignore
                await authenticate({ provider, signingMessage: "Log in using your wallet", chainId: process.env.REACT_APP_CHAIN_ID })
                    .then(function (user) {
                        console.log("logged in user:", user);
                        console.log(user!.get("ethAddress"));
                        setLoggedInAccount(user!.get("ethAddress"));
                        setModalWalletsActive(false);
                        setConnectWalletBtn(true);
                        window.localStorage.setItem("connectorId", provider);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            } catch (e) {
                console.error(e);
            }
        }
    }

    const register = () => {
        if (refId && (!refAddress || refAddress === '0x0000000000000000000000000000000000000000')) {
            loadRefAddress(window.location.pathname.slice(1));
            return;
        } else if (!refId) {
            setRefId('1');
            loadRefAddress('1');
            return;
        }

        if (refAddress === userAddress) {
            toast.error('Error, please try again', { duration: 5000 });
            return;
        }

        if (!isEnough(registrationPrice!)) {
            setIsTransaction(false);
            return;
        }

        setLoading(true);

        try {
            DGRegistration(refAddress, registrationPrice!)
                .then((result) => {
                    // @ts-ignore
                    const waitPromise = result.wait();

                    toast.promise(waitPromise, {
                        loading: 'Registration loading...',
                        success: 'Registration complete successfully!',
                        error: 'Registration error, please try again',
                    });

                    waitPromise.then(() => {
                        setShouldUpdateBalance(shouldUpdateBalance + 1);
                        setLoading(false);
                        setRegistered(true);
                        navigate('/');
                    });
                })
                .catch(() => {
                    toast.error('Registration error, please try again', { duration: 5000 });
                    setLoading(false);
                });
        } catch (e) {
            toast.error('Error, please try again', { duration: 5000 });
            setLoading(false);
        }
    };

    const loadRefAddress = (customRef?: string) => {
        if (!refId && !customRef) {
            return;
        } else if (customRef === '1') {
            setForAdmin(true);
        } else if (customRef !== '1') {
            setForAdmin(false);
        }

        setRefAddressLoading(true);

        try {
            DGGetUserAddress(refId || customRef || '')
                .then((result) => {
                    if (result && result !== '0x0000000000000000000000000000000000000000') {
                        setRefAddress(result);
                    } else {
                        toast.error('Error, user ID not found', { duration: 5000 });
                    }
                    setRefAddressLoading(false);
                })
                .catch(() => {
                    toast.error('Error, user ID not found', { duration: 5000 });
                    setRefAddressLoading(false);
                });
        } catch (e) {
            toast.error('Error, please try again', { duration: 5000 });
            setRefAddressLoading(false);
        }
    };

    useEffect(() => {
        //console.log({ ifStatement: regForAdmin && refAddress && !isRefAddressLoading, regForAdmin, refAddress, isRefAddressLoading });
        if (refAddress && !isRefAddressLoading) {
            register();
        }
    }, [regForAdmin, refAddress, isRefAddressLoading]);

    useEffect(() => {
        if (refIdState && !refAddress) {
            loadRefAddress();
        }
    }, [refIdState, refAddress]);

    useEffect(() => {
        if (isAuthenticated) {
            setConnectWalletBtn(true);
        }
        if (window.location.pathname.slice(1)) {
            setRefId(window.location.pathname.slice(1));
        }
    }, [isAuthenticated, refId]);

    return (
        <>
            <div className='modal'>
                <div className='modal__shape'><img src={modalShape} alt="modal-shape" /></div>
                <div className='modal__body'>
                    <div className='modal__content'>
                        <div className='modal__logo'><img src={logo} alt="daily-game" /></div>
                        <div className='modal__title'>Registration</div>
                        <div>
                            {isTransaction ?
                                <div className='modal__rampage'>
                                    <div className='modal__subtitle'>Attention!</div>
                                    <p className='modal__descr'>
                                        By registering in our project you take full responsibility for your actions and agree to the rules of the game.
                                        Do not engage in high-risk games with your last or borrowed money.
                                    </p>
                                </div> :
                                <>
                                    <div className='modal__attention'><img src={notification} alt="attention" /></div>
                                    <div className='modal__attention-text'>
                                        Not enough BNB on your wallet to complete transaction
                                    </div>
                                </>}
                        </div>
                        <div className='modal__buttons'>
                            <div className={connectWalletBtn ? 'modal__btn-block disabled' : 'modal__btn-block'}>
                                <button className='modal__btn btn modal__btn-connect'
                                    onClick={() => { setModalWalletsActive(true) }}>{connectWalletBtn ? 'Authorized' : 'Connect wallet'}
                                    <img src={connectWalletBtn ? check : plus} alt={connectWalletBtn ? 'check' : 'plus'} />
                                </button>
                            </div>
                            {props.isLoginned && !props.isRegistered && (<div className='modal__btn-block'>
                                <button className='modal__btn btn modal__btn-register'
                                    onClick={register}>Register for {registrationPrice} BNB</button>
                            </div>)}
                            {!props.isLoginned && !props.isRegistered && (<div className='modal__btn-block disabled'>
                                <button className='modal__btn btn modal__btn-register'>Connect wallet to continue</button>
                            </div>)}
                            {!props.isLoginned && props.isRegistered && (<div className='modal__btn-block disabled'>
                                <button className='modal__btn btn modal__btn-register'>Connect wallet to continue</button>
                            </div>)}
                        </div>
                    </div>
                </div>
            </div>
            <div className={modalWalletsActive ? 'modal-wallets active' : 'modal-wallets'}>
                <div className='modal-wallets__body modal__body'>
                    <div className='modal-wallets__content modal__content'>
                        <div className='modal-wallets__title modal__title'>Connect wallet</div>
                        <div className='modal-wallets__items'>
                            <button className='modal-wallets__item' onClick={() => login('walletconnect')}>
                                <div className='modal-wallets__img'><img src={walletConnect} alt="wallet-connect" /></div>
                                <div className='modal-wallets__text'>
                                    <div className='modal-wallets__name'>WalletConnect</div>
                                    <div className='modal-wallets__subtitle'>Any wallet and browser</div>
                                </div>
                            </button>
                            <button className='modal-wallets__item' onClick={() => login('injected')}>
                                <div className='modal-wallets__img'><img src={metamask} alt="metamask" /></div>
                                <div className='modal-wallets__text'>
                                    <div className='modal-wallets__name'>MetaMask</div>
                                    <div className='modal-wallets__subtitle'>Desktop/DApp in app</div>
                                </div>
                            </button>
                        </div>
                        <div className='modal-wallets__contacts'>
                            Got questions? <a className='modal-wallets__link' target="_blank" rel="nofollow noopener" href="https://t.me/dailygamesupport">Contact support</a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Modals;