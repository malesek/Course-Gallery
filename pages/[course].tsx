import { collection, DocumentData, onSnapshot } from "firebase/firestore";
import { doc, QueryDocumentSnapshot } from "@firebase/firestore";
import { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import { useEffect, useState, ReactNode } from "react";
import { db } from "../firebase/firebase";

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
        <h1>{data.id}</h1>
        <p>{data.desc}</p>
      </>
    )
}

SingleCourse.getInitialProps = ({query: route}) => {
  return route as Props
}

export default SingleCourse;