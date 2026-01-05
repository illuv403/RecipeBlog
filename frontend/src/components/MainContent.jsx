import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import { styled } from "@mui/material/styles";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import Pagination from "@mui/material/Pagination";
import { RecipeCardDialog, CreateRecipeDialog } from "./Dialogs";
import fetcher from "./fetcherProvider";
import useSWR from "swr";
import { useTranslation } from "react-i18next";

const StyledCard = styled(Card)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  padding: 0,
  height: "100%",
  backgroundColor: (theme.vars || theme).palette.background.paper,
  "&:hover": {
    backgroundColor: "transparent",
    cursor: "pointer",
  },
  "&:focus-visible": {
    outline: "3px solid",
    outlineColor: "hsla(210, 98%, 48%, 0.5)",
    outlineOffset: "2px",
  },
}));

const StyledCardContent = styled(CardContent)({
  display: "flex",
  flexDirection: "column",
  gap: 4,
  padding: 16,
  flexGrow: 1,
  "&:last-child": {
    paddingBottom: 16,
  },
});

const StyledTypography = styled(Typography)({
  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: 2,
  overflow: "hidden",
  textOverflow: "ellipsis",
});

export function Search({ onChange, value }) {
  const { t } = useTranslation();

  return (
    <FormControl sx={{ width: { xs: "100%", md: "25ch" } }} variant="outlined">
      <OutlinedInput
        size="small"
        placeholder={t("recipes.search.placeholder")}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        startAdornment={
          <InputAdornment position="start" sx={{ color: "text.primary" }}>
            <SearchRoundedIcon fontSize="small" />
          </InputAdornment>
        }
        inputProps={{
          "aria-label": t("recipes.search.ariaLabel"),
        }}
      />
    </FormControl>
  );
}

export default function MainContent({ loggedIn }) {
  const [focusedCardIndex, setFocusedCardIndex] = React.useState(null);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [selectedRecipe, setSelectedRecipe] = React.useState(null);
  const [openCreateDialog, setOpenCreateDialog] = React.useState(false);
  const [page, setPage] = React.useState(1);
  const [title, setTitle] = React.useState("");
  const { t, i18n } = useTranslation();

  const handleCardClick = (recipe) => {
    setSelectedRecipe(recipe);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedRecipe(null);
  };

  const handleFocus = (index) => {
    setFocusedCardIndex(index);
  };

  const handleBlur = () => {
    setFocusedCardIndex(null);
  };

  const useDebounce = (value, delay = 300) => {
    const [debounced, setDebounced] = React.useState(value);

    React.useEffect(() => {
      const id = setTimeout(() => setDebounced(value), delay);
      return () => clearTimeout(id);
    }, [value, delay]);

    return debounced;
  };

  const debouncedTitle = useDebounce(title, 600);
  const trimmedTitle = debouncedTitle.trim();

  const { data, error, mutate } = useSWR(
    trimmedTitle
      ? `http://localhost:5004/api/recipes?page=${page}&lang=${i18n.language}&title=${trimmedTitle}`
      : `http://localhost:5004/api/recipes?page=${page}&lang=${i18n.language}`,
    fetcher,
  );

  React.useEffect(() => {
    setPage(1);
  }, [debouncedTitle]);

  if (error) {
    return (
      <Typography variant="h5" gutterBottom>
        {t("recipes.states.error")}
      </Typography>
    );
  }

  if (!data) {
    return (
      <Typography variant="h5" gutterBottom>
        {t("recipes.states.loading")}
      </Typography>
    );
  }

  return (
    <Box
      sx={{
        width: "100vw",
        position: "relative",
        left: "50%",
        right: "50%",
        marginLeft: "-50vw",
        marginRight: "-50vw",
        bgcolor: "background.default",
      }}
    >
      <Box
        sx={{ maxWidth: "lg", mx: "auto", px: { xs: 2, sm: 3, md: 4 }, py: 4 }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <Box>
            <Typography variant="h1" gutterBottom>
              {t("recipes.title")}
            </Typography>
            <Typography>{t("recipes.subtitle")}</Typography>
          </Box>
          <Box sx={{ display: { xs: "flex", sm: "none" }, width: "100%" }}>
            {loggedIn ? (
              <Search onChange={setTitle} value={title} />
            ) : (
              <Box></Box>
            )}
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column-reverse", md: "row" },
              justifyContent: "space-between",
              alignItems: { xs: "start", md: "center" },
              gap: 4,
            }}
          >
            <Box>
              {loggedIn ? (
                <Button
                  color="primary"
                  variant="contained"
                  size="small"
                  onClick={() => setOpenCreateDialog(true)}
                >
                  {t("recipes.actions.newRecipe")}
                </Button>
              ) : (
                <></>
              )}
            </Box>
            <Box sx={{ display: { xs: "none", sm: "flex" } }}>
              {loggedIn ? (
                <Search onChange={setTitle} value={title} />
              ) : (
                <Box></Box>
              )}
            </Box>
          </Box>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
            {data.recipesToReturn.map((card) => (
              <Box
                key={card.result.id}
                sx={{
                  flex: {
                    xs: "1 1 100%",
                    sm: "1 1 33.33%",
                    md: "1 1 25%",
                  },
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <StyledCard
                  variant="outlined"
                  onFocus={() => handleFocus(card.result.id)}
                  onBlur={handleBlur}
                  tabIndex={0}
                  className={
                    focusedCardIndex === card.result.id ? "Mui-focused" : ""
                  }
                  onClick={() => handleCardClick(card)}
                >
                  <StyledCardContent>
                    <Typography gutterBottom variant="h6">
                      {card.result.title}
                    </Typography>
                    <StyledTypography variant="body2" color="text.secondary">
                      {card.result.description}
                    </StyledTypography>
                  </StyledCardContent>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      gap: 2,
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "16px",
                    }}
                  >
                    <Typography variant="caption">
                      {card.result.authorName}
                    </Typography>
                    <Typography variant="caption">
                      {new Date(card.result.createdAt).toDateString()}
                    </Typography>
                  </Box>
                </StyledCard>
              </Box>
            ))}
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <Pagination
              count={data.totalPages}
              page={page}
              onChange={(_, value) => setPage(value)}
            />
          </Box>
          <RecipeCardDialog
            open={openDialog}
            onClose={handleCloseDialog}
            recipe={selectedRecipe}
          />
          <CreateRecipeDialog
            open={openCreateDialog}
            onClose={() => setOpenCreateDialog(false)}
            onUpdate={() => mutate()}
          />
        </Box>
      </Box>
    </Box>
  );
}
