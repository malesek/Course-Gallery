import React from "react";
import styled from "styled-components";
import { collection, onSnapshot, DocumentData } from "firebase/firestore"
import {db} from "../firebase/firebase"
import { useEffect, useState } from 'react'


const StyledCourse = styled.div`
    margin: 5px;
    border: 1px solid #777;
    float: left;
    width: 302px;
`;

const IMG = styled.img`
    width: 290px;
    height: 150px;
    margin: 5px 5px 0 5px
`;

const Buttons = styled.div`
display: flex;
flex-direction: row;
justify-content: space-around;
margin: auto;
`;

const AcceptButton = styled.h3`
    cursor: pointer;
    padding: 10px;
    &:hover{
        background-color: limegreen;
    }
`;

const DenyButton = styled.h3`
    cursor: pointer;
    padding: 10px;
    &:hover{
        background-color: red;
    }
`;

const ValidatePhoto: React.FC = () => {

    const [data, setData] = useState<DocumentData>([]);

    useEffect(
        () => {
            onSnapshot(collection(db, `gckh`), (snap) => {
                const images = snap.docs.map(doc => ({...doc.data(), id:doc.id}))
                setData(images)
            })
            onSnapshot(collection(db, `gchk`), (snap) => {
                const images = snap.docs.map(doc => ({...doc.data(), id:doc.id}))
                setData(images)
            })
            onSnapshot(collection(db, `grlb`), (snap) => {
                const images = snap.docs.map(doc => ({...doc.data(), id:doc.id}))
                setData(images)
            }), []
        })


    return (
        <>
        <h1>Golf Resort Kunětická Hora</h1>
        {data.map((image: DocumentData) => (
            <>
            {!image.validate && 
                (
                    <StyledCourse>
                        <IMG src={image.url} alt={image.id}/>
                        <Buttons>
                            <AcceptButton>Povolit</AcceptButton>
                            <DenyButton>Zakázat</DenyButton>
                        </Buttons>
                    </StyledCourse>
                )
            }
            </>
        ))}
        </>
    );
};

export default ValidatePhoto;