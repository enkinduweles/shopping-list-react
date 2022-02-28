import { useState, useEffect } from 'react';
import {
  Col,
  Container,
  Form,
  Row,
  Button,
  Card,
  Toast,
} from 'react-bootstrap';

const dateFormat = new Intl.DateTimeFormat('pt-br', {
  timeStyle: 'short',
  dateStyle: 'short',
});

const Contatos = () => {
  const url = 'http://localhost:5000/message';
  const [messages, setMessages] = useState([]);
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');
  const [validator, setValidator] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(url);
      const data = await response.json();

      const dataFormatted = data.map((item) => {
        return {
          ...item,
          created_at: dateFormat.format(Date.parse(item.created_at)),
        };
      });

      dataFormatted.sort((a, b) => {
        if (a.created_at > b.created_at) {
          return -1;
        }
        if (a.created_at < b.created_at) {
          return 1;
        }

        return 0;
      });
      setMessages(dataFormatted);
    };
    fetchData();
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();

    setValidator(false);
    if (author.length <= 0 || content.length <= 0) {
      console.log('hi');
      return setValidator(!validator);
    }
    const bodyForm = {
      email: author,
      message: content,
    };

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bodyForm),
    }).then(() => {
      setShowToast(true);
      setToastMessage('Mensagem enviada com sucesso');
    });

    setAuthor('');
    setContent('');
  };

  useEffect(() => {
    if (showToast) {
      const fetchData = async () => {
        const response = await fetch(url);
        const data = await response.json();

        const dataFormatted = data.map((item) => {
          return {
            ...item,
            created_at: dateFormat.format(Date.parse(item.created_at)),
          };
        });

        dataFormatted.sort((a, b) => {
          if (a.created_at > b.created_at) {
            return -1;
          }
          if (a.created_at < b.created_at) {
            return 1;
          }

          return 0;
        });
        setMessages(dataFormatted);
      };
      fetchData();
    }
  }, [showToast]);

  const deleteMessage = (id) => {
    fetch(`${url}/${id}`, {
      method: 'DELETE',
    }).then(() => {
      setShowToast(true);
      setToastMessage('Mensagem deletada com sucesso');
    });
  };

  return (
    <Container fluid className='bg-dark position-relative'>
      <Row className='py-3'>
        <Col xs={12} md={5}>
          <div className='bg-light p-3 rounded-2'>
            <h3>Contato</h3>
            <Form onSubmit={sendMessage}>
              <Form.Group className='mb-3' controlId='sendName'>
                <Form.Label>Nome</Form.Label>
                <Form.Control
                  onChange={(event) => setAuthor(event.target.value)}
                  value={author}
                  placeholder='Digite seu nome'
                />
              </Form.Group>
              <Form.Group className='mb-3' controlId='sendMessage'>
                <Form.Label>Mensagem</Form.Label>
                <Form.Control
                  onChange={(event) => setContent(event.target.value)}
                  value={content}
                  as='textarea'
                  placeholder='Digite sua mensagem'
                />
              </Form.Group>
              <Button variant='primary' type='submit'>
                Enviar
              </Button>
            </Form>
          </div>
        </Col>
        <Col xs={12} md={7} className='mt-4 mt-md-0 order-md-first'>
          <Container fluid className='bg-light py-3 rounded-2'>
            <h3 className='mb-4'>Mensagens</h3>
            {messages.map((content) => {
              return (
                <Card bg='dark' text='light' key={content.id} className='mt-2'>
                  <Card.Body className='position-relative'>
                    <Card.Title>{content.email}</Card.Title>
                    <Card.Text>{content.message}</Card.Text>
                    <Card.Text className='text-light text-end'>
                      {content.created_at}
                    </Card.Text>
                    <Button
                      variant='outline-light border-0 position-absolute end-0 top-0 fs-5'
                      onClick={() => deleteMessage(content.id)}
                    >
                      <i className='bi bi-trash'></i>
                    </Button>
                  </Card.Body>
                </Card>
              );
            })}
          </Container>
        </Col>
      </Row>
      <div className='position-fixed bottom-0 end-0 me-2 mb-2'>
        <Toast
          onClose={() => setShowToast(false)}
          show={showToast}
          delay={5000}
          autohide
          bg='light'
        >
          <Toast.Body className='text-success fs-5'>{toastMessage}</Toast.Body>
        </Toast>
      </div>
    </Container>
  );
};

export default Contatos;
