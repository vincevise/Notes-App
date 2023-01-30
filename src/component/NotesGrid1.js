import { styled } from '@mui/system'; 
import React, { useContext } from 'react'
import Note from './Note'
import {useSelector} from 'react-redux';
import { notesData } from '../features/notesSlice';
import { navBarData } from '../features/navbarSlice';
import { SearchContext } from '../App';

const NotesGrid1 = () => {
  const navData = useSelector(navBarData);   

  const notes = useSelector(notesData) ;
  let data = [];  
  const {isSearch} = useContext(SearchContext)

  if(isSearch.trim() !== ''){
    data = notes.data.filter((x)=> x.title.toLowerCase().includes(isSearch.trim().toLowerCase()) || x.content.toLowerCase().includes(isSearch.trim().toLowerCase()))
  }
    
  const grid = {
    display:'grid',
    gridTemplateColumns:'1fr 1fr 1fr 1fr',
    gridTemplateRows:'auto',
    gridGap:'10px'
  }

  const stack = {
    display:'grid',
    gridTemplateColumns:'1fr',
    gridTemplateRows:'auto',
    gridGap:'10px'
  }
   
  return (
    <CustomContainer  className='custom-container' sx={ navData.isStack ? grid : stack } >
      {/* <div></div> */}
      {
        data.map((x,i)=><Note key={x.id} data={x} index={i}/>)
      } 
    </CustomContainer>
  )
}

export default NotesGrid1

const CustomContainer = styled('div')({
 
})