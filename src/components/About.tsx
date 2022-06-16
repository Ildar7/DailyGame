import React, { useState } from 'react';
import aboutImg from '../icons/about_img.svg';
import usersSec from '../icons/users_sec.svg';
import transaction from '../icons/transaction.svg';
import bnb from '../icons/bnb.svg';
import { tokenValue } from '../helpers/formatters.ts';
import { useRecoilValue } from "recoil";
import { dayStatisticsState } from "../stores/contract.tsx";

const About = () => {
    const dayStatistics = useRecoilValue(dayStatisticsState);
    const RightNum = (string) => {
        return string.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    const [dayStat, setDayStat] = useState({
        members: dayStatistics.members + '',
        transactions: dayStatistics.transactions + '',
        turnover: tokenValue(dayStatistics.turnover, 18) + ''
    });

    return (
        <>
            <div className='about block'>
                <div className='block__title'>About</div>
                <div className='about__content'>
                    <div className='about__block'>
                        <div className='about__top'>
                            <div className='about__img'><img src={aboutImg} alt="daily game" /></div>
                            <div className='about__text'>
                                is a decentralized financial instrument in a game form, which is built on the basis of a smart contract in the BinanceSmart Chain network (BEP-20).
                            </div>
                        </div>
                        <div className='about__text about__descr'>
                            This tool enables the player to gain profits both in passive form (buying levels) and in active form (buying levels and inviting partners).The game is set up on a cycle, so that each user can try his luck.
                        </div>
                    </div>
                    <div className='about__info'>
                        <div className='about__title'>Daily statistics</div>
                        <div className='about__items'>
                            <div className='about__item'>
                                <div className='about__icon users'><img src={usersSec} alt="users" /></div>
                                <div className='about__name'>Users per day</div>
                                <div className='about__subtitle'>{RightNum(dayStat.members)}</div>
                            </div>
                            <div className='about__item'>
                                <div className='about__icon transaction'><img src={transaction} alt="transaction" /></div>
                                <div className='about__name'>Transactions per day</div>
                                <div className='about__subtitle'>{RightNum(dayStat.transactions)}</div>
                            </div>
                            <div className='about__item'>
                                <div className='about__icon bnb'><img src={bnb} alt="bnb_icon" /></div>
                                <div className='about__name'>Turnover per day</div>
                                <div className='about__subtitle'>{RightNum(dayStat.turnover)}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default About;