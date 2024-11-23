import React, { useState } from "react";
import Review from "./Review";

export default function Book({ book, index, language, onClick, show }) {
  const random = (property) => {
    return Math.random() < 0.6 ? Math.ceil(property) : Math.floor(property);
  };
  return (
    <>
      <tr onClick={onClick} className="cursor-pointer">
        <td>
          {show === index ? <span>&#11206;</span> : <span>&#11205;</span>}
        </td>
        <td>{index + 1}</td>
        <td>{book.isbn}</td>
        <td>{book.title}</td>
        <td>{book.author}</td>
        <td>{book.publisher}</td>
      </tr>
      {show === index && (
        <div className="position-absolute w-100">
          <div className="d-flex">
            <img src={book.cover} alt={book.title} className="cover" />
            <div className="mx-5">
              <h2>{book.title}</h2>
              <h3>{book.author}</h3>
              <h4>{book.publisher}</h4>
              <button className="bg-primary border-0 rounded p-1 text-light">
                {random(book.likes)}
                <i className="bi bi-hand-thumbs-up-fill m-1 " />
              </button>
              <Review numOfReviews={random(book.review)} locale={language} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
