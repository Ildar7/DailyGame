import React, { useCallback, useEffect, useState, useTransition } from "react";
import {
    DGBuyLevel, DGGetLevelQueue,
    DGLoadLevels, LevelsResult
} from "../contract/DailyGame.ts";
import { useRecoilState, useRecoilValue } from "recoil";
import { levelPricesState } from "../stores/contract.tsx";
import { toast } from "react-hot-toast";
import { hours } from './Dashboard/config.ts'
import { reduceNum } from '../helpers/numbers.ts'
import {
    balanceUpdateIdentifier,
    loggedInAccountAtom, useIsBalanceEnough,
    viewAccountAddressAtom,
    viewUserIdSelector
} from "../stores/account.tsx";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import money from '../icons/money.svg';
import users from '../icons/users.svg';
import user from '../icons/user.svg';
import scrip from '../icons/scrip.svg';
import { wait } from "@testing-library/user-event/dist/utils";

const Dashboard = () => {
    const [isPending, startTransition] = useTransition();
    const levelPrices = useRecoilValue(levelPricesState);
    const [levels, setLevels] = useState<LevelsResult | null>(null);
    const [profit, setProfit] = useState('0');
    const [referralPayouts, setReferralPayouts] = useState('0');
    const [levelBuy, setLevelBuy] = useState<number>(-1);
    const [isLoading, setLoading] = useState<boolean>(true);
    const [waitingTransaction, setWaitingTransaction] = useState<boolean>(false);
    const [currentLevelIndex, setCurrentLevelIndex] = useState<number>(0);
    const currentUserAddress = useRecoilValue(loggedInAccountAtom);
    const userAddress = useRecoilValue(viewAccountAddressAtom);
    const userId = useRecoilValue(viewUserIdSelector);
    const [shouldUpdateBalance, setShouldUpdateBalance] = useRecoilState(balanceUpdateIdentifier);
    const isEnough = useIsBalanceEnough();

    const [itemActive, setItemActive] = useState({
        0: false,
        1: false,
        2: false,
        3: false,
        4: false,
        5: false,
        6: false,
        7: false,
        8: false,
        9: false,
        10: false,
        11: false,
        12: false
    });

    const [hoursPercent, setHoursPercent] = useState({
        0: 0,
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
        6: 0,
        7: 0,
        8: 0,
        9: 0,
        10: 0,
        11: 0,
        12: 0
    });

    function formatDate(date) {

        var dd = date.getDate();
        if (dd < 10) dd = '0' + dd;

        var mm = date.getMonth() + 1;
        if (mm < 10) mm = '0' + mm;

        var yy = date.getFullYear();
        if (yy < 10) yy = '0' + yy;

        return yy + '-' + mm + '-' + dd;
    }

    let fatherDay = 19;

    let allowDate_1 = new Date(2022, 5, fatherDay); // 19 июня 2022
    let allowDate_2 = new Date(2022, 5, fatherDay + 1); // 20 июня 2022
    let allowDate_3 = new Date(2022, 5, fatherDay + 2); // 21 июня 2022
    let allowDate_4 = new Date(2022, 5, fatherDay + 3); // 22 июня 2022
    let allowDate_5 = new Date(2022, 5, fatherDay + 4); // 23 июня 2022
    let allowDate_6 = new Date(2022, 5, fatherDay + 5); // 24 июня 2022
    let allowDate_7 = new Date(2022, 5, fatherDay + 6); // 25 июня 2022

    let todayDate = new Date();

    const getQueue = async () => {
        try {
            for (let number = 0; number < 13; number++) {
                setLoading(true);
                if (itemActive[number]) {
                    let response = await DGGetLevelQueue(userAddress, (todayDate.toISOString().split('T')[0] === formatDate(allowDate_1) ? number
                        :
                        todayDate.toISOString().split('T')[0] === formatDate(allowDate_2) ? number + 13
                            :
                            todayDate.toISOString().split('T')[0] === formatDate(allowDate_3) ? number + 26
                                :
                                todayDate.toISOString().split('T')[0] === formatDate(allowDate_4) ? number + 39
                                    :
                                    todayDate.toISOString().split('T')[0] === formatDate(allowDate_5) ? number + 52
                                        :
                                        todayDate.toISOString().split('T')[0] === formatDate(allowDate_6) ? number + 65
                                            :
                                            todayDate.toISOString().split('T')[0] === formatDate(allowDate_7) ? number + 78
                                                :
                                                -1) + 1);
                    hoursPercent[number] = !response[0] && !response[1] ? 0 : (1 - response[0] / response[1]) * 100;
                }
            }
            setLoading(false);
        } catch (e) {
            console.error(e);
        }
    };

    const allProfit = (alllevels) => {
        let sumPayouts = 0;
        for (let i = 0; i < alllevels.levels.length; i++) {
            sumPayouts += +alllevels.levels[i].rewardSum;
        }
        return sumPayouts + '';
    }

    const allReferralPayouts = (alllevels) => {
        let sumReferralPayouts = 0;
        for (let i = 0; i < alllevels.levels.length; i++) {
            sumReferralPayouts += +alllevels.levels[i].referralPayoutSum;
        }
        return sumReferralPayouts + '';
    }

    const getActiveLevel = useCallback((alllevels) => {
        for (let i = 0; i < alllevels.levels.length; i++) {
            if (alllevels.levels[i].active) {
                itemActive[i] = true;
            } else {
                itemActive[i] = false;
            }
        }
    }, [itemActive])

    const loadLevels = () => {
        if (!userAddress) {
            return;
        }

        setLoading(true);
        //setCheckQueue(true);

        try {
            DGLoadLevels(userAddress)
                .then((result) => {
                    setLevels(result);
                    setLevelBuy(-1);
                    setWaitingTransaction(false);
                    getQueue();
                    setProfit(allProfit(result));
                    setReferralPayouts(allReferralPayouts(result));
                    getActiveLevel(result);
                })
                .catch((e) => {
                    console.error(e);
                    setLevelBuy(-1);
                    setLoading(false);
                    setWaitingTransaction(false);
                });
        } catch (e) {
            console.error(e);
            setLevelBuy(-1);
            setLoading(false);
            setWaitingTransaction(false);
        }
    };

    const handleBuy = useCallback(async (level) => {
        if (!levelPrices) {
            return;
        }

        if (!levels.levels[level].canBuild) {
            toast.error('You should buy previous hour!', { duration: 5000 });
            return;
        }

        const levelPrice = levelPrices[todayDate.toISOString().split('T')[0] === formatDate(allowDate_1) ? level
            :
            todayDate.toISOString().split('T')[0] === formatDate(allowDate_2) ? level + 13
                :
                todayDate.toISOString().split('T')[0] === formatDate(allowDate_3) ? level + 26
                    :
                    todayDate.toISOString().split('T')[0] === formatDate(allowDate_4) ? level + 39
                        :
                        todayDate.toISOString().split('T')[0] === formatDate(allowDate_5) ? level + 52
                            :
                            todayDate.toISOString().split('T')[0] === formatDate(allowDate_6) ? level + 65
                                :
                                todayDate.toISOString().split('T')[0] === formatDate(allowDate_7) ? level + 78
                                    :
                                    -1];

        if (!isEnough(levelPrice!)) {
            toast.error('Not enough BNB on your wallet to complete transaction', { duration: 5000 });
            return;
        }

        setLevelBuy(level);

        const askToBuy = true;

        if (askToBuy) {
            startTransition(() => {
                try {
                    DGBuyLevel((todayDate.toISOString().split('T')[0] === formatDate(allowDate_1) ? level
                        :
                        todayDate.toISOString().split('T')[0] === formatDate(allowDate_2) ? level + 13
                            :
                            todayDate.toISOString().split('T')[0] === formatDate(allowDate_3) ? level + 26
                                :
                                todayDate.toISOString().split('T')[0] === formatDate(allowDate_4) ? level + 39
                                    :
                                    todayDate.toISOString().split('T')[0] === formatDate(allowDate_5) ? level + 52
                                        :
                                        todayDate.toISOString().split('T')[0] === formatDate(allowDate_6) ? level + 65
                                            :
                                            todayDate.toISOString().split('T')[0] === formatDate(allowDate_7) ? level + 78
                                                :
                                                -1) + 1, userAddress!, levelPrice)
                        .then((result) => {
                            if (result) {
                                setWaitingTransaction(true);
                                // @ts-ignore
                                const waitPromise = result.wait();
                                toast.promise(waitPromise, {
                                    loading: 'Buying an hour, wait...',
                                    success: 'Hour purchased successfully',
                                    error: 'Error, please try again',
                                });

                                waitPromise.then(() => {
                                    setShouldUpdateBalance(shouldUpdateBalance + 1);
                                    loadLevels();
                                });
                            } else {
                                setLevelBuy(-1);
                            }
                        })
                        .catch((e) => {
                            setLevelBuy(-1);
                            toast.error('The level is closed!', { duration: 5000 });
                            console.error(e);
                        });
                } catch (e) {
                    setLevelBuy(-1);
                    toast.error('Error, please try again', { duration: 5000 });
                    console.error(e);
                }
            });
        } else {
            setLevelBuy(-1);
        }
    }, [levelPrices, shouldUpdateBalance, setShouldUpdateBalance, isEnough, userAddress, currentLevelIndex, levels]);

    useEffect(() => {
        getQueue();
    }, [userAddress, waitingTransaction, itemActive]);

    useEffect(() => {
        loadLevels();
    }, [userAddress, hoursPercent]);

    if (isLoading) {
        return (
            <div className="dashboard block">
                <div className='block__title'>Dashboard</div>
                <div className='dashboard__content'>Loading info...</div>
            </div>
        )
    } else {
        return (
            <>
                <div className='dashboard block'>
                    <div className='block__title'>Dashboard</div>
                    <div className='dashboard__content'>
                        <div className='dashboard__top'>
                            <div className='dashboard__left'>
                                <div className='dashboard__top-item'>
                                    <div className='dashboard__img dashboard__img-money item'><img src={money} alt="money" /></div>
                                    <div className='dashboard__text'>
                                        <span className='dashboard__name'>Profit</span>
                                        <span className={profit === '0' ? 'dashboard__profit' : 'dashboard__profit green'}>
                                            {profit === '0' ? '0 BNB' : `+ ${reduceNum(profit, 4)} BNB`}
                                        </span>
                                    </div>
                                </div>
                                <div className='dashboard__top-item'>
                                    <div className='dashboard__img dashboard__img-users item'><img src={users} alt="users" /></div>
                                    <div className='dashboard__text'>
                                        <span className='dashboard__name'>Referral bonus</span>
                                        <span className={referralPayouts === '0' ? 'dashboard__profit' : 'dashboard__profit green'}>
                                            {referralPayouts === '0' ? '0 BNB' : `+ ${reduceNum(referralPayouts, 4)} BNB`}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className='dashboard__right'>
                                <div className='dashboard__top-item'>
                                    <div className='dashboard__img dashboard__img-user item'><img src={user} alt="user" /></div>
                                    <div className='dashboard__text'>
                                        <span className='dashboard__name'>User's information</span>
                                        <div className='dashboard__info'>
                                            <div className='dashboard__input'>
                                                <div className='dashboard__subtitle'>Wallet address</div>
                                                <CopyToClipboard text={userAddress} onCopy={() => { toast.success('Copied!') }}>
                                                    <div className='dashboard__input-item input-item'>
                                                        <input className='dashboard__wallet' type="text" value={userAddress} readOnly />
                                                        <button className='dashboard__copy input-copy'>
                                                            <svg width="14" height="18" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <rect x="1" y="4.07129" width="9" height="12.4998" rx="1" strokeWidth="2" />
                                                                <path d="M5 1H11C12.1046 1 13 1.89543 13 3V14.4641" strokeWidth="2" strokeLinecap="round" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </CopyToClipboard>
                                            </div>
                                            <div className='dashboard__input'>
                                                <div className='dashboard__subtitle'>User's ID</div>
                                                <CopyToClipboard text={userId} onCopy={() => { toast.success('Copied!') }}>
                                                    <div className='dashboard__input-item input-item'>
                                                        <input className='dashboard__wallet' type="text" value={userId} readOnly />
                                                        <button className='dashboard__copy input-copy'>
                                                            <svg width="14" height="18" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <rect x="1" y="4.07129" width="9" height="12.4998" rx="1" strokeWidth="2" />
                                                                <path d="M5 1H11C12.1046 1 13 1.89543 13 3V14.4641" strokeWidth="2" strokeLinecap="round" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </CopyToClipboard>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='dashboard__block'>
                            <div className='dashboard__block-scrip dashboard__block-scrip-left'><img src={scrip} alt="scrip" /></div>
                            <div className='dashboard__block-scrip dashboard__block-scrip-right'><img src={scrip} alt="scrip" /></div>
                            <div className='dashboard__block-top'>BUY HOURS <span>(DAY {(todayDate.toISOString().split('T')[0] === formatDate(allowDate_1) ? '1'
                                :
                                todayDate.toISOString().split('T')[0] === formatDate(allowDate_2) ? '2'
                                    :
                                    todayDate.toISOString().split('T')[0] === formatDate(allowDate_3) ? '3'
                                        :
                                        todayDate.toISOString().split('T')[0] === formatDate(allowDate_4) ? '4'
                                            :
                                            todayDate.toISOString().split('T')[0] === formatDate(allowDate_5) ? '5'
                                                :
                                                todayDate.toISOString().split('T')[0] === formatDate(allowDate_6) ? '6'
                                                    :
                                                    todayDate.toISOString().split('T')[0] === formatDate(allowDate_7) ? '7'
                                                        :
                                                        'None')})</span></div>
                            <div className='dashboard__block-content'>
                                {currentUserAddress === userAddress && (hours.map(({ number, ending, coinsImg, levelPrice, levelTime, timeImg, queue }, key) => (
                                    <div className={itemActive[queue] ? 'dashboard__item active' : 'dashboard__item'} key={key}>
                                        <div className='dashboard__item-title'>
                                            <div className='dashboard__item-name'>
                                                <span className='time'>
                                                    <span className='number'>{number}</span>
                                                    <span className='ending'>{ending}</span>
                                                </span>
                                                <span className='dashboard__item-hour'>HOUR</span>
                                            </div>
                                            <div className='dashboard__item-price'>
                                                <img src={coinsImg} alt="coins" />
                                                <span>{levelPrice} BNB</span>
                                            </div>
                                        </div>
                                        <div className='dashboard__item-middle'>
                                            {itemActive[queue] ?
                                                <div className='dashboard__item-profit'>
                                                    <div className='dashboard__item-profit-top'>
                                                        <div className='dashboard__item-span'>
                                                            <span className='profit-name'>Profit:</span>
                                                            <div className='dashboard__item-price'>
                                                                <img src={coinsImg} alt="coins" />
                                                                <span> {levels === null ? '0' : levels.levels[queue].rewardSum} BNB</span>
                                                            </div>
                                                        </div>
                                                        <div className='dashboard__item-span'>
                                                            <span className='profit-name'>Referral bonus:</span>
                                                            <div className='dashboard__item-price'>
                                                                <img src={coinsImg} alt="coins" />
                                                                <span>{levels === null ? '0' : levels.levels[queue].referralPayoutSum} BNB</span>
                                                            </div>
                                                        </div>
                                                        <div className='dashboard__item-span'>
                                                            <span className='profit-name'>Payments:</span>
                                                            <div className='dashboard__item-price'>
                                                                {levels === null ? '0' : levels.levels[queue].curPayouts}/{levels === null ? '3' : levels.levels[queue].maxPayouts}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {
                                                        levels.levels[queue].curPayouts === levels.levels[queue].maxPayouts
                                                            ?
                                                            ''
                                                            :
                                                            <div className='dashboard__item-profit-bottom'>
                                                                <div className='dashboard__item-percent'>{hoursPercent[queue].toFixed(2)}%</div>
                                                                <div className='dashboard__item-bar'>
                                                                    <span style={{ width: hoursPercent[queue] + '%' }}></span>
                                                                </div>
                                                            </div>
                                                    }
                                                </div>
                                                :
                                                <div className='dashboard__item-time'>
                                                    <span>{levelTime} UTC</span>
                                                    <img src={timeImg} alt="time" />
                                                </div>}
                                        </div>
                                        <div className='dashboard__item-btn-block'>
                                            {itemActive[queue]
                                                ?
                                                <button className='dashboard__item-btn button'
                                                    disabled>
                                                    {levels.levels[queue].curPayouts === levels.levels[queue].maxPayouts ? 'Finished' : 'Active'}
                                                </button>
                                                :
                                                <button className='dashboard__item-btn button'
                                                    onClick={() => { handleBuy(queue) }}>
                                                    Activate
                                                </button>
                                            }
                                        </div>
                                    </div>
                                )))}
                                {currentUserAddress !== userAddress && (hours.map(({ number, ending, coinsImg, levelPrice, levelTime, timeImg, queue }, key) => (
                                    <div className={itemActive[queue] ? 'dashboard__item active' : 'dashboard__item'} key={key}>
                                        <div className='dashboard__item-title'>
                                            <div className='dashboard__item-name'>
                                                <span className='time'>
                                                    <span className='number'>{number}</span>
                                                    <span className='ending'>{ending}</span>
                                                </span>
                                                <span className='dashboard__item-hour'>HOUR</span>
                                            </div>
                                            <div className='dashboard__item-price'>
                                                <img src={coinsImg} alt="coins" />
                                                <span>{levelPrice} BNB</span>
                                            </div>
                                        </div>
                                        <div className='dashboard__item-middle'>
                                            {itemActive[queue] ?
                                                <div className='dashboard__item-profit'>
                                                    <div className='dashboard__item-profit-top'>
                                                        <div className='dashboard__item-span'>
                                                            <span className='profit-name'>Profit:</span>
                                                            <div className='dashboard__item-price'>
                                                                <img src={coinsImg} alt="coins" />
                                                                <span> {levels === null ? '0' : levels.levels[queue].rewardSum} BNB</span>
                                                            </div>
                                                        </div>
                                                        <div className='dashboard__item-span'>
                                                            <span className='profit-name'>Referral bonus:</span>
                                                            <div className='dashboard__item-price'>
                                                                <img src={coinsImg} alt="coins" />
                                                                <span>{levels === null ? '0' : levels.levels[queue].referralPayoutSum} BNB</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {
                                                        levels.levels[queue].curPayouts === levels.levels[queue].maxPayouts
                                                            ?
                                                            ''
                                                            :
                                                            <div className='dashboard__item-profit-bottom'>
                                                                <div className='dashboard__item-percent'>{hoursPercent[queue].toFixed(2)}%</div>
                                                                <div className='dashboard__item-bar'>
                                                                    <span style={{ width: hoursPercent[queue] + '%' }}></span>
                                                                </div>
                                                            </div>
                                                    }
                                                </div>
                                                :
                                                <div className='dashboard__item-time'>
                                                    <span>{levelTime} UTC</span>
                                                    <img src={timeImg} alt="time" />
                                                </div>}
                                        </div>
                                        <div className='dashboard__item-btn-block'>
                                            <button className='dashboard__item-btn button' disabled>
                                                Activate
                                            </button>
                                        </div>
                                    </div>
                                )))}
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default Dashboard;