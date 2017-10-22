import React, {Component} from "react";
import {
    View,
    FlatList,
    Animated,
    Alert
} from "react-native";
import Calendar from "./Calendar";
import {getDate, getHour} from "./FlightSchedule_ext";
import RowItem from "./RowItem";
import {fetchFlightById, fetchFlightSchedule, watchThisFlight} from "../../actions/index";
import Spinner from "react-native-loading-spinner-overlay";
import {RowItemHeader} from "./RowItemHeader";
import {
    ARRIVAL, ARRIVED, DEEP_LINK, DEPARTED, FLIGHT_STATUS_CLOSED, PASSWORD, REFRESH_FLIGHT_SCHEDULE, SUCCESS_COLOR,
    WARNING_COLOR,
    WATCH_FLIGHT
} from "../../constants";
import {Navigation} from "react-native-navigation";
import {getLangFormater} from "../../helper_functions";


const HEADER_HEIGHT = 50;
const BACKONEHOUR = '-';
const NEXT_HOUR = '+';
const CURRENT_HOUR = '';
const TODAY = '';

class FlightSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            data: [],
            error: null,
            refreshing: false,
            scrollY: new Animated.Value(0),
            selectedDate: TODAY,// '+' the day after, '-' the day before. '' current day
            fromHour: getHour(CURRENT_HOUR),
            toHour: getHour(NEXT_HOUR),
            noDataToLoad: false,
        };
        this.renderFlatList = this.renderFlatList.bind(this);
        this._handleSelectDate = this._handleSelectDate.bind(this);
        this._handleLoadOneHourMore = this._handleLoadOneHourMore.bind(this);
        this._handleLoadEarlierFlights = this._handleLoadEarlierFlights.bind(this);
        this._handleRowItemOnPress = this._handleRowItemOnPress.bind(this);
        this._handleDeepLink = this._handleDeepLink.bind(this);
        this.showAlert = this.showAlert.bind(this);
        this._onHeaderPress = this._onHeaderPress.bind(this);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    }

    onNavigatorEvent(event) {
        if (event.type === DEEP_LINK) {
            switch (event.link) {
                case REFRESH_FLIGHT_SCHEDULE:
                    this.makeRemoteRequest();
                    break;
            }
        }
    }

    componentDidMount() {
        this.makeRemoteRequest();
    }

    makeRemoteRequest() {
        const {selectedDate, fromHour} = this.state;
        const {Arr_Dep} = this.props;
        this.setState({loading: true});

        fetchFlightSchedule(Arr_Dep, PASSWORD, getDate(selectedDate), getDate(selectedDate), fromHour, '2359', (data) => {
            this.setState({
                data: [...data.flights],
                loading: false,
                refreshing: false,
                noDataToLoad: data.flights.length <= 0
            });
        });
    }

    _handleSelectDate(arg) {
        const {Arr_Dep} = this.props;
        this.setState(
            {
                fromHour: arg==='' ? getHour(CURRENT_HOUR): '0000',
                toHour: '2359',
                selectedDate: arg,
                loading: true

            },
            () => {
                const {selectedDate, fromHour, toHour} = this.state;
                fetchFlightSchedule(Arr_Dep, PASSWORD, getDate(selectedDate), getDate(selectedDate), fromHour, toHour, (data) => {
                    this.setState({
                        data: [...data.flights],
                        loading: false,
                        refreshing: false,
                        noDataToLoad: data.flights.length <= 0

                    });
                });
            }
        );
    }


    _handleLoadEarlierFlights() {
        const {fromHour} = this.state;
        const {Arr_Dep} = this.props;
        this.setState(
            {
                toHour: fromHour,
                fromHour: getHour(BACKONEHOUR, fromHour),
                loading: false,
                refreshing: true,

            },
            () => {
                const {selectedDate, fromHour, toHour} = this.state;
                fetchFlightSchedule(Arr_Dep, PASSWORD, getDate(selectedDate), getDate(selectedDate), fromHour, toHour, (data) => {
                    this.setState({
                        data: [...data.flights, ...this.state.data],
                        loading: false,
                        refreshing: false,
                        noDataToLoad: data.flights.length <= 0

                    });
                });
            }
        );
    }

    _handleLoadOneHourMore() {
        const {toHour, noDataToLoad} = this.state;
        if (!noDataToLoad) {
            this.setState(
                {
                    fromHour: toHour,
                    toHour: getHour(NEXT_HOUR, toHour),
                    loading: true
                },
                () => {
                    this.makeRemoteRequest();
                }
            );
        }
    }

    _onHeaderPress(){
        this.refs['flatListRef'].scrollToOffset({x: 0, y: 0, animated: true});
    }

    renderFlatList() {
        const {scrollY, data, selectedDate} = this.state;
        const {lang} = this.props;

        const dateContainerOpacity = this.state.scrollY.interpolate({
            inputRange: [0, HEADER_HEIGHT / 2, HEADER_HEIGHT],
            outputRange: [1, 0.3, 0.1],
            extrapolate: 'clamp',
        });

        return (
            <View pointerEvents="box-none">
                <FlatList
                    ref = 'flatListRef'
                    data={[{firstRow: 'firstrow', FLIGHTID: '1'}, {headerRow: 'header', FLIGHTID: '2'},...data]}
                    renderItem={({item, index}) => {
                        if (item.firstRow && index === 0) {
                            return ( <Animated.View style={[{
                                opacity: dateContainerOpacity
                            }]}>
                                <Calendar lang={lang} selectedDate={selectedDate} onPress={this._handleSelectDate}/>
                            </Animated.View>);
                        } else if (item.headerRow && index === 1) {
                            return (<RowItemHeader onPress={this._onHeaderPress} lang={lang} {...this.props}/>);
                        }
                        else {
                            return ( (item.firstRow || item.headerRow) ? null :
                                <RowItem item={item} rowIndex={index} onPress={this._handleRowItemOnPress} {...this.props}/>);
                        }
                    }}
                    keyExtractor={(item, index) => (item.FLIGHTID + index)}//item["FLIGHTID"]
                    onRefresh={this._handleLoadEarlierFlights}
                    refreshing={this.state.refreshing}
                    // onEndReached={this._handleLoadOneHourMore}
                    // onEndReachedThreshold={0.1}
                    onScroll={Animated.event(
                        [{nativeEvent: {contentOffset: {y: scrollY}}}]
                    )}
                    scrollEventThrottle={1}
                    stickyHeaderIndices={[1]}
                    disableVirtualization={true}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}

                />
            </View>
        );
    }

    showAlert(item) {
        const {FLIGHTNO} = item;
        const {deviceToken, lang, navigator} = this.props;
        Alert.alert(
            'iNoiBai',
            (getLangFormater(lang, 'Youareadding') + FLIGHTNO + getLangFormater(lang, 'Youwillnowreceive')),
            [
                {
                    text: getLangFormater(lang, 'cancel'),
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel'
                },
                {
                    text: getLangFormater(lang, 'add'),
                    onPress: () => watchThisFlight(deviceToken, item, (data) => {
                        if (data.code === 200) {
                            navigator.showInAppNotification({
                                screen: "inoibai.components.LightBox", // unique ID registered with Navigation.registerScreen
                                passProps: {
                                    color: SUCCESS_COLOR,
                                    title: 'iNoiBai',
                                    content: getLangFormater(lang, 'flightadded')
                                }, // simple serializable object that will pass as props to the in-app notification (optional)
                                autoDismissTimerSec: 1 // auto dismiss notification in seconds
                            });
                            this._handleDeepLink();
                        }
                    })
                },
            ],
            {cancelable: false}
        );
    }

    _handleRowItemOnPress({FLIGHTID}) {
        fetchFlightById(PASSWORD,FLIGHTID,(item) => {
            console.log('flight detail',item);
            const {STATUS = 'OPN', ARRDEP} = item.flights;
            const {lang} = this.props;
            if (STATUS !== FLIGHT_STATUS_CLOSED) { // check status if it still can be added else show info message
                this.showAlert(item.flights);
            } else {
                this.props.navigator.showInAppNotification({
                    screen: "inoibai.components.LightBox", // unique ID registered with Navigation.registerScreen
                    passProps: {
                        color: WARNING_COLOR,
                        title: 'iNoiBai',
                        content:
                            ARRDEP === ARRIVAL ?
                                getLangFormater(lang, 'YourFlightHasLanded') :
                                getLangFormater(lang, 'YourFlightHasDeparted')
                    }, // simple serializable object that will pass as props to the in-app notification (optional)
                    autoDismissTimerSec: 1 // auto dismiss notification in seconds
                });
            }
        });

    }

    _handleDeepLink() {
        // tell profile tab to reload the watch list
        Navigation.handleDeepLink({
            link: WATCH_FLIGHT,
        });
    }

    render() {
        const {loading} = this.state;
        const {lang} = this.props;
        return (
            <View style={styles.containerStyle}>
                {this.renderFlatList()}
                <Spinner visible={loading} textContent={getLangFormater(lang, 'Loading')} textStyle={{color: '#ddd'}}/>
            </View>
        );
    }
}

const styles = {
    header: {
        flex: 1,
        flexDirection: 'column',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
    },
    inputsContainer: {
        flex: 1
    },
    dateContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        width: null,
        height: HEADER_HEIGHT,
    },
    flatListHeader: {}
};

export default FlightSchedule;