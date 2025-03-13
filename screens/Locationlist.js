import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet } from "react-native";
import { List, MD3LightTheme } from "react-native-paper";
import { db, auth, LOCATIONS_REF } from "../firebase/config";
import { collection, onSnapshot } from "firebase/firestore";
import LocationItem from "../components/LocationItems"; // Varmista, että importti on oikein!

export function LocationListScreen({ navigation }) {
    const [locations, setLocations] = useState([]);

    useEffect(() => {
        const user = auth.currentUser;
        if (!user) return;

        const locationsRef = collection(db, `users/${user.uid}/${LOCATIONS_REF}`);

        const unsubscribe = onSnapshot(locationsRef, (snapshot) => {
            const locationsArray = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));
            setLocations(locationsArray);
        });

        return () => unsubscribe(); // Poistetaan kuuntelija, kun komponentti unmounttaa
    }, []); // `[]` varmistaa, että effecti ajetaan vain kerran

    return (
        <ScrollView>
            <List.Accordion 
                style={styles.accordion} 
                titleStyle={styles.accordionTitle} 
                title={`Locations (${locations.length})`}
            >
                {locations.map((location) => (
                    <LocationItem key={location.id} locationItem={location} /> 
                ))}
            </List.Accordion>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    accordion: {
        borderBottomWidth: 1,
        borderColor: MD3LightTheme.colors.primary,
    },
    accordionTitle: {
        fontSize: 22,
    },
});
