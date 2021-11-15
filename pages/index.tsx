import type { NextPage } from 'next'
import Course from '../components/course_grid'
import TopBar from '../components/topbar'
import { useAuth } from '../components/login'
import styled from "styled-components"

const Font = styled.div`
font-family: 'Open Sans', sans-serif;
`;

const Home: NextPage = () => {
  return (
    <Font>
    <TopBar/>
    <Course/>
    </Font>
  )
}

export default Home
