import React from 'react';
import {View} from 'react-native';
import {Platform} from "react-native";
import FlightSchedule from "../../components/Arr_Dep/FlightSchedule";
import PushNotificationController from "../../components/PushNotificationController";
import {ARRIVAL, DEVICE_TOKEN, Messages, RECEIVED_NOTIFICATION} from "../../constants";

class Arrival extends React.Component {
    // navigation bar styles
    static navigatorStyle = {
        // center the title label
        navBarTitleTextCentered: Platform.OS !== 'ios', // for android only
        navBarTranslucent: true,
        drawUnderNavBar: false
    };

    constructor(props) {
        super(props);
        this.state = {
            deviceToken: null
        };
        this._onReceivedNotification = this._onReceivedNotification.bind(this)
        this.showAds = this.showAds.bind(this);
    }


    _onReceivedNotification(notif) {
        this.props.navigator.handleDeepLink({
            link: RECEIVED_NOTIFICATION,
            payload: notif
        });
    }

    showAds() {
        this.props.navigator.showInAppNotification({
            screen: "inoibai.components.AdsTopBanner", // unique ID registered with Navigation.registerScreen
            passProps: {}, // simple serializable object that will pass as props to the in-app notification (optional)
            autoDismissTimerSec: 99999 // auto dismiss notification in seconds
        });
    }

    componentDidMount() {
        this.showAds();
    }


    render() {
        const {deviceToken} = this.state;
        const {lang} = this.props;

        return (
            <View>
                <PushNotificationController
                    deviceToken={(token) => {
                        // broadcast token to other listeners
                        this.props.navigator.handleDeepLink({
                            link: DEVICE_TOKEN,
                            payload: token // (optional) Extra payload with deep link
                        });
                        this.setState({deviceToken: token});
                    }}
                    onReceivedNotification={this._onReceivedNotification}/>
                <FlightSchedule Arr_Dep={ARRIVAL} lang={lang} deviceToken={deviceToken} {...this.props}/>
            </View>
        );
    }
}

export default Arrival;
