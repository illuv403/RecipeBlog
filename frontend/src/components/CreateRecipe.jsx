import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MuiCard from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import AppTheme from "./theme/AppTheme";

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  [theme.breakpoints.up("sm")]: {
    maxWidth: "600px",
  },
}));

const Container = styled(Stack)(({ theme }) => ({
  width: "100%",
  padding: theme.spacing(2),
}));

export default function CreateRecipe({ user, ...props }) {
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const recipe = {
      title,
      description,
      author: user?.name,
      createdAt: new Date().toISOString(),
    };

    console.log(recipe);
  };

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <Container direction="column" justifyContent="center">
        <Card variant="outlined">
          <Typography variant="h4">Create Recipe</Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <FormControl>
              <TextField
                label="Recipe Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Buldak with a bit of light)))"
                required
                fullWidth
                sx={{
                  "& .MuiInputBase-root": {
                    minHeight: "50px",
                  },
                }}
              />
            </FormControl>
            <FormControl>
              <TextField
                label="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe how to make it..."
                multiline
                rows={4}
                required
                fullWidth
                sx={{
                  "& .MuiInputBase-root": {
                    minHeight: "150px",
                  },
                }}
              />
            </FormControl>
            <Button type="submit" variant="contained" fullWidth>
              Create Recipe
            </Button>
          </Box>
        </Card>
      </Container>
    </AppTheme>
  );
}
