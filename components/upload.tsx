import { useState } from "react"
import useStorage from "./storage";

type Props = {
  folderName: string
}

const UploadForm:React.FC<Props> = ({folderName}) => {
  const [file, setFile] = useState(null);  
  const changeHandler = (x : any) => {
      const selected = x.target.files[0];

      if(selected){
          setFile(selected);
      }
  }
  const useClick = (event: any) => {
    event.preventDefault()
    useStorage(file, folderName)
  }
  return(
      <>
      <form onSubmit={useClick}>
          <input type="file" onChange={changeHandler}/>
          <button type="submit">Upload</button>
      </form>
      </>
  )
}
//file && <UploadClick file={file} folderName={folderName}/>
export default UploadForm;