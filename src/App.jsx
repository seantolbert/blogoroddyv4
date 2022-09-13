import "./App.css";
import useFetch from "./hooks/useFetch";

function App() {
  // const url = "http://localhost:8000/api/v2/pages/";
  const url =
    "http://localhost:8000/api/v2/pages/?type=blog.BlogPage&fields=title,date,description,body";
  const { data: posts, isLoading, error } = useFetch(url);

  if (isLoading) {
    return <div>its loading</div>;
  }

  if (error) {
    return <p>an error occurred</p>;
  }

  return (
    <div>
      <div>
        {posts && posts.map((post) => (
          <p key={post.id}>{post.title}</p>)
          )}
      </div>
    </div>
  );
}

export default App;
