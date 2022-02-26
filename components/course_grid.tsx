import Link from "next/link";
import React from "react";
import styled from "styled-components";
import { collection, onSnapshot, DocumentData, Unsubscribe } from "firebase/firestore"
import { db } from "../firebase/firebase"
import { useEffect, useState } from 'react'
import Map from "./map";


const StyledCourse = styled.div`
    margin-right: 10px;
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
    margin: 5px 5px 0 5px;
`

const Filters = styled.div`
    display:flex;
    justify-content:space-around;
    margin: 10px auto 10px auto;
`

const Mapa = styled.div`
width: 100%;
display: flex;
justify-content: center;
margin: 10px auto 10px auto;
`;

const List = styled.div`
margin: 10px auto 10px auto;
width:80%;
padding:0;
display: flex;
justify-content: center;
`;

const Input = styled.input`
    border-radius: 10px;
    border: 1px solid #000555;
    padding: 5px;
`;

const Select = styled.select`
    border-radius: 10px;
    border: 1px solid #000555;
    margin-right: 5px;
    padding: 5px;
`

const Button = styled.button`
    border-radius: 10px;
    border: 1px solid #000555;
    padding: 5px;
    font-weight: 700;
`

const Line = styled.hr`
    color: #000555;
    background-color: #000555;
    text-align: center;
    width: 80%;
    height: 2px;
    border: none;
    border-radius: 5px;
`

const Courses: React.FC = () => {

    const [data, setData] = useState<DocumentData>([]);
    const [searchCourse, setSearchCourse] = useState("");
    const [regionFilter, setRegionFilter] = useState<string>("");

    useEffect(
        () => {
            const unsub = onSnapshot(collection(db, "courses"), (snap) => {
                setData(snap.docs.map(doc => ({ ...doc.data(), id: doc.id })));
            })
            return () => unsub()
        }, [])
    return (
        <>
            <Mapa>
                <Map />
            </Mapa>

            <Line />

            <Filters>
                <div>
                    <Input type="text" placeholder="Hledat" onChange={(event) => { setSearchCourse(event.target.value) }} />
                </div>
                <div>
                    <Select onChange={(event: any) => { setRegionFilter(event.target.value) }}>
                        <option value={""}></option>
                        <option value={"Královehradecký kraj"}>Královehradecký kraj</option>
                        <option value={"Pardubický kraj"}>Pardubický kraj</option>
                    </Select>
                    <Button onClick={() => {
                        setRegionFilter("");
                    }}>Vymazat filtr</Button>
                </div>
            </Filters>

            <Line />


            <List>
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
            </List>

        </>
    );
};

export default Courses;