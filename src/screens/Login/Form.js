import React, {Component} from 'react';
import {Dimensions} from 'react-native';
import {
    StyleSheet,
    KeyboardAvoidingView,
    View, TouchableHighlight, Text,
} from 'react-native';

import UserInput from './UserInput';
// import ButtonSubmit from './ButtonSubmit';
// import SignupSection from './SignupSection';

import usernameImg from '../../../img/login/username.png';
import passwordImg from '../../../img/login/password.png';
import eyeImg from '../../../img/login/eye_black.png';
import {FONT_SIZE_15, FONT_SIZE_20, YELLOW_COLOR} from "../../constants";
import {getLangFormater} from "../../helper_functions";
import {Button, FormInput, FormLabel, FormValidationMessage} from "react-native-elements";


const DEVICE_WIDTH = Dimensions.get('window').width;
export default class FormLogin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showPass: true,
            press: false,
        };
        this.showPass = this.showPass.bind(this);
    }

    showPass() {
        this.state.press === false ? this.setState({showPass: false, press: true}) : this.setState({
            showPass: true,
            press: false
        });
    }

    render() {
        const {lang} = this.props;
        return (
            <View behavior='padding'
                  style={styles.container}>

                <View style={{flex: 0.6}}>
                    <FormLabel labelStyle={{fontSize: FONT_SIZE_15}}>{getLangFormater(lang, "userId")}</FormLabel>
                    <FormInput inputStyle={{color: YELLOW_COLOR, fontSize: FONT_SIZE_20}} onChangeText={() => {
                    }}/>
                </View>
                <View style={{flex: 0.4}}>
                <Button
                    // buttonStyle={{marginTop: 100}}
                    fontSize={FONT_SIZE_20}
                    backgroundColor={YELLOW_COLOR}
                    large
                    iconRight
                    icon={{name: 'code'}}
                    title={getLangFormater(lang, "signin_Button")}/>
                </View>
                {/*<TouchableHighlight*/}
                {/*style={styles.button}*/}
                {/*activeOpacity={0.6}*/}
                {/*underlayColor={YELLOW_COLOR}*/}
                {/*onPress={() => this.setState({score: ++this.state.score})}>*/}
                {/*<Text style={styles.text}>{getLangFormater(lang, "signin_Button")}</Text>*/}
                {/*</TouchableHighlight>*/}
                {/*<TouchableHighlight*/}
                {/*// style={styles.button}*/}
                {/*activeOpacity={0.6}*/}
                {/*underlayColor={'white'}*/}
                {/*onPress={this._onPress}>*/}
                {/*<Text style={styles.button}>LOGIN</Text>*/}
                {/*</TouchableHighlight>*/}


                {/*<View style={{flex:1,backgroundColor:'blue'}}>*/}
                {/*<TouchableHighlight style={styles.button} onPress={this._onPress}>*/}
                {/*<Text style={styles.text}>LOGIN</Text>*/}
                {/*</TouchableHighlight>*/}
                {/*</View>*/}

                {/*<TouchableOpacity*/}
                {/*activeOpacity={0.7}*/}
                {/*style={styles.btnEye}*/}
                {/*onPress={this.showPass}*/}
                {/*>*/}
                {/*/!*<Image source={eyeImg} style={styles.iconEye}/>*!/*/}
                {/*</TouchableOpacity>*/}
            </View>
        );
    }
}
//
// const DEVICE_WIDTH = Dimensions.get('window').width;
// const DEVICE_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        flex: 0.5,
    },
    btnEye: {
        position: 'absolute',
        top: 60,
        right: 28,
    },
    iconEye: {
        width: 25,
        height: 25,
        tintColor: 'rgba(0,0,0,0.2)',
    },
    text: {
        color: 'white',
        fontSize: 20,
    },
    button: {
        marginTop: 40,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: YELLOW_COLOR,
        height: 60,
        borderRadius: 3,
        marginHorizontal: 20,
        zIndex: 100,
    },
});
