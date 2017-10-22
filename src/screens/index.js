import {Platform} from 'react-native';
import {Navigation, ScreenVisibilityListener} from 'react-native-navigation';
import Departure from "./Departure/Departure";
import Arrival from "./Arrival/Arrival"
import LightBox from "../components/LightBox";
import LoginForm from "./Login/LoginScreen";

import Alert from "./Alerts/Alert";
import Info from "./Info/Info";
import AdsTopBanner from "../components/AdsTopBanner";
import {EN, REFRESH_FLIGHT_SCHEDULE, YELLOW_COLOR} from "../constants";
import {getLangFormater} from "../helper_functions";


export function registerScreens() {
    Navigation.registerComponent('pogofdev.LoginForm', () => LoginForm);


    // Navigation.registerComponent('inoibai.AdsScreen', () => AdsScreen);
    // Navigation.registerComponent('inoibai.Arrival', () => Arrival);
    // Navigation.registerComponent('inoibai.Departure', () => Departure);
    // Navigation.registerComponent('inoibai.Info', () => Info);
    // Navigation.registerComponent('inoibai.Alerts', () => Alert);
    // Navigation.registerComponent('inoibai.components.LightBox', () => LightBox);
    // Navigation.registerComponent('inoibai.components.AdsTopBanner', () => AdsTopBanner);
}

export function registerScreenVisibilityListener() {
    new ScreenVisibilityListener({
        willAppear: ({screen}) => console.log(''),
        didAppear: ({screen, startTime, endTime, commandType}) => console.log('screenVisibility', `Screen ${screen} displayed in ${endTime - startTime} millis [${commandType}]`),
        willDisappear: ({screen}) => console.log(`Screen will disappear ${screen}`),
        didDisappear: ({screen}) => console.log(`Screen disappeared ${screen}`)
    }).register();
}

export function showLoginForm(lang) {
    Navigation.startSingleScreenApp({
        screen: {
            screen: 'pogofdev.LoginForm',
            animationType: 'slide-down',// optional, add transition animation to root change: 'none', 'slide-down', 'fade'
        },
        portraitOnlyMode: true
    });
}

export function showHomeScreen(lang) {
    const tabs = [
        {
            label: 'Info',
            screen: 'inoibai.Info',
            icon: require('../../img/icons/info@2x.png'),
            title: getLangFormater(lang, "tab_Home"),
            bottomTabFontFamily: 'Arial',
        }
        , {
            // label: 'Departures',
            // screen: 'inoibai.Departure',
            label: 'Info',
            screen: 'inoibai.Info',
            icon: require('../../img/icons/i_takeoff_new@3x.png'),
            title: getLangFormater(lang, "tab_Cart"),
            bottomTabFontFamily: 'Arial',
        },
        {
            // label: 'Arrivals',
            // screen: 'inoibai.Arrival',
            label: 'Info',
            screen: 'inoibai.Info',
            icon: require('../../img/icons/i_landing_new@3x.png'),
            title: getLangFormater(lang, "tab_Profile"),
            bottomTabFontFamily: 'Arial',
        }
    ];

    Navigation.startTabBasedApp({
        tabs,
        portraitOnlyMode: true,
        passProps: {lang: EN},
        animationType: Platform.OS === 'ios' ? 'slide-down' : 'fade',
        tabsStyle: {// IOS bottom tab style
            tabBarSelectedButtonColor: YELLOW_COLOR,
        },
        appStyle: { // android bottom tab style
            tabBarSelectedButtonColor: YELLOW_COLOR,
            tabBarTranslucent: true,
            forceTitlesDisplay: true // Android only. If true - Show all bottom tab labels. If false - only the selected tab's label is visible.
        }
    });


}