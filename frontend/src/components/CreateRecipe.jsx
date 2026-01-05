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

export default function CreateRecipe({ onClose, onUpdate, ...props }) {
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
  const { t } = useTranslation();

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

  const { data } = useSWR("http://localhost:5004/api/products", fetcher);

  const validateProductInput = () => {
    let isValid = true;

    if (!product) {
      setProductError(true);
      setProductErrorMessage("Please select a product");
      isValid = false;
    } else {
      setProductError(false);
      setProductErrorMessage("");
    }

    if (!amount) {
      setAmountError(true);
      setAmountErrorMessage("Please provide an amount");
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
      setTitleErrorMessage("Title is required");
      isValid = false;
    } else {
      setTitleError(false);
      setTitleErrorMessage("");
    }

    if (!description || description.trim().length === 0) {
      setDescriptionError(true);
      setDescriptionErrorMessage("Description is required");
      isValid = false;
    } else {
      setDescriptionError(false);
      setDescriptionErrorMessage("");
    }

    if (products.length === 0) {
      alert("Please add at least one product");
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateFormInputs()) return;

    const token = localStorage.getItem("token");
    const email = localStorage.getItem("email");

    const recipe = {
      email,
      title,
      description,
      products: products.map((p) => ({
        productId: p.productId,
        amount: p.amount,
      })),
    };

    await axios.post("http://localhost:5004/api/recipes", recipe, {
      headers: { Authorization: `Bearer ${token}` },
    });
    onUpdate();
    onClose();
  };

  const handleProductAdd = () => {
    if (!validateProductInput()) return;
    if (products.find((p) => p.productId === product.id)) {
      setProductError(true);
      setProductErrorMessage("This product is already in the list");
      return;
    }

    const addProduct = {
      productId: product.id,
      name: product.name,
      measureUnit: product.measureUnit,
      amount: parseInt(amount),
    };

    setProducts([...products, addProduct]);
    setProduct(null);
    setAmount("");
    setProductError(false);
    setProductErrorMessage("");
    setAmountError(false);
    setAmountErrorMessage("");
  };

  const handleProductRemove = (id) => {
    setProducts(products.filter((p) => p.productId !== id));
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
                  `${option.name} (${option.measureUnit})`
                }
                value={product}
                onChange={(_, val) => setProduct(val)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    error={productError}
                    helperText={productErrorMessage}
                    color={productError ? "error" : "primary"}
                    label="Select Product"
                    placeholder="Search products..."
                  />
                )}
                sx={{ flex: 2 }}
                isOptionEqualToValue={(option, value) => option.id === value.id}
              />
              <TextField
                error={amountError}
                helperText={amountErrorMessage}
                color={amountError ? "error" : "primary"}
                label="Amount"
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
                    key={product.productId}
                    secondaryAction={
                      <IconButton
                        edge="end"
                        onClick={() => handleProductRemove(product.productId)}
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
              {t("createRecipe.form.submit")}
            </Button>
          </Box>
        </Card>
      </Container>
    </AppTheme>
  );
}
