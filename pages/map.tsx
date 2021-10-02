import type { NextPage } from 'next'
import Course from '../components/course_grid'
import TopBar from '../components/topbar'

const Map: NextPage = () => {
  return (
    <>
    <TopBar/>
    <Course/>
    </>
  )
}

export default Map