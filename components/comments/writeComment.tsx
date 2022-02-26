import { useState } from "react"
import { useAuth } from "../login";
import saveComment from "./saveComment";

type Props = {
    courseId: string | string[]
}

const WriteComment: React.FC<Props> = ({courseId}) => {
const [commContent, setCommContent] = useState<string>();
const [inputVal, setInputVal] = useState<string>();
const {user} = useAuth();

const handleClick = () => {
    setInputVal("");
    if(commContent) saveComment(user?.uid, user?.displayName, commContent, courseId);
    setCommContent("");
}

return(
    <>
    <input type="text" value={inputVal} onChange={(event) => setCommContent(event.target.value)}/>
    <button onClick={() => handleClick()}>Odeslat</button>
    </>
)

}

export default WriteComment