import { auth, db, USERS_REF, AREAS_REF } from './config'
import { addDoc, deleteDoc, collection } from "firebase/firestore";

export function addAreaInfo(locationName, reviewText, stars){
    const subColRef = collection(db, USERS_REF, auth.currentUser.uid, LOCATIONS_REF);
    addDoc( subColRef, {locationName, reviewText, stars} )
        .catch(error => console.log(error.message))
}

export const removeLocation = async (locationId) => {
    try {
        await deleteDoc(doc(db, "locations", locationId)); // Adjust this path if needed
        console.log("Location removed successfully!");
    } catch (error) {
        console.error("Error removing location: ", error);
    }
};