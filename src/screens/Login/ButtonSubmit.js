import React, {Component} from 'react'
import {
    StyleSheet,
    Animated,
    View,
    Text,
    TouchableWithoutFeedback
} from 'react-native';

const ACTION_TIMER = 400;
const COLORS = ['rgb(255,255,255)', 'rgb(111,235,62)'];

export default class AnimatedButtonPress extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pressAction: new Animated.Value(0),
            textComplete: '',
            buttonWidth: 0,
            buttonHeight: 0
        };
        this.handlePressIn = this.handlePressIn.bind(this);
        this.handlePressOut = this.handlePressOut.bind(this);
        this.animationActionComplete = this.animationActionComplete.bind(this);
        this.getButtonWidthLayout = this.getButtonWidthLayout.bind(this);
        this.getProgressStyles = this.getProgressStyles.bind(this);
    }


    componentWillMount() {
        this._value = 0;
        this.state.pressAction.addListener((v) => this._value = v.value);
    }

    handlePressIn() {
        Animated.timing(this.state.pressAction, {
            duration: ACTION_TIMER,
            toValue: 1
        }).start(this.animationActionComplete);
    }

    handlePressOut() {
        Animated.timing(this.state.pressAction, {
            duration: this._value * ACTION_TIMER,
            toValue: 0
        }).start();
    }

    animationActionComplete() {

        var message = '';
        if (this._value === 1) {
            message = 'You held it long enough to fire the action!';
        }
        this.setState({
            textComplete: message
        });
    }

    getButtonWidthLayout(e) {
        this.setState({
            buttonWidth: e.nativeEvent.layout.width - 6,
            buttonHeight: e.nativeEvent.layout.height - 6
        });
    }

    getProgressStyles() {

        var width = this.state.pressAction.interpolate({
            inputRange: [0, 1],
            outputRange: [0, this.state.buttonWidth]
        });
        var bgColor = this.state.pressAction.interpolate({
            inputRange: [0, 1],
            outputRange: COLORS
        });
        return {
            width: width,
            height: this.state.buttonHeight,
            backgroundColor: bgColor
        }
    }

    render() {
        return (
            <View>
                <TouchableWithoutFeedback
                    onPressIn={this.handlePressIn}
                    onPressOut={this.handlePressOut}
                    onLayout={this.getButtonWidthLayout}
                >
                    <View style={styles.button} >
                        <Animated.View style={[styles.bgFill, this.getProgressStyles()]}/>
                        <Text style={styles.text}>Press And Hold Me</Text>
                    </View>
                </TouchableWithoutFeedback>
                <View>
                    <Text>{this.state.textComplete}</Text>
                </View>
            </View>
        );
    }
}


var styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    button: {
        padding: 10,
        borderWidth: 3,
        borderColor: '#111'
    },
    text: {
        backgroundColor: 'transparent',
        color: '#111'
    },
    bgFill: {
        position: 'absolute',
        height:100,
        width:10,
        backgroundColor:'red',
        top: 0,
        left: 0
    }
});
