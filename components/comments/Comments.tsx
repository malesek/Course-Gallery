import { DocumentData, query, collection, where, getDocs } from "firebase/firestore";
import React from "react";
import { useState, useEffect } from "react";
import WriteComment from "./writeComment";
import {db} from "../../firebase/firebase";
import { useAuth } from "../login";
import styled from "styled-components"

const CommsDiv = styled.div`
    margin-top: 28px;
`

const Line = styled.hr`
    color: #000555;
    background-color: #000555;
    width: 100%;
    height: 2px;
    border: none;
    border-radius: 5px;
`

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

    return(
        <CommsDiv>
        {user && <WriteComment courseId={courseId}/>}
        {comms.map((comment: DocumentData) => {
            return(
            <React.Fragment key={comment.comment}>
            <h4>{comment.name}</h4>
            <p>{comment.comment}</p>
            <Line />
            </React.Fragment>)
        })}
        </CommsDiv>
    )
}

export default Comments;