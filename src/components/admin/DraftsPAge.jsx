import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  CircularProgress,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Box,
  Alert,
  Divider,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Stack,
  createTheme,
  ThemeProvider,
  Tooltip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { LoadingSpinner } from "../custom";
import Swal from "sweetalert2";

const theme = createTheme({
  palette: {
    primary: {
      main: "#2c6975",
    },
    secondary: {
      main: "#4a8e8b",
    },
    text: {
      main: "#fff",
    },
    subheader: {
      main: "#001",
    },
  },
});

const DraftsPage = ({ searchQuery }) => {
  const [drafts, setDrafts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDraft, setSelectedDraft] = useState(null);
  const [open, setOpen] = useState(false);
  const [formValues, setFormValues] = useState({
    title: "",
    content: "",
  });
  const fetchDrafts = async () => {
    try {
      const response = await axios.get(
        `https://backend-vp67.onrender.com/blog/drafts`
      );
      setDrafts(response.data.drafts);
    } catch (error) {
      setError();
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchDrafts();
  }, []);

  const handleOpen = (draft) => {
    setSelectedDraft(draft);
    setFormValues({
      title: draft.title,
      content: draft.content,
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedDraft(null);
  };

  const handleChange = (event) => {
    setFormValues({
      ...formValues,
      [event.target.name]: event.target.value,
    });
  };

  const handleUpdate = async () => {
    try {
      await axios.put(
        `https://backend-vp67.onrender.com/blog/${selectedDraft._id}/update`,
        formValues
      );

      // Update the drafts state
      setDrafts((prevDrafts) =>
        prevDrafts.map((draft) =>
          draft._id === selectedDraft._id ? { ...draft, ...formValues } : draft
        )
      );

      // Display success alert
      Swal.fire({
        icon: "success",
        title: "Draft Updated",
        text: "Your draft has been successfully updated!",
      });

      // Close the modal or any other UI element
      handleClose();
      fetchDrafts();
    } catch (error) {
      setError("Failed to update draft");
    }
  };

  const handlePublish = async (draftId) => {
    try {
      await axios.put(
        `https://backend-vp67.onrender.com/blog/${draftId}/publish`
      );

      // Fetch the updated drafts list
      fetchDrafts();

      // Show success alert with auto-refresh after user clicks "OK"
      Swal.fire({
        icon: "success",
        title: "Draft Published",
        text: "Your draft has been successfully published!",
        willClose: () => {
          // Refresh the page after alert closes (user clicks "OK")
          window.location.reload();
        },
      });
    } catch (error) {
      setError("Failed to publish draft");
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error)
    return (
      <Alert severity="error" sx={{ my: 4 }}>
        {error}
      </Alert>
    );

  const filteredDrafts = drafts.filter((draft) =>
    draft.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ThemeProvider theme={theme}>
      <Container sx={{ mt: 4 }}>
        {filteredDrafts.length === 0 ? (
          <div className="flex justify-center h-full items-center">
            <Typography variant="body1" color="#2C6975">
              No drafts found
            </Typography>
          </div>
        ) : (
          <Grid container spacing={4}>
            {filteredDrafts.map((draft) => (
              <Grid item xs={12} sm={6} md={4} key={draft._id}>
                <Card
                  sx={{
                    paddingLeft: "30px",
                    paddingRight: "30px",
                    paddingTop: "30px",
                    paddingBottom: "15px",
                    borderRadius: "10px",
                    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography
                    variant="subtitle2"
                    color="#000000"
                    fontSize={11}
                    sx={{ textAlign: "right" }}
                  >
                    Created on:{" "}
                    {new Date(draft.createdDate).toLocaleDateString()}
                  </Typography>

                  <CardHeader
                    title={draft.title}
                    titleTypographyProps={{
                      variant: "h6",
                      fontWeight: "bold",
                      color: "#23636F",
                      lineHeight: 1.3,
                      paddingTop: "20px",
                    }}
                    subheader={
                      <Typography
                        variant="body2"
                        sx={{
                          paddingTop: "30px",
                        }}
                      >
                        By{" "}
                        <span style={{ color: "#23636F" }}>{draft.author}</span>
                      </Typography>
                    }
                    action={
                      <IconButton
                        onClick={() => handleOpen(draft)}
                        color="text"
                      >
                        <Tooltip
                          title="Edit Blog"
                          arrow
                          sx={{
                            color: "#2C6975",
                          }}
                          PopperProps={{
                            modifiers: [
                              {
                                name: "arrow",
                                options: {
                                  padding: 5, // optional padding for the arrow
                                },
                              },
                            ],
                          }}
                          componentsProps={{
                            tooltip: {
                              sx: {
                                bgcolor: "#68B2A0", // Set the background color
                                color: "#fff", // Set the text color to white
                              },
                            },
                            arrow: {
                              sx: {
                                color: "#68B2A0", // Set the arrow color
                              },
                            },
                          }}
                        >
                          <EditIcon />
                        </Tooltip>
                      </IconButton>
                    }
                    sx={{
                      bgcolor: "#fffff",
                      color: "black",
                      textTransform: "capitalize",
                      padding: "0",
                    }}
                  />

                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="body2" color="text.secondary">
                      {draft.content.substring(0, 100)}...
                    </Typography>
                  </CardContent>
                  <Box sx={{ p: 2, bgcolor: "background.paper" }}>
                    <Typography variant="caption" color="text.secondary">
                      Created on:{" "}
                      {new Date(draft.createdDate).toLocaleDateString()}
                    </Typography>
                    <Box sx={{ mt: 2 }}>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => handlePublish(draft._id)}
                        disabled={draft.status === "published"}
                      >
                        Publish
                      </Button>
                    </Box>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        <Dialog
          open={open}
          onClose={handleClose}
          sx={{ "& .MuiDialog-paper": { width: "80%", maxWidth: "800px" } }}
        >
          <DialogTitle>Edit Draft</DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              label="Title"
              name="title"
              value={formValues.title}
              onChange={handleChange}
              margin="normal"
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Content"
              name="content"
              value={formValues.content}
              onChange={handleChange}
              margin="normal"
              multiline
              rows={4}
              sx={{ mb: 2 }}
            />
          </DialogContent>
          <DialogActions>
            <Button variant="contained" color="primary" onClick={handleUpdate}>
              Save
            </Button>
            <Button variant="outlined" color="error" onClick={handleClose}>
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </ThemeProvider>
  );
};

export default DraftsPage;
