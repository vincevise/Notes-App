import { useTheme } from '@emotion/react'
import { styled } from '@mui/system'; 

import React from 'react' 
import NavBar from '../component/Navbar';
import NotesGrid from '../component/NotesGrid'
import NotesGrid1 from '../component/NotesGrid1';

const Search = () => {
  const theme = useTheme()
  let bgColor = theme.palette.background.main;
  let textColor = theme.palette.text.primary; 

  const style = { 
      bgcolor:`${bgColor}`,
      color:`${textColor}`,
      paddingY:'90px',  
      paddingX:'30px',  
      display:'flex', 
      flexDirection:'column',
      alignItems:'center', 
      height:' 100vh '
  } 
  return (<>
    <NavBar/>
    <ContainerDiv sx={style} > 
      <NotesGrid1/>  
    </ContainerDiv>
    </> 
  )
}

export default Search

const ContainerDiv = styled('div')(({theme})=>({
    
}))
