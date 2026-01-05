import * as React from "react";
import { alpha, styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import MenuItem from "@mui/material/MenuItem";
import Drawer from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import ColorModeIconDropdown from "./theme/ColorModelIconDropdown";
import Select from "@mui/material/Select";
import { useTranslation } from "react-i18next";

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  flexShrink: 0,
  borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
  backdropFilter: "blur(24px)",
  border: "1px solid",
  borderColor: (theme.vars || theme).palette.divider,
  backgroundColor: theme.vars
    ? `rgba(${theme.vars.palette.background.defaultChannel} / 0.4)`
    : alpha(theme.palette.background.default, 0.4),
  boxShadow: (theme.vars || theme).shadows[1],
  padding: "8px 12px",
}));

export default function AppAppBar({
  setSignIn,
  setSignUp,
  loggedIn,
  setLoggedOut,
}) {
  const [open, setOpen] = React.useState(false);
  const { t, i18n } = useTranslation();

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const handleLanguageChange = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <AppBar
      position="fixed"
      enableColorOnDark
      sx={{
        boxShadow: 0,
        bgcolor: "transparent",
        backgroundImage: "none",
        mt: "calc(var(--template-frame-height, 0px) + 28px)",
      }}
    >
      <Container maxWidth="lg">
        <StyledToolbar variant="dense" disableGutters>
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              gap: 1,
              alignItems: "center",
            }}
          >
            <Select
              onChange={handleLanguageChange}
              value={i18n.language || "en"}
              sx={{ minWidth: 75 }}
            >
              <MenuItem value="en">English</MenuItem>
              <MenuItem value="pl">Polish</MenuItem>
            </Select>
          </Box>
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              gap: 1,
              alignItems: "center",
              ml: "auto",
            }}
          >
            {loggedIn ? (
              <Button
                color="primary"
                variant="text"
                size="small"
                onClick={setLoggedOut}
              >
                {t("appBar.logout")}
              </Button>
            ) : (
              <Box>
                <Button
                  color="primary"
                  variant="text"
                  size="small"
                  onClick={setSignIn}
                >
                  {t("appBar.signIn")}
                </Button>
                <Button
                  color="primary"
                  variant="contained"
                  size="small"
                  onClick={setSignUp}
                >
                  {t("appBar.signUp")}
                </Button>
              </Box>
            )}
            <ColorModeIconDropdown />
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" }, gap: 1 }}>
            <ColorModeIconDropdown size="medium" />
            <IconButton
              aria-label={t("appBar.menuButton")}
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="top"
              open={open}
              onClose={toggleDrawer(false)}
              PaperProps={{
                sx: {
                  top: "var(--template-frame-height, 0px)",
                },
              }}
            >
              <Box sx={{ p: 2, backgroundColor: "background.default" }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <IconButton onClick={toggleDrawer(false)}>
                    <CloseRoundedIcon />
                  </IconButton>
                </Box>
                {loggedIn ? (
                  <MenuItem>
                    <Button
                      color="primary"
                      variant="contained"
                      fullWidth
                      onClick={setSignUp}
                    >
                      {t("appBar.logout")}
                    </Button>
                  </MenuItem>
                ) : (
                  <Box>
                    <MenuItem>
                      <Button
                        color="primary"
                        variant="contained"
                        fullWidth
                        onClick={setSignUp}
                      >
                        {t("appBar.signUp")}
                      </Button>
                    </MenuItem>
                    <MenuItem>
                      <Button
                        color="primary"
                        variant="outlined"
                        fullWidth
                        onClick={setSignIn}
                      >
                        {t("appBar.signIn")}
                      </Button>
                    </MenuItem>
                  </Box>
                )}
              </Box>
            </Drawer>
          </Box>
        </StyledToolbar>
      </Container>
    </AppBar>
  );
}
