import React from 'react';
import {View, Dimensions, Text} from 'react-native';
import {GiftedChat} from 'react-native-gifted-chat';
import {sendChat} from '../../actions';
import AnimatedButtonPress from "./ButtonSubmit";
import {Button} from "react-native-elements";

export default class LoginForm extends React.Component {

    static navigatorStyle = {
        drawUnderNavBar: true,
        navBarTranslucent: true,
        navBarHidden: true,
    };
    state = {
        messages: [],
    };

    componentWillMount() {
        this.setState({
            messages: [
                {
                    _id: 1,
                    text: 'Hello developer',
                    createdAt: new Date(),
                    user: {
                        _id: 2,
                        name: 'React Native',
                        avatar: 'https://facebook.github.io/react/img/logo_og.png',
                    },
                },
            ],
        });
    }

    handleCallback(resMessage) {
        console.log(resMessage);
        this.setState((preState) => {
            console.log('preState', preState);
            return ({
                messages: GiftedChat.append(preState.messages, {
                    _id: new Date().getTime() / 1000,
                    text: resMessage,
                    createdAt: new Date(),
                    user: {
                        _id: 2,
                        name: 'React Native',
                        avatar: 'https://facebook.github.io/react/img/logo_og.png',
                    },

                    // Any additional custom parameters are passed through
                })
            })
        });
    }


    onSend(messages = []) {
        console.log(messages);
        this.setState((previousState) => ({
            messages: GiftedChat.append(previousState.messages, messages)
        }), () => sendChat(messages[0].text, this.handleCallback.bind(this)));
    }

    render() {
        return (
            <View style={{flex:1}}>
                <AnimatedButtonPress/>
                <GiftedChat
                    messages={this.state.messages}
                    onSend={(messages) => this.onSend(messages)}
                    user={{
                        _id: 1,
                    }}
                />
            </View>
        );
    }

}