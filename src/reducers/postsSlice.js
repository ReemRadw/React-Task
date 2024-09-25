import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchPosts, addPost, updatePost, deletePost } from "../APIs/postsApis";
import axios from "axios";

// Create a thunk for fetching comments
export const fetchComments = createAsyncThunk(
  "postsData/fetchComments",
  async (postId) => {
    const response = await axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`);
    return response.data; 
  }
);

export const postsSlice = createSlice({
  name: "postsData",
  initialState: {
    posts: [],
    comments: [], 
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch posts
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.posts = action.payload;
      })
      // Add post
      .addCase(addPost.fulfilled, (state, action) => {
        state.posts.push(action.payload);
      })
      // Update post
      .addCase(updatePost.fulfilled, (state, action) => {
        const postIndex = state.posts.findIndex(
          (post) => post.id === action.payload.id
        );
        if (postIndex !== -1) {
          state.posts[postIndex] = action.payload;
        }
      })
      // Delete post
      .addCase(deletePost.fulfilled, (state, action) => {
        state.posts = state.posts.filter((post) => post.id !== action.payload);
      })
      // Fetch comments
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.comments = action.payload; 
      });
  },
});

export default postsSlice.reducer;
