import styled from "styled-components"
import { useEffect, useState } from "react"
import { DocumentData, doc, getDoc } from "@firebase/firestore"
import { db } from "../firebase/firebase"
import Rating from "../components/rating/rating";
import { useAuth } from "../components/login";
import Weather from "../components/weather"

const H1 = styled.h1`
text-align: center;
font-weight: 900;
font-family: 'Open Sans', sans-serif;
font-size: 42px;
margin: 28px 2% 28px 2%;
@media only screen and (max-width:480px) {
    margin: 28px auto 14px auto;
  }
`

const Info = styled.div`
font-family: 'Open Sans', sans-serif;
font-weight: 600;
margin: 10px 2% 10px 2%;
font-size: 20px;
text-align:justify;
@media only screen and (max-width:480px) {
    margin: 10px 5% 10px 5%;
  }
`

const Left = styled.div`
  width: 70%;
  float: left;
  margin-bottom: 5px;
  @media only screen and (max-width:480px) {
      float: unset;
      width: 100%;
  }
`
const Right = styled.div`
  float: left;
  width: 30%;
  margin-bottom: 5px;
  @media only screen and (max-width:480px) {
      float: unset;
      width: 100%;
  }
`
const Top = styled.div`
    overflow: hidden;
`

const Bottom = styled.div``

const StWeather = styled.div`
    margin: auto 2% auto 2%;
`

type Props = {
    courseId: string | string[] | undefined
}


const SingleCourse: React.FC<Props> = ({ courseId }) => {

    const [course, setCourse] = useState<DocumentData>();
    const { user } = useAuth();

    useEffect(() => {
        dbQuery()
    }, [courseId])

    const dbQuery = async () => {
        const docRef = doc(db, 'courses', `${courseId}`)
        const docSnap = await getDoc(docRef)
        setCourse(docSnap.data())
    }

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
                        <StWeather>
                        {courseId && <Weather lat={course.lat} lng={course.lng} name={course.place}/>}
                        </StWeather>
                    </Bottom>
                </>
            }
        </>
    )
}

export default SingleCourse