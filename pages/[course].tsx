import { collection, DocumentData, onSnapshot } from "firebase/firestore";
import { doc, QueryDocumentSnapshot } from "@firebase/firestore";
import { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import { useEffect, useState } from "react";
import { db } from "../firebase/firebase";

const SingleCourse: NextPage = () => {
    const router = useRouter();
    const courseId = router.query.course;
    const [data, setData] = useState<DocumentData>([]);

    useEffect(
    () => {
      onSnapshot(collection(db, "courses"), (snap) => {
      const courses = snap.docs.map(doc => ({...doc.data(), id:doc.id}))
      const oneCourse = courses.find(x => x.id === courseId)
      setData(oneCourse);
      }), []
    })

    return(
      <>
        <h1>{data.id}</h1>
        <p>{data.desc}</p>
      </>
    )
}

export default SingleCourse;