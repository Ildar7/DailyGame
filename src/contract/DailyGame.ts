import Moralis from 'moralis';
import ExecuteFunctionSendResult = Moralis.ExecuteFunctionSendResult;
import abi from './dg_abi.json';
import { convertStringToNumber, multiply } from "../helpers/bignumber.ts";

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

export interface Level {
    active: boolean;
    curPayouts: number;
    maxPayouts: number;
    activationTimes: number;
    rewardSum: string;
    referralPayoutSum: string;
    canBuild: boolean;
    canUpgrade: boolean;
}

export interface LevelsResult {
    totalLevels: number;
    levels: Level[];
}

export interface UserInfo {
    id: string;
    registrationTimestamp: string;
    referrerId: string;
    referrer: string;
    referrals: string;
    referralPayoutSum: string;
    levelsRewardSum: string;
    missedReferralPayoutSum: string;
}

export const DailyGameContract = {
    contractAddress: process.env.REACT_APP_GAME_CONTRACT_ADDRESS as string,
    abi: abi,
};

export interface GlobalStatistics {
    members: number;
    transactions: number;
    turnover: number;
}

export interface DayStatistics {
    members: number;
    transactions: number;
    turnover: number;
}

export async function DGRegistration(referrerAddress?: string, price = '0.01'): Promise<ExecuteFunctionSendResult> {
    if (!referrerAddress) {
        const result = await Moralis.executeFunction({
            functionName: 'register',
            msgValue: Moralis.Units.ETH(price),
            ...DailyGameContract
        });

        console.log(`User successfully registered`);

        return result as ExecuteFunctionSendResult;
    } else {
        const result = await Moralis.executeFunction({
            functionName: 'registerWithReferrer',
            msgValue: Moralis.Units.ETH(price),
            params: {
                referrer: referrerAddress,
            },
            ...DailyGameContract
        });

        console.log(`User successfully registered`);

        return result as ExecuteFunctionSendResult;
    }
}

export async function DGIsRegisteredUser(userAddress: string): Promise<boolean> {
    let resp = await Moralis.executeFunction({
        functionName: 'isUserRegistered',
        params: {
            addr: userAddress,
        },
        ...DailyGameContract
    });

    return !!resp;
}

export async function DGGetUserId(userAddress: string): Promise<string> {
    let resp = await Moralis.executeFunction({
        functionName: 'getUserIdByAddress',
        params: {
            userAddress: userAddress,
        },
        ...DailyGameContract
    }) as unknown as number;

    return multiply(resp, 1);
}

export async function DGGetUserAddress(userId: string): Promise<string> {
    return new Promise<string>(async (resolve, reject) => {
        let resp = await Moralis.executeFunction({
            functionName: 'getUserAddressById',
            params: {
                userId: userId,
            },
            ...DailyGameContract
        }) as unknown as string;

        if (resp === '0x0000000000000000000000000000000000000000') {
            reject('User not found');
        } else {
            resolve(resp);
        }
    });
}

