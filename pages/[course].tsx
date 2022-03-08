import { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import { useEffect, useState, ReactNode } from "react";
import TopBar from "../components/topbar";
import ImageSlider from "../components/ImageSlider";
import SingleCourse from "../components/singleCourse"
import Comments from "../components/comments/Comments";
import styled from "styled-components"


const Left = styled.div`
  width: 70%;
  float: left;
  @media only screen and (max-width:1000px) {
      float: unset;
      width: 100%;
  }
  @media only screen and (min-width: 1001px) and (max-width:1300px) {
      width: 65%;
  }
`
const Right = styled.div`
  float: left;
  width: 28%;
  margin-left: 1%;
  @media only screen and (max-width:1000px) {
      float: unset;
      width: 98%;
      margin: auto 1% auto 1%;
  }
  @media only screen and (min-width: 1001px) and (max-width:1300px) {
      width: 33%;
  }
`
type Props = {
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
      <Left>
        <SingleCourse courseId={courseId} />
        <ImageSlider courseId={courseId} />
      </Left>
      
      <Right>
        {courseId && <Comments courseId={courseId} />}
      </Right>
    </>
  )
}

Course.getInitialProps = ({ query: route }) => {
  return route as Props
}

export default Course;