import { useState, useEffect } from "react";
import { Button, Dropdown, Form, InputGroup } from "react-bootstrap";

const Controllers = ({ setBooks, gallery, setGallery }) => {
  const [language, setLanguage] = useState("en");
  const [seed, setSeed] = useState("");
  const [likes, setLikes] = useState(5);
  const [review, setReview] = useState(0);

  const handleGenerate = () => {
    const randomSeed = Math.floor(Math.random() * 10000);
    const finalSeed = seed || randomSeed;

    setBooks({
      language,
      seed: finalSeed,
      likes,
      review,
    });
  };

  useEffect(() => {
    handleGenerate();
  }, [language, seed, likes, review]);

  return (
    <div className="sticky-top bg-light p-3">
      <div className="d-flex align-items-center justify-content-between">
        <Dropdown>
          <Dropdown.Toggle variant="secondary" id="dropdown-basic">
            {language}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => setLanguage("en")}>En</Dropdown.Item>
            <Dropdown.Item onClick={() => setLanguage("ru")}>Ru</Dropdown.Item>
            <Dropdown.Item onClick={() => setLanguage("fr")}>Fr</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <Form.Group>
          <InputGroup.Text>Seed</InputGroup.Text>
          <Form.Control
            type="number"
            value={seed}
            onChange={(e) => setSeed(e.target.value)}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Likes: {likes}</Form.Label>
          <Form.Range
            className="mx-3"
            min={0}
            max={10}
            step={0.1}
            value={likes}
            onChange={(e) => setLikes(Number(e.target.value))}
          />
        </Form.Group>

        <Form.Group>
          <InputGroup.Text>Review</InputGroup.Text>
          <Form.Control
            type="number"
            value={review}
            onChange={(e) => setReview(Number(e.target.value))}
          />
        </Form.Group>

        <Button onClick={() => setGallery(!gallery)}>
          {gallery ? (
            <i className="bi bi-table" />
          ) : (
            <i className="bi bi-images" />
          )}
        </Button>
      </div>
    </div>
  );
};

export default Controllers;
