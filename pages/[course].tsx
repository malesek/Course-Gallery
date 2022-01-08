import { collection, DocumentData, onSnapshot } from "firebase/firestore";
import { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import { useEffect, useState, ReactNode } from "react";
import { db } from "../firebase/firebase";
import TopBar from "../components/topbar";
import styled from "styled-components"
import ImageSlider from "../components/ImageSlider";
import SingleCourse from "../components/singleCourse"

type Props={
  route: ReactNode;
}

const Course: NextPage<Props> = () => {
  const router = useRouter();
  const [courseId, setCourseId] = useState<string | string[] | undefined>();

  useEffect(
    () => {
      setCourseId(router.query.course)
        , [router]
    })
  return (
    <>
      <TopBar />
      <SingleCourse courseId={courseId}/>
      <ImageSlider courseId={courseId} />
    </>
  )
}

Course.getInitialProps = ({query: route}) => {
  return route as Props
}

export default Course;