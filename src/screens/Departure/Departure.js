import React from 'react';
import {View} from 'react-native';
import FCM from "react-native-fcm";
import {Platform} from "react-native";
import FlightSchedule from "../../components/Arr_Dep/FlightSchedule";

import { DEPARTURE, Messages} from "../../constants";

class Departure extends React.Component {
    // navigation bar styles
    static navigatorStyle = {
        // center the title label
        navBarTitleTextCentered: Platform.OS !== 'ios', // for android only
        navBarTranslucent: true
    };

    constructor(props) {
        super(props);
        this.state = {
            deviceToken: null
        };
    }

    componentDidMount(){
        FCM.getFCMToken().then(token => {
            this.setState({deviceToken:token});
        })
    }

    render() {
        const {deviceToken} = this.state;
        const {lang} = this.props;

        return (
            <View>
                <FlightSchedule Arr_Dep={DEPARTURE} lang={lang} deviceToken={deviceToken} {...this.props}/>
            </View>
        );
    }
}

export default Departure;
