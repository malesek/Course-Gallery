import type { NextPage } from 'next'
import TopBar from '../components/topbar'
import { useAuth } from '../components/login'
import ValidatePhoto from '../components/validatePhoto'

const Admin: NextPage = () => {

  const {user} = useAuth();
  const id = user?.uid;
  
  return (
    <>
    <TopBar/>
    {id === "AxKCMrGftgM1uYueydTRgwqHmv83" ? (
      <ValidatePhoto key={id}/>
    ):(
      <h1>Nejste admin</h1>
    )}
    </>
  )
}

export default Admin