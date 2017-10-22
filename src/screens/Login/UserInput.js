import React, { Component } from 'react';

import {
	StyleSheet,
	View,
	TextInput,
	Image,
} from 'react-native';
import { YELLOW_COLOR} from "../../constants";

export default class UserInput extends Component {
	render() {
		return (
			<View style={styles.inputWrapper}>
				<Image source={this.props.source}
					style={styles.inlineImg} />
				<TextInput style={styles.input}
					placeholder={this.props.placeholder}
					secureTextEntry={this.props.secureTextEntry}
					autoCorrect={this.props.autoCorrect}
					autoCapitalize={this.props.autoCapitalize}
					returnKeyType={this.props.returnKeyType}
					placeholderTextColor={YELLOW_COLOR}
					underlineColorAndroid='transparent' />
			</View>
		);
	}
}

const styles = StyleSheet.create({
	input: {
		backgroundColor: 'rgba(253, 166, 0, 0.2)',
		height: 60,
		marginHorizontal: 20,
		paddingLeft: 45,
		borderRadius: 3,
		color: YELLOW_COLOR,
		fontSize: 15,
	},
	inputWrapper: {

	},
	inlineImg: {
		position: 'absolute',
		zIndex: 99,
		width: 22,
		height: 22,
		left: 35,
		top: 17,
	},
});
