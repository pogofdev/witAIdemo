/**
 * Created by thinh on 28/08/2017.
 */
import React from "react";
import {ROOT_FLIGHT_LOGO} from "../../actions/index";


const YESTERDAY = '-'
const BACKONEHOUR = '-';
const TOMORROWS = '+';
const NEXTHOUR = '+';


export const getDate = (arg) => {
    let today = new Date();
    let dd = null;
    let mm = null;
    let yyyy = null;
    switch (arg) {
        case YESTERDAY:
            let yesterday = new Date(today.getTime() - (24 * 60 * 60 * 1000));
            dd = yesterday.getDate();
            mm = yesterday.getMonth() + 1; //January is 0!
            yyyy = yesterday.getFullYear();

            if (dd < 10) {
                dd = '0' + dd
            }

            if (mm < 10) {
                mm = '0' + mm
            }

            return yyyy + '-' + mm + '-' + dd;
            break;
        case TOMORROWS:
            let tomorrows = new Date(today.getTime() + (24 * 60 * 60 * 1000));
            dd = tomorrows.getDate();
            mm = tomorrows.getMonth() + 1; //January is 0!
            yyyy = tomorrows.getFullYear();

            if (dd < 10) {
                dd = '0' + dd
            }

            if (mm < 10) {
                mm = '0' + mm
            }
            return yyyy + '-' + mm + '-' + dd;
            break;
        default:
            dd = today.getDate();
            mm = today.getMonth() + 1; //January is 0!
            yyyy = today.getFullYear();

            if (dd < 10) {
                dd = '0' + dd
            }

            if (mm < 10) {
                mm = '0' + mm
            }
            return yyyy + '-' + mm + '-' + dd;
    }
};

export const getHour = (arg = '', fromHour = '') => { // '' = current hour, '+' = current hour + 1 hour, '-' = current hour - 1 hour
    const date = new Date();
    let hour = (fromHour === '') ? date.getHours() : parseInt(fromHour.substring(0, 2));
    let minutes = (fromHour === '') ? date.getMinutes() : parseInt(fromHour.substring(0, 2));

    switch (arg) {
        case BACKONEHOUR:
            if(hour>=1) hour = hour - 1;
            if (hour < 10) hour = '0' + hour;
            if (minutes < 10) minutes = '0' + minutes;
            return hour + '' + ((hour>=1)? minutes : '00');
            break;
        case NEXTHOUR:
            if(hour<=22) hour = hour + 1;
            if (hour < 10) hour = '0' + hour;
            if (minutes < 10) minutes = '0' + minutes;

            return hour + '' + ((hour<=22)? minutes : '59');
            break;
        default:
            if (hour < 10) hour = '0' + hour;
            if (minutes < 10) minutes = '0' + minutes;
            if (hour===23){
                return '2300';
            }else{
                return hour + '' + minutes;
            }

    }
};

export const getFlightLogo = (FlightNo) => {
    // const images = {
    //     'VN': 'http://inoibai.primeship.vn/images/VN.jpg',
    //     'BL': 'http://inoibai.primeship.vn/images/BL.png',
    //     'CX': 'http://inoibai.primeship.vn/images/CX.jpg',
    //     'EK': 'http://inoibai.primeship.vn/images/EK.png',
    //     'HX': 'http://inoibai.primeship.vn/images/HX.jpg',
    //     'JL': 'http://inoibai.primeship.vn/images/JL.png',
    //     'KA': 'http://inoibai.primeship.vn/images/KA.jpg',
    //     'KE': 'http://inoibai.primeship.vn/images/KE.png',
    //     'MI': 'http://inoibai.primeship.vn/images/MI.jpg',
    //     'OZ': 'http://inoibai.primeship.vn/images/OZ.jpg',
    //     'RH': 'http://inoibai.primeship.vn/images/RH.jpg',
    //     'TK': 'http://inoibai.primeship.vn/images/TK.jpg',
    //     'VJ': 'http://inoibai.primeship.vn/images/VJ.jpg',
    // }

    return `${ROOT_FLIGHT_LOGO}/${FlightNo.substring(0, 2)}.png`;
}