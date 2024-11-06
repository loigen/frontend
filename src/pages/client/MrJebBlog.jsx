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

const categories = [
  { id: "Technology", name: "Technology" },
  { id: "Health", name: "Health" },
  { id: "Lifestyle", name: "Lifestyle" },
  { id: "Education", name: "Education" },
];
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
  const [selectedCategory, setSelectedCategory] = useState("Technology");
  const [searchQuery, setSearchQuery] = useState("");
  const [favoriteBlogs, setFavoriteBlogs] = useState([]);
  const [expandedBlogs, setExpandedBlogs] = useState(new Set());
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { user } = useAuth();
  const [editableBlog, setEditableBlog] = useState({
    title: "",
    content: "",
    category: "Technology",
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
        `https://backend-production-c8da.up.railway.app/blog/${updatedBlog._id}/edit`,
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
        `https://backend-production-c8da.up.railway.app/blog/allBlogs`
      );
      setBlogs(blogsResponse.data.blogs);

      if (view === "favorites" && user._id) {
        try {
          const favoritesResponse = await axios.get(
            `https://backend-production-c8da.up.railway.app/blog/userFavorites/${user._id}`
          );
          setFavoriteBlogs(favoritesResponse.data.blogs || []);
        } catch (favoriteError) {
          console.error("Error fetching favorites:", favoriteError);

          Swal.fire({
            icon: "error",
            title: "Oopss",
            text: "No favorite blogs. Please add favorites.",
            confirmButtonText: "Add Favorites",
          }).then((result) => {
            if (result.isConfirmed) {
              setView("all");
            }
          });
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to fetch data. Please try again later.");
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to fetch data. Please try again later.",
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
        const response = await fetch(`${API_URL}/blog/${blogId}`, {
          method: "DELETE",
        });

        const data = await response.json();

        if (response.ok) {
          Swal.fire("Deleted!", data.message, "success");
          fetchUserProfileAndBlogs();
        } else {
          Swal.fire("Error", data.message, "error");
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
        ? `https://backend-production-c8da.up.railway.app/blog/removeFromFavorites/${blogId}/${userId}`
        : `https://backend-production-c8da.up.railway.app/blog/addToFavorites/${blogId}/${userId}`;

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

  // const handleToggleExpand = (blogId) => {
  //   setExpandedBlogs((prev) => {
  //     const newExpandedBlogs = new Set(prev);
  //     if (newExpandedBlogs.has(blogId)) {
  //       newExpandedBlogs.delete(blogId);
  //     } else {
  //       newExpandedBlogs.add(blogId);
  //     }
  //     return newExpandedBlogs;
  //   });
  // };

  const filteredBlogs = blogs
    .filter((blog) => blog.category === selectedCategory)
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
              <MenuItem sx={{ color: "#2C6975" }} value="newest">
                Newest
              </MenuItem>
            </Select>
          </FormControl>
        </Box>

        <BlogModal isOpen={isModalOpen} onClose={closeModal} />

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
                  <Typography>No blogs available for this category.</Typography>
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
                      sx={{
                        bgcolor: "#fffff",
                        color: "black",
                        textTransform: "capitalize",
                        padding: "0",
                      }}
                    />

                    {/*<Typography variant="body2" color="subheader">
                          {`Category: ${blog.category} | Author: ${blog.author}`}
                        </Typography>*/}

                    <CardContent sx={{ padding: "8px 0" }}>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        sx={{ lineHeight: 1.5 }}
                      >
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
                          <Tooltip title="Remove from Favorites" arrow>
                            <FavoriteIcon />
                          </Tooltip>
                        ) : (
                          <Tooltip title="Add to Favorites" arrow>
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
                  color="rgba(44, 105, 117)"
                >
                  {fullBlogDetails.title}
                </Typography>
                <Typography
                  fullWidth
                  variant="body2"
                  color="rgba(44, 105, 117)"
                  gutterBottom
                >
                  {`Author: ${fullBlogDetails.author} | Published on: ${dayjs(
                    fullBlogDetails.createdDate
                  ).format("MMM D, YYYY")}`}
                </Typography>
                <Divider sx={{ mb: 2 }} />

                <Typography variant="body1" fullWidth color="textSecondary">
                  {fullBlogDetails.content}
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
