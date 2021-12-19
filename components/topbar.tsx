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
`;

const CourseGallery = styled.h2`
cursor: pointer;
color: white;
padding: 0;
margin: 0;
`;

const Buttons = styled.div`
display: flex;
flex-direction: row;
margin-left: auto;
`;


const MenuButton = styled.h2`
    font-size: 20px;
    cursor: pointer;
    color: #fffff0;
    padding: 3px;
    margin: auto 5px;

    &:hover{
        background-color: #000999;
    }
`;

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
                <Link href="/map">
                    <MenuButton>
                        Mapa
                    </MenuButton>
                </Link>
                <MenuButton>
                    Kontakt
                </MenuButton>

                {!user ? (
                    <MenuButton onClick={login}>
                        Login
                    </MenuButton>
                    ) : (
                    <>
                    <Link href="/admin">
                    <MenuButton>
                        Admin
                    </MenuButton>
                    </Link>
                    <AddPhotos/>
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