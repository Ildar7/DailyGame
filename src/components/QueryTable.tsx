import bnbImg from '../icons/bnb.svg';
import greenPlus from '../icons/green_plus.svg';
import redMinus from '../icons/redMinus.svg';
import { useMoralisQuery } from "react-moralis";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { viewAccountAddressAtom, viewUserIdSelector } from "../stores/account.tsx";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { formatRelative } from "date-fns";
import Moralis from "moralis";
import { toast } from "react-hot-toast";
import { tokenValue } from '../helpers/formatters.ts';

interface QueryTableProps {
    type?: 'buylevel' | 'levelpayouts' | 'bonuses' | 'global';
}

export default function QueryTable({ type = 'buylevel' }: QueryTableProps) {
    const userId = useRecoilValue(viewUserIdSelector);
    const setViewUserAddress = useSetRecoilState(viewAccountAddressAtom);
    const [events, setEvents] = useState<Array<any>>([]);
    const [isLoading, setLoading] = useState<boolean>(false);
    const [skip, setSkip] = useState<number>(0);
    const [isEnd, setIsEnd] = useState<boolean>(false);
    const [shouldUpdate, setShouldUpdate] = useState<boolean>(false);
    let timeout: ReturnType<typeof setTimeout>;

    const { fetch: fetchBoughtLevels } = useMoralisQuery(
        "BuyLevel",
        (query) => query
            .descending('block_timestamp')
            .skip(skip)
            .limit(20)
            .equalTo("userId", userId),
        [userId, skip],
        { autoFetch: false }
    );

    const { fetch: fetchLevelPayouts } = useMoralisQuery(
        "LevelPayout",
        (query) => query
            .descending('block_timestamp')
            .skip(skip)
            .limit(20)
            .equalTo("userId", userId),
        [userId, skip],
        { autoFetch: false }
    );

    const { fetch: fetchLevelDeactivation } = useMoralisQuery(
        "LevelDeactivation",
        (query) => query
            .descending('block_timestamp')
            .skip(skip)
            .limit(20)
            .equalTo("userId", userId),
        [userId, skip],
        { autoFetch: false }
    );

    const { fetch: fetchReferralPayout } = useMoralisQuery(
        "ReferralPayout",
        (query) => query
            .descending('block_timestamp')
            .skip(skip)
            .limit(20)
            .equalTo("referrerId", userId),
        [userId, skip],
        { autoFetch: false }
    );

    const getBuyLevel = async () => {
        setLoading(true);
        const results = await fetchBoughtLevels();

        if (results) {
            setEvents((prevState) => [...prevState, ...results]);
        }

        setLoading(false);
        setShouldUpdate(false);
        if (events.length && (!results || !results.length) && skip) {
            setIsEnd(true);
        }
    };

    const getLevelPayouts = async () => {
        setLoading(true);
        const results = await fetchLevelPayouts();

        if (results) {
            setEvents((prevState) => [...prevState, ...results]);
        }

        setLoading(false);
        setShouldUpdate(false);
        if (events.length && (!results || !results.length) && skip) {
            setIsEnd(true);
        }
    };

    const getReferralPayout = async () => {
        setLoading(true);
        const results = await fetchReferralPayout();

        if (results) {
            setEvents((prevState) => [...prevState, ...results]);
        }

        setLoading(false);
        setShouldUpdate(false);
        if (events.length && (!results || !results.length) && skip) {
            setIsEnd(true);
        }
    };

    const getLevelDeactivation = async () => {
        setLoading(true);
        const results = await fetchLevelDeactivation();

        if (results) {
            setEvents((prevState) => [...prevState, ...results]);
        }

        setLoading(false);
        setShouldUpdate(false);
        if (events.length && (!results || !results.length) && skip) {
            setIsEnd(true);
        }
    };

    const refresh = () => {
        if (type === 'buylevel') {
            getLevelDeactivation();
            getLevelPayouts();
            getBuyLevel();
            getReferralPayout();
        }
    };

    useEffect(() => {
        if (shouldUpdate) {
            timeout = setTimeout(refresh, 50);
        }
        return () => {
            clearTimeout(timeout);
        }
    }, [shouldUpdate]);

    useEffect(() => {
        setSkip(0);
        setEvents([]);
        setIsEnd(false);
        setShouldUpdate(true);
    }, [type, userId]);

    useEffect(() => {
        setShouldUpdate(true);
    }, [skip]);

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

    const transactionTemplate = (event: any) => {
        let result = {
            text: '',
            price: '',
            img: '',
            service: '',
            time: 0
        };
        const eventName = event.className;
        const userId = event.attributes.userId;
        const referrerId = event.get('referrerId');
        const showId = userId ? userId : referrerId;
        const forUserId = event.className === 'LevelPayout' ? 'fromUserId' : 'referralId';

        switch (eventName) {
            case 'BuyLevel':
                result.text = 'Buying an hour';
                result.img = bnbImg;
                result.service = 'MetaMask';
                result.time = event.attributes.block_timestamp;
                break
            case 'LevelDeactivation':
                result.text = `${(todayDate.toISOString().split('T')[0] === formatDate(allowDate_1) ? event.attributes.level
                    :
                    todayDate.toISOString().split('T')[0] === formatDate(allowDate_2) ? event.attributes.level - 13
                        :
                        todayDate.toISOString().split('T')[0] === formatDate(allowDate_3) ? event.attributes.level - 26
                            :
                            todayDate.toISOString().split('T')[0] === formatDate(allowDate_4) ? event.attributes.level - 39
                                :
                                todayDate.toISOString().split('T')[0] === formatDate(allowDate_5) ? event.attributes.level - 52
                                    :
                                    todayDate.toISOString().split('T')[0] === formatDate(allowDate_6) ? event.attributes.level - 65
                                        :
                                        todayDate.toISOString().split('T')[0] === formatDate(allowDate_7) ? event.attributes.level - 78
                                            :
                                            -1)} hour ended`;
                result.img = redMinus;
                result.service = 'Daily.game';
                result.price = '';
                result.time = event.attributes.block_timestamp;
                break
            case 'LevelPayout':
                result.text = 'Receiving BNB';
                result.img = greenPlus;
                result.service = 'Daily.game';
                result.price = `+${tokenValue(event.attributes.rewardValue, 18)} BNB`;
                result.time = event.attributes.block_timestamp;
                break
            case 'ReferralPayout':
                result.text = 'Partner bonus';
                result.img = greenPlus;
                result.service = 'Daily.game';
                result.price = `+${tokenValue(event.attributes.rewardValue, 18)} BNB`;
                result.time = event.attributes.block_timestamp;
                break
        }

        if (eventName === 'BuyLevel') {
            switch (event.attributes.level) {
                case 1:
                    result.price = '-0.05 BNB';
                    break
                case 2:
                    result.price = '-0.075 BNB';
                    break
                case 3:
                    result.price = '-0.1 BNB';
                    break
                case 4:
                    result.price = '-0.125 BNB';
                    break
                case 5:
                    result.price = '-0.15 BNB';
                    break
                case 6:
                    result.price = '-0.175 BNB';
                    break
                case 7:
                    result.price = '-0.2 BNB';
                    break
                case 8:
                    result.price = '-0.25 BNB';
                    break
                case 9:
                    result.price = '-0.3 BNB';
                    break
                case 10:
                    result.price = '-0.5 BNB';
                    break
                case 11:
                    result.price = '-0.8 BNB';
                    break
                case 12:
                    result.price = '-1 BNB';
                    break
                case 13:
                    result.price = '-1.5 BNB';
                    break
                case 14:
                    result.price = '-0.05 BNB';
                    break
                case 15:
                    result.price = '-0.085 BNB';
                    break
                case 16:
                    result.price = '-0.12 BNB';
                    break
                case 17:
                    result.price = '-0.155 BNB';
                    break
                case 18:
                    result.price = '-0.19 BNB';
                    break
                case 19:
                    result.price = '-0.225 BNB';
                    break
                case 20:
                    result.price = '-0.26 BNB';
                    break
                case 21:
                    result.price = '-0.3 BNB';
                    break
                case 22:
                    result.price = '-0.35 BNB';
                    break
                case 23:
                    result.price = '-0.55 BNB';
                    break
                case 24:
                    result.price = '-0.85 BNB';
                    break
                case 25:
                    result.price = '-1.1 BNB';
                    break
                case 26:
                    result.price = '-1.6 BNB';
                    break
                case 27:
                    result.price = '-0.05 BNB';
                    break
                case 28:
                    result.price = '-0.095 BNB';
                    break
                case 29:
                    result.price = '-0.14 BNB';
                    break
                case 30:
                    result.price = '-0.185 BNB';
                    break
                case 31:
                    result.price = '-0.23 BNB';
                    break
                case 32:
                    result.price = '-0.275 BNB';
                    break
                case 33:
                    result.price = '-0.3 BNB';
                    break
                case 34:
                    result.price = '-0.37 BNB';
                    break
                case 35:
                    result.price = '-0.42 BNB';
                    break
                case 36:
                    result.price = '-0.66 BNB';
                    break
                case 37:
                    result.price = '-0.96 BNB';
                    break
                case 38:
                    result.price = '-1.16 BNB';
                    break
                case 39:
                    result.price = '-1.66 BNB';
                    break
                case 40:
                    result.price = '-0.08 BNB';
                    break
                case 41:
                    result.price = '-0.135 BNB';
                    break
                case 42:
                    result.price = '-0.19 BNB';
                    break
                case 43:
                    result.price = '-0.245 BNB';
                    break
                case 44:
                    result.price = '-0.3 BNB';
                    break
                case 45:
                    result.price = '-0.355 BNB';
                    break
                case 46:
                    result.price = '-0.4 BNB';
                    break
                case 47:
                    result.price = '-0.5 BNB';
                    break
                case 48:
                    result.price = '-0.8 BNB';
                    break
                case 49:
                    result.price = '-1.1 BNB';
                    break
                case 50:
                    result.price = '-1.4 BNB';
                    break
                case 51:
                    result.price = '-1.6 BNB';
                    break
                case 52:
                    result.price = '-2.1 BNB';
                    break
                case 53:
                    result.price = '-0.08 BNB';
                    break
                case 54:
                    result.price = '-0.145 BNB';
                    break
                case 55:
                    result.price = '-0.21 BNB';
                    break
                case 56:
                    result.price = '-0.275 BNB';
                    break
                case 57:
                    result.price = '-0.34 BNB';
                    break
                case 58:
                    result.price = '-0.405 BNB';
                    break
                case 59:
                    result.price = '-0.47 BNB';
                    break
                case 60:
                    result.price = '-0.6 BNB';
                    break
                case 61:
                    result.price = '-0.9 BNB';
                    break
                case 62:
                    result.price = '-1.2 BNB';
                    break
                case 63:
                    result.price = '-1.5 BNB';
                    break
                case 64:
                    result.price = '-1.7 BNB';
                    break
                case 65:
                    result.price = '-2.2 BNB';
                    break
                case 66:
                    result.price = '-0.12 BNB';
                    break
                case 67:
                    result.price = '-0.175 BNB';
                    break
                case 68:
                    result.price = '-0.25 BNB';
                    break
                case 69:
                    result.price = '-0.325 BNB';
                    break
                case 70:
                    result.price = '-0.4 BNB';
                    break
                case 71:
                    result.price = '-0.475 BNB';
                    break
                case 72:
                    result.price = '-0.6 BNB';
                    break
                case 73:
                    result.price = '-0.9 BNB';
                    break
                case 74:
                    result.price = '-1.2 BNB';
                    break
                case 75:
                    result.price = '-1.5 BNB';
                    break
                case 76:
                    result.price = '-1.8 BNB';
                    break
                case 77:
                    result.price = '-2 BNB';
                    break
                case 78:
                    result.price = '-2.5 BNB';
                    break
                case 79:
                    result.price = '-0.15 BNB';
                    break
                case 80:
                    result.price = '-0.205 BNB';
                    break
                case 81:
                    result.price = '-0.29 BNB';
                    break
                case 82:
                    result.price = '-0.375 BNB';
                    break
                case 83:
                    result.price = '-0.46 BNB';
                    break
                case 84:
                    result.price = '-0.545 BNB';
                    break
                case 85:
                    result.price = '-0.7 BNB';
                    break
                case 86:
                    result.price = '-1 BNB';
                    break
                case 87:
                    result.price = '-1.3 BNB';
                    break
                case 88:
                    result.price = '-1.6 BNB';
                    break
                case 89:
                    result.price = '-1.9 BNB';
                    break
                case 90:
                    result.price = '-2.4 BNB';
                    break
                case 91:
                    result.price = '-3 BNB';
                    break
            }
        }

        return result;
    };

    return (
        <div className='statistics__bottom-item statistics__bottom-item-right'>
            <div className='statistics__title'>Transactions {events.length >= 20 ? <span>(last 20 transactions)</span> : ''}</div>
            <ul className='statistics__transactions'>
                {events.length === 0 && (<li className='text-center'>No transactions yet</li>)}
                {events.length !== 0 && (events.map((event) => {
                    return (
                        <li className='statistics__transaction' key={event.id}>
                            <div className='statistics__transaction-img'><img src={transactionTemplate(event).img} alt="bnb" /></div>
                            <div className='statistics__transaction-text'>
                                <div className='statistics__transaction-top'>
                                    <span>{transactionTemplate(event).text}</span>
                                    <span>{transactionTemplate(event).price}</span>
                                </div>
                                <div className='statistics__transaction-bottom'>
                                    <span>{transactionTemplate(event).service}</span>
                                    <span>{formatRelative(transactionTemplate(event).time, new Date())}</span>
                                </div>
                            </div>
                        </li>
                    )
                }))}
            </ul>
        </div >
    )
}