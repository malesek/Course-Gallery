import type { NextPage } from 'next'
import TopBar from '../components/topbar'
import { useAuth } from '../components/login'
import ValidatePhoto from '../components/photos/validatePhoto'
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const admin = "AxKCMrGftgM1uYueydTRgwqHmv83";

const Admin: NextPage = () => {

  const {user} = useAuth();
  const id = user?.uid;
  const router = useRouter();

  useEffect(() => {
    if(id !== admin) router.push("/")
  }, [id, router])
  
  return (
    <>
    {id === admin ? (
      <>
      <TopBar/>
      <ValidatePhoto key={id}/>
      </>
    ):(
      <></>
    )}
    </>
  )
}

export default Admin