export async function DGLoadLevels(userAddress: string): Promise<LevelsResult> {
    let resp: [][] = await Moralis.executeFunction({
        functionName: 'getUserLevels',
        params: {
            userAddress: userAddress,
        },
        ...DailyGameContract
    }) as [][];

    let results: LevelsResult = { totalLevels: resp[0].length - 1, levels: [] };
    let hasBroken = 0;
    let lastActive = todayDate.toISOString().split('T')[0] === formatDate(allowDate_1) ? 0
        :
        todayDate.toISOString().split('T')[0] === formatDate(allowDate_2) ? 13
            :
            todayDate.toISOString().split('T')[0] === formatDate(allowDate_3) ? 26
                :
                todayDate.toISOString().split('T')[0] === formatDate(allowDate_4) ? 39
                    :
                    todayDate.toISOString().split('T')[0] === formatDate(allowDate_5) ? 52
                        :
                        todayDate.toISOString().split('T')[0] === formatDate(allowDate_6) ? 65
                            :
                            todayDate.toISOString().split('T')[0] === formatDate(allowDate_7) ? 78
                                :
                                -1;

    for (let i = todayDate.toISOString().split('T')[0] === formatDate(allowDate_1) ? 1
        :
        todayDate.toISOString().split('T')[0] === formatDate(allowDate_2) ? 14
            :
            todayDate.toISOString().split('T')[0] === formatDate(allowDate_3) ? 27
                :
                todayDate.toISOString().split('T')[0] === formatDate(allowDate_4) ? 40
                    :
                    todayDate.toISOString().split('T')[0] === formatDate(allowDate_5) ? 53
                        :
                        todayDate.toISOString().split('T')[0] === formatDate(allowDate_6) ? 66
                            :
                            todayDate.toISOString().split('T')[0] === formatDate(allowDate_7) ? 79
                                :
                                -1
        ; i < (todayDate.toISOString().split('T')[0] === formatDate(allowDate_1) ? 14
            :
            todayDate.toISOString().split('T')[0] === formatDate(allowDate_2) ? 27
                :
                todayDate.toISOString().split('T')[0] === formatDate(allowDate_3) ? 40
                    :
                    todayDate.toISOString().split('T')[0] === formatDate(allowDate_4) ? 53
                        :
                        todayDate.toISOString().split('T')[0] === formatDate(allowDate_5) ? 66
                            :
                            todayDate.toISOString().split('T')[0] === formatDate(allowDate_6) ? 79
                                :
                                todayDate.toISOString().split('T')[0] === formatDate(allowDate_7) ? 92
                                    :
                                    -1); i++) {
        results.levels.push({
            active: resp[0][i],
            curPayouts: parseInt(resp[1][i]),
            maxPayouts: parseInt(resp[2][i]),
            activationTimes: parseInt(resp[3][i]),
            rewardSum: Moralis.Units.FromWei(resp[4][i]),
            referralPayoutSum: Moralis.Units.FromWei(resp[5][i]),
            canBuild: !hasBroken && lastActive === i - 1,
            canUpgrade: !hasBroken,
        });

        if (resp[0][i]) {
            lastActive = i;
        }

        if (resp[1][i] >= resp[2][i]) {
            hasBroken = i;
        }
    }

    return results;
}

export async function DGLevelPrices(): Promise<Array<string>> {
    const result = await Moralis.executeFunction({
        functionName: 'getLevelPrices',
        ...DailyGameContract
    }) as Array<number>;

    return result.filter((v, i) => i !== 0).map((price) => Moralis.Units.FromWei(price));
}

export async function DGRegistrationPrice(): Promise<string> {
    const result = await Moralis.executeFunction({
        functionName: 'registrationPrice',
        ...DailyGameContract
    }) as unknown as number;

    return Moralis.Units.FromWei(result);
}

export async function DGGetUser(userAddress: string): Promise<UserInfo> {
    const resp = await Moralis.executeFunction({
        functionName: 'getUser',
        params: {
            userAddress: userAddress,
        },
        ...DailyGameContract
    }) as Array<number>;

    const converted: Array<string> = resp.map((v, i) => i === 3 ? v.toString() : multiply(v, 1));

    return {
        id: converted[0],
        registrationTimestamp: converted[1],
        referrerId: converted[2],
        referrer: converted[3],
        referrals: converted[4],
        referralPayoutSum: converted[5],
        levelsRewardSum: converted[6],
        missedReferralPayoutSum: converted[7],
    };
}

export async function DGGetLevelQueue(userAddress: string, level: number): Promise<Array<number>> {
    return await Moralis.executeFunction({
        functionName: 'getPlaceInQueue',
        params: {
            userAddress: userAddress,
            level: level.toString(),
        },
        ...DailyGameContract
    }) as Array<number>;
}

export async function DGGetGlobalStatistic(): Promise<GlobalStatistics> {
    const res = await Moralis.executeFunction({
        functionName: 'getGlobalStatistic',
        ...DailyGameContract
    }) as Array<number>;

    return {
        members: convertStringToNumber(multiply(res[0], 1)),
        transactions: convertStringToNumber(multiply(res[1], 1)),
        turnover: convertStringToNumber(multiply(res[2], 1)),
    };
}

export async function DGGetDayStatistic(): Promise<DayStatistics> {
    const res = await Moralis.executeFunction({
        functionName: 'getDayStatistic',
        ...DailyGameContract
    }) as Array<number>;

    return {
        members: convertStringToNumber(multiply(res[0], 1)),
        transactions: convertStringToNumber(multiply(res[1], 1)),
        turnover: convertStringToNumber(multiply(res[2], 1)),
    };
}

export async function DGBuyLevel(level: number, userAddress: string, levelPrice: string): Promise<ExecuteFunctionSendResult> {
    const res = await Moralis.executeFunction({
        functionName: 'buyLevel',
        msgValue: Moralis.Units.ETH(levelPrice),
        params: {
            level: level,
        },
        ...DailyGameContract
    })

    return res as ExecuteFunctionSendResult;
}