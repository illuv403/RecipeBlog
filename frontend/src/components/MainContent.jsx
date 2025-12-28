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

const cardData = [
  {
    img: "https://picsum.photos/800/450?random=1",
    tag: "Engineering",
    title: "Revolutionizing software development with cutting-edge tools",
    description:
      "Our latest engineering tools are designed to streamline workflows and boost productivity. Discover how these innovations are transforming the software development landscape.",
    author: "Donny",
  },
  {
    img: "https://picsum.photos/800/450?random=2",
    tag: "Product",
    title: "Innovative product features that drive success",
    description:
      "Explore the key features of our latest product release that are helping businesses achieve their goals. From user-friendly interfaces to ro2st functionality, learn why our product stands out.",
    author: "Donny",
  },
  {
    img: "https://picsum.photos/800/450?random=3",
    tag: "Design",
    title: "Designing for the future: trends and insights",
    description:
      "Stay ahead of the curve with the latest design trends and insights. Our design team shares their expertise on creating intuitive and visually stunning user experiences.",
    author: "Donny",
  },
  {
    img: "https://picsum.photos/800/450?random=4",
    tag: "Company",
    title: "Our company's journey: milestones and achievements",
    description:
      "Take a look at our company's journey and the milestones we've achieved along the way. From humble beginnings to industry leader, discover our story of growth and success.",
    author: "Donny",
  },
  {
    img: "https://picsum.photos/800/450?random=45",
    tag: "Engineering",
    title: "Pioneering sustainable engineering solutions",
    description:
      "Learn about our commitment to sustainability and the innovative engineering solutions we're implementing to create a greener future. Discover the impact of our eco-friendly initiatives.",
    author: "Donny",
  },
  {
    img: "https://picsum.photos/800/450?random=6",
    tag: "Product",
    title: "Maximizing efficiency with our latest product updates",
    description:
      "Our recent product updates are designed to help you maximize efficiency and achieve more. Get a detailed overview of the new features and improvements that can elevate your workflow.",
    author: "Donny",
  },
];

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

function Author({ author }) {
  return (
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
      <Typography variant="caption">{author}</Typography>
      <Typography variant="caption">July 14, 2021</Typography>
    </Box>
  );
}

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
            {cardData.map((card, index) => (
              <Box
                key={index}
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
                  onFocus={() => handleFocus(index)}
                  onBlur={handleBlur}
                  tabIndex={0}
                  className={focusedCardIndex === index ? "Mui-focused" : ""}
                  onClick={() => handleCardClick(card)}
                >
                  <CardMedia
                    component="img"
                    alt={card.title}
                    image={card.img}
                    sx={{
                      height: { xs: 200, sm: 220, md: 260 },
                      width: "100%",
                      objectFit: "cover",
                      borderBottom: "1px solid",
                      borderColor: "divider",
                    }}
                  />
                  <StyledCardContent>
                    <Typography gutterBottom variant="caption">
                      {card.tag}
                    </Typography>
                    <Typography gutterBottom variant="h6">
                      {card.title}
                    </Typography>
                    <StyledTypography variant="body2" color="text.secondary">
                      {card.description}
                    </StyledTypography>
                  </StyledCardContent>
                  <Author author={card.author} />
                </StyledCard>
              </Box>
            ))}
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <Pagination count={10} />
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
