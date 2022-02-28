import React from 'react';
import { Badge, Button, Container, Modal } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import * as cartActions from '../store/actions/cart';

const Cart = ({ variant, className, onShowModal }) => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  let totalPrice = 0;

  for (let i = 0; i < cart.Cart.length; i++) {
    totalPrice += cart.Cart[i].price * cart.Cart[i].quantity;
  }

  if (cart.value > 0) {
    localStorage.setItem('dioshopping: cart', JSON.stringify(cart));
  }

  return (
    <>
      <Button
        variant={variant}
        className={`position-relative ${className}`}
        onClick={() => onShowModal()}
        size='sm'
      >
        <i className='bi bi-cart fs-3'></i>
        <Badge
          className='position-absolute top-0 start-100 translate-middle'
          pill
        >
          {cart.value}
        </Badge>
      </Button>

      <Modal
        scrollable
        show={cart.showItems}
        onHide={() => dispatch(cartActions.ShowItems(false))}
        aria-labelledby='contained-modal-title-vcenter'
        centered
        className='text-primary'
      >
        <Modal.Header closeButton className='bg-light'>
          <Modal.Title id='contained-modal-title-vcenter' className='fw-bold'>
            Meu carrinho
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className='bg-dark'>
          <Container fluid className='bg-light rounded-2 mb-2'>
            {cart.Cart.map((item) => {
              return (
                <div
                  key={item.id}
                  className='d-flex align-items-center mb-4 position-relative'
                >
                  <div className='me-3 h-100'>
                    <img
                      className='img-fluid img-thumbnail'
                      src={item.image}
                      alt={item.Name}
                      width='100px'
                    />
                  </div>
                  <div className='h-100'>
                    <h4>{item.name}</h4>
                    <p>R$ {item.price.toFixed(2)}</p>
                    <div className='d-flex align-items-center'>
                      <Badge
                        className='border-0'
                        bg='secondary'
                        as='button'
                        onClick={() =>
                          dispatch(cartActions.RemoveItem(cart, item))
                        }
                      >
                        -
                      </Badge>
                      <span className='fs-4 mx-2'>{item.quantity}</span>
                      <Badge
                        className='border-0'
                        bg='primary'
                        as='button'
                        onClick={() =>
                          dispatch(cartActions.AddItem(cart, item))
                        }
                      >
                        +
                      </Badge>
                    </div>
                  </div>
                  <Button
                    variant='outline-primary border-0 position-absolute end-0 top-0 fs-5'
                    onClick={() => dispatch(cartActions.DeleteItem(cart, item))}
                  >
                    <i class='bi bi-trash'></i>
                  </Button>
                </div>
              );
            })}
            <div className='d-flex justify-content-between border-top border-secondary border-2 pt-2'>
              <p className='fw-bold'>Total ({cart.value}):</p>
              <span>R$ {totalPrice.toFixed(2)}</span>
            </div>
          </Container>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Cart;
