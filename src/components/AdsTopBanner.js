import React from 'react';
import {StyleSheet, View, Dimensions, Platform} from 'react-native';
import {AdMobRewarded} from 'react-native-admob';
import AdMobBanner from "react-native-admob/RNAdMobBanner";
import {ADUNITID_ANDROID, ADUNITID_IOS, TESTDEVICEID} from "../constants";
class Lightbox extends React.Component {
    constructor(props){
        super(props);

    }

    initGoogleAds() {
        AdMobRewarded.setTestDeviceID('EMULATOR');
        AdMobRewarded.setAdUnitID('ca-app-pub-3940256099942544/1033173712');

        AdMobRewarded.addEventListener('rewardedVideoDidRewardUser',
            (type, amount) => console.log('rewardedVideoDidRewardUser', type, amount)
        );
        AdMobRewarded.addEventListener('rewardedVideoDidLoad',
            () => console.log('rewardedVideoDidLoad')
        );
        AdMobRewarded.addEventListener('rewardedVideoDidFailToLoad',
            (error) => console.log('rewardedVideoDidFailToLoad', error)
        );
        AdMobRewarded.addEventListener('rewardedVideoDidOpen',
            () => console.log('rewardedVideoDidOpen')
        );
        AdMobRewarded.addEventListener('rewardedVideoDidClose',
            () => {
                console.log('rewardedVideoDidClose');
                AdMobRewarded.requestAd((error) => error && console.log(error));
            }
        );
        AdMobRewarded.addEventListener('rewardedVideoWillLeaveApplication',
            () => console.log('rewardedVideoWillLeaveApplication')
        );

        AdMobRewarded.requestAd((error) => error && console.log(error));
    }


    componentDidMount() {
        // this.initGoogleAds();
        // this.showRewarded();
    }

    componentWillUnmount(){
        AdMobRewarded.removeAllListeners();
    }

    showRewarded() {
        AdMobRewarded.showAd((error) => error && console.log(error));
    }


    bannerError(){
        console.log('banner error');
    }

    render() {
        return (
            <View style={[styles.container]}>
                <View style={{flex: 8}}>
                    <AdMobBanner style={{height: Platform.OS === 'ios' ? 40 : 65}}
                                 bannerSize="smartBannerLandscape"
                                 adUnitID={Platform.OS === 'ios' ? ADUNITID_IOS : ADUNITID_ANDROID}
                                 // testDeviceID={''}
                                 didFailToReceiveAdWithError={this.bannerError} />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width,
        height: Platform.OS === 'ios' ? 40 : 56,
        backgroundColor: 'rgba(255, 255, 255, 0)',
        marginTop: Platform.OS === 'ios' ? 20 : 0,

    },
    title: {
        fontSize: 17,
        fontWeight: '700',
        color:'white'
    },
    content: {
        marginTop: 8,
        color:'white'
    },
});

export default Lightbox;
