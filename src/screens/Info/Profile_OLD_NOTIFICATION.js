
import React from 'react';
import {StyleSheet, ScrollView, View, Text, FlatList, SectionList, TouchableHighlight} from 'react-native';
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


class Profile extends React.Component {
    swipeableRefList = [];
    currentlyOpenSwipeable = null;

    constructor(props) {
        super(props);
        this.state = {
            deviceToken: null,
            refreshing: false,
            loading: true,
            data: [],


        }

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
                    if (typeof  message!=='undefined' && typeof  messageId!=='undefined') {
                        console.log('chay vo day', messageId, message,this.state );
                        this.setState({
                                data: [{messageId, message}, ...this.state.data]
                            },
                            () => {
                                // this.getWatchList();
                                 this.saveNotificationsToLocalStorage(this.state.data);
                            });
                    }

                    break;
            }
        }
    }

    componentDidMount(){
        this.loadNotificationsFromLocalStorage();
    }

    loadNotificationsFromLocalStorage(){
        let ls = require('react-native-local-storage');
        ls.get('notifications').then((data) => {
            console.log('get data from local storage', data);

            this.setState({data: data === null ? [] : data});


        });
    }

    saveNotificationsToLocalStorage(notifications){
        let ls = require('react-native-local-storage');

        ls.save('notifications', notifications)
            .then(() => {
                ls.get('notifications').then((data) => {console.log("get notifications: ", data)});
            })
    }

    componentDidUpdate(){
        console.log('message',this.state.data);
    }

    handleUserBeganScrollingParentView() {
        for (let i=0; i<this.swipeableRefList.length;i++){
            this.swipeableRefList[i].recenter();
        }
    }

    handleRemoveItemFromFlatlist(index){
        const {data} = this.state;
        console.log('before remove', data)
        const start = data.slice(0, index);
        const end = data.slice(index + 1);
        console.log('after remove', start.concat(end))
        this.setState({
            data:start.concat(end)
        });
    }

    _onPressToDelete(item, index){
        let ls = require('react-native-local-storage');
            ls.get('notifications')
                .then((data) => {
                        let newData=[];
                        for(let i=data.length-1;i>=0;i--){
                            const noti = data[i];
                            if(noti['messageId']!==item['messageId']){
                                newData.push(noti);
                            }
                        }
                        console.log('new data', newData);
                        ls.save('notifications', newData)
                            .then(() => {
                                ls.get('notifications').then((data) => {console.log("save new data: ", data)});

                                this.handleRemoveItemFromFlatlist(index);
                            })
                    }
                );

        }

    _renderItem({item, index}) {

        if (item.blank === 'blank') {
            return <View style={{height: 50}}/>

        } else {
            return (
                <SwipableCardItem item={item} index={index} _onPressToDelete={()=>this._onPressToDelete(item,index)}/>
            );
        }
    }



    render() {
        const {deviceToken, loading, refreshing, data} = this.state;
        const style = {backgroundColor: '#000'};


        return (
            <View>
                {/*<PushNotificationController deviceToken={(token) => this.setState({deviceToken: token})}/>*/}
                {/*<FlatList*/}
                {/*style={style}*/}


                {/*data={data}*/}
                {/*renderItem={this._renderItem}*/}
                {/*onRefresh={this.getWatchList}*/}
                {/*refreshing={refreshing}*/}
                {/*keyExtractor={(item, index) => item.FLIGHTID}*/}
                {/*// onScroll={() => this.handleUserBeganScrollingParentView()}*/}
                {/*>*/}
                {/*</FlatList>*/}
                <ParallaxScroll
                    style={style}
                    // renderHeader={() => <Header />}
                    // headerHeight={Platform.OS == 'ios' ? 64 : 54}
                    // isHeaderFixed={false}
                    parallaxHeight={1000}
                    useNativeDriver={true}
                    isBackgroundScalable={true}
                    headerBackgroundColor={'rgba(51, 51, 51, 0)'}
                    renderParallaxBackground={() =>
                        <Background source={{uri: `https://placeimg.com/640/480/any`}}/>}
                    fadeOutParallaxBackground={false}
                    // renderParallaxForeground={() => <Foreground  />}
                    // fadeOutParallaxForeground={true}
                    headerFixedBackgroundColor={'rgba(51, 51, 51, 1)'}
                    parallaxBackgroundScrollSpeed={5}
                    isForegroundTouchable={false}
                    parallaxForegroundScrollSpeed={2.5}
                    scrollableComponent={FlatList}

                    data={[...data,...[{messageId: '1',blank:'blank'}, {messageId: '2',blank:'blank'}, {messageId: '3',blank:'blank'}, {messageId: '4',blank:'blank'}]]}
                    renderItem={this._renderItem}
                    // onRefresh={this.getWatchList}
                    // refreshing={refreshing}
                    keyExtractor={(item, index) => item.messageId}
                    // onScroll={() => this.handleUserBeganScrollingParentView()}
                >
                </ParallaxScroll>
                {/*<Spinner visible={loading} textContent={"Loading..."} textStyle={{color: '#ddd'}} />*/}
            </View>

        );
    }
}

const styles = {
    wrapper: {
        flex: 1,
        flexDirection: 'column',
        marginLeft: 0,
        marginRight: 0,
        padding: 10,
        backgroundColor: 'red',
        justifyContent: 'center',
        opacity: 0.9,
        marginTop: 5,
        width: 65
    },
    content: {
        fontSize: 12,
    },
};

export default Profile;
