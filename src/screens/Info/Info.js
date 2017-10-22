import React from 'react';
import {StyleSheet, ScrollView, View, Text, FlatList, SectionList, TouchableHighlight, Image, Dimensions} from 'react-native';
import {Platform} from "react-native";
import ParallaxScroll from 'react-native-parallax-scroll';
import Background from "./Components/Background";
import Header from "./Components/Header";
import CardItem from "./Components/CardItem";
import Foreground from "./Components/Foreground";
import PushNotificationController from "../../components/PushNotificationController";
import {fetchWatchList, removeFlightFromWatchList} from "../../actions/index";
import Spinner from "react-native-loading-spinner-overlay";
import {DEEP_LINK, DEVICE_TOKEN, RECEIVED_NOTIFICATION, WATCH_FLIGHT} from "../../constants";
import Swipeable from 'react-native-swipeable';
import SwipableCardItem from "./Components/SwipableCardItem";
import Welcome from "./Components/Welcome";


class Info extends React.Component {
    swipeableRefList = [];
    currentlyOpenSwipeable = null;
    // navigation bar styles
    static navigatorStyle = {
        // center the title label
        navBarTitleTextCentered: Platform.OS !== 'ios', // for android only
        navBarTranslucent: true
    };

    constructor(props) {
        super(props);
        this.state = {
            deviceToken: null,
            refreshing: false,
            loading: true,
            data: [],
        };

        this._renderItem = this._renderItem.bind(this);
        this.handleUserBeganScrollingParentView = this.handleUserBeganScrollingParentView.bind(this);
        this._onPressToDelete = this._onPressToDelete.bind(this);
        this.handleRemoveItemFromFlatlist = this.handleRemoveItemFromFlatlist.bind(this);
        // listen to tab events
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    }

    onNavigatorEvent(event) {
        if (event.type === DEEP_LINK) {
            switch (event.link) {
                case DEVICE_TOKEN:
                    this.setState({
                        deviceToken: event.payload
                    });
                    break;
                case RECEIVED_NOTIFICATION:
                    const message = event.payload['message'];
                    const messageId = event.payload['google.message_id'];
                    if (typeof  message !== 'undefined' && typeof  messageId !== 'undefined') {
                        this.setState({
                                data: [{messageId, message}, ...this.state.data]
                            },
                            () => {
                                // this.getWatchList();
                                // this.saveNotificationsToLocalStorage(this.state.data);
                            });
                    }

                    break;
            }
        }
    }

    componentDidMount() {
        // this.loadNotificationsFromLocalStorage();
    }

    loadNotificationsFromLocalStorage() {
        let ls = require('react-native-local-storage');
        ls.get('notifications').then((data) => {
            console.log('get data from local storage', data);
            this.setState({data: data === null ? [] : data});
        });
    }

    saveNotificationsToLocalStorage(notifications) {
        let ls = require('react-native-local-storage');

        ls.save('notifications', notifications)
            .then(() => {
                ls.get('notifications').then((data) => {
                    console.log("get notifications: ", data)
                });
            })
    }

    handleUserBeganScrollingParentView() {
        for (let i = 0; i < this.swipeableRefList.length; i++) {
            this.swipeableRefList[i].recenter();
        }
    }

    handleRemoveItemFromFlatlist(index) {
        const {data} = this.state;
        const start = data.slice(0, index);
        const end = data.slice(index + 1);
        this.setState({
            data: start.concat(end)
        });
    }

    _onPressToDelete(item, index) {
        let ls = require('react-native-local-storage');
        ls.get('notifications')
            .then((data) => {
                    let newData = [];
                    for (let i = data.length - 1; i >= 0; i--) {
                        const noti = data[i];
                        if (noti['messageId'] !== item['messageId']) {
                            newData.push(noti);
                        }
                    }
                    this.handleRemoveItemFromFlatlist(index);

                }
            );

    }

    _renderItem({item, index}) {
        if (item.blank === 'blank') {
            return <View style={{height: 50}}/>
        } else {
            return (
                <SwipableCardItem item={item} index={index}
                                  _onPressToDelete={() => this._onPressToDelete(item, index)}/>
            );
        }
    }

    render() {
        const {deviceToken, loading, refreshing, data} = this.state;
        const style = {backgroundColor: '#000'};


        return (
            <View style={styles.wrapper}>
                <Image
                    source={require('../../../img/infoImage.png')}
                    style={styles.image}
                />
            </View>

        );
    }
}

const styles = {
    wrapper: {
        flex: 1
    },
    content: {
        fontSize: 12,
    },
    image: {
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height,
        // resizeMode: 'contain',
        // backgroundColor:'red',

    }
};

export default Info;
