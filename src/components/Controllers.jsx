import React, { useState } from "react";
import { Button, Dropdown, Form, InputGroup } from "react-bootstrap";

const Controllers = ({ setBooks }) => {
  const [language, setLanguage] = useState("En");
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

  return (
    <div className="sticky-top bg-light p-3">
      <div className="d-flex align-items-center justify-content-between">
        <Dropdown>
          <Dropdown.Toggle variant="secondary" id="dropdown-basic">
            {language}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => setLanguage("En")}>En</Dropdown.Item>
            <Dropdown.Item onClick={() => setLanguage("Ru")}>Ru</Dropdown.Item>
            <Dropdown.Item onClick={() => setLanguage("Fr")}>Fr</Dropdown.Item>
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

        <Button variant="primary" onClick={handleGenerate}>
          GENERATE
        </Button>

        <Form.Group>
          <Form.Label>Likes: {likes}</Form.Label>
          <Form.Range
            className="mx-3"
            min={0}
            max={10}
            step={0.1}
            value={likes}
            onChange={(e) => setLikes(e.target.value)}
          />
        </Form.Group>

        <Form.Group>
          <InputGroup.Text>Review</InputGroup.Text>
          <Form.Control
            type="number"
            value={review}
            onChange={(e) => setReview(e.target.value)}
          />
        </Form.Group>
      </div>
    </div>
  );
};

export default Controllers;
