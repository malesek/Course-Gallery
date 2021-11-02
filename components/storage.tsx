import { ref, uploadBytesResumable, getDownloadURL } from "@firebase/storage";
import { useEffect, useState } from "react";
import { storage } from "../firebase/firebase";

const storageUpload = (file) => {
    const [url, setUrl] = useState(String);

    useEffect(() => {
        const storageRef = ref(storage, file.name);
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log(progress)
            }
        ),
        (error : string) =>{
            console.log(error)
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setUrl(downloadURL)
          });
        }
    }, [])
    return{url}
}

export default storageUpload;