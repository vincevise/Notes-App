import { Box, IconButton, Menu, MenuItem, Tooltip } from '@mui/material'
import React, { useEffect, useState } from 'react'
import ColorLensOutlinedIcon from '@mui/icons-material/ColorLensOutlined';
import { useTheme } from '@emotion/react';
import CircleIcon from '@mui/icons-material/Circle'; 
import LensOutlinedIcon from '@mui/icons-material/LensOutlined';
import { useContext } from 'react'; 
import { ColorPickerContext } from './AddNote';
import { useDispatch } from 'react-redux';
import { changeColor } from '../features/notesSlice';
import { SearchContext } from '../App';


const ColorButtonInNote = ({id}) => { 
  const {isSearch} = useContext(SearchContext)
    const dispatch = useDispatch()
    const theme = useTheme()
    let bgColor = theme.palette.background.main; 
    let fontColor = theme.palette.text.secondary;

    const [anchorEl, setAnchorEl] =  useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

    // style
    const menuItemStyle = {
        background:bgColor,
        display:'inline-block'
    }
 

    const colorData = [
      '#e84118',
      '#fbc531',
      '#273c75'
    ]

  return (
    <> 
    <Tooltip title='color'>
    <IconButton
         id="basic-button"
         aria-controls={open ? 'basic-menu' : undefined}
         aria-haspopup="true"
         aria-expanded={open ? 'true' : undefined}
         onClick={handleClick}
    >
        <ColorLensOutlinedIcon sx={{fontSize:'20px',
            color:fontColor }}/>
    </IconButton>
    </Tooltip>
    <Box sx={menuItemStyle}>
    <Menu 
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}   
      >
        <MenuItem   
            sx={menuItemStyle}
            className='select-color '
            id='red'
            data-name='red'
            onClick={()=>dispatch(changeColor({id:id,color:null}))}>
                <LensOutlinedIcon  />
        </MenuItem>
        {colorData.map((x,i)=>(
          <MenuItem
            key={i}
            sx={menuItemStyle}
            className='select-color' 
            onClick={()=>dispatch(changeColor({id:id,color:x}))}
          >
            <CircleIcon sx={{color:x}}/>
          </MenuItem>
        ))}
        
      </Menu> 
    </Box>
    </>
  )
}

export default ColorButtonInNote