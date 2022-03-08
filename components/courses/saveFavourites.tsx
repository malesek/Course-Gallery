import { getDoc, setDoc, updateDoc, doc } from "@firebase/firestore"
import { deleteField } from "firebase/firestore";
import { db } from "../../firebase/firebase";

const saveFavourites = (courseId: string, uid: string, star: boolean) => {
    const docRef = doc(db, `favourites`, uid);
    const dbQuery = async () => {
        const favouritesQuery = await getDoc(docRef);
        return favouritesQuery;
    }
    const favouritesData = dbQuery();

    favouritesData.then(data => {
       if(!data.exists() && star){
        setDoc(docRef, {
            [courseId]: courseId
        });
       }
       else if(data.exists() && star){
        updateDoc(docRef, {
            [courseId]: courseId
        })
       }
       else if(data.exists() && !star){
        updateDoc(docRef, {
            [courseId]: deleteField()
        })
       }
    })
}

export default saveFavourites