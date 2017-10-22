import React from 'react';
import {View, FlatList, Dimensions} from 'react-native';
import {Platform} from "react-native";
import ParallaxScroll from 'react-native-parallax-scroll';
import Background from "../../components/Background";
import {fetchWatchList, removeFlightFromWatchList} from "../../actions/index";
import {DEEP_LINK, DEVICE_TOKEN, WATCH_FLIGHT} from "../../constants";
import SwipableCardItem from "./Components/SwipableCardItem";

class Alert extends React.Component {
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
        this.getWatchList = this.getWatchList.bind(this);
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
                        },
                        () => {
                            this.getWatchList();
                        });
                    break;
                case WATCH_FLIGHT:
                    this.getWatchList();
                    break;
            }
        }
    }

    getWatchList() {
        const {deviceToken} = this.state;
        this.setState({
                loading: true,
                refreshing: true,
            },
            () => {
                fetchWatchList(deviceToken, (data) => {
                    this.setState({
                        data: data.data.reverse(),
                        loading: false,
                        refreshing: false,
                    });
                });
            });
    }

    componentWillUpdate() {
        const {deviceToken, firstTimeCall} = this.state;
        if (deviceToken !== null && firstTimeCall) {
            this.getWatchList();
        }

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
        const {deviceToken} = this.state;
        removeFlightFromWatchList(deviceToken, item.FLIGHTID, (data) => {
            if (data !== 'error') {
                this.handleRemoveItemFromFlatlist(index);
            }
        });
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
        const {refreshing, data} = this.state;
        const style = {backgroundColor: '#000'};

        return (
            <View>
                <ParallaxScroll
                    style={style}
                    parallaxHeight={Dimensions.get('window').height}
                    useNativeDriver={true}
                    isBackgroundScalable={false}// IOS only
                    headerBackgroundColor={'rgba(51, 51, 51, 0)'}
                    renderParallaxBackground={() =>
                        <Background source={{uri: `https://placeimg.com/480/800/arch`}}/>}
                    fadeOutParallaxBackground={false}
                    headerFixedBackgroundColor={'rgba(51, 51, 51, 1)'}
                    parallaxBackgroundScrollSpeed={5}
                    isForegroundTouchable={false}
                    parallaxForegroundScrollSpeed={2.5}
                    scrollableComponent={FlatList}
                    data={[...data, ...[{FLIGHTID: '1', blank: 'blank'}, {
                        FLIGHTID: '2',
                        blank: 'blank'
                    }, {FLIGHTID: '3', blank: 'blank'}, {FLIGHTID: '4', blank: 'blank'}]]}
                    renderItem={this._renderItem}
                    onRefresh={this.getWatchList}
                    refreshing={refreshing}
                    keyExtractor={(item, index) => item.FLIGHTID}
                >
                </ParallaxScroll>
            </View>
        );
    }
}

export default Alert;
