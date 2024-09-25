import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPosts, addPost, updatePost, deletePost } from "../../../APIs/postsApis";
import "./style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt, faAdd } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import UpdateModal from "./UpdateModal";
import Spinner from "../Spinner/Spinner";
import PostModal from "../Posts/PostModel"; 

function Home() {
  const allPosts = useSelector((state) => state.postsData.posts);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [newPost, setNewPost] = useState({ title: "", body: "" });
  const [errors, setErrors] = useState({ title: "", body: "" });
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [currentPost, setCurrentPost] = useState({ title: "", body: "" });
  const [showPostModal, setShowPostModal] = useState(false);

  useEffect(() => {
    setLoading(true);
    dispatch(fetchPosts()).finally(() => setLoading(false));
  }, [dispatch]);

  const handleCloseUpdateModal = () => setShowUpdateModal(false);
  const handleClosePostModal = () => setShowPostModal(false);

  // Validate input fields
  const validateForm = () => {
    let valid = true;
    let tempErrors = { title: "", body: "" };

    if (newPost.title.length < 10 || newPost.title.length > 150) {
      tempErrors.title = "Title must be between 10 and 150 characters";
      valid = false;
    }

    if (newPost.body.length < 50 || newPost.body.length > 300) {
      tempErrors.body = "Body must be between 50 and 300 characters";
      valid = false;
    }

    setErrors(tempErrors);
    return valid;
  };

  const handleAddPost = () => {
    if (validateForm()) {
      dispatch(addPost(newPost)).then(() => {
        setNewPost({ title: "", body: "" });
        toast.success("Your post has been added successfully");
      });
    }
  };

  const handleShowUpdateModal = (post) => {
    setShowUpdateModal(true);
    setCurrentPost(post);
  };

  const handleShowPostModal = (post) => {
    setCurrentPost(post);
    setShowPostModal(true);
  };

  const handleUpdatePost = () => {
    const updatedPostData = { title: currentPost.title, body: currentPost.body };
    dispatch(updatePost({ id: currentPost.id, updatedData: updatedPostData })).finally(() => {
      handleCloseUpdateModal();
      toast.success("Your post has been updated successfully");
    });
  };

  const handleDeletePost = (id) => {
    dispatch(deletePost(id)).then(() => {
      toast.success("Your post has been deleted successfully");
    });
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <div className="posts-container">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              {allPosts.map((post) => (
                <div className="card post-item" key={post.id}>
                  <div className="card-body">
                    <h5>{post.id} - {post.title}</h5>
                    <p className="card-text">{post.body}</p>
                    <div className="postControlButtons">
                      <button
                        className="btn btn-primary"
                        onClick={() => handleShowUpdateModal(post)}
                      >
                        <FontAwesomeIcon icon={faEdit} /> Update
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDeletePost(post.id)}
                      >
                        <FontAwesomeIcon icon={faTrashAlt} /> Delete
                      </button>
                      <button
                        className="btn btn-info"
                        onClick={() => handleShowPostModal(post)}
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="col-lg-4">
              <div className="add-post-form">
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Title"
                  value={newPost.title}
                  onChange={(e) => {
                    setNewPost({ ...newPost, title: e.target.value });
                  }}
                />
                {errors.title && <p className="error-message">{errors.title}</p>}
                
                <textarea
                  className="form-control mb-2"
                  placeholder="Body"
                  rows="4"
                  value={newPost.body}
                  onChange={(e) => {
                    setNewPost({ ...newPost, body: e.target.value });
                  }}
                />
                {errors.body && <p className="error-message">{errors.body}</p>}
                
                <button
                  className="btn btn-success"
                  onClick={handleAddPost}
                  disabled={loading} // Disable button only while loading
                >
                  <FontAwesomeIcon icon={faAdd} /> Add Post
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <UpdateModal
        show={showUpdateModal}
        handleCloseModal={handleCloseUpdateModal}
        currentPost={currentPost}
        handleChangedData={setCurrentPost}
        handleUpdatePost={handleUpdatePost}
      />
      <PostModal
        show={showPostModal}
        onClose={handleClosePostModal}
        post={currentPost}
      />
      <ToastContainer />
    </>
  );
}

export default Home;
