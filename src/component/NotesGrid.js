import { styled } from '@mui/system'; 
import React, {  useState } from 'react'
import Note from './Note'
import {useSelector} from 'react-redux';
import { notesData } from '../features/notesSlice';
import { navBarData } from '../features/navbarSlice';
import { useTheme } from '@emotion/react';

const NotesGrid = () => {
  const [isOpen,setIsOpen] = useState(false)
  const theme = useTheme()
  let bgColor = theme.palette.background.main; 
  const navData = useSelector(navBarData);   
  const notes = useSelector(notesData) ;
  let data = notes.data;  
 
 

  const stack = {
    display:'grid',
    gridTemplateColumns:'1fr',
    gridTemplateRows:'auto',
    gridGap:'10px',
    backgroundColor:`${bgColor}` 
  }

  const customGrid = {
    display:'grid',
    gridTemplateColumns:'1fr 1fr 1fr 1fr',
    gap:'10px'
  }

   if(navData.isStack){
    return(<>
    <CustomContainer sx={  stack  } >
      
      {
        data.map((x,i)=><Note 
        setIsOpen={setIsOpen} 
          isOpen={isOpen} 
          className='note' 
          key={x.id} data={x} index={i}/>)
      }
    </CustomContainer>
    </>)
  }

  return(
    <>
    <CustomContainer sx={customGrid}>
      <CustomDiv> {
        data?.map((x,i)=>{
          if(i%4===0) {
            return <Note setIsOpen={setIsOpen} isOpen={isOpen} className='note' key={x.id} data={x} index={i}/>
          }else{
            return null
          }
        } )} 
      </CustomDiv> 
      <CustomDiv> {
        data?.map((x,i)=>{
          if(i%4===1) return (<Note setIsOpen={setIsOpen} isOpen={isOpen} className='note' key={x.id} data={x} index={i}/>)
          else return null
        } )} 
      </CustomDiv> 
      <CustomDiv> {
        data?.map((x,i)=>{
          if(i%4===2) return (<Note setIsOpen={setIsOpen} isOpen={isOpen} className='note' key={x.id} data={x} index={i}/>)
          else return null
        } )} 
      </CustomDiv> 
      <CustomDiv> {
        data?.map((x,i)=>{
          if(i%4===3) return (<Note setIsOpen={setIsOpen} isOpen={isOpen} className='note' key={x.id} data={x} index={i}/>)
          else return null
        } )} 
      </CustomDiv>
    </CustomContainer>
    </>
  )

  


 
   
}

export default NotesGrid

const CustomContainer = styled('div')({
})

const CustomDiv = styled('div')({
  display:'flex',
  flexDirection:'column',
  gap:'10px'
})