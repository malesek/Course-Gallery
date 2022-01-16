import React from "react";
import styled from "styled-components";
import { collection, onSnapshot, DocumentData } from "firebase/firestore"
import {db} from "../firebase/firebase"
import { useEffect, useState } from 'react'
import { updateDoc, doc } from "@firebase/firestore";


const StyledCourse = styled.div`
    margin: 5px;
    border: 1px solid #777;
    float: left;
    width: 302px;
`;

const IMG = styled.img`
    max-width: 100%;
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
    border: 1px solid limegreen;
    border-radius: 20%;
    &:hover{
        background-color: limegreen;
    }
`;

const DenyButton = styled.h3`
    cursor: pointer;
    padding: 10px;
    border: 1px solid red;
    border-radius: 20%;
    &:hover{
        background-color: red;
    }
`;

const CourseDiv = styled.div`
display: flex;
flex-direction: column;
margin: auto;
`

const PhotosDiv = styled.div`
display: flex;
flex-direction: row;
`

const Desc = styled.div`
    text-align: center;
    &:last-child{
        margin-bottom: 3%;
    }
`;

const ValidatePhoto: React.FC = () => {

    const [gckhData, setGckhData] = useState<DocumentData>([]);
    const [gchkData, setGchkData] = useState<DocumentData>([]);
    const [grlbData, setGrlbData] = useState<DocumentData>([]);
    const [qpgcmData, setQpgcmData] = useState<DocumentData>([]);

    useEffect(
        () => {
            onSnapshot(collection(db, `gckh`), (snap) => {
                const images = snap.docs.map(doc => ({...doc.data(), id:doc.id}))
                setGckhData(images)
            })
            onSnapshot(collection(db, `gchk`), (snap) => {
                const images = snap.docs.map(doc => ({...doc.data(), id:doc.id}))
                setGchkData(images)
            })
            onSnapshot(collection(db, `grlb`), (snap) => {
                const images = snap.docs.map(doc => ({...doc.data(), id:doc.id}))
                setGrlbData(images)
            })
            onSnapshot(collection(db, `qpgcm`), (snap) => {
                const images = snap.docs.map(doc => ({...doc.data(), id:doc.id}))
                setQpgcmData(images)
            }), []
        })


    return (
        <>
        <CourseDiv>
        <h1>Golf Resort Kunětická Hora</h1>
        <PhotosDiv>
        {gckhData.map((image: DocumentData) => (
            <>
            {!image.validate && !image.nonusable ?
                (
                    <StyledCourse>
                        <IMG src={image.url} alt={image.id}/>
                        <Desc>{image.photoDesc}</Desc>
                        <Buttons>
                            <AcceptButton
                            onClick={() =>
                                updateDoc(doc(db, `gckh`, image.id), {
                                    validate: true
                                })
                            }>
                                Povolit
                            </AcceptButton>
                            <DenyButton
                            onClick={() =>
                                updateDoc(doc(db, `gckh`, image.id), {
                                    nonusable: true
                                })
                            }>
                                Zakázat
                            </DenyButton>
                        </Buttons>
                    </StyledCourse>
                ) : (<></>)
            }
            </>
        ))}
        </PhotosDiv>
        </CourseDiv>
        <CourseDiv>
        <h1>Park Golf Hradec Králové</h1>
        <PhotosDiv>
        {gchkData.map((image: DocumentData) => (
            <>
            {!image.validate && !image.nonusable ?
                (
                    <StyledCourse>
                        <IMG src={image.url} alt={image.id}/>
                        <Desc>{image.photoDesc}</Desc>
                        <Buttons>
                            <AcceptButton
                            onClick={() =>
                                updateDoc(doc(db, `gchk`, image.id), {
                                    validate: true
                                })
                            }>
                                Povolit
                            </AcceptButton>
                            <DenyButton
                            onClick={() =>
                                updateDoc(doc(db, `gchk`, image.id), {
                                    nonusable: true
                                })
                            }>
                                Zakázat
                            </DenyButton>
                        </Buttons>
                    </StyledCourse>
                ) : (<></>)
            }
            </>
        ))}
        </PhotosDiv>
        </CourseDiv>
        <CourseDiv>
        <h1>Golf Resort Lázně Bohdaneč</h1>
        {grlbData.map((image: DocumentData) => (
            <>
            {!image.validate && !image.nonusable ?
                (
                    <StyledCourse>
                        <IMG src={image.url} alt={image.id}/>
                        <Desc>{image.photoDesc}</Desc>
                        <Buttons>
                            <AcceptButton
                            onClick={() =>
                                updateDoc(doc(db, `grlb`, image.id), {
                                    validate: true
                                })
                            }>
                                Povolit
                            </AcceptButton>
                            <DenyButton
                            onClick={() =>
                                updateDoc(doc(db, `grlb`, image.id), {
                                    nonusable: true
                                })
                            }>
                                Zakázat
                            </DenyButton>
                        </Buttons>
                    </StyledCourse>
                ) : (<></>)
            }
            </>
        ))}
        </CourseDiv>
        <CourseDiv>
        <h1>Queens Park Golf Club Myštěves</h1>
        {qpgcmData.map((image: DocumentData) => (
            <>
            {!image.validate && !image.nonusable ?
                (
                    <StyledCourse>
                        <IMG src={image.url} alt={image.id}/>
                        <Desc>{image.photoDesc}</Desc>
                        <Buttons>
                        <AcceptButton
                            onClick={() =>
                                updateDoc(doc(db, `qpgcm`, image.id), {
                                    validate: true
                                })
                            }>
                                Povolit
                            </AcceptButton>
                            <DenyButton
                            onClick={() =>
                                updateDoc(doc(db, `qpgcm`, image.id), {
                                    nonusable: true
                                })
                            }>
                                Zakázat
                            </DenyButton>
                        </Buttons>
                    </StyledCourse>
                ) : (<></>)
            }
            </>
        ))}
        </CourseDiv>
        </>
    );
};

export default ValidatePhoto;