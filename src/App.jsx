import { useState } from "react";
import Controllers from "./components/Controllers";

function App() {
  const [books, setBooks] = useState({});
  return (
    <>
      <Controllers setBooks={setBooks} />
    </>
  );
}

export default App;
