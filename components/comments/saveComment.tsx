import { addDoc, collection } from "@firebase/firestore";
import { db } from "../../firebase/firebase";

const saveComment = (uid: string | undefined, name: string | null | undefined, comment: string, courseId: string | string[]) => {
    addDoc(collection(db, `comments`), {
        uid, name, comment, courseId
    });
}

export default saveComment;