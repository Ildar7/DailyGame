import { selector } from "recoil";
import { DGGetGlobalStatistic, DGGetDayStatistic, DGLevelPrices, DGRegistrationPrice, GlobalStatistics, DayStatistics } from "../contract/DailyGame.ts";

export const registrationPriceState = selector<string | null>({
    key: 'registrationPrice',
    get: async () => {
        return await DGRegistrationPrice();
    },
});

export const levelPricesState = selector<Array<string> | null>({
    key: 'levelPrices',
    get: async () => {
        return await DGLevelPrices();
    },
});

export const globalStatisticsState = selector<GlobalStatistics | null>({
    key: 'globalStatistics',
    get: async () => {
        return await DGGetGlobalStatistic();
    },
});

export const dayStatisticsState = selector<DayStatistics | null>({
    key: 'dayStatistics',
    get: async () => {
        return await DGGetDayStatistic();
    },
});
