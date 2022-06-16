import React, { useEffect, useState } from "react";
import { NavLink } from 'react-router-dom';
import { useRecoilValue } from "recoil";
import { loggedInAccountAtom, viewAccountAddressAtom } from "../stores/account.tsx";
import logo from '../icons/logo.svg';
import twitter from '../icons/twitter.svg';
import telegram from '../icons/telegram.svg';

const Navigation = () => {
    const currentUserAddress = useRecoilValue(loggedInAccountAtom);
    const userAddress = useRecoilValue(viewAccountAddressAtom);

    const [isMobile, setIsMobile] = useState(false);

    const handleResize = () => {
        if (window.innerWidth < 991) {
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

    return (
        <>
            <nav className='navigation'>
                <div className='navigation__top'>
                    <NavLink to='/' className='navigation__logo'><img src={logo} alt='logotype' /></NavLink>
                    <ul className='navigation__ul'>
                        <li className='navigation__li'>
                            <NavLink className='navigation__link' to='/dashboard'>
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect width="8.55738" height="8.55738" rx="1.77049" />
                                    <rect y="10.5574" width="8.55738" height="8.55738" rx="1.77049" />
                                    <rect x="10.5576" y="10.5574" width="8.55738" height="8.55738" rx="1.77049" />
                                    <rect x="10.5576" width="8.55738" height="8.55738" rx="1.77049" />
                                </svg>

                                Dashboard
                            </NavLink>
                        </li>
                        <li className='navigation__li'>
                            <NavLink className='navigation__link' to='/statistics'>
                                <svg width="22" height="18" viewBox="0 0 22 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M0 9.57143C0 9.01914 0.447715 8.57143 1 8.57143H5C5.55228 8.57143 6 9.01914 6 9.57143V17C6 17.5523 5.55228 18 5 18H1C0.447715 18 0 17.5523 0 17V9.57143Z" />
                                    <rect x="8" width="6" height="18" rx="1" />
                                    <path d="M16 6C16 5.44772 16.4477 5 17 5H21C21.5523 5 22 5.44772 22 6V17C22 17.5523 21.5523 18 21 18H17C16.4477 18 16 17.5523 16 17V6Z" />
                                </svg>

                                {isMobile ? 'Stat' : 'Statistics'}
                            </NavLink>
                        </li>
                        <li className='navigation__li'>
                            <NavLink className='navigation__link' to='/referral'>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M13.2899 9.29L9.28994 13.29C9.19621 13.383 9.12182 13.4936 9.07105 13.6154C9.02028 13.7373 8.99414 13.868 8.99414 14C8.99414 14.132 9.02028 14.2627 9.07105 14.3846C9.12182 14.5064 9.19621 14.617 9.28994 14.71C9.3829 14.8037 9.4935 14.8781 9.61536 14.9289C9.73722 14.9797 9.86793 15.0058 9.99994 15.0058C10.132 15.0058 10.2627 14.9797 10.3845 14.9289C10.5064 14.8781 10.617 14.8037 10.7099 14.71L14.7099 10.71C14.8982 10.5217 15.004 10.2663 15.004 10C15.004 9.7337 14.8982 9.47831 14.7099 9.29C14.5216 9.1017 14.2662 8.99591 13.9999 8.99591C13.7336 8.99591 13.4782 9.1017 13.2899 9.29Z" />
                                    <path d="M12.28 17.4L11 18.67C10.2815 19.4104 9.31547 19.8605 8.28632 19.9342C7.25717 20.008 6.23687 19.7004 5.42003 19.07C4.9883 18.7142 4.636 18.2719 4.38587 17.7715C4.13574 17.2711 3.99336 16.7238 3.96792 16.165C3.94247 15.6061 4.03453 15.0482 4.23815 14.5271C4.44177 14.0061 4.75242 13.5335 5.15003 13.14L6.57003 11.71C6.66376 11.617 6.73815 11.5064 6.78892 11.3846C6.83969 11.2627 6.86583 11.132 6.86583 11C6.86583 10.868 6.83969 10.7373 6.78892 10.6154C6.73815 10.4936 6.66376 10.383 6.57003 10.29C6.47707 10.1963 6.36647 10.1219 6.24461 10.0711C6.12275 10.0203 5.99204 9.99421 5.86003 9.99421C5.72802 9.99421 5.59731 10.0203 5.47545 10.0711C5.3536 10.1219 5.24299 10.1963 5.15003 10.29L3.88003 11.57C2.81019 12.606 2.15262 13.995 2.0294 15.4792C1.90618 16.9633 2.32568 18.4418 3.21003 19.64C3.73491 20.3209 4.39867 20.8824 5.15722 21.2871C5.91577 21.6917 6.75174 21.9304 7.60961 21.9871C8.46748 22.0439 9.3276 21.9174 10.1328 21.6162C10.9381 21.315 11.67 20.8459 12.28 20.24L13.7 18.82C13.8883 18.6317 13.9941 18.3763 13.9941 18.11C13.9941 17.8437 13.8883 17.5883 13.7 17.4C13.5117 17.2117 13.2563 17.1059 12.99 17.1059C12.7237 17.1059 12.4683 17.2117 12.28 17.4ZM19.66 3.22001C18.4535 2.32647 16.963 1.90269 15.4669 2.02783C13.9707 2.15297 12.5713 2.81846 11.53 3.90001L10.45 5.00001C10.3266 5.08974 10.2234 5.2044 10.147 5.33656C10.0707 5.46872 10.023 5.61543 10.007 5.7672C9.99096 5.91897 10.007 6.07241 10.054 6.2176C10.1011 6.36278 10.1781 6.49647 10.28 6.61001C10.373 6.70374 10.4836 6.77813 10.6055 6.8289C10.7273 6.87967 10.858 6.90581 10.99 6.90581C11.122 6.90581 11.2527 6.87967 11.3746 6.8289C11.4965 6.77813 11.6071 6.70374 11.7 6.61001L13 5.30001C13.7146 4.55632 14.6795 4.10384 15.7082 4.02997C16.7369 3.95609 17.7565 4.26606 18.57 4.90001C19.005 5.25581 19.3601 5.69926 19.6122 6.20147C19.8643 6.70368 20.0078 7.25337 20.0332 7.81473C20.0587 8.3761 19.9656 8.93652 19.76 9.4595C19.5544 9.98248 19.241 10.4563 18.84 10.85L17.42 12.28C17.3263 12.373 17.2519 12.4836 17.2011 12.6054C17.1504 12.7273 17.1242 12.858 17.1242 12.99C17.1242 13.122 17.1504 13.2527 17.2011 13.3746C17.2519 13.4964 17.3263 13.607 17.42 13.7C17.513 13.7937 17.6236 13.8681 17.7455 13.9189C17.8673 13.9697 17.998 13.9958 18.13 13.9958C18.262 13.9958 18.3927 13.9697 18.5146 13.9189C18.6365 13.8681 18.7471 13.7937 18.84 13.7L20.26 12.28C20.8642 11.6701 21.3319 10.9388 21.6321 10.1345C21.9323 9.33028 22.0582 8.47141 22.0015 7.61481C21.9448 6.75821 21.7067 5.92345 21.303 5.1658C20.8994 4.40815 20.3393 3.74491 19.66 3.22001Z" />
                                </svg>

                                Referral
                            </NavLink>
                        </li>
                        {currentUserAddress !== userAddress && (
                            ''
                        )}
                        <li className='navigation__li'>
                            <NavLink className='navigation__link' to='/roadmap'>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12.03 1.99999C14.29 2.01001 16.45 2.91001 18.03 4.49001C19.62 6.08001 20.51 8.23001 20.5001 10.46V10.51C20.44 13.54 18.74 16.33 16.62 18.51C15.42 19.74 14.09 20.83 12.64 21.75C12.25 22.08 11.68 22.08 11.29 21.75C9.14 20.35 7.24 18.59 5.7 16.54C4.35 14.76 3.58 12.62 3.5 10.39C3.52 5.74001 7.34 1.99001 12.03 1.99999ZM12.03 7.93001C10.54 7.93001 9.34 9.12001 9.34 10.6C9.34 12.061 10.52 13.24 12 13.26H12.03C12.74 13.26 13.42 12.99 13.92 12.5C14.44 11.99 14.731 11.311 14.731 10.6C14.731 9.12001 13.52 7.93001 12.03 7.93001Z" />
                                </svg>

                                Road map
                            </NavLink>
                        </li>
                        {isMobile ? <li className='navigation__li'><NavLink className='navigation__link' to='/follow'>
                            <svg width="29" height="27" viewBox="0 0 29 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M28.9526 24.9082L27.6276 20.9336C27.5521 20.7068 27.5767 20.4631 27.6862 20.2506C28.6818 18.3162 29.093 16.0322 28.6623 13.6247C28.0018 9.93417 25.2993 6.86749 21.7942 5.69141C22.6986 7.87577 22.9744 10.3045 22.5226 12.7136C21.6046 17.6102 17.6836 21.4926 12.766 22.3746C12.1294 22.4888 11.4862 22.5443 10.848 22.5606C12.3415 24.1719 14.335 25.3173 16.5588 25.7161C18.9515 26.1453 21.2248 25.7458 23.1535 24.765C23.3651 24.6574 23.6071 24.6335 23.8324 24.7085L27.8222 26.0385C28.5208 26.2714 29.1855 25.6068 28.9526 24.9082Z" />
                                <path d="M8.54599 0.185132C4.40155 0.955218 1.08037 4.32232 0.337695 8.47174C-0.0930764 10.8792 0.318135 13.1632 1.3138 15.0976C1.42323 15.3101 1.44785 15.5539 1.37241 15.7806L0.0473923 19.7552C-0.185439 20.4538 0.479145 21.1184 1.17779 20.8856L5.16756 19.5556C5.39291 19.4806 5.63503 19.5045 5.84657 19.6121C7.77514 20.5929 10.0484 20.9923 12.4411 20.5632C16.5804 19.8209 19.9389 16.5079 20.7138 12.3747C22.079 5.09338 15.8251 -1.16745 8.54599 0.185132ZM11.1845 13.5928H6.03144C5.52319 13.5928 5.11122 13.1809 5.11122 12.6726C5.11122 12.1643 5.52319 11.7524 6.03144 11.7524H11.1845C11.6929 11.7524 12.1048 12.1643 12.1048 12.6726C12.1048 13.1809 11.6929 13.5928 11.1845 13.5928ZM14.8653 9.912H6.03137C5.52311 9.912 5.11114 9.5001 5.11114 8.99177C5.11114 8.48352 5.52311 8.07155 6.03137 8.07155H14.8653C15.3736 8.07155 15.7855 8.48352 15.7855 8.99177C15.7856 9.5001 15.3737 9.912 14.8653 9.912Z" />
                            </svg>


                            Follow
                        </NavLink></li> : ''}
                    </ul>
                </div>
                <div className='navigation__bottom'>
                    <div className='navigation__bottom-item'>
                        <div className='navigation__name'>Follow us on:</div>
                        <ul className='navigation__socials'>
                            <li className='navigation__socials-li '>
                                <a className='navigation__socials-link item' target='_blank' rel="nofollow noopener" href={process.env.REACT_APP_TWITTER_LINK}>
                                    <img src={twitter} alt="twitter" />
                                </a>
                            </li>
                            <li className='navigation__socials-li '>
                                <a className='navigation__socials-link item' target='_blank' rel="nofollow noopener" href={process.env.REACT_APP_TELEGRAM_LINK}>
                                    <img src={telegram} alt="telegram" />
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className='navigation__bottom-item'>
                        <div className='navigation__name'>Promo:</div>
                        <ul className='navigation__socials'>
                            <li className='navigation__socials-li '>
                                <a className='navigation__socials-link item' href={process.env.REACT_APP_RU_PRESENTATION} target='_blank' rel="nofollow noopener">
                                    RUS
                                </a>
                            </li>
                            <li className='navigation__socials-li '>
                                <a className='navigation__socials-link item' href={process.env.REACT_APP_ENG_PRESENTATION} target='_blank' rel="nofollow noopener">
                                    ENG
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Navigation;