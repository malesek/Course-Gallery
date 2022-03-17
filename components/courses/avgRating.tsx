import React from "react";
import { collection, getDocs, query, DocumentData, where} from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { useEffect, useState } from 'react';
import styled from "styled-components";
import {FaStar} from "react-icons/fa";

const Stars = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
`

const Star = styled(FaStar)`
    font-size: 20px;
    margin: 5px 0 10px 0;
`

type Props = {
    courseId: string
}

const AvgRating: React.FC<Props> = ({courseId}) => {

    const [starsData, setStarsData] = useState<DocumentData>();

    useEffect(() => {
        dbQuery()
        return () => {setStarsData([])}
    }, [])

    const dbQuery = async () => {
        const q = query(collection(db, `rating`), where("courseId", "==", courseId));
        const querySnapshot = await getDocs(q);
        const rate = querySnapshot.docs.map(doc => ({ ...doc.data()}));
        setStarsData(rate)
    }

    const sumAll = () => {
        if(starsData){
            return starsData?.map((star: DocumentData) => star.stars).reduce((prev:number, curr:number) => prev + curr, 0)
        }
    }

    const starsLength = () => {
        if(starsData) return starsData.length
    }

    return(
        <>
            <Stars>
            {[...Array(5)].map((_, index) => {
            return(
            <Star 
            key={index}
            color={(sumAll() / starsLength()) > index ? "#fbff00" : "#A9A9A9"}
            />)
            })}
        </Stars>
        </>
    )
}

export default AvgRating