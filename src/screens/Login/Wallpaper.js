import React, { Component } from 'react';


import {
    StyleSheet,
    Image,
	View
} from 'react-native';

import bgSrc from '../../../img/login/wallpaper.png';
import {DEFAULT_BACKGROUND_COLOR} from "../../constants";

export default class Wallpaper extends Component {
	render() {
		return (
			<View style={styles.myStyle}>{this.props.children}</View>
			// <Image style={styles.picture} source={bgSrc}>
			//	{this.props.children}
			// </Image>
		);
	}
}

const styles = StyleSheet.create({
	picture: {
		flex: 1,
		width: null,
		height: null,
		resizeMode: 'cover',
	},
	myStyle:{
		flex:1
	}

});
