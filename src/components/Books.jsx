import { useState, useEffect } from "react";
import { Table, Container, Carousel } from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroll-component";
import { fr, en, ru, Faker } from "@faker-js/faker";
import Book from "./Book";
import Csv from "./Csv";

const Books = ({ books, gallery }) => {
  const [data, setData] = useState([]);
  const [show, setShow] = useState("");

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
  }, [books, gallery]);

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
          height: gallery ? 700 : 380,
          width: gallery ? 1000 : 280,
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
  const display = (index) => {
    if (show === index) {
      setShow("");
      return;
    }
    setShow(index);
  };

  return (
    <>
      <Csv data={data} />
      {books.seed ? (
        <Container className={gallery && "d-flex justify-content-center"}>
          <Carousel className={gallery ? "w-50" : "d-none"}>
            {data.map((book) => (
              <Carousel.Item key={book.id + book.isbn}>
                <img src={book.cover} alt={book.title} />
                <Carousel.Caption>
                  <h3>{book.title}</h3>
                  <p>{book.author}</p>
                </Carousel.Caption>
              </Carousel.Item>
            ))}
          </Carousel>

          <InfiniteScroll
            dataLength={data.length}
            className={gallery && "d-none"}
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
                    onClick={() => display(index)}
                    show={show}
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
