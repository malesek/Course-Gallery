import { useState } from "react"
import { useAuth } from "../login";
import saveComment from "./saveComment";
import styled from "styled-components"

const TextInput = styled.input`
    margin:auto;
    text-align:center;
    margin-top: 10px;
    border-radius: 10px;
    border: 1px solid #000555;
    padding: 5px;
    width: 70%;
`

type Props = {
    courseId: string | string[]
}

const WriteComment: React.FC<Props> = ({courseId}) => {
const [commContent, setCommContent] = useState("");
const [inputVal, setInputVal] = useState<string>();
const {user} = useAuth();

const handleClick = () => {
    setInputVal("");
    if(commContent) saveComment(user?.uid, user?.displayName, commContent, courseId);
    setCommContent("");
}

return(
    <>
    <TextInput type="text" value={inputVal} onChange={(event) => setCommContent(event.target.value)}/>
    <button onClick={() => handleClick()}>Odeslat</button>
    </>
)

}

export default WriteComment