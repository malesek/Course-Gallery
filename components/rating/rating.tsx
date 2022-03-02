import { useState } from "react";
import {FaStar} from "react-icons/fa"
import saveRating from "./saveRating";
import { useAuth } from "../login"
import { useEffect } from "react";
import {query, collection, where, getDocs} from "firebase/firestore"
import {db} from "../../firebase/firebase"
import styled from "styled-components";

type Props = {
    courseId: string | string[] | undefined
}

const Star = styled(FaStar)`
    font-size: 20px;
    margin-top: 48px;
`

const Rating: React.FC<Props> = ({courseId}) => {  
    const {user} = useAuth();
    const [stars, setStars] = useState(0);
    const [hoverStars, setHoverStars] = useState(0);

    useEffect(() => {
        if(user && courseId){
            dbQuery()
            return () => {dbQuery()}
        }
    },[])

    const dbQuery = async () => {
        const q = query(collection(db, `rating`), where("courseId", "==", courseId), where("uid", "==", user?.uid));
        const querySnapshot = await getDocs(q);
        const rate = querySnapshot.docs.map(doc => ({ ...doc.data()}));
        if(rate[0]){
            setStars(rate[0].stars)
        }
    }

    const clickStars = (value : number) => {
        setStars(value);
        saveRating(courseId, value, user?.uid);
    };

    return(
        <>
        {[...Array(5)].map((_, index) => {
            return(
            <Star 
            key={index}
            color={(stars || hoverStars) > index ? "#fbff00" : "#A9A9A9"}
            onClick={() => clickStars(index+1)}
            onMouseOver={() => setHoverStars(index + 1)}
            onMouseLeave={() => setHoverStars(0)}
            />)
        })}
        </>
    )
}

export default Rating;