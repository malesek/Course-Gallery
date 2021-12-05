import type { NextPage } from 'next'
import Course from '../components/course_grid'
import TopBar from '../components/topbar'
import { useAuth } from '../components/login'

const Home: NextPage = () => {

  const {user} = useAuth();
  const id = user?.uid;

  return (
    <>
    <TopBar/>
    {id}
    <Course/>
    </>
  )
}

export default Home
