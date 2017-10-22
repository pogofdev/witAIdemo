/* eslint-disable import/no-extraneous-dependencies */
import React, {Component} from 'react';
import {View, Text, Image} from 'react-native';


export default class CardItem extends Component {
    constructor(props) {
        super(props)
    }

    styles = {
        wrapper: {
            flex: 1,
            flexDirection: 'row',
            marginLeft: 10,
            marginRight: 10,
            padding: 10,
            backgroundColor: '#fff',
            justifyContent: 'center',
            opacity: 0.9,
            marginTop: 5,
        },
        content: {
            fontSize: 12,
        },
    };

    formatTime(time) {
        let text = '';
        if (typeof time !== 'undefined') {
            text = time.slice(0, 2) + ':' + time.slice(2);
        }
        return text;
    }

    render() {
        const {DEST, ORIGIN, FLIGHTNO, GATE, BELT, ARRDEP, STATUSDESCRIPTION, ESTIMATEDTIME, TERMINAL, CKIROW, LOBBY} = this.props.flight;
        const rowStyles = [
            this.styles.wrapper,
        ];
        return (
            <View style={rowStyles}>
                <View>
                    <Image
                        style={{width: 40, height: 40}}
                        source={ARRDEP === 'A' ? require('../../../../img/icons/i_landing.png') : require('../../../../img/icons/i_takeoff.png')}
                        resizeMode='stretch'
                    />
                </View>
                <View style={{flex: 1, paddingLeft: 10}}>
                    <Text style={this.styles.content}>Your Flight: {ORIGIN} to {DEST}</Text>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                        <View style={{flex: 1}}>
                            <Text style={this.styles.content}>Flight No: {FLIGHTNO}</Text>
                            <Text style={this.styles.content}>Estimated: {(ESTIMATEDTIME.substring(0, 5))}</Text>
                            <Text style={this.styles.content}>Status: {STATUSDESCRIPTION}</Text>
                        </View>
                        <View style={{flex: 1, alignItems: 'flex-end'}}>
                            <Text
                                style={this.styles.content}>{ARRDEP === 'A' ? `Belt: ${BELT === null ? '   ' : BELT}` : `Check in: ${CKIROW === null ? '   ' : CKIROW}`}</Text>
                            <Text
                                style={this.styles.content}>{ARRDEP === 'A' ? `Lobby: ${LOBBY === null ? '   ' : LOBBY}` : `Gate: ${GATE === null ? '   ' : GATE}`}</Text>
                            <Text
                                style={this.styles.content}>{`Terminal: ${TERMINAL === null ? '   ' : TERMINAL}`}</Text>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}