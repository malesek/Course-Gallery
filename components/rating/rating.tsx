import { useState } from "react";
import {FaStar} from "react-icons/fa"
import saveRating from "./saveRating";
import { useAuth } from "../login"

type Props = {
    courseId: string | string[] | undefined
}

const Rating: React.FC<Props> = ({courseId}) => {  
    const {user} = useAuth();
    const id = courseId;
    const [stars, setStars] = useState(0);
    const [hoverStars, setHoverStars] = useState(0);

    const clickStars = (value : number) => {
        setStars(value);
        saveRating(id, value, user?.uid);
    };

    return(
        <>
        <h1>hodnoceni</h1>
        {[...Array(5)].map((_, index) => {
            return(
            <FaStar 
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