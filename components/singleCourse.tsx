import styled from "styled-components"
import { useEffect, useState } from "react"
import { onSnapshot, collection, DocumentData } from "@firebase/firestore"
import { db } from "../firebase/firebase"

const H1 = styled.h1`
text-align: center;
font-family: 'Open Sans', sans-serif;
`

const Info = styled.p`
font-family: 'Open Sans', sans-serif;
font-weight: 400;
margin: 10px 10% 10px 10%;
`

type Props = {
    courseId: string | string[] | undefined
}


const SingleCourse: React.FC<Props> = ({ courseId }) => {

    const [data, setData] = useState<DocumentData>([]);

    useEffect(() => {
        onSnapshot(collection(db, `courses`), (snap) => {
            const courses = snap.docs.map(doc => ({ ...doc.data(), id: doc.id }))
            const oneCourse = courses.find(x => x.id === courseId)
            setData(oneCourse);
        })
    })

    return (
        <>
        {data &&
            <>
            <H1>{data.name}</H1>
            <Info>{data.desc}</Info>
            </>
        }
        </>
    )
}

export default SingleCourse