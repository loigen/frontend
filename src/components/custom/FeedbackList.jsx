import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  CircularProgress,
  Snackbar,
  Alert,
  Card,
  CardContent,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Paper,
  TablePagination,
  Grid,
  Tooltip,
} from "@mui/material";
import { Pie } from "react-chartjs-2";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import LoadingSpinner from "./LoadingSpinner";

const theme = createTheme({
  palette: {
    primary: {
      main: "#2C6975",
    },
    background: {
      default: "#F5F5F5",
      paper: "#FFFFFF",
    },
    text: {
      primary: "#2C6975",
      secondary: "#555",
    },
  },
  typography: {
    fontFamily: "'Roboto', sans-serif",
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
          borderRadius: "8px",
        },
      },
    },
  },
});

const FeedbackList = ({ setView }) => {
  const [feedbackList, setFeedbackList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [ratingDistribution, setRatingDistribution] = useState({});
  const [order, setOrder] = useState("desc");
  const [page, setPage] = useState(0); // Page state
  const [rowsPerPage, setRowsPerPage] = useState(5); // Rows per page state

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await axios.get(
          `https://backend-vp67.onrender.com/Feedback/feedback`
        );
        setFeedbackList(response.data.feedback);
        setLoading(false);

        const distribution = response.data.feedback.reduce((acc, feedback) => {
          acc[feedback.rating] = (acc[feedback.rating] || 0) + 1;
          return acc;
        }, {});
        setRatingDistribution(distribution);
      } catch (error) {
        setErrorMessage("Error retrieving feedback.");
        setLoading(false);
      }
    };

    fetchFeedback();
  }, []);

  const handleSort = () => {
    setOrder(order === "asc" ? "desc" : "asc");
    const sortedFeedback = [...feedbackList].sort((a, b) =>
      order === "asc" ? a.rating - b.rating : b.rating - a.rating
    );
    setFeedbackList(sortedFeedback);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const ratingLabels = Object.keys(ratingDistribution).map(
    (key) => `${key} Star`
  );
  const ratingValues = Object.values(ratingDistribution);

  const data = {
    labels: ratingLabels,
    datasets: [
      {
        data: ratingValues,
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
        ],
      },
    ],
  };

  // Calculate the displayed feedback based on page and rowsPerPage
  const displayedFeedback = feedbackList.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex" }}>
        {/* Main Content */}
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Container>
            <Typography
              onClick={() => setView("settings")}
              className="text-black"
              style={{ cursor: "pointer", marginBottom: "1rem" }}
            >
              <Tooltip title="Back to settings" arrow>
                <ArrowBackIcon />
              </Tooltip>
            </Typography>
            <Typography
              variant="h4"
              color="primary"
              sx={{ fontWeight: "bold", mb: 4 }}
            >
              Feedback Dashboard
            </Typography>

            {loading ? (
              <LoadingSpinner />
            ) : (
              <>
                {/* Rating Distribution and Summary */}
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Card>
                      <CardContent>
                        <Typography variant="h6" color="primary" align="center">
                          Rating Distribution
                        </Typography>
                        <Box sx={{ mx: "auto", width: "70%", mt: 2 }}>
                          <Pie data={data} />
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Card sx={{ textAlign: "center", p: 3 }}>
                      <Typography variant="h6" color="primary">
                        Total Feedback
                      </Typography>
                      <Typography
                        variant="h3"
                        color="textPrimary"
                        sx={{ fontWeight: "bold", mt: 2 }}
                      >
                        {feedbackList.length}
                      </Typography>
                    </Card>
                  </Grid>
                </Grid>

                <Divider sx={{ my: 4 }} />

                {/* Feedback Table */}
                <Typography variant="h5" color="primary" sx={{ mb: 2 }}>
                  Recent Feedback
                </Typography>
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>
                          <TableSortLabel
                            active
                            direction={order}
                            onClick={handleSort}
                          >
                            Rating
                          </TableSortLabel>
                        </TableCell>
                        <TableCell>Feedback</TableCell>
                        <TableCell>Email</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {displayedFeedback.map((item) => (
                        <TableRow key={item._id}>
                          <TableCell>{item.rating}</TableCell>
                          <TableCell>{item.feedback}</TableCell>
                          <TableCell>{item.email}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 15]}
                  component="div"
                  count={feedbackList.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </>
            )}
            <Snackbar
              open={!!errorMessage}
              autoHideDuration={6000}
              onClose={() => setErrorMessage("")}
            >
              <Alert
                onClose={() => setErrorMessage("")}
                severity="error"
                sx={{ bgcolor: "#FF5C5C", color: "#FFF" }}
              >
                {errorMessage}
              </Alert>
            </Snackbar>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default FeedbackList;
