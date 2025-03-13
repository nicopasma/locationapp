import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Chip, IconButton, Text } from "react-native-paper";
import { removeLocation } from "../firebase/Firestorecontroller";

export default function LocationItem({ locationItem, navigation }) {
    if (!locationItem) return null; // Ensure the locationItem is not undefined

    const handlePress = () => {
        // Navigate to the "Map" screen and pass the coordinates
        navigation.navigate('Map', {
            latitude: locationItem.latitude,  // Assuming you have latitude in your locationItem
            longitude: locationItem.longitude // Assuming you have longitude in your locationItem
        });
    };

    return (
        <View style={styles.locationItem}>
            <Chip style={styles.chip} onPress={handlePress}>
                {locationItem.name || "No name"}
            </Chip>
            <Text>{locationItem.review}</Text>
            <Text>{locationItem.stars ? `${locationItem.stars} ⭐` : "No rating"}</Text>
            <IconButton 
                icon="trash-can" 
                iconColor="black"
                onPress={() => removeLocation(locationItem.id)}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    locationItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        marginVertical: 5
    },
    chip: {
        flex: 1,
    }
});
