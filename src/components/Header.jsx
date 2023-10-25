import {AppBar,Toolbar,styled ,InputBase,Box} from '@mui/material'; 
import {Menu as MenuIcon ,Search,Tune,HelpOutlineOutlined, SettingsOutlined, AppsOutlined, AccountCircleOutlined} from '@mui/icons-material';
import { gmaillogo } from '../constants/constant';

const StyledAppBar =  styled(AppBar) ({
    background:'#F5F5F5',
    boxShadow:'none'
})


 const SearchWrapper = styled(Box) ({
    background:'#EAF1FB',
    marginLeft:80,
    borderRadius:8,
    maxWidth: 720,
    minWidth:680,
    height:48,
    display: 'flex',
    alignItems:'center',
    justifyContent:'space-between',
    padding: '0 20px'
 });
   
 const OptionsWrapper =styled(Box) ({
    width:'100%',
    display:'flex',
    justifyContent:'end'

 })

const Header = ({toggleDrawer}) => {
    return (
        <StyledAppBar position="static">
          <Toolbar>
      <MenuIcon  color="action" onClick = {toggleDrawer} />
      <img src= {gmaillogo} alt="logo" style={{width:110, marginLeft: 15}}/>
        <SearchWrapper>
<Search  color="action"/>
<InputBase 
    placeholder='Search mail'
/>
<Tune color="action"/>
        </SearchWrapper>
        <OptionsWrapper>
            <HelpOutlineOutlined color="action"/>
            <SettingsOutlined color="action"/>
            <AppsOutlined color = "action"/>
            <AccountCircleOutlined color= "action"/>
        </OptionsWrapper>
          </Toolbar>  
        </StyledAppBar>
         
    )
}
  
 export default Header;