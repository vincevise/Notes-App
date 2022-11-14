import { useTheme } from '@emotion/react'
import { styled } from '@mui/material/styles'; 
import React from 'react'
import { AddNote } from '../component/AddNote';
import NavBar from '../component/Navbar';
import NotesGrid from '../component/NotesGrid'; 



export default function Home() {

    const theme = useTheme()
    let bgColor = theme.palette.background.main;
    let textColor = theme.palette.text.primary;

    const style = { 
        bgcolor:`${bgColor}`,
        color:`${textColor}`,
        paddingY:'30px',  
        paddingX:'30px',  
        display:'flex', 
        flexDirection:'column',
        alignItems:'center', 
        minHeight:'100vh',
        height:1
    } 

    return ( <>
    <NavBar/> 
        <ContainerDiv sx={style} >
         

            <AddNote/>
            <br />
            <NotesGrid/> 
        </ContainerDiv> 
        </>
    )
} 

const ContainerDiv = styled('div')(({theme})=>({
    
}))

 


