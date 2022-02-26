import Link from 'next/link';
import React from 'react'
import styled from 'styled-components'
import AddPhotos from './addPhotos';
import { useAuth } from './login';

const TopBarWrap = styled.header`
display: flex;
padding: 12px 12px;
align-items: center;
background-color: #000555;
height: 5%;
`;

const CourseGallery = styled.h2`
cursor: pointer;
color: white;
padding: 0;
margin: 0;
font-size: 35px;
`;

const Buttons = styled.div`
display: flex;
flex-direction: row;
margin-left: auto;
`;

const MenuButton = styled.div`
    font-size: 25px;
    cursor: pointer;
    color: #ffffff;
    margin: auto 7px;
    font-weight: 700;
    height:100%;
    &:hover{
        background-color: #000666;
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