import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import { useLogout, useAuthToken } from "../hooks/auth/useAuthToken";
import { useRouter } from "next/router";
import { Menu } from "@mui/material";
import { center } from "@cloudinary/url-gen/qualifiers/textAlignment";
import { color } from "@cloudinary/url-gen/qualifiers/background";

interface NavBarProps {
  isHome: boolean;
}

const NavBar: React.FC<NavBarProps> = (props) => {
  const { isHome } = props;
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const logOut = useLogout();
  const router = useRouter();
  const [authToken] = useAuthToken();

  const handleOpenMenu = () => {
    setIsMenuOpen(true);
  };

  const handleCloseMenu = () => {
    setIsMenuOpen(false);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleOpenPerfil = () => {
    router.push("/perfil");
  };

  const handleOpenSettings = () => {
    router.push("/settings-profile");
  };

  const handleCloseSession = () => {
    router.push("/login");
    logOut().then();
  };
  const handleOpenIngredients = () => {
    router.push("/ingredients");
    handleCloseMenu();
  };
  const handleOpenClients = () => {
    router.push("/clients");
    handleCloseMenu();
  };
  const handleOpenSupplier = () => {
    router.push("/suppliers");
    handleCloseMenu();
  };
  const handleOpenQuotes = () => {
    router.push("/quotations");
    handleCloseMenu();
  };
  const handleOpenRecipes = () => {
    router.push("/recipes");
    handleCloseMenu();
  };
  const handleOpenCatalogues = () => {
    router.push("/catalogues");
    handleCloseMenu();
  };
  const handleOpenDiscounts = () => {
    router.push("/discounts");
    handleCloseMenu();
  };
  const handleOpenPrincipal = () => {
    router.push("/");
    handleCloseMenu();
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: "teal" }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleOpenMenu}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 2, textAlign: "center" }}
          ></Typography>
          <Drawer anchor="left" open={isMenuOpen} onClose={handleCloseMenu}>
            <List sx={{ width: 250, cursor: "pointer" }}>
            <ListItem onClick={handleOpenPrincipal}>
                <ListItemText primary="Principal" />
              </ListItem>
              <ListItem onClick={handleOpenIngredients}>
                <ListItemText primary="Ingredientes" />
              </ListItem>
              <ListItem onClick={handleOpenClients}>
                <ListItemText primary="Clientes" />
              </ListItem>
              <ListItem onClick={handleOpenSupplier}>
                <ListItemText primary="Proveedores" />
              </ListItem>
              <ListItem onClick={handleOpenQuotes}>
                <ListItemText primary="Cotizaciones" />
              </ListItem>
              <ListItem onClick={handleOpenRecipes}>
                <ListItemText primary="Recetas" />
              </ListItem>
              <ListItem onClick={handleOpenCatalogues}>
                <ListItemText primary="Catalogos" />
              </ListItem>
              <ListItem onClick={handleOpenDiscounts}>
                <ListItemText primary="Descuentos" />
              </ListItem>
            </List>
          </Drawer>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <List>
                <ListItem onClick={handleOpenPerfil}>
                  <ListItemText primary="Perfil" />
                </ListItem>
                <ListItem onClick={handleOpenSettings}>
                  <ListItemText primary="Configuraciones" />
                </ListItem>
                <ListItem onClick={handleCloseSession}>
                  <ListItemText primary="Cerrar sesión" />
                </ListItem>
              </List>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
