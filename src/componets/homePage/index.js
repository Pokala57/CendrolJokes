import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import JokeCard from '../JokeCard/JokeCard';
import CustomSpinner from '../Spinner/Spinner';
import './index.css';
import Spinner from 'react-bootstrap/Spinner';

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [popLoding,setPopLoding]= useState(true);
  const [title, setTitle] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [popTitle, setPopTitle] = useState("");
  const [popUpJoke,setPopUpJoke]= useState("")

  useEffect(() => {
    fetch('https://api.chucknorris.io/jokes/categories')
      .then((response) => response.json())
      .then((data) => {
        setTitle(data);
        setIsLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleRefresh = (jokeInPop) => {
    setPopLoding(true)
    fetch(`https://api.chucknorris.io/jokes/random?category=${jokeInPop}`)
      .then((response) => response.json())
      .then((data) => {
        setPopUpJoke(data.value);
        setPopLoding(false)
      })
      .catch((error) => console.log(error));
  };

  const handlePopup = (joke) => {
    setShowPopup(!showPopup);
    setPopTitle(joke);
    handleRefresh(joke)
  };

  



  const emojis = ['😀', '😂', '🤣', '😃', '😄', '😆', '😉', '😊', '😎', '🙂', '😁', '😝', '😜', '🥹', '🤫', '🤭'];

  return (
    <div className='home'>
       {isLoading ? (
            <CustomSpinner/>
          ) : (
      <Container fluid className="project-section">
        <Row className="mb-5 rowclass" style={{ justifyContent: 'center', paddingBottom: '10px' }}>
          <div className="userName d-flex align-items-center justify-content-center">
            <h1 >Chuck Norries</h1>
          </div>

         
            {title.map((joke, index) => (
              <Col key={index} md={6} lg={4} xl={3} className="project-card">
                 <JokeCard joke={joke} emoji={emojis[index]} onClick={() => handlePopup(joke)} />
              </Col>
            ))}
          
        </Row>
      </Container>)}

      <Modal show={showPopup} onHide={handlePopup} centered className='modalPop'>

        <Modal.Header closeButton  className=" text-white">
          <Modal.Title  className='popTitle'>{popTitle}</Modal.Title>
        </Modal.Header>


        <div className='fullCont'>
        { popLoding? (
            <div className="popUpJoke  d-flex align-items-center justify-content-center">
              <Spinner animation="border" variant="primary" />
            </div>
          ) : (
        <Modal.Body className='popUpJoke  d-flex align-items-center justify-content-center'>
          <h4>{popUpJoke}</h4>
        </Modal.Body>
         
          )}
        <Modal.Footer className='popFooter'>
          <Button variant="secondary" onClick={() => handleRefresh(popTitle)}>
            Next Joke
          </Button>
        </Modal.Footer>
        </div>
      </Modal>
    </div>
  );
};

export default HomePage;
