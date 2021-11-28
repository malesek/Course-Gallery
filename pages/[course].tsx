import { collection, DocumentData, onSnapshot } from "firebase/firestore";
import { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import { useEffect, useState, ReactNode } from "react";
import { db } from "../firebase/firebase";
import TopBar from "../components/topbar";
import UploadForm from "../components/upload";
import styled from "styled-components"
import Head from "next/head"
import {useAuth} from "../components/login"

type Props={
  route: ReactNode;
}

const H1 = styled.h1`
text-align: center;
font-family: 'Open Sans', sans-serif;
`
const Font = styled.div`
font-family: 'Open Sans', sans-serif;
`;
const Info = styled.p`
font-family: 'Open Sans', sans-serif;
font-weight: 400;
margin: 10px 10% 10px 10%;
`
const SingleCourse: NextPage<Props> = () => {
    const router = useRouter();
    const [data, setData] = useState<DocumentData>([]);
    const [imgData, setImgData] = useState<DocumentData>([]);
    const {user} = useAuth();
    useEffect(
    () => {
      const courseId = router.query.course
      onSnapshot(collection(db, "courses"), (snap) => {
      const courses = snap.docs.map(doc => ({...doc.data(), id:doc.id}))
      const oneCourse = courses.find(x => x.id === courseId)
      setData(oneCourse);
      })
      onSnapshot(collection(db, `${courseId}`), (snap) => {
        const images = snap.docs.map(doc => ({...doc.data(), id:doc.id}))
        setImgData(images)
      })
      , [router]
    })
    return(
      <Font>
        <Head>
          <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300&display=swap" rel="stylesheet"/>
        </Head>
        <TopBar/>
        <H1>{data.name}</H1>
        <Info>{data.desc}</Info>
        {imgData.map((image: DocumentData) => (
            <img src={image.url} alt={image.url} width="20%"/>
        ))}
      </Font>
    )
}

SingleCourse.getInitialProps = ({query: route}) => {
  return route as Props
}

export default SingleCourse;