import React, { useEffect, useState } from "react";
import { db } from "../../firebase/firebase";
import { collection, DocumentData, onSnapshot } from "firebase/firestore";
import saveStorage from "./storage";
import styled from "styled-components";
import Popup from "reactjs-popup";
import { MenuButton } from "../topbar";

const Form = styled.form`
    display: flex;
    justify-content: center;
    flex-direction: column;
`
const FileInput = styled.input`
    width: 0.1px;
    height: 0.1px;
    position: absolute;
    `
const FileLabel = styled.label`
    position: relative;
    width: 90%;
    height: 50px;
    border-radius: 15px;
    background: linear-gradient(60deg, #000999, #000555);
    box-shadow: 0 4px 7px rgba(0, 0, 0, 0.6);
    margin: 10px auto;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-weight: bold;
    cursor: pointer;
    transition: transform .2s ease-out;
    `

const Submit = styled.button`
    font-family: inherit;
    font-weight: bold;
    border-radius: 13px;
    background: white;
    align-items: center;
    justify-content: center;
    color: #000555;
    font-weight: bold;
    font-size: 16px;
    cursor: pointer;
    transition: transform .2s ease-out;
    border: 0px;
    width: 100%;
    &:hover{
        background: linear-gradient(60deg, #000555, #000999);
        color: white
    }`

const ButtonGradient = styled.div`
    display:flex;
    margin: 10px auto;
    box-shadow: 0 4px 7px rgba(0, 0, 0, 0.6);
    border-radius: 15px;
    width: 90%;
    height: 50px;
    position: relative;
    padding: 1rem;
    background: linear-gradient(60deg, #000555, #000999);
    padding: 2px;
    `
const Select = styled.select`
    font-weight: bold;
    color: #fff;
    width: 90%;
    height: 35px;
    padding-left: 5px;
    border: none;
    position: relative;
    background: linear-gradient(60deg, #000555, #000999);
    border-radius: 15px;
    margin: auto;
    `;
const Option = styled.option`
    color: black;
    white-space: pre;
    min-height: 20px;
    padding: 0px 2px 1px;
    `
const Div = styled.div`
    background-color: #00ffff;
    width: 300px;
    padding: 20px;
    border-radius: 25px;
    border: 2px solid #000555;
    `
const FileName = styled.p`
    color: #fff;
    text-align: center;
    padding:0;
    margin:0;`
const TextInput = styled.input`
    margin:auto;
    text-align:center;
    margin-top: 10px;
    border-radius: 10px;
    border: 1px solid #000555;
    padding: 5px;
    width: 90%;
`

const AddPhotos: React.FC = () => {
    const [data, setData] = useState<DocumentData>([]);
    const [courseName, setCourseName] = useState<string>("gchk");
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState<string>("");
    const [photoDesc, setPhotoDesc] = useState<string>("");

    useEffect(
        () => {
            const unsub = onSnapshot(collection(db, "courses"), (snap) => {
                setData(snap.docs.map(doc => ({ ...doc.data(), id: doc.id })));
            })
            return () => unsub()
        }, [])

    const chosenCourse = (event: any) => {
        setCourseName(event.target.value)
    }

    const changeHandler = (x: any) => {
        const selected = x.target.files[0];
        const { name } = selected;
        setFileName(name);
        if (selected) {
            setFile(selected);
        }
    }

    const useClick = (event: any) => {
        event.preventDefault()
        saveStorage(file, courseName, photoDesc)
    }

    return (
        <Popup trigger={<MenuButton>Přidat Fotky</MenuButton>} modal>
            <Div>
                <Form onSubmit={useClick}>
                    <Select onChange={chosenCourse}>
                        {data.map((course: DocumentData) => (
                            <Option value={course.id} defaultValue={course.id} key={course.id}>{course.name}</Option>
                        ))}
                    </Select>

                    <FileInput type="file" id="file" onChange={changeHandler} accept="image/*"/>
                    <FileLabel htmlFor="file">Vyberte Soubor</FileLabel>
                    <FileName>{fileName}</FileName>

                    <TextInput type="text" onChange={(event) => setPhotoDesc(event.target.value)} />

                    <ButtonGradient>
                        <Submit type="submit">Upload</Submit>
                    </ButtonGradient>
                </Form>
            </Div>
        </Popup>
    )
}

export default AddPhotos;