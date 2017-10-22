
import {LANGUAGE, VI} from "./constants";
export const changeLanguage = (lang)=>{
    let ls = require('react-native-local-storage');
    ls.save(LANGUAGE, lang)
        .then(() => {
            ls.get(LANGUAGE).then((lang) => {console.log("language changedL: ", lang)});
        })
};

export const getCurrentLanguage = (callback) => {
    let ls = require('react-native-local-storage');
    ls.get(LANGUAGE)
        .then((lang) => {
            lang === null ? callback(VI) : callback(lang);
        })
};



export const getLangFormater = (lang,text)=>{
    return messages[lang][text];
};

const messages = {
    EN: {
        // new
        tab_Profile:'Profile',
        tab_Cart:'Cart',
        tab_Home:'Home',
        signin_Button:'Sign In',
        userId:'User Id',



        // end new
        home: 'Arrival',
        alert: 'Info',
        setting: 'Setting',
        scheduled: 'Scheduled',
        status: 'Status',
        estimated: 'Estimated',
        flightno: 'Flight No.',
        terminal: 'Terminal',
        gate: 'Gate',
        lobby: 'Lobby',
        checkin:'Checkin',
        belt:'Belt',
        January:"January",
        February:"February",
        March:"March",
        April:"April",
        May:"May",
        June:"June",
        July:"July",
        August:"August",
        September:"September",
        October:"October",
        November:"November",
        December: "December",

        // FlightSchedule.js
        Youareadding: 'You are adding ',
        Youwillnowreceive: ' to \'Alerts\'. You will now receive alerts for this flight.',
        flightadded: 'Your flight has been added successfully',
        add:'ADD',
        cancel:'CANCEL',
        Loading:'Loading...',
        YourFlightHasLanded: 'Your flight has landed and cannot be added',
        YourFlightHasDeparted: 'Your flight has departed and cannot be added'

    },
    VI: {
        home: 'Arrival',
        alert: 'Info',
        setting: 'Setting',
        scheduled: 'Scheduled',
        status: 'Status',
        estimated: 'Estimated',
        flightno: 'Flight No.',
        terminal: 'Terminal',
        gate: 'Gate',
        lobby: 'Lobby',
        checkin:'Checkin',
        belt:'Belt',
        January:"Tháng 1",
        February:"Tháng 2",
        March:"Tháng 3",
        April:"Tháng 4",
        May:"Tháng 5",
        June:"Tháng 6",
        July:"Tháng 7",
        August:"Tháng 8",
        September:"Tháng 9",
        October:"Tháng 10",
        November:"Tháng 11",
        December: "Tháng 12",
        // FlightSchedule.js
        Youareadding: 'Chuyến bay số hiệu ',
        Youwillnowreceive: ' sẽ được thêm vào \'Alerts\'. Hệ thống sẽ theo dõi thông tin chuyến bay này',
        flightadded: 'Chuyến bay đã được thêm vào mục Alerts',
        add:'Đồng ý',
        cancel:'Hủy bỏ',
        Loading:'Đang tải...',
        YourFlightHasLanded: 'Chuyến bay đã đáp, bạn không thể thêm vào',
        YourFlightHasDeparted: 'Chuyến bay đã cất cánh, bạn không thể thêm vào'
    }

};