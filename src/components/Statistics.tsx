import React, { useState, useEffect } from 'react';
import { DGGetUser, UserInfo } from '../contract/DailyGame.ts';
import { useRecoilState, useRecoilValue } from "recoil";
import { loggedInAccountAtom, viewAccountAddressAtom } from "../stores/account.tsx";
import { globalStatisticsState } from "../stores/contract.tsx";
import bnbImg from '../icons/bnb.svg';
import QueryTableOld from './QueryTable.tsx';
import users from '../icons/users_sec.svg';
import transaction from '../icons/transaction.svg';
import { tokenValue } from '../helpers/formatters.ts';
import {
    Chart,
    ChartTitle,
    ChartLegend,
    ChartSeries,
    ChartSeriesItem,
    ChartSeriesLabels,
} from '@progress/kendo-react-charts';
import { COLORS } from '../constants/vars';

const Statistics = () => {
    const [user, setUser] = useState<UserInfo | null>(null);
    const [userAddress, setUserAddress] = useRecoilState(viewAccountAddressAtom);
    const [isUserLoading, setUserLoading] = useState<boolean>(false);
    const globalStatistics = useRecoilValue(globalStatisticsState);
    const currentUserAddress = useRecoilValue(loggedInAccountAtom);
    const [accountStatistics, setAccountStatistics] = useState([
        {
            value: 0,
            color: COLORS.incomeHours,
        },
        {
            value: 0,
            color: COLORS.missedPayouts,
        },
        {
            value: 0,
            color: COLORS.incomeReferrals,
        },
        {
            value: 100,
            color: '#bbbbbb'
        }
    ]);

    const [globalStat, setGlobalStat] = useState({
        members: globalStatistics.members + '',
        transactions: globalStatistics.transactions + '',
        turnover: tokenValue(globalStatistics.turnover, 18) + ''
    });

    const RightNum = (string) => {
        return string.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    const loadUser = () => {
        // console.log({currentUserAddress, userAddress});
        if (!userAddress) {
            return;
        }

        setUserLoading(true);

        try {
            DGGetUser(userAddress)
                .then((result) => {
                    setUser(result);
                    accountStatistics[0].value = tokenValue(result.levelsRewardSum, 18);
                    accountStatistics[1].value = tokenValue(result.missedReferralPayoutSum, 18);
                    accountStatistics[2].value = tokenValue(result.referralPayoutSum, 18);
                    if (result.levelsRewardSum === "0" && result.missedReferralPayoutSum === "0" && result.referralPayoutSum === "0") {
                        accountStatistics[3].value = 100;
                    } else {
                        accountStatistics[3].value = 0;
                    }

                    setUserLoading(false);
                })
                .catch((e) => {
                    console.error(e);
                    setUserLoading(false);
                    setUser(null);
                });
        } catch (e) {
            console.error(e);
            setUserLoading(false);
            setUser(null);
        }
    };

    useEffect(() => {
        loadUser();
    }, [userAddress]);

    return (
        <>
            <div className='statistics block'>
                <div className='block__title'>Statistics</div>
                <div className='statistics__content'>
                    {
                        isUserLoading
                            ?
                            <div>Loading info...</div>
                            :
                            <>
                                <div className='statistics__top'>
                                    <div className='statistics__left statistics__top-block'>
                                        <div className='statistics__top-item statistics__item'>
                                            <div className='statistics__img item'>
                                                <img src={bnbImg} alt="bnb" />
                                            </div>
                                            <div className='statistics__name'>Total turnover</div>
                                            <div className='statistics__subtitle'>
                                                <span>{RightNum(globalStat.turnover)}</span>
                                                <span>BNB</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='statistics__middle statistics__top-block'>
                                        <div className='statistics__top-item statistics__item'>
                                            <div className='statistics__img item'>
                                                <img src={users} alt="bnb" />
                                            </div>
                                            <div className='statistics__name'>Amount of users</div>
                                            <div className='statistics__subtitle'>{RightNum(globalStat.members)}</div>
                                        </div>
                                    </div>
                                    <div className='statistics__right statistics__top-block'>
                                        <div className='statistics__top-item statistics__item'>
                                            <div className='statistics__img item'>
                                                <img src={transaction} alt="bnb" />
                                            </div>
                                            <div className='statistics__name'>Amount of transactions</div>
                                            <div className='statistics__subtitle'>{RightNum(globalStat.transactions)}</div>
                                        </div>
                                    </div>
                                </div>
                                <div className='statistics__bottom'>
                                    <div className='statistics__bottom-item statistics__bottom-item-left'>
                                        <div className='statistics__title'>Account statistics</div>
                                        <div className='statistics__info'>
                                            <div className='statistics__graph'>
                                                <Chart>
                                                    <ChartLegend visible={false} />
                                                    <ChartSeries>
                                                        <ChartSeriesItem
                                                            type="donut"
                                                            data={accountStatistics}
                                                        >
                                                            <ChartSeriesLabels
                                                                color="#fff"
                                                                background="none"
                                                            />
                                                        </ChartSeriesItem>
                                                    </ChartSeries>
                                                </Chart>
                                            </div>
                                            <ul className='statistics__list'>
                                                <li className='statistics__li'>Income from hours</li>
                                                <li className='statistics__li'>Income from referrals</li>
                                                <li className='statistics__li'>Missed referral payots</li>
                                            </ul>
                                        </div>
                                    </div>
                                    <QueryTableOld />
                                </div>
                            </>
                    }
                </div>
            </div>
        </>
    );
}

export default Statistics;