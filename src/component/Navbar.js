import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography'; 
import { useTheme } from '@emotion/react'; 
import { IconButton, Tooltip } from '@mui/material';
import { useContext } from 'react'; 
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import SearchIcon from '@mui/icons-material/Search';
import {styled} from '@mui/system';
import CloseIcon from '@mui/icons-material/Close';
import './NavBar.css'
import { Link } from 'react-router-dom';
import GridViewIcon from '@mui/icons-material/GridView';
import ViewAgendaOutlinedIcon from '@mui/icons-material/ViewAgendaOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { navBarData, toggleGrid, toggleLight } from '../features/navbarSlice'; 
import { SearchContext } from '../App';
import { useLocation } from 'react-router-dom';


export default function NavBar( ) { 
  const navState = useSelector(navBarData); 
  const {isSearch,setIsSearch} = useContext(SearchContext)
  const dispatch = useDispatch()
  const location = useLocation()

  

  const theme = useTheme() 
  let bgColor = theme.palette.background.main
  let textColor = theme.palette.text.primary

  const style = {
      bgcolor:`${bgColor}`,
      color:`${textColor}`
  } 

  const style1= {
      backgroundColor:`${bgColor}`,
      color:`${textColor}`
  } 
  
  const handleSearch = (e) => {
    setIsSearch(e.target.value)  
  }             

  return (
    <Box sx={{ flexGrow: 1,postion:'fixed'}} className='nav-bar' >
      <AppBar position="static"  sx={{   
          ...style,
          borderBottom:`1px solid ${style.color}`,
          position:'fixed'}}>
        <Toolbar sx={{
                        display:'flex', 
                        justifyContent:'space-between' 
            }}>
          <Typography variant="h6" component="div"  >
            Notes
          </Typography>
        
          <SearchBarContainer className='search-bar-container'>
            <Link to='/search'   className='search-link'>
            
            <SearchIcon sx={{color:`${textColor}`}}/>  
            
            <input type="text"    className='search-bar' 
            style={{...style1,paddingLeft:'10px'}}
            value={isSearch}
            onChange={handleSearch}
            /> 

            </Link>
            <Link to='/'>
                <IconButton className='close-icon' onClick={()=>setIsSearch('')}>
                  {location.pathname === '/search' && <CloseIcon sx={{color:`${textColor}`}}/>}
                </IconButton>
            </Link>
          </SearchBarContainer >
          <span>
            <IconButton color="inherit" 
            onClick={()=>dispatch(toggleGrid())}
            >
              {navState.isStack ? <ViewAgendaOutlinedIcon/> : <GridViewIcon/>  } 
              
            </IconButton>
            <Tooltip title={navState.isLight ? 'light' : 'dark'}>
              <IconButton color="inherit"
              onClick={()=>dispatch(toggleLight())}
              >
                {navState.isLight ?  <LightModeIcon/>: <DarkModeIcon/> }</IconButton>
            </Tooltip>
          </span>
        </Toolbar>
      </AppBar>
      
    </Box>
  );
}


const SearchBarContainer = styled(Box)(({theme})=>({
    border:'1px solid black',
    display:'flex',
    alignItems:'center',
    paddingLeft:'10px'
}))

