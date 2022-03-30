import { DocumentData, query, collection, where, getDocs, onSnapshot } from "firebase/firestore";
import React from "react";
import { useState, useEffect } from "react";
import WriteComment from "./writeComment";
import {db} from "../../firebase/firebase";
import { useAuth } from "../login";
import styled from "styled-components"
import { FaTrashAlt } from "react-icons/fa";
import deleteComment from "./deleteComment";

const CommsDiv = styled.div`
    margin-top: 28px;
    @media only screen and (max-width:768px) {
        max-width: 98%;
        margin: auto;
    }
`

const Comm = styled.div`
    position: relative;
`

const Line = styled.hr`
    color: #000555;
    background-color: #000555;
    width: 100%;
    height: 2px;
    border: none;
    border-radius: 5px;
`

const Trash = styled(FaTrashAlt)`
    position: absolute;
    top: 0;
    right: 0;
    &:hover{
        cursor: pointer;
    }
`


type Props = {
    courseId: string | string[]
}

const admin1 = "AxKCMrGftgM1uYueydTRgwqHmv83";
const admin2 = "2bbacSDMZYSipFyzF9dafvn7lTH2";
const admin3 = "VX9KU5amxJdKnFud5TPIdv9hjbg1";

const Comments: React.FC<Props> = ({ courseId }) => {

    const [comms, setComms] = useState<DocumentData>([]);
    const { user } = useAuth();
    const q = query(collection(db, `comments`), where("courseId", "==", courseId));

    const now = Date.now();
    const oneDay = 24 * 60 * 60 * 1000;

    useEffect(() => {
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const comments = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
            setComms(comments)
        })
        return () => {setComms([])}
    }, [])

    return (
        <CommsDiv>
            {user && <WriteComment courseId={courseId} />}
            {comms.map((comment: DocumentData) => {
                const createdAt = comment.created.toMillis();
                return (
                    <Comm key={comment.comment}>
                        <h4>{comment.name}</h4>
                        <p>{comment.comment}</p>
                        {user?.uid == admin1 || user?.uid == admin2 || user?.uid == admin3 || (user?.uid == comment.uid && (now - createdAt) < oneDay) ?(
                            <Trash
                                onClick={() => deleteComment(comment.id)}
                            />) : (<></>)
                        }
                        <Line />
                    </Comm>)
            })}
        </CommsDiv>
    )
}

export default Comments;