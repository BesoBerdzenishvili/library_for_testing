import { useState } from "react";
import Controllers from "./components/Controllers";
import Books from "./components/Books";

function App() {
  const [books, setBooks] = useState({});
  const [gallery, setGallery] = useState(false);

  return (
    <>
      <Controllers
        setBooks={setBooks}
        setGallery={setGallery}
        gallery={gallery}
      />
      <Books books={books} gallery={gallery} />
    </>
  );
}

export default App;
