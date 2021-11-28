import type { NextPage } from 'next'
import Course from '../components/course_grid'
import TopBar from '../components/topbar'
<<<<<<< Updated upstream
=======
import styled from "styled-components"

const Font = styled.div`
font-family: 'Open Sans', sans-serif;
`;
>>>>>>> Stashed changes

const Home: NextPage = () => {
  return (
    <>
    <TopBar/>
    <Course/>
    </>
  )
}

export default Home
