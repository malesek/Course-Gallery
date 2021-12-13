import type { NextPage } from 'next'
import TopBar from '../components/topbar'
import { useAuth } from '../components/login'
import ValidatePhoto from '../components/validatePhoto'

const Admin: NextPage = () => {

  const {user} = useAuth();
  const id = user?.uid;
//id admina AxKCMrGftgM1uYueydTRgwqHmv83
  return (
    <>
    <TopBar/>
    <ValidatePhoto/>
    </>
  )
}

export default Admin