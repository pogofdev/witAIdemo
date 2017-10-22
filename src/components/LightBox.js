import React from 'react';
import {StyleSheet, View, Text, Dimensions, Platform} from 'react-native';


class Lightbox extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={[styles.container, {backgroundColor: this.props.color, borderColor: this.props.color,}]}>
                <View style={{flex: 8}}>
                    <Text style={styles.title}>{this.props.title}</Text>
                    <Text style={styles.content}>{this.props.content}</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width - 10,
        height: Platform.OS === 'ios' ? 80 : 100,
        opacity: 0.9,
        padding: 16,
        borderWidth: 1,
        elevation: 1,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 20,
    },
    title: {
        fontSize: 17,
        fontWeight: '700',
        color: 'white'
    },
    content: {
        marginTop: 8,
        color: 'white'
    },
});

export default Lightbox;
