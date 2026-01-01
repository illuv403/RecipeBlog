import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
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

export function Search() {
  return (
    <FormControl sx={{ width: { xs: "100%", md: "25ch" } }} variant="outlined">
      <OutlinedInput
        size="small"
        placeholder="Search…"
        startAdornment={
          <InputAdornment position="start" sx={{ color: "text.primary" }}>
            <SearchRoundedIcon fontSize="small" />
          </InputAdornment>
        }
        inputProps={{
          "aria-label": "search",
        }}
      />
    </FormControl>
  );
}

export default function MainContent() {
  const [focusedCardIndex, setFocusedCardIndex] = React.useState(null);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [selectedRecipe, setSelectedRecipe] = React.useState(null);
  const [openCreateDialog, setOpenCreateDialog] = React.useState(false);
  const [page, setPage] = React.useState(1);

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

  const { data, error } = useSWR(
    `http://localhost:5004/api/recipes?page=${page}`,
    fetcher,
  );

  if (error) {
    return (
      <Typography variant="h1" gutterBottom>
        {error}
      </Typography>
    );
  }

  if (!data) {
    return (
      <Typography variant="h1" gutterBottom>
        No data
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
              Recipe Book
            </Typography>
            <Typography>Find a recipe or leave yours here!</Typography>
          </Box>
          <Box sx={{ display: { xs: "flex", sm: "none" }, width: "100%" }}>
            <Search />
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
              <Button
                color="primary"
                variant="contained"
                size="small"
                onClick={() => setOpenCreateDialog(true)}
              >
                New Recipe
              </Button>
            </Box>
            <Box sx={{ display: { xs: "none", sm: "flex" } }}>
              <Search />
            </Box>
          </Box>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
            {data.recipesToReturn.map((card) => (
              <Box
                key={card.id}
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
                  onFocus={() => handleFocus(card.id)}
                  onBlur={handleBlur}
                  tabIndex={0}
                  className={focusedCardIndex === card.id ? "Mui-focused" : ""}
                  onClick={() => handleCardClick(card)}
                >
                  <StyledCardContent>
                    <Typography gutterBottom variant="h6">
                      {card.title}
                    </Typography>
                    <StyledTypography variant="body2" color="text.secondary">
                      {card.description}
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
                    <Typography variant="caption">{card.authorName}</Typography>
                    <Typography variant="caption">
                      {new Date(card.createdAt).toLocaleDateString()}
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
          />
        </Box>
      </Box>
    </Box>
  );
}
