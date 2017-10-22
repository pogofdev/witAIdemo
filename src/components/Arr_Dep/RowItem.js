import React from "react";
import {Text, TouchableOpacity, View} from "react-native";
import {ARRIVAL, DEFAULT_TEXT_COLOR, UNDEFINED} from "../../constants";
import {CachedImage} from "react-native-img-cache";
import {getFlightLogo} from "./FlightSchedule_ext";

const BORDER_WIDTH = 0.5;
const BORDER_COLOR = '#d5d5d5';


class RowItem extends React.PureComponent {
    formatTime(time) {
        let text = '';
        if (time !== UNDEFINED) {
            text = time.slice(0, 2) + ':' + time.slice(2);
        }
        return text;
    }

    render() {
        const {onPress, item, Arr_Dep} = this.props;
        const {SCHEDULEDTIME = UNDEFINED, ESTIMATEDTIME = UNDEFINED, STATUSDESCRIPTION, FLIGHTNO, BELT = '', CKIROW = '', TERMINAL, GATE = '', LOBBY = '', ORIGIN, DEST} = this.props.item;

        return (
            <TouchableOpacity onPress={() => onPress(item)}>
                <View style={styles.containerStyle}>
                    <View style={[styles.sectionStyle, {flex: 1.5}]}>
                        <Text style={styles.textStyle}>{this.formatTime(SCHEDULEDTIME)}</Text>
                        <Text style={styles.textStyle}>{this.formatTime(ESTIMATEDTIME)}</Text>
                    </View>

                    <View style={[styles.sectionStyle, {flex: 4.5}]}>
                        <Text style={styles.textStyle}>{FLIGHTNO}</Text>
                        <CachedImage
                            source={{uri: getFlightLogo(FLIGHTNO)}}
                            style={[styles.logoStyle, {marginTop: 4}]}
                            resizeMode="stretch"
                        />

                        <Text style={styles.textStyle}>{(ORIGIN + ' - ' + DEST)}</Text>
                    </View>

                    <View style={[styles.sectionStyle, {alignItems: 'center', flex: 2}]}>
                        <Text style={styles.textStyle}>{TERMINAL} </Text>
                        {Arr_Dep === ARRIVAL ?
                            <Text style={styles.textStyle}>{BELT} </Text> :
                            <Text style={styles.textStyle}>{CKIROW} </Text>}
                        {Arr_Dep === ARRIVAL ?
                            <Text style={styles.textStyle}>{LOBBY} </Text> :
                            <Text style={styles.textStyle}>{GATE} </Text>}
                    </View>

                    <View style={[styles.sectionStyle, {alignItems: 'flex-end', flex: 2, paddingRight: 5}]}>
                        <Text style={styles.textStyle}>{STATUSDESCRIPTION}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = {
    containerStyle: {
        backgroundColor: 'white',
        borderColor: BORDER_COLOR,
        borderBottomWidth: BORDER_WIDTH,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    sectionStyle: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        paddingLeft: 5
    },
    textStyle: {
        color: DEFAULT_TEXT_COLOR,
    },
    textStyleBold: {
        color: DEFAULT_TEXT_COLOR,
        fontWeight: 'bold'
    },
    logoStyle: {
        width: 90,
        height: 25,
        borderColor: BORDER_COLOR,
        borderWidth: 1,
        marginBottom: 5
    }
};

export default RowItem;

