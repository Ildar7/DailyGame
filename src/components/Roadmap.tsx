import React from 'react';
import pen from '../icons/pen.svg';
import clock from '../icons/clock.svg';
import arrow from '../icons/arrow.svg';

const Roadmap = () => {
    return (
        <>
            <div className='roadmap block'>
                <div className='block__title'>Road map</div>
                <div className='roadmap__content'>
                    <div className='roadmap__title'>
                        <div className='roadmap__img'><img src={pen} alt="pen" /></div>
                        <span>Our plans</span>
                    </div>
                    <div className='roadmap__dialog'>
                        <ul className='roadmap__list'>
                            <li className='roadmap__li answer'>Our team does not plan to stop at one day of the game. We aim for everyone to be able to gain profits. Therefore, if the project launches successfully, we will restart the game every day with a gradual increase in the cost of hours</li>
                            <li className='roadmap__li answer'>On the first day, the site will be accessible in advance (at 6:00 UTC). In order for every player to be the first one, the smart contract address will be posted in our official Telegram channel.</li>
                            <li className='roadmap__li question'>But what is your development plan?</li>
                            <li className='roadmap__li answer'>Also, the main goal is to expand the scope of the game beyond the community of CIS countries.</li>
                        </ul>
                    </div>
                    <div className='roadmap__stages'>
                        <div className='roadmap__name'>You have to see this!</div>
                        <div className='roadmap__bar'>
                            <div className='roadmap__wrap'>
                                <div className='roadmap__bar-item'>
                                    <span>
                                        <img src={arrow} alt="arrow" />
                                    </span>
                                </div>
                            </div>
                            <div className='roadmap__wrap roadmap__wrap-line'>
                                <span className='line'></span>
                            </div>
                            <div className='roadmap__wrap roadmap__wrap-line'>
                                <span className='line'></span>
                            </div>
                            <div className='roadmap__wrap'>
                                <div className='roadmap__bar-clock'>
                                    <img src={clock} alt="clock" />
                                </div>
                            </div>
                        </div>
                        <div className="roadmap__items">
                            <div className='roadmap__item'>
                                <div className='roadmap__item-name'>First stage</div>
                                <p className='roadmap__item-descr'>The launch of the project for the CIS community and the beginning of an aggressive marketing campaign.</p>
                            </div>
                            <div className='roadmap__item'>
                                <div className='roadmap__item-name'>Second stage</div>
                                <p className='roadmap__item-descr'>Expanding beyond the CIS community and launching new days with a new cost per hour.</p>
                            </div>
                            <div className='roadmap__item'>
                                <div className='roadmap__item-name'>Third stage</div>
                                <p className='roadmap__item-descr'>Gathering of the worldwide community to launch a full-scale game.</p>
                            </div>
                            <div className='roadmap__item'>
                                <div className='roadmap__item-name'>Fourth stage</div>
                                <p className='roadmap__item-descr'>The details will be revealed after the completion of the first and second stages.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Roadmap;