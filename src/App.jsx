import { useState } from "react";
import Controllers from "./components/Controllers";
import Books from "./components/Books";

function App() {
  const [books, setBooks] = useState({});
  return (
    <>
      <Controllers setBooks={setBooks} />
      <Books books={books} />
    </>
  );
}

export default App;
