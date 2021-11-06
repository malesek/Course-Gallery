import { useEffect, useState } from "react";
import storageUpload from "./storage";
const UploadClick = (file) => {
    const [click, setClick] = useState(false);
    if(click){
        storageUpload(file)
    }   
    return(
        <>
        <button onClick={() => setClick(true)}>Upload</button>
        </>
    )
}

export default UploadClick



