import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import dayjs from "dayjs";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import { DraftsPage, BlogModal } from "../../components/admin";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Button,
  TextField,
  IconButton,
  useTheme,
  ThemeProvider,
  createTheme,
  Box,
  Typography,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Grid,
  Card,
  CardContent,
  CardActions,
  CircularProgress,
  Container,
  CardHeader,
  Tooltip,
} from "@mui/material";
import { useAuth } from "../../context/AuthProvider";
import { LoadingSpinner } from "../../components/custom";
import { Delete } from "@mui/icons-material";
const API_URL = "https://backend-vp67.onrender.com";

const blogTheme = createTheme({
  palette: {
    primary: {
      main: "#2c6975",
    },
    secondary: {
      main: "#4a8e8b",
    },
    textColor: {
      main: "#fff",
    },
    subheader: {
      main: "#001",
    },
  },
});

const BLog = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null);
  const [view, setView] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [favoriteBlogs, setFavoriteBlogs] = useState([]);
  const [expandedBlogs, setExpandedBlogs] = useState(new Set());
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { user } = useAuth();
  const [editableBlog, setEditableBlog] = useState({
    title: "",
    content: "",
  });
  const [fullBlogDetails, setFullBlogDetails] = useState(null);

  const openEditModal = (blog) => {
    setEditableBlog(blog);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  const handleUpdateBlog = async (updatedBlog) => {
    try {
      const response = await axios.put(
        `https://backend-vp67.onrender.com/blog/${updatedBlog._id}/edit`,
        updatedBlog
      );
      Swal.fire({
        icon: "success",
        title: "Blog Updated",
        text: response.data.message,
      });
      setBlogs((prevBlogs) =>
        prevBlogs.map((blog) =>
          blog._id === updatedBlog._id ? updatedBlog : blog
        )
      );
      closeEditModal();
      fetchUserProfileAndBlogs();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to update blog",
      });
      console.error("Error updating blog:", error);
    }
  };

  const fetchUserProfileAndBlogs = async () => {
    setLoading(true);
    try {
      setUserId(user._id);

      const blogsResponse = await axios.get(
        `https://backend-vp67.onrender.com/blog/allBlogs`
      );
      setBlogs(blogsResponse.data.blogs);

      if (view === "favorites" && user._id) {
        try {
          const favoritesResponse = await axios.get(
            `https://backend-vp67.onrender.com/blog/userFavorites/${user._id}`
          );
          setFavoriteBlogs(favoritesResponse.data.blogs || []);
        } catch (favoriteError) {
          Swal.fire({
            icon: "warning",
            title: "Oopss",
            text: "No favorite blogs yet",
            confirmButtonText: "Add Favorites",
          }).then((result) => {
            if (result.isConfirmed) {
              setView("all");
            }
          });
        }
      }
    } catch (error) {
      Swal.fire({
        icon: "warning",
        title: "Opps",
        text: "No Blogs Yet. Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchUserProfileAndBlogs();
  }, [view]);

  const deleteBlog = async (blogId) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        const response = await axios.delete(`${API_URL}/blog/${blogId}`);

        if (response.status === 200) {
          Swal.fire("Deleted!", response.data.message, "success");
          fetchUserProfileAndBlogs();
        } else {
          Swal.fire("Error", response.data.message, "error");
        }
      }
    } catch (error) {
      console.error("Error deleting blog:", error);
      Swal.fire("Error", "Could not delete the blog", "error");
    }
  };
  const handleToggleFavorite = async (blogId) => {
    try {
      const isFavorite = favoriteBlogs.some((blog) => blog._id === blogId);
      const url = isFavorite
        ? `https://backend-vp67.onrender.com/blog/removeFromFavorites/${blogId}/${userId}`
        : `https://backend-vp67.onrender.com/blog/addToFavorites/${blogId}/${userId}`;

      const response = await axios.post(url);
      Swal.fire({
        icon: isFavorite ? "success" : "success",
        title: isFavorite ? "Removed from Favorites" : "Added to Favorites",
        text: response.data.message,
      });

      setFavoriteBlogs((prev) =>
        isFavorite
          ? prev.filter((blog) => blog._id !== blogId)
          : [...prev, { _id: blogId }]
      );
    } catch (error) {
      console.error("Error toggling favorite:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to update favorites",
      });
    }
  };

  const handleToggleExpand = (blogId) => {
    setExpandedBlogs((prev) => {
      const newExpandedBlogs = new Set(prev);
      if (newExpandedBlogs.has(blogId)) {
        newExpandedBlogs.delete(blogId);
      } else {
        newExpandedBlogs.add(blogId);
      }
      return newExpandedBlogs;
    });
  };

  const filteredBlogs = blogs
    .filter((blog) =>
      blog.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((blog) => {
      if (view === "favorites") {
        return favoriteBlogs.some((favBlog) => favBlog._id === blog._id);
      }
      return true;
    })
    .sort((a, b) => {
      if (view === "newest") {
        return new Date(b.createdDate) - new Date(a.createdDate);
      }
      return 0;
    });

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }
  const openFullContentView = (blog) => {
    setFullBlogDetails(blog);
  };

  const closeFullContentView = () => {
    setFullBlogDetails(null);
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <ThemeProvider theme={blogTheme}>
      <Box sx={{ p: 3, bgcolor: "#E9F1EF" }}>
        <Box
          sx={{
            mb: 4,
            display: "flex",
            alignItems: "center",
            gap: 2,
            flexWrap: "wrap",
            flexDirection: { xs: "column", sm: "row" },
          }}
        >
          <Button
            onClick={openModal}
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            sx={{
              width: { xs: "100%", sm: "auto" },
              borderRadius: "20px",
              "&:hover": {
                backgroundColor: "#358898",
                transform: "scale(1.05)", // Slightly increases button size on hover
              },
              transition:
                "transform 0.2s ease-in-out, background-color 0.2s ease-in-out",
            }}
          >
            Create Blog Post
          </Button>

          <TextField
            label="Search blogs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            variant="outlined"
            size="small"
            color="subheader"
            fullWidth
            sx={{
              flex: 1,
              width: { xs: "100%", sm: "auto" },
              "& .MuiInputLabel-root": {
                color: "#2C6975",
                fontSize: "14px",
              },
              "& .MuiInputBase-input": {
                color: "#2C6975",
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "rgba(44, 105, 117, 0.40)",
                },
                "&:hover fieldset": {
                  borderColor: "#2C6975",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#2C6975",
                },
              },
            }}
          />

          <FormControl
            variant="outlined"
            size="small"
            sx={{
              width: { xs: "100%", sm: "auto" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "rgba(44, 105, 117, 0.40)", // default border color
                },
                "&:hover fieldset": {
                  borderColor: "#2C6975", // border color on hover
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#2C6975", // border color on focus
                },
              },
            }}
          >
            <InputLabel sx={{ color: "#2C6975" }}>View</InputLabel>
            <Select
              value={view}
              onChange={(e) => setView(e.target.value)}
              label="View"
              sx={{ color: "#2C6975" }}
            >
              <MenuItem sx={{ color: "#2C6975" }} value="all">
                All Blogs
              </MenuItem>
              <MenuItem sx={{ color: "#2C6975" }} value="favorites">
                Favorites
              </MenuItem>
              <MenuItem sx={{ color: "#2C6975" }} value="drafts">
                Drafts
              </MenuItem>
            </Select>
          </FormControl>
        </Box>

        <BlogModal isOpen={isModalOpen} onClose={closeModal} />

        {view === "drafts" ? (
          <DraftsPage searchQuery={searchQuery} />
        ) : (
          <Container>
            {filteredBlogs.length === 0 ? (
              <Grid item xs={12}>
                <Typography variant="body1" align="center" color="#2C6975">
                  {view === "favorites" ? (
                    <Box>
                      <Typography>
                        No favorites found, please add some favorites.
                      </Typography>
                    </Box>
                  ) : (
                    <Typography>No blogs available.</Typography>
                  )}
                </Typography>
              </Grid>
            ) : (
              <Grid container spacing={4}>
                {filteredBlogs.map((blog) => (
                  <Grid item xs={12} sm={6} md={4} key={blog._id}>
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
                        {dayjs(blog.createdDate).format("MMM D, YYYY")}
                      </Typography>
                      <CardHeader
                        title={blog.title}
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
                            <span style={{ color: "#23636F" }}>
                              {blog.author}
                            </span>
                          </Typography>
                        }
                        action={
                          <>
                            <IconButton
                              color="textColor"
                              onClick={() => openEditModal(blog)}
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
                            <IconButton
                              color="textColor"
                              onClick={() => deleteBlog(blog._id)}
                            >
                              <Tooltip
                                title="Delete Blog"
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
                                <Delete />
                              </Tooltip>
                            </IconButton>
                          </>
                        }
                        sx={{
                          bgcolor: "#fffff",
                          color: "black",
                          textTransform: "capitalize",
                          padding: "0",
                        }}
                      />

                      <CardContent sx={{ padding: "8px 0" }}>
                        <Typography color="textSecondary">
                          {dayjs(blog.createdDate).format("MMM D, YYYY")}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          {blog.content.length > 100 &&
                          !expandedBlogs.has(blog._id)
                            ? `${blog.content.substring(0, 100)}...`
                            : blog.content}
                        </Typography>
                      </CardContent>
                      <CardActions
                        sx={{ padding: "0", justifyContent: "space-between" }}
                      >
                        <Button
                          size="small"
                          onClick={() => openFullContentView(blog)}
                        >
                          Read more &gt;
                        </Button>

                        <IconButton
                          color="secondary"
                          onClick={() => handleToggleFavorite(blog._id)}
                        >
                          {favoriteBlogs.some(
                            (favBlog) => favBlog._id === blog._id
                          ) ? (
                            <Tooltip
                              title="Remove from Favorites"
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
                              <FavoriteIcon />
                            </Tooltip>
                          ) : (
                            <Tooltip
                              title="Add to Favorites"
                              arrow
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
                              <FavoriteBorderIcon />
                            </Tooltip>
                          )}
                        </IconButton>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            )}
          </Container>
        )}

        <Dialog
          open={isEditModalOpen}
          onClose={closeEditModal}
          sx={{ "& .MuiDialog-paper": { width: "80%", maxWidth: "800px" } }}
        >
          <DialogTitle>Edit Blog</DialogTitle>
          <DialogContent>
            <TextField
              label="Title"
              fullWidth
              variant="outlined"
              value={editableBlog.title}
              onChange={(e) =>
                setEditableBlog({ ...editableBlog, title: e.target.value })
              }
              margin="normal"
            />
            <TextField
              label="Content"
              fullWidth
              variant="outlined"
              multiline
              rows={4}
              value={editableBlog.content}
              onChange={(e) =>
                setEditableBlog({ ...editableBlog, content: e.target.value })
              }
              margin="normal"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={closeEditModal} color="primary">
              Cancel
            </Button>
            <Button
              onClick={() => handleUpdateBlog(editableBlog)}
              color="secondary"
              variant="contained"
            >
              Update
            </Button>
          </DialogActions>
        </Dialog>
        {fullBlogDetails && (
          <Box
            sx={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(233, 241, 239, 0.13 )", // Dark semi-transparent overlay
              backdropFilter: "blur(3px)", // Apply blur effect to background
              zIndex: 200, // Higher than sidebar to be in front
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 200, // Higher than sidebar to be in front
            }}
            onClick={closeFullContentView} // Close the modal when clicking outside of it
          >
            <Box
              onClick={(e) => e.stopPropagation()} // Prevent click from closing the modal when clicking inside it
              sx={{
                position: "relative",
                width: { xs: "90%", sm: "70%", md: "60%" },
                maxHeight: "80vh",
                bgcolor: "#ffffff",
                boxShadow: 24,
                borderRadius: "10px",
                p: 4,
                zIndex: 300,
                overflowY: "auto",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
              style={{
                scrollbarWidth: "thin",
                scrollbarColor: "#68B2A0 #F0F0F0",
              }}
            >
              <Box
                display="flex"
                justifyContent="flex-end"
                sx={{
                  width: "100%",
                  alignItems: "center",
                  position: "sticky",
                  top: 0,
                }}
              >
                <IconButton
                  color="secondary"
                  onClick={() => handleToggleFavorite(fullBlogDetails._id)}
                >
                  {favoriteBlogs.some(
                    (favBlog) => favBlog._id === fullBlogDetails._id
                  ) ? (
                    <FavoriteIcon />
                  ) : (
                    <FavoriteBorderIcon />
                  )}
                </IconButton>
                <Button
                  onClick={closeFullContentView}
                  variant="contained"
                  color="primary"
                  sx={{
                    borderRadius: "20px",
                    backgroundColor: "#2C6975",
                    color: "#ffffff",
                    "&:hover": {
                      backgroundColor: "#358898",
                      transform: "scale(1.05)", // Slightly increases button size on hover
                    },
                    transition:
                      "transform 0.2s ease-in-out, background-color 0.2s ease-in-out",
                  }}
                >
                  Close
                </Button>
              </Box>
              <Box
                display="flex"
                flexDirection="column"
                borderRadius={2}
                height="100%"
                padding={2}
                width="80%"
                alignItems="center"
              >
                <Typography
                  variant="h6"
                  fontSize={30}
                  textTransform="capitalize"
                  fontWeight="bold"
                  gutterBottom
                >
                  {fullBlogDetails.title}
                </Typography>
                <Typography
                  fullWidth
                  variant="body2"
                  color="textSecondary"
                  gutterBottom
                >
                  {`Author: ${fullBlogDetails.author} | Published on: ${dayjs(
                    fullBlogDetails.createdDate
                  ).format("MMM D, YYYY")}`}
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <Typography variant="body1" fullWidth color="textSecondary">
                  <div
                    className="text-justify"
                    dangerouslySetInnerHTML={{
                      __html: fullBlogDetails.content.replace(/\n/g, "<br/>"),
                    }}
                  />
                </Typography>
              </Box>
            </Box>
          </Box>
        )}
      </Box>
    </ThemeProvider>
  );
};

export default BLog;
