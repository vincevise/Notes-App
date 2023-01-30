import React, { useRef, useState } from 'react'
import {  Box, IconButton, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'; 
import { useTheme } from '@emotion/react';
import CloseIcon from '@mui/icons-material/Close'; 
import { useEffect } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteNote, updateNote } from '../features/notesSlice';
import { useDispatch } from 'react-redux';
import ColorButtonInNote from './ColorButtonInNote';

const Note = ({data,index,isOpen,setIsOpen}) => {
    // let [isOpen,setIsOpen] = useState(false)
    const noteRef = useRef()
    const parentRef = useRef()
    const contentRef = useRef()
    const colorPickerRef = useRef() 
    const overlayRef = useRef()
    let [title,setTitle] = useState(data.title)
    let [content,setContent] = useState(data.content)
    const dispatch = useDispatch()
    const [height,setHeight] = useState(0)
    const [mid,setMid] = useState(0)

    
      const closeModal = () => { 
        let id = data.id
        dispatch(updateNote({id,title,content}))
        if(isOpen){
            setIsOpen(!isOpen) 
            let currentObj = noteRef.current.style
            currentObj.position = 'static'
            currentObj.top ='auto'
            currentObj.width =  'auto'; 
            console.log(currentObj.zIndex)
            currentObj.zIndex =  '0'; 
            console.log(currentObj.zIndex)
            currentObj.boxShadow = 'none'  
            overlayRef.current.style.zIndex = '0'
            overlayRef.current.style.backgroundColor = 'none'; 
            overlayRef.current.style.width = '0'
            overlayRef.current.style.height = '0'
            colorPickerRef.current.style.visibility = 'hidden'
        }
        
    }

   

    useEffect(()=>{ 
       
        contentRef.current.style.height = "auto";
        contentRef.current.style.height = contentRef.current.scrollHeight + 2 + "px";
        parentRef.current.style.height = 'auto'
       
        if(!isOpen){
            setHeight(noteRef.current.getBoundingClientRect().height) 
            // console.log(window.innerHeight,height);
            setMid( window.innerHeight/2 ) 
        }
        if(isOpen){ 
            parentRef.current.style.height = height +'px';  
        } 
        

    },[isOpen])

    const handleClick = (e) =>{ 
        
        e.stopPropagation()
        e.preventDefault()   
        console.log(parentRef.current.getBoundingClientRect())
        console.log(parentRef.current.getBoundingClientRect())
        console.log(noteRef.current.getBoundingClientRect())
        let nots = ['svg','path','BUTTON','LI']  
        let iffs = [!isOpen, 
            !nots.includes(e.target.nodeName),
            !e.target.classList.contains('MuiBackdrop-root'),
            !e.target.classList.contains('MuiList-root')
        ]  
        if(iffs.every(x=>x === true)){  
            

            let currObj = noteRef.current.style
        //    console.log(currObj)

            currObj.position = 'fixed' 
            // currObj.style.transition ='width 2s'
            currObj.left =  0; 
            
            currObj.right = 0;  
            currObj.marginLeft = 'auto'; 
            currObj.marginRight =  'auto'; 
            currObj.width =  '600px';  
            currObj.transition=  'width 5s'
            console.log() 
            currObj.top =  window.innerHeight/2 - 100 + 'px' ; 
            currObj.boxShadow =  'rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px'; 
            currObj.zIndex =  '100';  
            setIsOpen(!isOpen)
            overlayRef.current.style.zIndex = '50'
            overlayRef.current.style.backgroundColor = 'rgba(0,0,0,0.3)';
            overlayRef.current.style.top = '0'
            overlayRef.current.style.right = '0'
            overlayRef.current.style.width = '100vw'
            overlayRef.current.style.height = '100vh'
            colorPickerRef.current.style.visibility = 'visible'
        }
    }

    
    const theme = useTheme()
    let bgColor = theme.palette.background.main;
    let textColor = theme.palette.text.primary;
    let fontColor = theme.palette.text.secondary; 
    const style = {
        backgroundColor: data.color ? data.color : bgColor,
        border:`1px solid ${fontColor}`,
        transition:'width 2s'
    }
    const inputStyle = {
        backgroundColor: data.color ? data.color : bgColor,
        color:textColor,
        width:'100%',
        border:'none',
        outline:'none',
        resize:'none'
    }

    const handleVisble = () =>{
        if(noteRef.current.getBoundingClientRect().width < 600){
            colorPickerRef.current.style.visibility = 'visible'
        }
    }

    const handleHidden = () =>{
        if(noteRef.current.getBoundingClientRect().width < 600){
            colorPickerRef.current.style.visibility = 'hidden'
        }
        
    }

  return (<>
    
    <BoxContainer ref={parentRef} >
        
        <BoxInner
            className='box-inner'
            onClick={(e)=>handleClick(e)} onMouseOver={handleVisble} onMouseLeave={handleHidden}
            ref={noteRef} 
            sx={style}> 
            <Typography variant="h6" color="inherit">
                <input  
                    type="text" 
                    value={title} 
                    onChange={(e)=>setTitle(e.target.value)} 
                    style={inputStyle}
                    disabled={!isOpen}
                    /> 
            </Typography>
            <Typography>
            <textarea 
                ref={contentRef}
                type="text" 
                value={content} 
                onChange={(e)=>setContent(e.target.value)} 
                style={inputStyle}
                disabled={!isOpen}
                /> 
                

            </Typography>
            <Box sx={{display:'flex', justifyContent:'space-between'}}> 
                <div className='color-and-delete' ref={colorPickerRef} style={{display:'inline-block', visibility:'hidden'}}>
                    <ColorButtonInNote id={data.id}/>
                    <IconButton onClick={()=>dispatch(deleteNote({id:data.id}))}>
                        <DeleteIcon sx={{color:fontColor}}/>
                    </IconButton>
                </div>
                
                {  noteRef.current?.style.width === '600px' && 
                    <IconButton onClick={closeModal} sx={{color:fontColor}}><CloseIcon/> </IconButton>  
                } 
            </Box>
            
        </BoxInner>
    </BoxContainer>
    <div style={{position:'fixed'}} ref={overlayRef} onClick={closeModal} ></div>
    </>
  )
}

export default Note

const BoxContainer = styled(Box)(({theme})=>({ 
    display:'inline-block',
    boxSizing:'border-box',
    // border:'1px solid red'
}))

const BoxInner = styled(Box)(({theme})=>({
    transition:'width 2s',
    padding:'10px 15px'
}))