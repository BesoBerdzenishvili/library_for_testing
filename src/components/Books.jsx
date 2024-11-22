import { useState, useEffect } from "react";
import { Table, Container } from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroll-component";
import { fr, en, ru, Faker } from "@faker-js/faker";
import Book from "./Book";

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

    if (books.seed) {
      const newData = generateData(books.likes, books.review, 20);
      setData(newData);
    }
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
        cover: faker.image.urlLoremFlickr({
          height: 380,
          width: 280,
          category: "abstract",
        }),
        isbn: faker.commerce.isbn(),
        title: faker.book.title(),
        author: faker.book.author(),
        publisher: faker.book.publisher(),
        likes: likes,
        review: review,
      });
    }
    return data;
  };

  return (
    <>
      {books.seed ? (
        <Container>
          <InfiniteScroll
            dataLength={data.length}
            hasMore={true}
            next={fetchMoreData}
            loader={<div className="loader text-center">Loading...</div>}
            endMessage={
              <div className="end-message text-center">
                No more books to show
              </div>
            }
          >
            <Table sticky="top">
              <thead>
                <tr>
                  <th></th>
                  <th>#</th>
                  <th>ISBN</th>
                  <th>Title</th>
                  <th>Author(s)</th>
                  <th>Publisher</th>
                </tr>
              </thead>
              <tbody>
                {data.map((book, index) => (
                  <Book
                    key={book.id + book.isbn}
                    book={book}
                    index={index}
                    language={[chooseLanguage(), en]}
                  />
                ))}
              </tbody>
            </Table>
          </InfiniteScroll>
        </Container>
      ) : (
        <p className="text-center">Click "GENERATE" to generate Books</p>
      )}
    </>
  );
};

export default Books;
