import * as React from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Facebook from "@mui/icons-material/Facebook";
import Twitter from "@mui/icons-material/Twitter";
import Instagram from "@mui/icons-material/Instagram";


const styles = {
  box: {
    position: "relative",
    bottom: 0,
    left: 0,
    right: 0,
    padding: "0 2px",
    mt: '2%',
  },
  bottomNavigation: {
    backgroundColor: "teal",
  },
  bottomNavigationAction: {
    maxWidth: 30,
    maxHeight: 30,
    mt: "auto",
    mb: "auto",
    color: 'white',
        "&:hover": {
      transform: "scale(1.2)",
      transition: "all 0.1s ease",
    },
  },
  facebookButton: {
    Width: 30,
    Height: 30,
    ml: "auto",
  },
  instagramButton: {
    mr: "20px",
  },
};

export const Footer = () => {
  return (
    <Box sx={styles.box}>
      <BottomNavigation sx={styles.bottomNavigation}>
        <BottomNavigationAction
          label="Facebook"
          icon={<Facebook />}
          href="https://www.facebook.com/"
          target="_blank"
          sx={{
            ...styles.bottomNavigationAction,
            ...styles.facebookButton,
          }}
        />
        <BottomNavigationAction
          label="Twitter"
          icon={<Twitter />}
          href="https://www.twitter.com/"
          target="_blank"
          sx={styles.bottomNavigationAction}
        />
        <BottomNavigationAction
          label="Instagram"
          icon={<Instagram />}
          href="https://www.instagram.com/"
          target="_blank"
          sx={{
            ...styles.bottomNavigationAction,
            ...styles.instagramButton,
          }}
        />
      </BottomNavigation>
    </Box>
  );
};
