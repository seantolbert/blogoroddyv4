import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { useFetch } from "./hooks/useFetch";

function App() {
  const [count, setCount] = useState(0);
  const url = "http://localhost:8000/api/v2/pages";
  const { data: posts, isLoading, error } = useFetch(url);

  if (isLoading) {
    return <div>its loading</div>;
  }

  if (error) {
    return <p>an error occurred</p>;
  }

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          {posts && posts.map((post) => (
            <p key={post.name}>{post.description}</p>
          ))}
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  );
}

export default App;
