import { StyleSheet, View } from "react-native";
import { Chip, IconButton, Text, Button } from "react-native-paper";
import { removeLocation } from "../firebase/Firestorecontroller";

export default function LocationItem({ locationItem }) {
    if (!locationItem) return null;

    return (
        <View style={styles.locationItem}>
            <Button style={styles.chip}>{locationItem.name || "No name"}</Button>
            <Text style={styles.chip}>{locationItem.review || "No name"}</Text>
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
        gap: 10,
        marginVertical: 5,
        padding: 10,
        borderBottomWidth: 1,
        borderColor: '#ddd',
    },
    chip: {
        flex: 1,
    },
});
