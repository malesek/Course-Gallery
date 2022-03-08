import type { NextPage } from 'next'
import Courses from '../components/courses/course_grid'
import TopBar from '../components/topbar'

const Home: NextPage = () => {
  return (
    <>
    <TopBar/>
    <Courses/>
    </>
  )
}

export default Home
