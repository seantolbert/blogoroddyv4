import "./App.css";
import useFetch from "./hooks/useFetch";

function App() {
  const imageUrl = "http://localhost:8000/api/v2/images/";
  const url =
    "http://localhost:8000/api/v2/pages/?type=blog.BlogPage&fields=title,date,description,body,main_image";
  const { data: posts, isLoading, error } = useFetch(url);
  const { imageData } = useFetch(imageUrl);

  if (isLoading) {
    return <div>its loading</div>;
  }

  if (error) {
    return <p>an error occurred</p>;
  }

  return (
    <div>
      <div>
        {posts &&
          posts.map((post) => (
            <div className="posts" key={post.id}>
              <p className="title">
                <a href={`http://localhost:8000/blog/${post.meta.slug}`}>
                  {post.title}
                </a>
              </p>
              <p className="description">{post.description}</p>
              <img
                src={`http://localhost:8000${post.main_image.meta.download_url}`}
                alt="will it work"
              />
              {post.body &&
                post.body.map((el) => (
                  <div key={el.id}>
                    <div dangerouslySetInnerHTML={{ __html: el.value }}></div>
                    {el.type === "image" && <img src="http://localhost:8000/media/images/tolbertcologo_nKwcQ81.max-700x600.png
                    " alt="streamfield image" />}
                    {/* <img src={imageUrl + el.value  } alt="{imageData}" /> */}
                  </div>
                ))} 
            </div>
          ))}
      </div>
    </div>
  );
}

export default App;
