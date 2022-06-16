import React, { useState, useCallback, useEffect } from "react";
import { useMoralis } from "react-moralis";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { useNavigate } from 'react-router-dom';
import AccountStore, {
    loggedInAccountAtom,
    userBalanceAtom,
    userIdSelector,
    viewAccountAddressAtom,
    viewUserIdSelector
} from "../stores/account.tsx";
import { reduceNum, reduceStr } from '../helpers/numbers.ts'
import { toast } from "react-hot-toast";
import { DGGetUserAddress } from "../contract/DailyGame.ts";
import coins from '../icons/coins.svg';
import wallet from '../icons/wallet.svg';
import loop from '../icons/loop.svg';

const Header = () => {
    const { isAuthenticating, logout } = useMoralis();
    const [currentUserAddress, setLoggedInAccount] = useRecoilState(loggedInAccountAtom);
    const [userAddress, setUserAddress] = useRecoilState(viewAccountAddressAtom);
    const viewUserId = useRecoilValue(viewUserIdSelector);
    const userId = useRecoilValue(userIdSelector);
    const balance = useRecoilValue(userBalanceAtom);
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const [showUserId, setShowUserId] = useState('');
    const [isLoading, setLoading] = useState<boolean>(false);
    const setViewUserAddress = useSetRecoilState(viewAccountAddressAtom);
    const [showBack, setShowBack] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [isInputActive, setIsInputActive] = useState(false);
    const [isRegisteredMoralis, setRegisteredMoralis] = useState<boolean>();

    const resetForm = () => {
        setLoading(false);
        setShowUserId('');
        setShowBack(false);
        setViewUserAddress(currentUserAddress);
    };


    const handleClose = () => {
        resetForm();
        setIsInputActive(false)
        setShow(false);
    };

    const handleSearch = useCallback(() => {
        if (!showUserId) {
            toast.error('Error enter user ID', { duration: 5000 });
            return;
        }

        if (userId === showUserId) {
            toast.error(`You have entered your ID`, { duration: 5000 });
            return;
        }

        setLoading(true);

        const wait = DGGetUserAddress(showUserId)
            .then((response) => {
                setLoading(false);
                setViewUserAddress(response);
                setShowBack(true);
                navigate('/dashboard');
            })
            .catch(() => {
                setLoading(false);
                throw Error('Error user search');
            });

        toast.promise(wait, {
            loading: 'User search',
            error: 'Error user search',
            success: 'User found',
        });
    }, [navigate, showUserId, setViewUserAddress]);

    const handleResize = () => {
        if (window.innerWidth < 1400) {
            setIsMobile(true)
        } else {
            setIsMobile(false)
        }
    }

    useEffect(() => {
        window.addEventListener("resize", handleResize)
    })

    useEffect(() => {
        handleResize();
    }, [])

    const logOut = () => {
        setLoggedInAccount(null);
        logout();
        navigate('/');
    }

    return (
        <>
            <AccountStore />
            <header className='header'>
                <div className={isMobile ? 'header__menu mobile' : 'header__menu'}>
                    <div className='header__right'>
                        <div className={isMobile ? 'header__search mobile' : 'header__search'}>
                            {showBack
                                ?
                                <>
                                    {isMobile ? '' : <div className='header__input'>
                                        {isMobile ? '' : <input value={showUserId} onChange={(event) => setShowUserId(event.target.value)} type='text' placeholder='Search by User ID...' />}
                                        {isMobile ? <div className="header__search-btns">{isInputActive ? '' : <button onClick={() => { setIsInputActive(true) }} className='header__input-loop white'><img src={loop} alt="loop" /></button>}<button onClick={handleSearch} className='header__input-loop'><img src={loop} alt="loop" /></button></div> : <button onClick={handleSearch} className='header__input-loop'><img src={loop} alt="loop" /></button>}
                                    </div>}
                                    <div className="header__back">
                                        <button onClick={handleClose} className="button">{isMobile ? <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M447.1 256C447.1 273.7 433.7 288 416 288H109.3l105.4 105.4c12.5 12.5 12.5 32.75 0 45.25C208.4 444.9 200.2 448 192 448s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25l160-160c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L109.3 224H416C433.7 224 447.1 238.3 447.1 256z" /></svg> : 'Return to my account'}</button>
                                    </div>
                                </>
                                :
                                <div className='header__input'>
                                    {isMobile ? '' : <input value={showUserId} onChange={(event) => setShowUserId(event.target.value)} type='text' placeholder='Search by User ID...' />}
                                    {isMobile ? <div className="header__search-btns">{isInputActive ? '' : <button onClick={() => { setIsInputActive(true) }} className='header__input-loop white'><img src={loop} alt="loop" /></button>}<button onClick={handleSearch} className='header__input-loop'><img src={loop} alt="loop" /></button></div> : <button onClick={handleSearch} className='header__input-loop'><img src={loop} alt="loop" /></button>}
                                </div>
                            }
                        </div>
                        <div className='header__info'>
                            {isMobile ? <div className={isInputActive ? "header__input header__input-mobile active" : "header__input header__input-mobile"}><input value={showUserId} onChange={(event) => setShowUserId(event.target.value)} type='text' placeholder='Search by ID...' /></div> : ''}
                            <div className='header__balance header__info-item'>
                                <img src={coins} alt="coins" />
                                <div className='header__text'><span>{reduceNum(balance, 3)}</span> <span>BNB</span></div>
                            </div>
                            <div className="header__wallet header__info-item">
                                <img src={wallet} alt="wallet" />
                                <div className='header__text'>{reduceStr(currentUserAddress)}</div>
                            </div>
                        </div>
                        <a href="/" className='header__exit item' onClick={logOut}>
                            <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6.8335 20.5C6.8335 20.9531 7.01348 21.3876 7.33386 21.708C7.65423 22.0283 8.08875 22.2083 8.54183 22.2083H21.5081L17.5789 26.1204C17.4188 26.2792 17.2917 26.4682 17.205 26.6763C17.1182 26.8845 17.0736 27.1078 17.0736 27.3333C17.0736 27.5589 17.1182 27.7821 17.205 27.9903C17.2917 28.1985 17.4188 28.3874 17.5789 28.5462C17.7377 28.7064 17.9267 28.8335 18.1348 28.9202C18.343 29.0069 18.5663 29.0516 18.7918 29.0516C19.0174 29.0516 19.2406 29.0069 19.4488 28.9202C19.657 28.8335 19.8459 28.7064 20.0047 28.5462L26.8381 21.7129C26.9936 21.5504 27.1155 21.3589 27.1968 21.1492C27.3677 20.7333 27.3677 20.2667 27.1968 19.8508C27.1155 19.6411 26.9936 19.4496 26.8381 19.2871L20.0047 12.4538C19.8455 12.2945 19.6564 12.1681 19.4483 12.0819C19.2401 11.9957 19.0171 11.9513 18.7918 11.9513C18.5666 11.9513 18.3435 11.9957 18.1354 12.0819C17.9273 12.1681 17.7382 12.2945 17.5789 12.4538C17.4196 12.613 17.2933 12.8021 17.2071 13.0102C17.1209 13.2184 17.0765 13.4414 17.0765 13.6667C17.0765 13.8919 17.1209 14.115 17.2071 14.3231C17.2933 14.5312 17.4196 14.7203 17.5789 14.8796L21.5081 18.7917H8.54183C8.08875 18.7917 7.65423 18.9717 7.33386 19.292C7.01348 19.6124 6.8335 20.0469 6.8335 20.5ZM29.0418 3.41667H11.9585C10.5993 3.41667 9.2957 3.95662 8.33457 4.91774C7.37345 5.87887 6.8335 7.18243 6.8335 8.54167V13.6667C6.8335 14.1197 7.01348 14.5543 7.33386 14.8746C7.65423 15.195 8.08875 15.375 8.54183 15.375C8.99491 15.375 9.42943 15.195 9.7498 14.8746C10.0702 14.5543 10.2502 14.1197 10.2502 13.6667V8.54167C10.2502 8.08859 10.4301 7.65407 10.7505 7.33369C11.0709 7.01332 11.5054 6.83333 11.9585 6.83333H29.0418C29.4949 6.83333 29.9294 7.01332 30.2498 7.33369C30.5702 7.65407 30.7502 8.08859 30.7502 8.54167V32.4583C30.7502 32.9114 30.5702 33.3459 30.2498 33.6663C29.9294 33.9867 29.4949 34.1667 29.0418 34.1667H11.9585C11.5054 34.1667 11.0709 33.9867 10.7505 33.6663C10.4301 33.3459 10.2502 32.9114 10.2502 32.4583V27.3333C10.2502 26.8803 10.0702 26.4457 9.7498 26.1254C9.42943 25.805 8.99491 25.625 8.54183 25.625C8.08875 25.625 7.65423 25.805 7.33386 26.1254C7.01348 26.4457 6.8335 26.8803 6.8335 27.3333V32.4583C6.8335 33.8176 7.37345 35.1211 8.33457 36.0823C9.2957 37.0434 10.5993 37.5833 11.9585 37.5833H29.0418C30.4011 37.5833 31.7046 37.0434 32.6658 36.0823C33.6269 35.1211 34.1668 33.8176 34.1668 32.4583V8.54167C34.1668 7.18243 33.6269 5.87887 32.6658 4.91774C31.7046 3.95662 30.4011 3.41667 29.0418 3.41667Z" />
                            </svg>

                        </a>
                    </div>
                </div>
            </header>
        </>
    )
}

export default Header;