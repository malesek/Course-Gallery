import storageUpload from "./storage";
const UploadClick = ({file}) => {
    const {url} = storageUpload(file);
    return(
        <div>{url}</div>
    )
}

export default UploadClick


