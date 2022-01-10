import Link from "next/link";
import React from "react";
import styled from "styled-components";
import { collection, onSnapshot, DocumentData } from "firebase/firestore"
import {db} from "../firebase/firebase"
import { useEffect, useState } from 'react'
import Map from "./map";


const StyledCourse = styled.div`
    margin: 5px;
    border: 1px solid #ccc;
    float: left;
    width: 302px;
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
    margin: 5px 5px 0 5px
`

const Filters = styled.div`
    display:flex;
    justify-content:space-around;
    margin: 10px auto 10px auto;
`

const Mapa = styled(Map)`
    float:left;
`

const List = styled.div`
    margin: 20px;

`

const Courses: React.FC = () => {

    const [data, setData] = useState<DocumentData>([]);
    const [searchCourse, setSearchCourse] = useState("");
    const [regionFilter, setRegionFilter] = useState<string>("");

    useEffect(
        () => {
            onSnapshot(collection(db, "courses"), (snap) => {
                setData(snap.docs.map(doc => ({ ...doc.data(), id: doc.id })));
            }), []
        })

    return (
        <>
            <Filters>
                <div>
                    <input type="text" placeholder="Hledat" onChange={(event) => { setSearchCourse(event.target.value) }} />
                </div>
                <div>
                    <select onChange={(event: any) => { setRegionFilter(event.target.value) }}>
                        <option value={""}></option>
                        <option value={"Královehradecký kraj"}>Královehradecký kraj</option>
                        <option value={"Pardubický kraj"}>Pardubický kraj</option>
                    </select>
                    <button onClick={() => {
                        setRegionFilter("");
                    }}>Vymazat filtr</button>
                </div>
            </Filters>
            <List>
                <Mapa />
                <div>
                    {data.filter((value: any) => {
                        if (searchCourse == "") return value
                        else if (value.name.toLowerCase().includes(searchCourse.toLowerCase())) return value
                    }).map((course: DocumentData) => (
                        <>
                            {regionFilter == course.region || regionFilter == "" ? (
                                <Link href="/[course]" as={`/${course.id}`}>
                                    <StyledCourse>
                                        <IMG src={course.img} alt={course.name} />
                                        <H1>{course.name}</H1>
                                        <Desc>{course.place}</Desc>
                                        <Desc>{course.holes} jamek</Desc>
                                    </StyledCourse>
                                </Link>) : (<></>)}
                        </>
                    ))}
                </div>
            </List>
        </>
    );
};

export default Courses;