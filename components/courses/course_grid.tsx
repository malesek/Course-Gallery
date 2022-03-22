import Link from "next/link";
import React from "react";
import styled from "styled-components";
import { collection, onSnapshot, DocumentData, getDocs, doc, query} from "firebase/firestore"
import { db } from "../../firebase/firebase"
import { useEffect, useState } from 'react'
import Map from "./map";
import { useAuth } from "../login";
import Favourites from "./favourites";
import AvgRating from "./avgRating";


const StyledCourse = styled.div`
    margin: 5px;
    border: 1px solid #000555;
    float: left;
    width: 320px;
    cursor: pointer;
    border-radius: 10px; 
    padding: 0;
    &:hover {
        border: 1px solid #000666;
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
    max-width: 98%;
    height: 150px;
    display: block;
    margin: 1% auto 0 auto;
    border-radius: 10px;
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
    @media only screen and (max-width:1670px) {
        display:block;
    }
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
    const [favourites, setFavourites] = useState<DocumentData>();
    const [favData, setFavData] = useState<DocumentData>();
    const [favFilter, setFavFilter] = useState(true);
    const {user} = useAuth();
    const uid = user?.uid;

    useEffect(
        () => {
            const unsub = onSnapshot(collection(db, "courses"), (snap) => {
                setData(snap.docs.map(doc => ({ ...doc.data(), id: doc.id })));
                setFavData(snap.docs.map(doc => ({ ...doc.data(), id: doc.id })));
            })
            if(uid){
                onSnapshot(doc(db, `favourites`, uid), (doc) => {
                    setFavourites(doc.data())
                })
            }

            return () => unsub()
        }, [uid]
    )
    
    
    const handleFilterClick = () => {
        if(favFilter) {
            setFavData(data.filter((x:DocumentData) => {if(x.id == favourites?.[x.id]) return x}));
            setFavFilter(false)
        }
        else {
            setFavData(data)
            setFavFilter(true)
        }
    }

    return (
        <>
            <Mapa>
                <Map />
            </Mapa>

            <Line />

            <Filters>
                <div>
                    <Input type="text" placeholder="Hledat" onChange={(event) => setSearchCourse(event.target.value)} />
                </div>
                <div>
                    <Button onClick={() => { handleFilterClick()}}>Oblíbené</Button>
                </div>
                <div>
                    <Select onChange={(event: any) => setRegionFilter(event.target.value)}>
                        <option value={""}></option>
                        <option value={"Královehradecký kraj"}>Královehradecký kraj</option>
                        <option value={"Pardubický kraj"}>Pardubický kraj</option>
                    </Select>
                    <Button onClick={() => setRegionFilter("")}>Vymazat filtr</Button>
                </div>
            </Filters>

            <Line />

            <List>
                {favData && favData.filter((value: any) => {
                    if (searchCourse == "") return value
                    else if (value.name.toLowerCase().includes(searchCourse.toLowerCase())) return value
                }).map((course: DocumentData) => (
                    <React.Fragment key={course.id}>
                        
                        {regionFilter == course.region || regionFilter == "" &&
                        
                            <StyledCourse>
                                
                                {user && <Favourites uid={user.uid} courseId={course.id}/>}
                                <Link href="/[course]" as={`/${course.id}`} key={course.id}>
                                    <div>
                                        <IMG src={course.img} alt={course.name} />
                                        <H1>{course.name}</H1>
                                        <Desc>{course.place}</Desc>
                                        <Desc>{course.holes} jamek</Desc>
                                        <AvgRating courseId={course.id}/>
                                    </div>
                                    </Link>
                            </StyledCourse>
                        }
                        
                    </React.Fragment>
                ))}
            </List>

        </>
    );
};

export default Courses;