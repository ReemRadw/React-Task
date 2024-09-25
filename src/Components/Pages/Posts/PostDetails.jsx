import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchComments } from "../../../reducers/postsSlice.js";

function PostDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const post = useSelector((state) =>
    state.postsData.posts.find((p) => p.id === parseInt(id))
  );
  const comments = useSelector((state) => state.postsData.comments);
  const loading = !post; // Loading if post is not found

  useEffect(() => {
    dispatch(fetchComments(id)); // Fetch comments when the component mounts
  }, [dispatch, id]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="post-details">
      <h1>{post.title}</h1>
      <p>{post.body}</p>

      <h2>Comments</h2>
      {comments.length > 0 ? (
        comments.map((comment) => (
          <div key={comment.id}>
            <h5>{comment.name}</h5>
            <p>{comment.body}</p>
          </div>
        ))
      ) : (
        <p>No comments available for this post.</p>
      )}
    </div>
  );
}

export default PostDetails;
