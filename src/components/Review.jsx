import React from "react";
import { Faker } from "@faker-js/faker";
import { Card } from "react-bootstrap";

const Review = ({ numOfReviews, locale }) => {
  const reviews = [];

  const faker = new Faker({
    locale: locale,
  });

  for (let i = 0; i < numOfReviews; i++) {
    reviews.push({
      text: faker.lorem.paragraph(),
      author: {
        name: faker.person.fullName(),
        address: faker.location.streetAddress(),
      },
    });
  }

  return (
    <div>
      {reviews.map((review, index) => (
        <Card key={index + review} className="w-75">
          <Card.Body>
            <Card.Text>{review.text}</Card.Text>
            <Card.Text className="text-muted">
              By {review.author.name}, {review.author.address}
            </Card.Text>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default Review;
