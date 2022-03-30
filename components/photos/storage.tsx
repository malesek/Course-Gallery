import { ref, uploadBytesResumable, getDownloadURL } from "@firebase/storage";
import { storage, db } from "../../firebase/firebase";
import { addDoc, collection } from "@firebase/firestore";

const saveStorage = (file: any, folderName: string, photoDesc: string) => {
        const storageRef = ref(storage, file.name);
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload je z ' + progress + '% hotový');
            },
            (error) => {
                switch (error.code) {
                    case 'storage/unauthorized':
                        break;
                    case 'storage/canceled':
                        break;
                    case 'storage/unknown':
                        break;
                }
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    console.log('File available at', url);
                    addDoc(collection(db, folderName), {
                        url, photoDesc
                    });
                });
               
            }
        )
}

export default saveStorage;