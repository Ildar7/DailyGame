import coins from '../../icons/coins.svg';
import time from '../../icons/time.svg';

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



export const hours = [
    {
        number: '1',
        ending: 'st',
        coinsImg: coins,
        levelPrice: (
            todayDate.toISOString().split('T')[0] === formatDate(allowDate_1) ? '0.05'
                :
                todayDate.toISOString().split('T')[0] === formatDate(allowDate_2) ? '0.05'
                    :
                    todayDate.toISOString().split('T')[0] === formatDate(allowDate_3) ? '0.05'
                        :
                        todayDate.toISOString().split('T')[0] === formatDate(allowDate_4) ? '0.08'
                            :
                            todayDate.toISOString().split('T')[0] === formatDate(allowDate_5) ? '0.08'
                                :
                                todayDate.toISOString().split('T')[0] === formatDate(allowDate_6) ? '0.12'
                                    :
                                    todayDate.toISOString().split('T')[0] === formatDate(allowDate_7) ? '0.15'
                                        :
                                        'None'
        ),
        levelTime: '7:00',
        timeImg: time,
        queue: 0
    },
    {
        number: '2',
        ending: 'nd',
        coinsImg: coins,
        levelPrice: (
            todayDate.toISOString().split('T')[0] === formatDate(allowDate_1) ? '0.075'
                :
                todayDate.toISOString().split('T')[0] === formatDate(allowDate_2) ? '0.085'
                    :
                    todayDate.toISOString().split('T')[0] === formatDate(allowDate_3) ? '0.095'
                        :
                        todayDate.toISOString().split('T')[0] === formatDate(allowDate_4) ? '0.135'
                            :
                            todayDate.toISOString().split('T')[0] === formatDate(allowDate_5) ? '0.145'
                                :
                                todayDate.toISOString().split('T')[0] === formatDate(allowDate_6) ? '0.175'
                                    :
                                    todayDate.toISOString().split('T')[0] === formatDate(allowDate_7) ? '0.205'
                                        :
                                        'None'
        ),
        levelTime: '8:00',
        timeImg: time,
        queue: 1
    },
    {
        number: '3',
        ending: 'rd',
        coinsImg: coins,
        levelPrice: (
            todayDate.toISOString().split('T')[0] === formatDate(allowDate_1) ? '0.1'
                :
                todayDate.toISOString().split('T')[0] === formatDate(allowDate_2) ? '0.12'
                    :
                    todayDate.toISOString().split('T')[0] === formatDate(allowDate_3) ? '0.14'
                        :
                        todayDate.toISOString().split('T')[0] === formatDate(allowDate_4) ? '0.19'
                            :
                            todayDate.toISOString().split('T')[0] === formatDate(allowDate_5) ? '0.21'
                                :
                                todayDate.toISOString().split('T')[0] === formatDate(allowDate_6) ? '0.25'
                                    :
                                    todayDate.toISOString().split('T')[0] === formatDate(allowDate_7) ? '0.29'
                                        :
                                        'None'
        ),
        levelTime: '9:00',
        timeImg: time,
        queue: 2
    },
    {
        number: '4',
        ending: 'th',
        coinsImg: coins,
        levelPrice: (
            todayDate.toISOString().split('T')[0] === formatDate(allowDate_1) ? '0.125'
                :
                todayDate.toISOString().split('T')[0] === formatDate(allowDate_2) ? '0.155'
                    :
                    todayDate.toISOString().split('T')[0] === formatDate(allowDate_3) ? '0.185'
                        :
                        todayDate.toISOString().split('T')[0] === formatDate(allowDate_4) ? '0.245'
                            :
                            todayDate.toISOString().split('T')[0] === formatDate(allowDate_5) ? '0.275'
                                :
                                todayDate.toISOString().split('T')[0] === formatDate(allowDate_6) ? '0.325'
                                    :
                                    todayDate.toISOString().split('T')[0] === formatDate(allowDate_7) ? '0.375'
                                        :
                                        'None'
        ),
        levelTime: '10:00',
        timeImg: time,
        queue: 3
    },
    {
        number: '5',
        ending: 'th',
        coinsImg: coins,
        levelPrice: (
            todayDate.toISOString().split('T')[0] === formatDate(allowDate_1) ? '0.15'
                :
                todayDate.toISOString().split('T')[0] === formatDate(allowDate_2) ? '0.19'
                    :
                    todayDate.toISOString().split('T')[0] === formatDate(allowDate_3) ? '0.23'
                        :
                        todayDate.toISOString().split('T')[0] === formatDate(allowDate_4) ? '0.3'
                            :
                            todayDate.toISOString().split('T')[0] === formatDate(allowDate_5) ? '0.34'
                                :
                                todayDate.toISOString().split('T')[0] === formatDate(allowDate_6) ? '0.4'
                                    :
                                    todayDate.toISOString().split('T')[0] === formatDate(allowDate_7) ? '0.46'
                                        :
                                        'None'
        ),
        levelTime: '11:00',
        timeImg: time,
        queue: 4
    },
    {
        number: '6',
        ending: 'th',
        coinsImg: coins,
        levelPrice: (
            todayDate.toISOString().split('T')[0] === formatDate(allowDate_1) ? '0.175'
                :
                todayDate.toISOString().split('T')[0] === formatDate(allowDate_2) ? '0.225'
                    :
                    todayDate.toISOString().split('T')[0] === formatDate(allowDate_3) ? '0.275'
                        :
                        todayDate.toISOString().split('T')[0] === formatDate(allowDate_4) ? '0.355'
                            :
                            todayDate.toISOString().split('T')[0] === formatDate(allowDate_5) ? '0.405'
                                :
                                todayDate.toISOString().split('T')[0] === formatDate(allowDate_6) ? '0.475'
                                    :
                                    todayDate.toISOString().split('T')[0] === formatDate(allowDate_7) ? '0.545'
                                        :
                                        'None'
        ),
        levelTime: '12:00',
        timeImg: time,
        queue: 5
    },
    {
        number: '7',
        ending: 'th',
        coinsImg: coins,
        levelPrice: (
            todayDate.toISOString().split('T')[0] === formatDate(allowDate_1) ? '0.2'
                :
                todayDate.toISOString().split('T')[0] === formatDate(allowDate_2) ? '0.26'
                    :
                    todayDate.toISOString().split('T')[0] === formatDate(allowDate_3) ? '0.3'
                        :
                        todayDate.toISOString().split('T')[0] === formatDate(allowDate_4) ? '0.4'
                            :
                            todayDate.toISOString().split('T')[0] === formatDate(allowDate_5) ? '0.47'
                                :
                                todayDate.toISOString().split('T')[0] === formatDate(allowDate_6) ? '0.6'
                                    :
                                    todayDate.toISOString().split('T')[0] === formatDate(allowDate_7) ? '0.7'
                                        :
                                        'None'
        ),
        levelTime: '13:00',
        timeImg: time,
        queue: 6
    },
    {
        number: '8',
        ending: 'th',
        coinsImg: coins,
        levelPrice: (
            todayDate.toISOString().split('T')[0] === formatDate(allowDate_1) ? '0.25'
                :
                todayDate.toISOString().split('T')[0] === formatDate(allowDate_2) ? '0.3'
                    :
                    todayDate.toISOString().split('T')[0] === formatDate(allowDate_3) ? '0.37'
                        :
                        todayDate.toISOString().split('T')[0] === formatDate(allowDate_4) ? '0.5'
                            :
                            todayDate.toISOString().split('T')[0] === formatDate(allowDate_5) ? '0.6'
                                :
                                todayDate.toISOString().split('T')[0] === formatDate(allowDate_6) ? '0.9'
                                    :
                                    todayDate.toISOString().split('T')[0] === formatDate(allowDate_7) ? '1'
                                        :
                                        'None'
        ),
        levelTime: '14:00',
        timeImg: time,
        queue: 7
    },
    {
        number: '9',
        ending: 'th',
        coinsImg: coins,
        levelPrice: (
            todayDate.toISOString().split('T')[0] === formatDate(allowDate_1) ? '0.3'
                :
                todayDate.toISOString().split('T')[0] === formatDate(allowDate_2) ? '0.35'
                    :
                    todayDate.toISOString().split('T')[0] === formatDate(allowDate_3) ? '0.42'
                        :
                        todayDate.toISOString().split('T')[0] === formatDate(allowDate_4) ? '0.8'
                            :
                            todayDate.toISOString().split('T')[0] === formatDate(allowDate_5) ? '0.9'
                                :
                                todayDate.toISOString().split('T')[0] === formatDate(allowDate_6) ? '1.2'
                                    :
                                    todayDate.toISOString().split('T')[0] === formatDate(allowDate_7) ? '1.3'
                                        :
                                        'None'
        ),
        levelTime: '15:00',
        timeImg: time,
        queue: 8
    },
    {
        number: '10',
        ending: 'th',
        coinsImg: coins,
        levelPrice: (
            todayDate.toISOString().split('T')[0] === formatDate(allowDate_1) ? '0.5'
                :
                todayDate.toISOString().split('T')[0] === formatDate(allowDate_2) ? '0.55'
                    :
                    todayDate.toISOString().split('T')[0] === formatDate(allowDate_3) ? '0.66'
                        :
                        todayDate.toISOString().split('T')[0] === formatDate(allowDate_4) ? '1.1'
                            :
                            todayDate.toISOString().split('T')[0] === formatDate(allowDate_5) ? '1.2'
                                :
                                todayDate.toISOString().split('T')[0] === formatDate(allowDate_6) ? '1.5'
                                    :
                                    todayDate.toISOString().split('T')[0] === formatDate(allowDate_7) ? '1.6'
                                        :
                                        'None'
        ),
        levelTime: '16:00',
        timeImg: time,
        queue: 9
    },
    {
        number: '11',
        ending: 'th',
        coinsImg: coins,
        levelPrice: (
            todayDate.toISOString().split('T')[0] === formatDate(allowDate_1) ? '0.8'
                :
                todayDate.toISOString().split('T')[0] === formatDate(allowDate_2) ? '0.85'
                    :
                    todayDate.toISOString().split('T')[0] === formatDate(allowDate_3) ? '0.96'
                        :
                        todayDate.toISOString().split('T')[0] === formatDate(allowDate_4) ? '1.4'
                            :
                            todayDate.toISOString().split('T')[0] === formatDate(allowDate_5) ? '1.5'
                                :
                                todayDate.toISOString().split('T')[0] === formatDate(allowDate_6) ? '1.8'
                                    :
                                    todayDate.toISOString().split('T')[0] === formatDate(allowDate_7) ? '1.9'
                                        :
                                        'None'
        ),
        levelTime: '17:00',
        timeImg: time,
        queue: 10
    },
    {
        number: '12',
        ending: 'th',
        coinsImg: coins,
        levelPrice: (
            todayDate.toISOString().split('T')[0] === formatDate(allowDate_1) ? '1'
                :
                todayDate.toISOString().split('T')[0] === formatDate(allowDate_2) ? '1.1'
                    :
                    todayDate.toISOString().split('T')[0] === formatDate(allowDate_3) ? '1.16'
                        :
                        todayDate.toISOString().split('T')[0] === formatDate(allowDate_4) ? '1.6'
                            :
                            todayDate.toISOString().split('T')[0] === formatDate(allowDate_5) ? '1.7'
                                :
                                todayDate.toISOString().split('T')[0] === formatDate(allowDate_6) ? '2'
                                    :
                                    todayDate.toISOString().split('T')[0] === formatDate(allowDate_7) ? '2.4'
                                        :
                                        'None'
        ),
        levelTime: '18:00',
        timeImg: time,
        queue: 11
    },
    {
        number: '13',
        ending: 'th',
        coinsImg: coins,
        levelPrice: (
            todayDate.toISOString().split('T')[0] === formatDate(allowDate_1) ? '1.5'
                :
                todayDate.toISOString().split('T')[0] === formatDate(allowDate_2) ? '1.6'
                    :
                    todayDate.toISOString().split('T')[0] === formatDate(allowDate_3) ? '1.66'
                        :
                        todayDate.toISOString().split('T')[0] === formatDate(allowDate_4) ? '2.1'
                            :
                            todayDate.toISOString().split('T')[0] === formatDate(allowDate_5) ? '2.2'
                                :
                                todayDate.toISOString().split('T')[0] === formatDate(allowDate_6) ? '2.5'
                                    :
                                    todayDate.toISOString().split('T')[0] === formatDate(allowDate_7) ? '3'
                                        :
                                        'None'
        ),
        levelTime: '19:00',
        timeImg: time,
        queue: 12
    },
]