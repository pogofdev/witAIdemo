import axios from 'axios';


const ROOT_API = 'http://inoibai.primeship.vn/api/v1';
const ROOT_ADS = 'http://inoibai.primeship.vn/api/v1/advertisings/getAdvertisings';
export const ROOT_FLIGHT_LOGO = 'http://inoibai.primeship.vn/images/flight-logo';

const ROOT_WIT = "https://api.wit.ai/message?v=123&q=";
const HEADER = { headers: { Authorization: `Bearer 3ZFMRHNBXQA4M76KU3QV4UA7FZCDEEIM` } };


export function sendChat(userMessage, callback){
    axios.get(`${ROOT_WIT}${userMessage}`, HEADER).then((response) => {
        console.log('server response', response);
        if (response.status!==200) {
            callback('error');
        } else callback(processIntent(response.data));

    }).catch(function(error) {
        console.log('There has been a problem with your fetch operation: ' + error.message);
        // ADD THIS THROW error
        throw error;
    });

}

function processIntent(data){
    const {intent,phong, on_off} = data.entities;
    console.log(data);

    switch (intent[0].value){
        case 'Toggle_Light':
            const where = phong[0].value;
            const on_of = on_off[0].value;
            if(on_of ==='on'){
                return `Đã bật đèn ${where}.`
            }else {
                return `Đã tắt đèn ${where}.`
            }
        default:
            return 'Xin lỗi tôi chưa hiểu ý bạn. Bạn có thể giải thích thêm?'
    }

}


export function fetchFlightSchedule(arrDep,pass, fromDate, toDate, fromHour, toHour, callback) {
    const value = {arrDep,pass, fromDate, toDate, fromHour, toHour};
    axios.post(`${ROOT_API}/webService/requestCall`, value).then((response) => {
        console.log('server response', response.data);
        if (response.data.code!==200) {
            callback('error');
        } else callback(response.data);

    }).catch(function(error) {
        console.log('There has been a problem with your fetch operation: ' + error.message);
        // ADD THIS THROW error
        throw error;
    });
}

export function fetchFlightById(pass,flightID, callback) {
    const value = {pass, flightID};
    axios.post(`${ROOT_API}/webService/requestCall`, value).then((response) => {
        console.log('server response', response.data);
        if (response.data.code!==200) {
            callback('error');
        } else callback(response.data);

    }).catch(function(error) {
        console.log('There has been a problem with your fetch operation: ' + error.message);
        // ADD THIS THROW error
        throw error;
    });
}
export function fetchAds(callback) {
    axios.get(ROOT_ADS).then((response) => {
        console.log('server response', response.data);
        if (response.data.code!==200) {
            callback('error');
        } else callback(response.data);

    }).catch(function(error) {
        console.log('There has been a problem with your fetch operation: ' + error.message);
        // ADD THIS THROW error
        throw error;
    });
}

export function watchThisFlight(device_token, flight, callback) {

    const value = {device_token,flight};
    console.log('input value',value);
    axios.post(`${ROOT_API}/device/registerFlight`, value).then((response) => {
        console.log('server response', response.data);
        if (response.data.code!==200) {
            console.log(response.data)
        }else{
            callback(response.data);
        }

    }).catch(function(error) {
        console.log('There has been a problem with your fetch operation: ' + error.message);
        // ADD THIS THROW error
        throw error;
    });

}

export function fetchWatchList(token, callback) {
    axios.get(`${ROOT_API}/device/getSubcribes/${token}`).then((response) => {
        console.log('server response', response.data);
        if (response.data.code!==200) {
            callback('error');
        } else callback(response.data);

    }).catch(function(error) {
        console.log('There has been a problem with your fetch operation: ' + error.message);
        // ADD THIS THROW error
        throw error;
    });
}


export function removeFlightFromWatchList(device_token, FLIGHTID, callback) {
    const value = {device_token, FLIGHTID};
    axios.post(`${ROOT_API}/device/removeFlight`, value).then((response) => {
        console.log('server response', response.data);
        if (response.data.code!==200) {
            callback('error');
        } else callback(response.data);

    }).catch(function(error) {
        console.log('There has been a problem with your fetch operation: ' + error.message);
        // ADD THIS THROW error
        throw error;
    });
}