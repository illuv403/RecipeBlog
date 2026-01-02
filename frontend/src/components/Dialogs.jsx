import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import CardMedia from "@mui/material/CardMedia";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import CreateRecipe from "./CreateRecipe";

export function SignInDialog({ open, onClose }) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      slotProps={{
        paper: {
          sx: {
            height: 550,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          },
        },
      }}
    >
      <DialogContent
        style={{
          overflow: "hidden",
          p: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <SignIn />
      </DialogContent>
    </Dialog>
  );
}

export function SignUpDialog({ open, onClose }) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      slotProps={{
        paper: {
          sx: {
            height: 550,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          },
        },
      }}
    >
      <DialogContent
        style={{
          overflow: "hidden",
          p: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <SignUp onClose={onClose} />
      </DialogContent>
    </Dialog>
  );
}

export function RecipeCardDialog({ open, onClose, recipe }) {
  if (!recipe) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      slotProps={{
        paper: {
          sx: {
            maxHeight: "80vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 3,
            overflow: "hidden",
            boxShadow: 6,
          },
        },
      }}
    >
      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          p: 0,
          width: "100%",
          maxHeight: "80vh",
        }}
      >
        <Box sx={{ p: 3, overflowY: "auto", flexGrow: 1 }}>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            {recipe.title}
          </Typography>

          <Divider sx={{ mb: 2 }} />

          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ whiteSpace: "pre-line", mb: 3 }}
          >
            {recipe.description}
          </Typography>

          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <Typography variant="subtitle2" color="text.primary" sx={{ mb: 2 }}>
              By {recipe.authorName}
            </Typography>

            <Typography
              variant="subtitle2"
              color="text.primary"
              sx={{ mb: 2, ml: "auto" }}
            >
              {new Date(recipe.createdAt).toLocaleDateString()}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <Button variant="contained" onClick={onClose}>
              Close
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

export function CreateRecipeDialog({ open, onClose }) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogContent sx={{ p: 0 }}>
        <CreateRecipe />
      </DialogContent>
    </Dialog>
  );
}
