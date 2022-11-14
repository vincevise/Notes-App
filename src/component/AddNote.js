import React, {  useRef } from 'react'
import { useTheme } from '@emotion/react' 
import { Box, IconButton, Tooltip } from '@mui/material'  
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { styled } from '@mui/system';
import { useState } from 'react';
import ColorButton from './ColorButton';
import { createContext } from 'react';
import { useDispatch } from 'react-redux';
import {  addNotes } from '../features/notesSlice';

export const ColorPickerContext  = createContext( )

export const AddNote = () => {
    const dispatch = useDispatch()
    // functions
    // code for expanding and collapsing InputAddContainer
    const [title,setTitle] = useState('');
    const [content,setContent] = useState('')
    const [color,setColor] = useState(null)
    const [isOpen,setIsOpen] = useState(false) 
 
    const inputExpand = () =>{  
        if(!isOpen) setIsOpen(!isOpen)
    }

    const handleClose = () => {
      
        if(isOpen) setIsOpen(!isOpen)
        if(title.trim()!=='' || content.trim() !== ''){
            dispatch( addNotes(title,content,color))
        }
        setTitle('')
        setContent('')
        setColor(null)
    }

    const inputRef = useRef(null);
 
   
    // text area expand automatically
    const handleContentAdd = (e) =>{
        contentInput.current.style.height = 'auto'
        contentInput.current.style.height = contentInput.current.scrollHeight + 'px';
        setContent(e.target.value)
    }

    const contentInput = useRef()

    // STYLING // 
    const theme = useTheme()
    let bgColor = color ? color : theme.palette.background.main;
    let textColor = theme.palette.text.primary;
    let fontColor = theme.palette.text.secondary;

    const inputStyle = {
        backgroundColor:`${bgColor}`,
        color:`${textColor}`,
        border:`none`,
        padding: '10px 15px',
        outline: 'none' 
    }

    const collapse = {
        backgroundColor:`${bgColor}`,
        border:`1px solid ${textColor}`,
        height:'40px',
        overflow:'hidden'
    }

    const expand = {
        backgroundColor:`${bgColor}`,
        border:`1px solid ${textColor}`,
        height:'auto',
        overflow:'hidden'
    }
  return (
    <div style={{marginTop:'60px'}}>
        <ColorPickerContext.Provider value={setColor}>
        <InputAddContainer 
        sx={isOpen  ? expand : collapse} 
                onClick={inputExpand}
                ref={inputRef}
            >
            <input type="text" 
                style={{...inputStyle,fontSize:'16px'}} className='title-add add-input' placeholder='Title' 
                rows={1}
                value={title}
                onChange={(e)=>setTitle(e.target.value)} 
            />
            <textarea type="text" 
                style={inputStyle}
                className='content-add add-input' placeholder='content' 
                onChange={handleContentAdd}
                value={content}
                ref={contentInput}
            />
            <InputContainer  >
                <Box sx={{display:'inline-block'}}>  
                    
                        <ColorButton/>
                    
                    
                </Box>
                <Box sx={{display:'inline-block'}}>
                    <Tooltip title="Close">
                        <IconButton  onClick={handleClose}>
                            <CloseOutlinedIcon sx={{fontSize:'20px',
                            color:fontColor }}/>
                        </IconButton>
                    </Tooltip>
                </Box>
            </InputContainer>
        </InputAddContainer>
        </ColorPickerContext.Provider>
    </div>
  )
}

const InputContainer = styled('div')({
    display:'flex',                
    justifyContent:'space-between',
    padding:'5px 5px',
    overflow:'hidden'
})

const InputAddContainer = styled('div')({
    display:'flex',
    flexDirection:'column',
    maxWidth:'500px', 
    width:'500px',
    overflow:'hidden',
    height:'40px'
})