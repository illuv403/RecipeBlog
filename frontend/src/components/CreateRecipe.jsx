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
import { useTranslation } from "react-i18next";
import useSWR from "swr";
import Autocomplete from "@mui/material/Autocomplete";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import axios from "axios";

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

export default function CreateRecipe({
  onClose,
  onUpdate,
  recipe = null,
  ...props
}) {
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [product, setProduct] = React.useState(null);
  const [products, setProducts] = React.useState([]);
  const [amount, setAmount] = React.useState("");
  const [titleError, setTitleError] = React.useState(false);
  const [titleErrorMessage, setTitleErrorMessage] = React.useState("");
  const [descriptionError, setDescriptionError] = React.useState(false);
  const [descriptionErrorMessage, setDescriptionErrorMessage] =
    React.useState("");
  const [productError, setProductError] = React.useState(false);
  const [productErrorMessage, setProductErrorMessage] = React.useState("");
  const [amountError, setAmountError] = React.useState(false);
  const [amountErrorMessage, setAmountErrorMessage] = React.useState("");
  const { t, i18n } = useTranslation();
  const recipeGiven = recipe !== null;

  React.useEffect(() => {
    if (recipe) {
      setTitle(recipe.result.title);
      setDescription(recipe.result.description);
      setProducts(
        recipe.result.products.map((p) => ({
          id: Math.floor(Math.random() * 1000000),
          productId: p.result.productId,
          name: p.result.name,
          measureUnit: p.result.measureUnit,
          amount: p.result.amount,
        })),
      );
    }
  }, [recipe]);

  const fetcher = (url) => {
    const token = localStorage.getItem("token");

    return fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      return res.json();
    });
  };

  const { data } = useSWR(
    `http://localhost:5004/api/products?lang=${i18n.language}`,
    fetcher,
  );

  if (!data) {
    return (
      <Typography variant="h5" gutterBottom>
        {t("createRecipe.states.loading")}
      </Typography>
    );
  }

  const validateProductInput = () => {
    let isValid = true;

    if (!product) {
      setProductError(true);
      setProductErrorMessage(t("createRecipe.errors.productRequired"));
      isValid = false;
    } else {
      setProductError(false);
      setProductErrorMessage("");
    }

    if (!amount) {
      setAmountError(true);
      setAmountErrorMessage(t("createRecipe.errors.amountRequired"));
      isValid = false;
    } else {
      setAmountError(false);
      setAmountErrorMessage("");
    }

    return isValid;
  };

  const validateFormInputs = () => {
    let isValid = true;

    if (!title || title.trim().length === 0) {
      setTitleError(true);
      setTitleErrorMessage(t("createRecipe.errors.titleRequired"));
      isValid = false;
    } else {
      setTitleError(false);
      setTitleErrorMessage("");
    }

    if (!description || description.trim().length === 0) {
      setDescriptionError(true);
      setDescriptionErrorMessage(t("createRecipe.errors.descriptionRequired"));
      isValid = false;
    } else {
      setDescriptionError(false);
      setDescriptionErrorMessage("");
    }

    if (products.length === 0) {
      alert(t("createRecipe.errors.atLeastOneProduct"));
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateFormInputs()) return;

    const token = localStorage.getItem("token");
    const email = localStorage.getItem("email");

    const recipeToReturn = {
      email,
      title,
      description,
      products: products.map((p) => ({
        productId: p.productId,
        amount: p.amount,
      })),
    };

    recipeGiven
      ? await axios.put(
          `http://localhost:5004/api/recipes/${recipe.result.id}`,
          recipeToReturn,
          { headers: { Authorization: `Bearer ${token}` } },
        )
      : await axios.post("http://localhost:5004/api/recipes", recipeToReturn, {
          headers: { Authorization: `Bearer ${token}` },
        });
    onUpdate();
    onClose();
  };

  const handleProductAdd = () => {
    if (!validateProductInput()) return;
    if (products.find((p) => p.productId === product.result.id)) {
      setProductError(true);
      setProductErrorMessage(t("createRecipe.errors.productExists"));
      return;
    }

    const addProduct = {
      id: Math.floor(Math.random() * 1000000),
      productId: product.result.id,
      name: product.result.name,
      measureUnit: product.result.measureUnit,
      amount: parseInt(amount),
    };

    setProducts((prev) => [...prev, addProduct]);
    setProduct(null);
    setAmount("");
    setProductError(false);
    setProductErrorMessage("");
    setAmountError(false);
    setAmountErrorMessage("");
  };

  const handleProductRemove = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <Container direction="column" justifyContent="center">
        <Card variant="outlined">
          <Typography variant="h4">{t("createRecipe.title")}</Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <FormControl>
              <TextField
                error={titleError}
                helperText={titleErrorMessage}
                color={titleError ? "error" : "primary"}
                label={t("createRecipe.form.recipeTitle.label")}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={t("createRecipe.form.recipeTitle.placeholder")}
                fullWidth
                sx={{
                  "& .MuiInputBase-root": {
                    minHeight: "50px",
                  },
                }}
              />
            </FormControl>
            <Box sx={{ display: "flex", gap: 1, alignItems: "flex-start" }}>
              <Autocomplete
                options={data}
                getOptionLabel={(option) =>
                  `${option.result.name}-${option.result.measureUnit}`
                }
                value={product}
                onChange={(_, val) => setProduct(val)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    error={productError}
                    helperText={productErrorMessage}
                    color={productError ? "error" : "primary"}
                    label={t("createRecipe.form.product.selectProduct")}
                    placeholder={t("createRecipe.form.product.searchProducts")}
                  />
                )}
                sx={{ flex: 2 }}
                isOptionEqualToValue={(option, value) =>
                  option.result.id === value.result.id
                }
              />
              <TextField
                error={amountError}
                helperText={amountErrorMessage}
                color={amountError ? "error" : "primary"}
                label={t("createRecipe.form.product.amount")}
                type="number"
                value={amount}
                inputProps={{ min: 0 }}
                onChange={(e) => setAmount(e.target.value)}
                sx={{ flex: 1 }}
              />
              <IconButton color="primary" onClick={handleProductAdd}>
                +
              </IconButton>
            </Box>
            <Box
              sx={{
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 1,
                p: 2,
              }}
            >
              <List dense>
                {products.map((product) => (
                  <ListItem
                    key={product.id}
                    secondaryAction={
                      <IconButton
                        edge="end"
                        onClick={() => handleProductRemove(product.id)}
                        color="error"
                      >
                        -
                      </IconButton>
                    }
                  >
                    <ListItemText
                      primary={product.name}
                      secondary={`${product.amount} ${product.measureUnit}`}
                    />
                  </ListItem>
                ))}
              </List>
            </Box>
            <FormControl>
              <TextField
                error={descriptionError}
                helperText={descriptionErrorMessage}
                color={descriptionError ? "error" : "primary"}
                label={t("createRecipe.form.description.label")}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder={t("createRecipe.form.description.placeholder")}
                multiline
                rows={4}
                fullWidth
                sx={{
                  "& .MuiInputBase-root": {
                    minHeight: "150px",
                  },
                }}
              />
            </FormControl>
            <Button type="submit" variant="contained" fullWidth>
              {recipeGiven
                ? t("createRecipe.form.edit")
                : t("createRecipe.form.submit")}
            </Button>
          </Box>
        </Card>
      </Container>
    </AppTheme>
  );
}
