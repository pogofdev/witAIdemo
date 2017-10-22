import React, {Component} from "react";
import {Text, TouchableWithoutFeedback, View} from "react-native";
import {ARRIVAL, DEFAULT_BACKGROUND_COLOR, DEFAULT_TEXT_COLOR, FLATLIST_BORDER_WIDTH, Messages} from "../../constants";
import {PropTypes} from 'react-native-globalize';
import {getLangFormater} from "../../helper_functions";

export class RowItemHeader extends Component {
    render() {
        const styles = {
            containerStyle: {
                height: 50,
                backgroundColor: DEFAULT_BACKGROUND_COLOR,//'#FAFAFA',
                borderColor: DEFAULT_TEXT_COLOR, //'#ddd',
                borderBottomWidth: FLATLIST_BORDER_WIDTH - 1,
                borderTopWidth: FLATLIST_BORDER_WIDTH + 1,
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
            },
            sectionStyle: {
                backgroundColor: DEFAULT_BACKGROUND_COLOR,//'#FAFAFA',
                flexDirection: 'column',
                alignItems: 'flex-start',
                justifyContent: 'center',
                paddingLeft: 5
            },
            textStyle: {
                color: DEFAULT_TEXT_COLOR,
                fontWeight: 'bold',
                fontSize: 10
            }
        };
        const {lang, Arr_Dep, onPress} = this.props;

        return (
            <TouchableWithoutFeedback onPress={onPress}>
                <View style={styles.containerStyle}>
                    <View style={[styles.sectionStyle, {flex: 2}]}>
                        <Text style={styles.textStyle}>
                            {getLangFormater(lang, 'scheduled')}
                        </Text>
                        <Text style={styles.textStyle}>
                            {getLangFormater(lang, 'estimated')}
                        </Text>
                    </View>

                    <View style={[styles.sectionStyle, {paddingLeft: 10, flex: 4}]}>
                        <Text style={styles.textStyle}>
                            {getLangFormater(lang, 'flightno')}
                        </Text>
                        <Text style={styles.textStyle}>

                        </Text>
                    </View>

                    <View style={[styles.sectionStyle, {paddingLeft:20,flex: 2.5}]}>
                        <Text style={styles.textStyle}>
                            {getLangFormater(lang, 'terminal')}/
                        </Text>
                        <Text style={styles.textStyle}>
                            {Arr_Dep === ARRIVAL ? getLangFormater(lang, 'belt') : getLangFormater(lang, 'checkin')}/
                            {Arr_Dep === ARRIVAL ? getLangFormater(lang, 'lobby') : getLangFormater(lang, 'gate')}
                        </Text>
                    </View>


                    <View style={[styles.sectionStyle, {alignItems: 'center', flex: 1.5}]}>
                        <Text style={styles.textStyle}>
                            {getLangFormater(lang, 'status')}
                        </Text>
                    </View>
                </View>
            </TouchableWithoutFeedback>

        );
    }
}

RowItemHeader.contextTypes = {
    globalize: PropTypes.globalizeShape,
};