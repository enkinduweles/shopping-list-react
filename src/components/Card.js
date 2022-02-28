import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as cartActions from './store/actions/cart';
import { Button, Card } from 'react-bootstrap';

const ProductItem = ({ product, children }) => {
  const cart = useSelector((state) => state.cart.value);
  const dispatch = useDispatch();

  return (
    <Card className='h-100 bg-light' text='primary'>
      <Card.Img
        variant='top'
        src={product.image}
        style={{ maxHeight: '200px', objectFit: 'contain' }}
      />
      <Card.Body className='d-flex flex-column align-items-start'>
        <Card.Title className='flex-fill'>{children}</Card.Title>
        <Card.Text className='flex-fill'>
          R$ {product.price.toFixed(2)}
        </Card.Text>
        <Button
          className='flex-fill'
          variant='dark'
          onClick={() => dispatch(cartActions.Add(cart, product))}
        >
          Adicionar
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ProductItem;
