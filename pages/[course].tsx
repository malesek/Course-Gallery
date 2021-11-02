import { collection, DocumentData, onSnapshot } from "firebase/firestore";
import { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import { useEffect, useState, ReactNode } from "react";
import { db, storage } from "../firebase/firebase";
import TopBar from "../components/topbar";
import { ref, uploadBytes } from "@firebase/storage";
import UploadForm from "../components/upload";

type Props={
  route: ReactNode;
}

const SingleCourse: NextPage<Props> = () => {
    const router = useRouter();
    const [data, setData] = useState<DocumentData>([]);

    useEffect(
    () => {
      const courseId = router.query.course
      onSnapshot(collection(db, "courses"), (snap) => {
      const courses = snap.docs.map(doc => ({...doc.data(), id:doc.id}))
      const oneCourse = courses.find(x => x.id === courseId)
      setData(oneCourse);
      }), [router]
    })
    return(
      <>
        <TopBar/>
        <h1>{data.id}</h1>
        <p>{data.desc}</p>
        <UploadForm/>
      </>
    )
}

SingleCourse.getInitialProps = ({query: route}) => {
  return route as Props
}

export default SingleCourse;