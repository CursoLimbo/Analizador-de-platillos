import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MenuIcon from '@mui/icons-material/Menu';
import Tooltip from '@mui/material/Tooltip';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import {useAuthToken, useLogout} from "../hooks/auth/useAuthToken";
import {MenuOption} from "./MenuItem";
import {useRouter} from "next/router";

interface NavBarProps {
  isHome: boolean
}

const NavBar: React.FC<NavBarProps> = (props) => {
  const {isHome} = props
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const logOut = useLogout();
  const router = useRouter();
  const [authToken] = useAuthToken();

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleOpenPerfil = () => {
    window.location.href = `/perfil`
  };

  const handleOpenSettings = () => {
    window.location.href = `/settings-profile`
  };

  const handleGoBack = () => {
    router.back();
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: 'teal' }}>
        <Toolbar>
          <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="go-back"
              sx={{ mr: 2 }}
              onClick={ () => {
                if(!isHome){
                  logOut().then();
                }else{
                  handleGoBack();
                }
              }}
          >
            <ArrowBackIcon />
          </IconButton>
          <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 2, textAlign: 'center' }}>
          </Typography>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuOption type={"Perfil"} action={() => handleOpenPerfil()}/>
              <MenuOption type={"Configuraciones"} action={() => handleOpenSettings()}/>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar