import styled from "styled-components"
import { useEffect, useState } from "react"
import { onSnapshot, collection, DocumentData } from "@firebase/firestore"
import { db } from "../firebase/firebase"
import Rating from "../components/rating/rating";
import { useAuth } from "../components/login";

const H1 = styled.h1`
text-align: center;
font-weight: 900;
font-family: 'Open Sans', sans-serif;
font-size: 42px;
margin: 28px 0 28px 0;
`

const Info = styled.div`
font-family: 'Open Sans', sans-serif;
font-weight: 600;
margin: 10px 10% 10px 10%;
font-size: 20px;
`

const Left = styled.div`
  width: 70%;
  float: left;
  margin-bottom: 5px;
`
const Right = styled.div`
  float: left;
  width: 30%;
  margin-bottom: 5px;
`
const Top = styled.div`
    overflow: hidden;
`

const Bottom = styled.div`
    
`

type Props = {
    courseId: string | string[] | undefined
}


const SingleCourse: React.FC<Props> = ({ courseId }) => {

    const [course, setCourse] = useState<DocumentData>([]);
    const { user } = useAuth();

    useEffect(() => {
        const unsub = onSnapshot(collection(db, `courses`), (snap) => {
            const courses = snap.docs.map(doc => ({ ...doc.data(), id: doc.id }))
            const oneCourse = courses.find(x => x.id === courseId)
            setCourse(oneCourse);
        })
        return () => unsub()
    })

    return (
        <>
            {course &&
                <>
                    <Top>
                        <Left>
                            <H1>{course.name}</H1>
                        </Left>
                        <Right>
                            {user && courseId && <Rating courseId={courseId} />}
                        </Right>
                    </Top>
                    <Bottom>
                        <Info>{course.desc}</Info>
                    </Bottom>
                </>
            }
        </>
    )
}

export default SingleCourse