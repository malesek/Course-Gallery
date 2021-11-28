import { ref, uploadBytesResumable, getDownloadURL } from "@firebase/storage";
import { storage } from "../firebase/firebase";
import { addDoc, collection } from "@firebase/firestore";
import { db } from "../firebase/firebase";

const saveStorage = (file: any, folderName: string) => {
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
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log('File available at', downloadURL);
                    addDoc(collection(db, folderName), {
                        url: downloadURL,
                        validate: false
                    });
                });
               
            }
        )
}

export default saveStorage;