import React from 'react';
import {TouchableOpacity, View, Platform, Image, ActivityIndicator, Linking} from 'react-native';
import {EN, NULL_URL, YELLOW_COLOR} from "../../constants";
import {Navigation} from "react-native-navigation";
import FadeIn from "react-native-fade-in-image";
import {fetchAds} from "../../actions/index";
import PushNotificationController from "../../components/PushNotificationController";
import {getCurrentLanguage} from "../../helper_functions";


class AdsScreen extends React.Component {
    static navigatorStyle = {
        drawUnderNavBar: true,
        navBarTranslucent: true,
        navBarHidden: true,
    };

    constructor(props) {
        super(props);
        this.state = {
            image_url: NULL_URL,
            url: NULL_URL,
            closeBtn: false
        };
        this._onReceivedNotification = this._onReceivedNotification.bind(this);
    }

    componentDidMount() {
        fetchAds((response) => {
            const {image_url, url} = response.advertising;
            if (image_url) {
                this.setState({image_url, url, closeBtn: true});
            }
        });
    }

    _onPress() {

        getCurrentLanguage((lang) => {
            // console.log('current lang', lang);
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
        });
    }

    saveNotificationToLocalStorage(notif) {
        let ls = require('react-native-local-storage');
        // ls.clear();
        if (typeof  notif['message'] !== 'undefined' && typeof  notif['google.message_id'] !== 'undefined') {
            const message = notif['message'];
            const messageId = notif['google.message_id'];

            const tam = [{messageId, message}];
            ls.get('notifications')
                .then((data) => {
                        console.log("get notifications: ", data)
                        ls.save('notifications', tam.concat(data))
                            .then((data) => {
                                console.log("get notifications: ", data)
                            })
                    }
                );
        }
    }

    _onReceivedNotification(notif) {
        // this.saveNotificationToLocalStorage(notif);
    }

    render() {
        const {image_url, url, closeBtn} = this.state;
        // const uri = 'http://img.tintuc.vietgiaitri.com/2014/4/1/gai-dep-khoe-nguc-va-than-hinh-vo-cung-nong-bong-43b6a5.jpg';
        return (
            <View style={styles.containerStyle}>
                <PushNotificationController deviceToken={(token) => {
                }} onReceivedNotification={this._onReceivedNotification}/>
                <TouchableOpacity
                    style={styles.full}
                    onPress={() => url !== NULL_URL ? Linking.openURL(url) : NULL_URL}>
                    <FadeIn
                        style={styles.full}
                        placeholderStyle={{backgroundColor: '#fff'}}
                        renderPlaceholderContent={<Placeholder/>}
                    >
                        <Image source={{uri: image_url}} style={styles.backgroundImage}/>
                    </FadeIn>
                </TouchableOpacity>
                {closeBtn ? (
                    <TouchableOpacity onPress={() => this._onPress()} style={styles.closeButtonStyle}>
                        <Image source={require('../../../img/icons/close@3x.png')}
                               style={{flex: 1, height: 30, width: 30}}/>
                    </TouchableOpacity>
                ) : null}
            </View>
        );
    }
}

const Placeholder = () => (
    <View style={styles.landing}>
        <ActivityIndicator/>
    </View>
);

const styles = {
    containerStyle: {
        // width:  Dimensions.get('window').width,
        // height: Dimensions.get('window').height,
        backgroundColor: 'pink',
        flex: 1,
        flexDirection: 'column',
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover', // or 'stretch'
    },
    full: {flex: 1},
    landing: {flex: 1, alignItems: 'center', justifyContent: 'center'},
    closeButtonStyle: {
        position: 'absolute',
        top: Platform.OS === 'ios' ? 20 : 10,
        right: 10,

    }
};

const tabs = [
    {
        label: 'Info',
        screen: 'inoibai.Info',
        icon: require('../../../img/icons/info@2x.png'),
        title: 'Info',
        bottomTabFontFamily: 'Arial',
    }
    , {
        label: 'Departures',
        screen: 'inoibai.Departure',
        icon: require('../../../img/icons/i_takeoff_new@3x.png'),
        title: 'Departures',
        bottomTabFontFamily: 'Arial',
    },
    {
        label: 'Arrivals',
        screen: 'inoibai.Arrival',
        icon: require('../../../img/icons/i_landing_new@3x.png'),
        title: 'Arrivals',
        bottomTabFontFamily: 'Arial',
    },
    {
        label: 'Alerts',
        screen: 'inoibai.Alerts',
        icon: require('../../../img/icons/alerts@3x.png'),
        title: 'Alerts',
        bottomTabFontFamily: 'Arial',
    }];


// this will start our app

export default AdsScreen;
