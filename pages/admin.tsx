import type { NextPage } from 'next'
import TopBar from '../components/topbar'
import { useAuth } from '../components/login'
import ValidatePhoto from '../components/photos/validatePhoto'
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const admin = "AxKCMrGftgM1uYueydTRgwqHmv83";
const admin2 = "2bbacSDMZYSipFyzF9dafvn7lTH2";
const admin3 = "VX9KU5amxJdKnFud5TPIdv9hjbg1";

const Admin: NextPage = () => {

  const {user} = useAuth();
  const id = user?.uid;
  const router = useRouter();

  useEffect(() => {
    switch(id){
      case admin:{
        break;
      }
      case admin2:{
        break;
      }
      case admin3:{
        break;
      }
      default:{
        router.push("/")
        break;
      }
    }

  }, [id, router])
  
  return (
    <>
    {(id === admin || id === admin2 || id === admin3) &&
      <>
        <TopBar/>
        <ValidatePhoto key={id}/>
      </>
    }
    </>
  )
}

export default Admin