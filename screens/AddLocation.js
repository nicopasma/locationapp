import { useState } from 'react';
import { StyleSheet, View, TextInput, Alert } from 'react-native';
import { Button } from 'react-native-paper';
import StarRating from 'react-native-star-rating-widget';
import { db, auth, LOCATIONS_REF } from '../firebase/config';
import { collection, addDoc } from 'firebase/firestore';

export function AddLocation({ navigation }) {
    return (
        <View>
            <Form navigation={navigation} />
        </View>
    );
}

function Form({ navigation }) {
    const [locationName, setLocationName] = useState('');
    const [reviewText, setReviewText] = useState('');
    const [stars, setStars] = useState(0);

    const handleAddLocation = async () => {
        const user = auth.currentUser;
        if (!user) {
            Alert.alert("Error", "You must be logged in to add locations.");
            return;
        }

        if (!locationName.trim()) {
            Alert.alert("Error", "Location name cannot be empty!");
            return;
        }

        try {
            // Tallennetaan uusi sijainti Firestoreen
            await addDoc(collection(db, `users/${user.uid}/${LOCATIONS_REF}`), {
                name: locationName,
                review: reviewText,
                stars: stars,
                timestamp: new Date().toISOString(),
            });

            Alert.alert("Success", "Location added successfully!");
            navigation.navigate('My locations'); // Navigoi takaisin listaan
        } catch (error) {
            console.error("Error adding location: ", error);
            Alert.alert("Error", "Could not add location. Please try again.");
        }
    };

    return (
        <View style={styles.list}>
            <TextInput
                style={styles.input}
                onChangeText={setLocationName}
                value={locationName}
                placeholder="Location name"
            />
            <TextInput
                style={[styles.input, styles.reviewInput]}
                onChangeText={setReviewText}
                value={reviewText}
                placeholder="Write your review"
                multiline
            />
            <StarRating rating={stars} onChange={setStars} />
            <Button
                style={styles.button}
                mode="contained"
                onPress={handleAddLocation}
            >
                Add
            </Button>
        </View>
    );
}

const styles = StyleSheet.create({
    list: {
        padding: 20,
        gap: 10,
        height: '100%',
        backgroundColor: '#fff',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 5,
    },
    reviewInput: {
        height: 80,
        textAlignVertical: 'top',
    },
    button: {
        backgroundColor: '#000',
        marginTop: 10,
    },
});
