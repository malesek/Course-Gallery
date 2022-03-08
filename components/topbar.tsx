import Link from 'next/link';
import React from 'react'
import styled from 'styled-components'
import AddPhotos from './photos/addPhotos';
import { useAuth } from './login';

const TopBarWrap = styled.header`
display: flex;
padding: 12px 12px;
align-items: center;
background-color: #000555;
height: 5%;
@media only screen and (max-width:580px) {
        flex-direction: column;
    }
`;

const CourseGallery = styled.h2`
cursor: pointer;
color: white;
padding: 0;
margin: 0;
font-size: 35px;
    @media only screen and (max-width:580px) {
        font-size: 30px;
        text-align: center;
        margin-bottom: 5px;
    }
    @media only screen and (max-width:768px) {
        font-size: 30px;
    }
`;

const Buttons = styled.div`
display: flex;
flex-direction: row;
justify-content: space-between;
margin-left: auto;
@media only screen and (max-width:580px) {
    margin-left: unset;
}
`;

const MenuButton = styled.div`
    font-size: 25px;
    float: right;
    cursor: pointer;
    color: #ffffff;
    margin: auto 7px;
    font-weight: 700;
    height:100%;
    &:hover{
        background-color: #000666;
    }
    @media only screen and (max-width:580px) {
        font-size: 15px;
    }
    @media only screen and (max-width:768px) {
        font-size: 20px;
    }
`;

const admin = "AxKCMrGftgM1uYueydTRgwqHmv83";

const TopBar: React.FC = () => {

    const { user, login, logout } = useAuth();
    return (
        <TopBarWrap>
            <Link href="/">
                <CourseGallery>
                    Galerie Hřišť
                </CourseGallery>
            </Link>
            <Buttons>
                <MenuButton>
                    Kontakt
                </MenuButton>
                {!user ? (
                    <MenuButton onClick={login}>
                        Login
                    </MenuButton>
                ) : (
                    <>
                    {user.uid === admin &&
                        <Link href="/admin">
                            <MenuButton>
                                Admin
                            </MenuButton>
                        </Link>
                    }
                        <AddPhotos />
                        <MenuButton onClick={logout}>
                            Logout
                        </MenuButton>
                    </>
                )}

            </Buttons>
        </TopBarWrap>
    );

}

export default TopBar;
export {MenuButton};