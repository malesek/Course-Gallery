import { collection, query, getDocs, where, addDoc, updateDoc, doc } from "@firebase/firestore"
import { db } from "../../firebase/firebase";


const saveRating = (courseId : string | string[] | undefined, stars : number, uid : string | undefined) => {
    
    const dbQuery = async () => {
        const q = query(collection(db, `rating`), where("uid", "==", uid), where("courseId", "==", courseId));
        const ratingQuery = await getDocs(q);
        const rating = ratingQuery.docs.map(doc => ({ ...doc.data(), id: doc.id }));
        return rating;
    }
    const ratingData = dbQuery();

    ratingData.then(data => {
        console.log(data)
       if(data.length === 0){
        addDoc(collection(db, `rating`), {
            uid, courseId, stars
        });
       }
       else{
        const docRef = doc(db, `rating`, data[0].id);
        updateDoc(docRef, {
            stars
        })
       }
    })
}



export default saveRating