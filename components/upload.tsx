<<<<<<< Updated upstream
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

=======
import styled from "styled-components";

const UploadForm:React.FC = () => {
  const Input = styled.input`
  width: 0.1px;
	height: 0.1px;
	opacity: 0;
	overflow: hidden;
	position: absolute;
	z-index: -1;
  `
  return(
      <>
      <Input type="file" name="file" id="file"/>
      <label htmlFor="file">Vyberte Soubor</label>
      </>
  )
}
>>>>>>> Stashed changes
export default UploadForm;