import { styled } from '@mui/system'; 
import React, { useContext, useRef, useState } from 'react'
import Note from './Note'
import {useSelector} from 'react-redux';
import { notesData } from '../features/notesSlice';
import { navBarData } from '../features/navbarSlice';
import { useLocation } from 'react-router-dom';
import { SearchContext } from '../App';
import { useEffect } from 'react';
import { useTheme } from '@emotion/react';

const NotesGrid = () => {
  const [isOpen,setIsOpen] = useState(false)
  const theme = useTheme()
  let bgColor = theme.palette.background.main; 
  const navData = useSelector(navBarData);   
  const notes = useSelector(notesData) ;
  let data = notes.data;  
 
  const grid = { 
    display:'grid',
    gridTemplateColumns:'1fr 1fr 1fr 1fr',
    gridTemplateRows:'auto',
    gridGap:'10px', 
  }

  const stack = {
    display:'grid',
    gridTemplateColumns:'1fr',
    gridTemplateRows:'auto',
    gridGap:'10px',
    backgroundColor:`${bgColor}` 
  }
 
   
  return (<> 
    <CustomContainer sx={ navData.isStack ? grid : stack } >
      
      {
        data.map((x,i)=><Note 
        setIsOpen={setIsOpen} 
          isOpen={isOpen} 
          className='note' 
          key={x.id} data={x} index={i}/>)
      }
    </CustomContainer>
    </>
  )
}

export default NotesGrid

const CustomContainer = styled('div')({
 
})