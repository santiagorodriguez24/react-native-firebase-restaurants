import React, { Component } from 'react';
import { Text, View, StyleSheet } from "react-native";

export default class RestaurantEmpty extends Component {
	render() {
		const { text } = this.props;
		return (
			<View style={styles.restaurantEmptyView}>
				<Text style={styles.restaurantEmptyText}>
					{text}
				</Text>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	restaurantEmptyView: {
		justifyContent: 'center',
		flex: 1,
		marginTop: 10,
		marginBottom: 10
	},
	restaurantEmptyText: {
		backgroundColor: 'rgba(10, 255, 10, 0.8)',
		color: 'white',
		textAlign: 'center',
		padding: 20
	}
});