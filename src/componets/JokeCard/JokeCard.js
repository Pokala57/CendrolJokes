import React from 'react';
import { Card } from 'react-bootstrap';

const JokeCard = ({ joke, emoji, onClick }) => {
  return (
    <Card className="project-card-view" onClick={onClick}>
      <Card.Body style={{ margin: '10px' }}>
        <Card.Title className="card-title">
          {joke} Jokes {emoji}
        </Card.Title>
        <p>Unlimited Jokes On {joke}</p>
        <Card.Text style={{ textAlign: 'justify' }} className="card-joke">
          {/* {joke.joke} */}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default JokeCard;
