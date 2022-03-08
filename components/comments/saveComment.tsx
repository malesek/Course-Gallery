import { addDoc, collection } from "@firebase/firestore";
import { Timestamp } from "firebase/firestore";
import { db } from "../../firebase/firebase";

const saveComment = (uid: string | undefined, name: string | null | undefined, comment: string, courseId: string | string[], created: Timestamp) => {
    addDoc(collection(db, `comments`), {
        uid, name, comment, courseId, created
    });
}

export default saveComment;