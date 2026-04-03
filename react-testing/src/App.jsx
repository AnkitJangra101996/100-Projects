import React, { useEffect } from "react";
import useCounter from "./hooks/counter";
import useTheme from "./hooks/theme";
import useFetch from "./hooks/usefetch";

const App = () => {
  const { count, increment, decrement } = useCounter();
  const { theme, toggleTheme } = useTheme();
  const [postId, setPostId] = React.useState(() => {
    return Math.floor(Math.random() * 10) + 1;
  });
  const { data, loading, error, refetch } = useFetch(
    `https://dummyjson.com/posts/${postId}`
  );

  const handleNewQuote = () => {
    const newPostId = Math.floor(Math.random() * 10) + 1;
    setPostId(newPostId);
    refetch();
  };

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <main style={{ padding: "0 20px" }}>
      <h1 style={{ marginBottom: "20px" }}>Custom Hooks</h1>
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            alignItems: "center",
            border: "1px solid black",
            padding: "10px",
            borderRadius: "10px",
          }}
        >
          <h2>Counter Custom Hook - {count}</h2>
          <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
            <button onClick={increment}>Increment</button>
            <button onClick={decrement}>Decrement</button>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            alignItems: "center",
            border: "1px solid black",
            padding: "10px",
            borderRadius: "10px",
          }}
        >
          <h2>Theme Custom Hook - Current Theme is {theme}</h2>
          <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
            <button onClick={toggleTheme}>Toggle Theme</button>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            alignItems: "center",
            border: "1px solid black",
            padding: "10px",
            borderRadius: "10px",
          }}
        >
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Error: {error}</p>
          ) : (
            <div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "10px",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <h2>Data from useFetch Custom Hook</h2>
                <button onClick={handleNewQuote}>Generate New Quote</button>
              </div>
              <h2>Title - {data?.title}</h2>
              <p>{data?.body}</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default App;
