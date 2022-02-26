import { DocumentData, query, collection, where, getDocs } from "firebase/firestore";
import React from "react";
import { useState, useEffect } from "react";
import WriteComment from "./writeComment";
import {db} from "../../firebase/firebase";
import { useAuth } from "../login";

type Props = {
    courseId: string | string[]
}

const Comments: React.FC<Props> = ({courseId}) => {

    const [comms, setComms] = useState<DocumentData>([]);
    const {user} = useAuth();

    useEffect(() => {
        dbQuery()
    }, [])

    const dbQuery = async () => {
        const q = query(collection(db, `comments`), where("courseId", "==", courseId));
        const querySnapshot = await getDocs(q);
        const comments = querySnapshot.docs.map(doc => ({ ...doc.data()}));
        setComms(comments)
    }
    console.log(comms)
    return(
        <>
        {user && <WriteComment courseId={courseId}/>}
        {comms.map((comment: DocumentData) => {
            return(
            <>
            <h4>{comment.name}</h4>
            <p>{comment.comment}</p>
            </>)
        })}
        </>
    )
}

export default Comments;