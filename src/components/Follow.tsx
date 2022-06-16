import React, { useState, useEffect } from "react";
import twitter from '../icons/twitter_icon.svg';
import telegram from '../icons/telegram_icon.svg'


const Follow = () => {
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
    }, []);


    return (
        <>{
            isMobile
                ?
                <>
                    <div className="follow block">
                        <div className="follow__content">
                            <div className="follow__title">Follow us</div>
                            <div className="follow__items">
                                <a href={process.env.REACT_APP_TWITTER_LINK} target="_blank" rel="nofollow noopener" className="follow__item">
                                    <span className="follow__item-wrapper">
                                        <span className="follow__name">Twitter</span>
                                        <span className="follow__img"><img src={twitter} alt="twitter" /></span>
                                        <span></span>
                                    </span>
                                </a>
                                <a href={process.env.REACT_APP_TELEGRAM_LINK} target="_blank" rel="nofollow noopener" className="follow__item">
                                    <span className="follow__item-wrapper">
                                        <span className="follow__name">Telegram</span>
                                        <span className="follow__img"><img src={telegram} alt="twitter" /></span>
                                        <span></span>
                                    </span>
                                </a>
                            </div>
                            <div className="follow__bottom"></div>
                        </div>
                    </div>
                    <div className="promo follow block">
                        <div className="promo__content follow__content">
                            <div className="promo__title follow__title">Promo</div>
                            <div className="promo__items follow__items">
                                <a href={process.env.REACT_APP_RU_PRESENTATION} target="_blank" rel="nofollow noopener" className="promo__item follow__item">
                                    <span className="promo__item-wrapper follow__item-wrapper">
                                        <span className="promo__name follow__name">RUS</span>
                                    </span>
                                </a>
                                <a href={process.env.REACT_APP_ENG_PRESENTATION} target="_blank" rel="nofollow noopener" className="promo__item follow__item">
                                    <span className="promo__item-wrapper follow__item-wrapper">
                                        <span className="promo__name follow__name">ENG</span>
                                    </span>
                                </a>
                            </div>
                        </div>
                    </div>
                </>
                :
                <div className="block not-found">404 (Page not found)</div>
        }
        </>
    );
}

export default Follow;