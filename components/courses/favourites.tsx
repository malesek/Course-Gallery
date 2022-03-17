import styled from "styled-components"
import {FaStar} from "react-icons/fa"
import saveFavourites from "./saveFavourites";
import { useEffect, useState } from "react";
import { DocumentData, getDoc, doc} from "firebase/firestore"
import { db } from "../../firebase/firebase";

const Star = styled(FaStar)`
    font-size: 20px;
    @media only screen and (max-width:480px) {
    }
`

type Props = {
    uid: string, 
    courseId: any
}

const Favourites: React.FC<Props> = ({uid, courseId}) => {
    const [favourites, setFavourites] = useState<DocumentData>();

    useEffect(
        () => {
            dbQuery()
            return() => {setFavourites([])}
        }, []
    )

    const dbQuery = async () => {
        const favouritesQuery = await getDoc(doc(db, `favourites`, uid));
        setFavourites(favouritesQuery.data());
    }

    const handleStarClick = (course_id:string, star: boolean) => {
        saveFavourites(course_id, uid, star)
    }
    return (
        <Star
            color={(favourites?.[courseId] === courseId) ? "#fbff00" : "#A9A9A9"}
            onClick={() => {
                if(favourites?.[courseId] === courseId) handleStarClick(courseId, false)
                else if(favourites?.[courseId] === undefined) handleStarClick(courseId, true)
            }}
        />
    )
}

export default Favourites