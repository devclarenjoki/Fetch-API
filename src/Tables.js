import { useState, useEffect } from "react";

const Tables = () => {
  const [selectPost, setSelectPost] = useState(false);
  const [selectComment, setSelectComment] = useState(false);
  const [posts, setPosts] = useState([]);
  const [selectedPosts, setSelectedPosts] = useState([]);
  const [selectedComments, setSelectedComments] = useState([]);
  const [loading, 
    setLoading] = useState(true);

  // Fetch data..
  useEffect(() => {
    // Fetch data..
    fetch("https://jsonplaceholder.typicode.com/posts/")
      .then((response) => response.json())
      .then((data) => {
        setPosts(data);
        setLoading(false);
      });
  }, []);

  // Handle click...
  const handleClick = (id, type) => {
    if (type === "user") {
      // Handle user click...
      // Filter posts by user id...
      const filtered = posts.filter((post) => post.userId === id);
      //  Set state...
      setSelectedPosts(filtered);
    } else {
      // Handle post click...
      // Fetch data..
      fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
        .then((response) => response.json())
        .then((data) => {
          setSelectedComments(data);
          setLoading(false);
        });
    }
  };

  // Posts...
  const postList = posts.map((post) => (
    <tr key={post.id}>
      <td
        style={{ cursor: "pointer" }}
        onClick={(event) => {
          event.preventDefault();
          // Set selected to true...
          setSelectPost(true);
          // Handle user click...
          handleClick(post.userId, "user");
        }}
      >
        {post.userId}
      </td>
      <td
        style={{ cursor: "pointer" }}
        onClick={(event) => {
          event.preventDefault();
          // Set selected to true...
          setSelectComment(true);
          // Handle post click...
          handleClick(post.id, "post");
        }}
      >
        {post.id}
      </td>
      <td>{post.title}</td>
      <td>{post.body}</td>
    </tr>
  ));

  // Selected user posts...
  const selectedPostsList = selectedPosts.map((post) => (
    <tr key={post.id}>
      <td>{post.userId}</td>
      <td>{post.id}</td>
      <td>{post.title}</td>
      <td>{post.body}</td>
    </tr>
  ));

  // Selected post comments...
  const selectedCommentsList = selectedComments.map((comment) => (
    <tr key={comment.id}>
      <td>{comment.name}</td>
    </tr>
  ));

  return loading ? (
    <div className="loading">Loading</div>
  ) : (
    <section className="container">
      <h1>Posts Tables</h1>
      <div style={{ marginBottom: 10, fontSize: 18, fontWeight: 600 }}>
        {selectPost ? "User Posts" : "All Posts"}
      </div>
      <div
        style={
          selectPost || selectComment
            ? { marginBottom: 10, fontSize: 18, fontWeight: 600 }
            : { display: "none" }
        }
      >
        <button
          type="button"
          onClick={() => {
            // Reset all selections...
            setSelectPost(false);
            setSelectComment(false);
          }}
        >
          Go Back
        </button>
      </div>
      <section>
        {selectPost ? (
          <table>
            <thead>
              <tr>
                <th>userId</th>
                <th>id</th>
                <th>title</th>
                <th>body</th>
              </tr>
            </thead>
            <tbody>{selectedPostsList}</tbody>
          </table>
        ) : selectComment ? (
          <table>
            <thead>
              <tr>
                <th>Comment name</th>
              </tr>
            </thead>
            <tbody>{selectedCommentsList}</tbody>
          </table>
        ) : (
          <table>
            <thead>
              <tr>
                <th>userId</th>
                <th>id</th>
                <th>title</th>
                <th>body</th>
              </tr>
            </thead>
            <tbody>{postList}</tbody>
          </table>
        )}
      </section>
    </section>
  );
};

export default Tables;
