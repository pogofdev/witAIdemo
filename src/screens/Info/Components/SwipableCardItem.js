/* eslint-disable import/no-extraneous-dependencies */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text, Image, Animated, TouchableHighlight, TouchableOpacity} from 'react-native';
import {Card} from "react-native-elements";
import Swipeable from 'react-native-swipeable';
import CardItem from "./CardItem";


const ANIMATION_DURATION = 250;
var ROW_HEIGHT = 65;
export default class SwipableCardItem extends Component {
    constructor(props) {
        super(props)
        this._animated = new Animated.Value(1);


    }

    _onPressToDelete = () => {
        const {_onPressToDelete} = this.props;
        if (_onPressToDelete) {
            Animated.timing(this._animated, {
                toValue: 0,
                duration: ANIMATION_DURATION,
            }).start(() => _onPressToDelete());
        }
    };


    render() {
        const {item, index} = this.props;

        const rowStyles = [
            {
                flex: 1,

            },
            {
                height: this._animated.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, ROW_HEIGHT],
                    extrapolate: 'clamp',
                }),
            },
            {opacity: this._animated},
            {
                transform: [
                    {scale: this._animated},
                    {
                        rotate: this._animated.interpolate({
                            inputRange: [0, 1],
                            outputRange: ['35deg', '0deg'],
                            extrapolate: 'clamp',
                        })
                    }
                ],
            },
        ];

        const rightButtons = [
            <TouchableHighlight style={styles.wrapperRightButton} onPress={() => this._onPressToDelete()}>
                <Text style={{textAlign: 'center', color: 'white'}}>Delete</Text>
            </TouchableHighlight>,
        ];

        const swipableRowConfig = {
            rightButtons: rightButtons,
            rightButtonWidth: 75,
            // onRightButtonsOpenRelease: (event, gestureState, swipeable) => {
            //     if (this.currentlyOpenSwipeable && this.currentlyOpenSwipeable !== swipeable) {
            //         this.currentlyOpenSwipeable.recenter();
            //     }
            //     this.currentlyOpenSwipeable=swipeable;
            // },
            // onRightButtonsCloseRelease: () => this.currentlyOpenSwipeable=null
        }
        return (
            <Animated.View style={rowStyles}>
                <Swipeable style={{flex: 1}} {...swipableRowConfig} >
                    <CardItem message={item} _onLayout={(height) => null}/>
                </Swipeable>
            </Animated.View>


        );
    }
}


const styles = {
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
    wrapperRightButton: {
        flex: 1,
        flexDirection: 'column',
        marginLeft: 0,
        marginRight: 0,
        padding: 10,
        backgroundColor: 'red',
        justifyContent: 'center',
        alignContent: 'center',
        opacity: 0.9,
        marginTop: 5,
        width: 65
    },
    content: {
        fontSize: 12,
    },
};