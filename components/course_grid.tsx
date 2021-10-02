import Link from "next/link";
import React from "react";
import styled from "styled-components";
import { collection, onSnapshot, DocumentData } from "firebase/firestore"
import db from "../firebase/firebase"
import { useEffect, useState } from 'react'

type CourseProps = {
    id: string;
    name: string;
    place: string;
    holes: number;
    img: string;
}

const StyledCourse = styled.div`
    margin: 5px;
    border: 1px solid #ccc;
    float: left;
    width: 300px;
    cursor: pointer;
    &:hover {
        border: 1px solid #777;
    }
`;
const H1 = styled.h1`
    font-size: 20px;
    text-align: center;
`;
const Desc = styled.div`
    text-align: center;
    &:last-child{
        margin-bottom: 3%;
    }
`;

const IMG = styled.img`
    width: 290px;
    height: 150px;
    margin: 5px;
    padding: 0;
`

const Course: React.FC = ()=>{

    const [data, setData] = useState<DocumentData>([]);

    useEffect(
    () => {
      onSnapshot(collection(db, "courses"), (snap) => {
        setData(snap.docs.map(doc => doc.data()));
      }), []
    }
      
    )

    return (
        data.map((course : DocumentData) => (
            <StyledCourse>
                <IMG src={course.img} alt="v"/>
                <H1>{course.name}</H1>
                <Desc>{course.place}</Desc>
                <Desc>{course.holes} jamek</Desc>
            </StyledCourse>
        ))
    );
};

export default Course;