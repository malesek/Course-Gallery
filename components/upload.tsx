import { useState } from "react"
import UploadClick from "./uploadClick";

const UploadForm = () => {
  const [file, setFile] = useState(null);  

  const changeHandler = (x : any) => {
      const selected = x.target.files[0];

      if(selected){
          setFile(selected);
      }
  }
  return(
      <>
      <form>
          <input type="file" onChange={changeHandler}/>
      </form>
      <div>
        {file && <UploadClick file={file}/>}
      </div>
      </>
  )
}

export default UploadForm;