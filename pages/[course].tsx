import { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import { useEffect, useState, ReactNode } from "react";
import TopBar from "../components/topbar";
import ImageSlider from "../components/ImageSlider";
import SingleCourse from "../components/singleCourse"
import Rating from "../components/rating/rating";
import { useAuth } from "../components/login";
import Comments from "../components/comments/Comments";

type Props={
  route: ReactNode;
}

const Course: NextPage<Props> = () => {
  const router = useRouter();
  const [courseId, setCourseId] = useState<string | string[] | undefined>();
  const {user} = useAuth();
  useEffect(
    () => {
      setCourseId(router.query.course)
        , [router]
    })
  return (
    <>
      <TopBar />
      <SingleCourse courseId={courseId}/>
      {courseId && <Comments courseId={courseId}/>}
      {user && <Rating courseId={courseId}/>}
      <ImageSlider courseId={courseId} />
    </>
  )
}

Course.getInitialProps = ({query: route}) => {
  return route as Props
}

export default Course;