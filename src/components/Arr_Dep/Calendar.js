import React, {Component} from "react";
import {
    View,
    Text,
    TouchableNativeFeedback,
    TouchableHighlight
} from "react-native";
import {Platform} from "react-native";
import {YELLOW_COLOR, DEFAULT_BACKGROUND_COLOR, DEFAULT_TEXT_COLOR} from '../../constants';
import {getLangFormater} from "../../helper_functions";


const paddingTopBottom = 7;
const TODAY = '';
const YESTERDAY = '-';
const TOMORROWS = '+';

class Calendar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedDate: ''// '+' the day after, '-' the day before. '' current day
        };
        this.renderDateButtonAndroid = this.renderDateButtonAndroid.bind(this);
        this.renderDateButtonIOS = this.renderDateButtonIOS.bind(this);
        this.onPress = this.onPress.bind(this);
        this.getMonth = this.getMonth.bind(this);
    }

    getDate(arg) {
        let today = new Date();
        switch (arg) {
            case YESTERDAY:
                let yesterday = new Date(today.getTime() - (24 * 60 * 60 * 1000));
                return yesterday.getDate();
                break;
            case TOMORROWS:
                let tmr = new Date(today.getTime() + (24 * 60 * 60 * 1000));
                return tmr.getDate();
                break;
            default:
                return (today.getDate());
        }
    }

    getMonth(arg) {
        const {lang} = this.props;
        let today = new Date();
        let mm = null;
        switch (arg) {
            case YESTERDAY:
                let yesterday = new Date(today.getTime() - (24 * 60 * 60 * 1000));
                mm = yesterday.getMonth(); //January is 0!
                break;
            case TOMORROWS:
                let tomorrows = new Date(today.getTime() + (24 * 60 * 60 * 1000));
                mm = tomorrows.getMonth(); //January is 0!
                break;
            default:
                mm = today.getMonth(); //January is 0!
        }
        const monthNames = [
            getLangFormater(lang, "January"),
            getLangFormater(lang, "February"),
            getLangFormater(lang, "March"),
            getLangFormater(lang, "April"),
            getLangFormater(lang, "May"),
            getLangFormater(lang, "June"),
            getLangFormater(lang, "July"),
            getLangFormater(lang, "August"),
            getLangFormater(lang, "September"),
            getLangFormater(lang, "October"),
            getLangFormater(lang, "November"),
            getLangFormater(lang, "December")
        ];
        return monthNames[mm];
    }

    onPress(arg) {
        const {onPress} = this.props;
        this.setState({selectedDate: arg});
        onPress(arg);
    };

    renderDateButtonAndroid(arg) {
        const {selectedDate} = this.state;
        if (arg === selectedDate) {
            return (
                <TouchableNativeFeedback
                    onPress={() => this.onPress(arg)}
                    background={TouchableNativeFeedback.SelectableBackground()}
                >

                    <View style={[styles.dateContainerStyle]}>
                        <Text style={[styles.textTopStyle, styles.selectedStyle]}>{this.getDate(arg)}</Text>
                        <View style={styles.selectedViewBottomStyle}><Text
                            style={[styles.selectedStyle]}>{this.getMonth(arg)}</Text></View>
                    </View>
                </TouchableNativeFeedback>
            );
        }
        return (
            <TouchableNativeFeedback
                onPress={() => this.onPress(arg)}
                background={TouchableNativeFeedback.SelectableBackground()}
            >
                <View style={[styles.dateContainerStyle]}>
                    <Text style={[styles.textTopStyle]}>{this.getDate(arg)}</Text>
                    <View style={styles.viewBottomStyle}><Text style={[styles.textBottomStyle]}
                    >{this.getMonth(arg)}</Text></View>
                </View>
            </TouchableNativeFeedback>
        );
    }

    renderDateButtonIOS(arg) {
        const {selectedDate} = this.state;
        if (arg === selectedDate) {
            return (
                <TouchableHighlight
                    onPress={() => this.onPress(arg)} underlayColor={'#fafafa'}
                    style={[styles.dateContainerStyle]}
                >
                    <View style={[styles.dateContainerStyle]}>
                        <Text style={[styles.textTopStyle, styles.selectedStyle]}>{this.getDate(arg)}</Text>
                        <View style={styles.selectedViewBottomStyle}><Text
                            style={[styles.selectedStyle]}>{this.getMonth(arg)}</Text></View>
                    </View>
                </TouchableHighlight>
            );
        }
        return (
            <TouchableHighlight
                onPress={() => this.onPress(arg)} underlayColor={'#fafafa'}
                style={[styles.dateContainerStyle]}
            >
                <View style={[styles.dateContainerStyle]}>
                    <Text style={[styles.textTopStyle]}>{this.getDate(arg)}</Text>
                    <View style={styles.viewBottomStyle}><Text style={[styles.textBottomStyle]}
                    >{this.getMonth(arg)}</Text></View>
                </View>
            </TouchableHighlight>
        );
    }

    render() {
        return (
            <View style={styles.bar}>
                {Platform.OS === 'android' ? this.renderDateButtonAndroid(YESTERDAY) : this.renderDateButtonIOS(YESTERDAY)}
                {Platform.OS === 'android' ? this.renderDateButtonAndroid(TODAY) : this.renderDateButtonIOS(TODAY)}
                {Platform.OS === 'android' ? this.renderDateButtonAndroid(TOMORROWS) : this.renderDateButtonIOS(TOMORROWS)}
            </View>
        );
    }
}

const styles = {

    bar: {
        flex: 1,
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: DEFAULT_BACKGROUND_COLOR
    },
    dateContainerStyle: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: 'red'
    },

    fullWidthButton: {
        backgroundColor: 'blue',
        height: 70,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    textTopStyle: {
        color: DEFAULT_TEXT_COLOR,
        position: 'absolute',
        top: paddingTopBottom
    },
    textBottomStyle: {
        color: DEFAULT_TEXT_COLOR,
    },
    underlineStyle: {
        borderBottomWidth: 3
    },
    selectedStyle: {
        color: YELLOW_COLOR,

    },
    selectedViewBottomStyle: {
        borderBottomWidth: 3,

        borderBottomColor: YELLOW_COLOR,
        position: 'absolute',
        bottom: paddingTopBottom
    },
    viewBottomStyle: {
        position: 'absolute',
        bottom: paddingTopBottom
    }
};

export default Calendar;
