import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Grid,
  InputAdornment,
  Pagination,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";

import Inventory2Icon from "@mui/icons-material/Inventory2";

import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { fetchProducts, searchProducts } from "../store/productThunk";

import { setSearchKeyword } from "../store/productSlice";

function ProductListPage() {
  const dispatch = useDispatch();

  const {
    products,

    loading,
    error,

    pageNumber,
    pageSize,

    totalPages,

    searchKeyword,

    mode,
  } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(
      fetchProducts({
        isActive: true,
        pageNumber: 0,
        pageSize: 8,
      }),
    );
  }, [dispatch]);

  const handleSearch = () => {
    const keyword = searchKeyword.trim();

    if (!keyword) {
      dispatch(
        fetchProducts({
          isActive: true,
          pageNumber: 0,
          pageSize,
        }),
      );

      return;
    }

    dispatch(
      searchProducts({
        q: keyword,
        isActive: true,
        pageNumber: 0,
        pageSize,
      }),
    );
  };

  const handlePageChange = (_, page) => {
    if (mode === "SEARCH") {
      dispatch(
        searchProducts({
          q: searchKeyword,
          isActive: true,
          pageNumber: page - 1,
          pageSize,
        }),
      );

      return;
    }

    dispatch(
      fetchProducts({
        isActive: true,
        pageNumber: page - 1,
        pageSize,
      }),
    );
  };

  return (
    <Box
      sx={{
        p: 3,
        backgroundColor: "#f5f7fb",
        minHeight: "100vh",
      }}
    >
      {/* Header */}

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          mb: 4,
        }}
      >
        <Inventory2Icon
          sx={{
            fontSize: 40,
            color: "primary.main",
          }}
        />

        <Box>
          <Typography variant="h4" fontWeight={700} sx={{fontWeight: 700}}>
            Mặt hàng
          </Typography>

          <Typography color="text.secondary">
            Danh sách đồ uống và thức ăn
          </Typography>
        </Box>
      </Box>

      {/* Search */}

      <Card
        sx={{
          mb: 4,
          borderRadius: 4,
        }}
      >
        <CardContent>
          <Box
            sx={{
              display: "flex",
              gap: 2,
              flexWrap: "wrap",
            }}
          >
            <TextField
              fullWidth
              placeholder="Tìm theo mã hàng hoặc tên hàng..."
              value={searchKeyword}
              onChange={(e) => dispatch(setSearchKeyword(e.target.value))}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />

            <Button
              variant="contained"
              onClick={handleSearch}
              sx={{
                minWidth: 140,
              }}
            >
              Tìm kiếm
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* Loading */}

      {loading && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: 10,
          }}
        >
          <CircularProgress />
        </Box>
      )}

      {/* Error */}

      {!loading && error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {/* Empty */}

      {!loading && products.length === 0 && (
        <Card
          sx={{
            borderRadius: 4,
          }}
        >
          <CardContent>
            <Typography align="center">Không có mặt hàng nào</Typography>
          </CardContent>
        </Card>
      )}

      {/* Product List */}

      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid
            key={product.id}
            size={{
              xs: 12,
              sm: 6,
              md: 4,
              lg: 3,
            }}
          >
            <Card
              sx={{
                height: "100%",

                borderRadius: 4,

                transition: "0.25s",

                "&:hover": {
                  transform: "translateY(-4px)",

                  boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
                },
              }}
            >
              <CardContent>
                {/* <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent:
                                            "center",

                                        mb: 2,
                                    }}
                                >

                                    <Inventory2Icon
                                        sx={{
                                            fontSize: 60,
                                            color:
                                                "primary.main",
                                        }}
                                    />

                                </Box> */}
                <Box
                  sx={{
                    height: 220,
                    borderRadius: 3,
                    overflow: "hidden",
                    mb: 2,
                    backgroundColor: "#f5f5f5",
                  }}
                >
                  <CardMedia
                    component="img"
                    image={
                      product.imageUrl ||
                      "https://placehold.co/600x400?text=No+Image"
                    }
                    alt={product.productName}
                    sx={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",

                      transition: "0.3s",

                      "&:hover": {
                        transform: "scale(1.05)",
                      },
                    }}
                  />
                </Box>

                <Typography variant="h6" fontWeight={700} sx={{fontWeight: 700}}>
                  {product.productName}
                </Typography>

                <Typography
                  color="text.secondary"
                  sx={{
                    mb: 2,
                  }}
                >
                  {product.productCode}
                </Typography>

                <Stack spacing={1}>
                  <Typography>Đơn vị: {product.unit}</Typography>

                  {/* <Typography>Tồn kho: {product.stockQuantity}</Typography> */}

                  <Box
                    sx={{
                      display: "flex",

                      alignItems: "center",

                      gap: 1,
                    }}
                  >
                    <AttachMoneyIcon color="success" fontSize="small" />

                    <Typography color="success.main" fontWeight={700} sx={{fontWeight: 700}}>
                      {product.unitPrice.toLocaleString("vi-VN")}đ
                    </Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Pagination */}

      {!loading && totalPages > 1 && (
        <Box
          sx={{
            mt: 4,

            display: "flex",

            justifyContent: "center",
          }}
        >
          <Pagination
            color="primary"
            page={pageNumber + 1}
            count={totalPages}
            onChange={handlePageChange}
          />
        </Box>
      )}
    </Box>
  );
}

export default ProductListPage;
