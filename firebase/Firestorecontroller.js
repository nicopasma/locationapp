import { auth, db, USERS_REF, LOCATIONS_REF } from './config'
import { addDoc, deleteDoc, collection, doc } from "firebase/firestore";

export function addAreaInfo(locationName, reviewText, stars){
    const subColRef = collection(db, USERS_REF, auth.currentUser.uid, LOCATIONS_REF);
    addDoc( subColRef, {locationName, reviewText, stars} )
        .catch(error => console.log(error.message))
}

export const removeLocation = async (locationId) => {
    const user = auth.currentUser;
    if (!user) {
        console.error("No authenticated user found.");
        return;
    }

    try {
        // Correct path for deleting a location under the user's sub-collection
        const locationRef = doc(db, USERS_REF, user.uid, LOCATIONS_REF, locationId);

        await deleteDoc(locationRef); // Delete the location from Firestore
        console.log("Location removed successfully!");
    } catch (error) {
        console.error("Error removing location: ", error);
    }
};