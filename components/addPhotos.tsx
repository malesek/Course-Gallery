import React, { useEffect, useState } from "react";
import { db } from "../firebase/firebase";
import { collection, DocumentData, onSnapshot } from "firebase/firestore";
import saveStorage from "../components/storage";
import styled from "styled-components";
import Popup from "reactjs-popup";

    const Input = styled.input`
    width: 0.1px;
    height: 0.1px;
    position: absolute;
    `
    const Label = styled.label`
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
    display: flex;
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
    const MenuButton = styled.h2`
    font-size: 20px;
    cursor: pointer;
    color: #fffff0;
    padding: 3px;
    margin: auto 5px;

    &:hover{
        background-color: #000999;
    }
    `
    const Select = styled.select`
    display: flex;
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
    display: flex;
    color: black;
    white-space: pre;
    min-height: 20px;
    padding: 0px 2px 1px;
    `
    const Div = styled.div`
    background: #333999;
    width: 300px;
    padding: 20px;
    border-radius: 25px;
    `

const AddPhotos:React.FC = () => {
    const [data, setData] = useState<DocumentData>([]);
    const [courseName, setCourseName] = useState<string>("");
    const [file, setFile] = useState(null);

    useEffect(
        () => {
            onSnapshot(collection(db, "courses"), (snap) => {
                setData(snap.docs.map(doc => ({ ...doc.data(), id: doc.id })));
            }), []
        })

    const chosenCourse = (event: any) => {
        setCourseName(event.target.value)
    }

    const changeHandler = (x: any) => {
        const selected = x.target.files[0];
        const {name} = selected;
        console.log(name)
        if (selected) {
            setFile(selected);
        }
    }

    const useClick = (event: any) => {
        event.preventDefault()
        saveStorage(file, courseName)
    }

    return (
        <Popup trigger={<MenuButton>Přidat Fotky</MenuButton>} modal>
            <Div>
        <form onSubmit={useClick}>
            <Select onChange={chosenCourse}>
                {data.map((course: DocumentData) => (
                    <Option value={course.id} defaultValue={course.id} key={course.id}>{course.name}</Option>
                ))}
            </Select>
            
            <Input type="file" id="file" onChange={changeHandler} />
            <Label htmlFor="file">Vyberte Soubor</Label>
            
            <ButtonGradient>
                <Submit type="submit">Upload</Submit>
            </ButtonGradient>
        </form>
        </Div>
        </Popup>
    )
}

export default AddPhotos;