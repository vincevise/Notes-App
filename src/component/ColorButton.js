import { Box, IconButton, Menu, MenuItem, Tooltip } from '@mui/material'
import React, { useState } from 'react'
import ColorLensOutlinedIcon from '@mui/icons-material/ColorLensOutlined';
import { useTheme } from '@emotion/react';
import CircleIcon from '@mui/icons-material/Circle'; 
import LensOutlinedIcon from '@mui/icons-material/LensOutlined';
import { useContext } from 'react'; 
import { ColorPickerContext } from './AddNote';
import { useDispatch } from 'react-redux';


const ColorButton = () => {
    const setColor = useContext(ColorPickerContext)
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

    const menuItemStyle = {
        background:bgColor,
        display:'inline-block'
    }

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
            className='select-color' 
            onClick={(e)=>setColor(null)}>
                <LensOutlinedIcon  />
        </MenuItem>
        <MenuItem   
            sx={menuItemStyle}
            className='select-color' 
            onClick={(e)=> setColor('#e84118')}>
                <CircleIcon sx={{color:'#e84118'}}/>
        </MenuItem>
        <MenuItem  
            sx={menuItemStyle}
            className='select-color'
            onClick={(e)=> setColor('#fbc531')}>
                <CircleIcon sx={{color:'#fbc531'}}/>
            </MenuItem>
          <MenuItem  
            sx={menuItemStyle}
            className='select-color'
            onClick={(e)=> setColor('#273c75')}>
                <CircleIcon sx={{color:'#273c75'}}/>
          </MenuItem>
      </Menu> 
    </Box>
    
      
    </>
  )
}

export default ColorButton