import { db } from "../../firebase/firebase";
import { doc, deleteDoc } from "firebase/firestore";
const deleteComment = (id : any) => {
    deleteDoc(doc(db, "comments", id))
}

export default deleteComment;