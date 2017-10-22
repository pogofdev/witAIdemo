/* eslint-disable import/no-extraneous-dependencies */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text, Image, Animated} from 'react-native';
import {Card} from "react-native-elements";


const ANIMATION_DURATION = 250;

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


    render() {
        const {message, messageId} = this.props.message;
        const rowStyles = [
            this.styles.wrapper,
        ];
        return (
            <View style={rowStyles} >
                <View>
                    <Image
                        style={{width: 30, height: 30}}
                        source={require('../../../../img/icons/takeoff.png')}
                        resizeMode='stretch'
                    />
                </View>
                <View style={{flex: 1, paddingLeft: 10}} onLayout={(event) => {
                    const {x, y, width, height} = event.nativeEvent.layout;
                    console.log('view 2', height);
                }}>
                    <Text style={this.styles.content}>{message}</Text>
                    {/*<View style={{flex: 1, flexDirection: 'row'}}>*/}
                        {/*<View style={{flex: 1}}>*/}
                            {/*<Text style={this.styles.content}>Flight No: {FLIGHTNO}</Text>*/}
                            {/*<Text style={this.styles.content}>Status: {STATUS}</Text>*/}
                        {/*</View>*/}
                        {/*<View style={{flex: 1, alignItems: 'flex-end'}}>*/}
                            {/*<Text style={this.styles.content}>Belt: {BELT === null ? 'N/A' : BELT}</Text>*/}
                            {/*<Text style={this.styles.content}>Gate: {GATE === null ? 'N/A' : GATE}</Text>*/}
                        {/*</View>*/}
                    {/*</View>*/}
                    {/*<Text style={this.styles.content} onLayout={(event) => {*/}
                        {/*const {x, y, width, height} = event.nativeEvent.layout;*/}
                        {/*console.log('view 3', height);*/}
                    {/*}}>Message: This is the body of the dfdsaf d fadsf asd fads fasdf adsf dsf asdf adsf asdf f dsaf sdf asdf asdf dasf dsa fads fasdf das*/}
                    {/*f adsf adsf as</Text>*/}
                </View>
            </View>

        );
    }
}