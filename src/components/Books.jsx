import { useState, useEffect } from "react";
import { Table, Container } from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroll-component";
import { fr, en, ru, Faker } from "@faker-js/faker";

const Books = ({ books }) => {
  const [data, setData] = useState([]);

  const chooseLanguage = () => {
    switch (books.language) {
      case "fr":
        return fr;
      case "ru":
        return ru;
      default:
        return en;
    }
  };

  const faker = new Faker({
    locale: [chooseLanguage(), en],
  });

  useEffect(() => {
    faker.seed(Number(books.seed));

    const initialData = generateData(books.likes, books.review, 20);
    setData(initialData);
  }, [books]);

  const fetchMoreData = () => {
    const newData = generateData(books.likes, books.review, 10);
    setData([...data, ...newData]);
  };

  const generateData = (likes, review, count) => {
    const data = [];
    for (let i = 0; i < count; i++) {
      data.push({
        id: i + 1,
        cover: faker.image.urlPicsumPhotos(), //try others too https://fakerjs.dev/api/image.html
        isbn: faker.commerce.isbn(),
        title: faker.book.title(),
        author: faker.book.author(),
        publisher: faker.book.publisher(),
        likes: Math.round(likes * 10) / 10,
        review: Math.round(review * 10) / 10,
        // how does this create controlled randomness?
      });
    }
    return data;
  };

  return (
    <Container>
      <InfiniteScroll
        dataLength={data.length}
        hasMore={true}
        next={fetchMoreData}
        loader={<div className="loader text-center">Loading...</div>}
        endMessage={
          <div className="end-message text-center">No more books to show</div>
        }
      >
        <Table sticky="top">
          <thead>
            <tr>
              <th>#</th>
              <th>ISBN</th>
              <th>Title</th>
              <th>Author(s)</th>
              <th>Publisher</th>
            </tr>
          </thead>
          <tbody>
            {data.map((book, index) => (
              <tr key={book.id + book.isbn}>
                <td>{index + 1}</td>
                <td>{book.isbn}</td>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.publisher}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </InfiniteScroll>
    </Container>
  );
};

export default Books;
