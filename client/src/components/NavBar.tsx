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
import {useLogout} from "@/hooks/auth/useAuthToken";
import {useRouter} from "next/navigation";
import {MenuOption} from "@/components/MenuItem";

interface NavBarProps {
  isHome: boolean
}

export const NavBar: React.FC<NavBarProps> = (props) => {
  const {isHome} = props
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const logOut = useLogout();
  const router = useRouter();

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleOpenInformation = (isGoingToUpdate: boolean) => {
    router.push(`/information?edit=${isGoingToUpdate}`);
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
                if(isHome){
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
            News
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
              <MenuOption type={"Perfil"} action={() => handleOpenInformation(false)}/>
              <MenuOption type={"Configuraciones"} action={() => handleOpenInformation(true)}/>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
