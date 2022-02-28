import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Cart from './Cart';
import * as cartActions from './store/actions/cart';

const Header = () => {
  const dispatch = useDispatch();

  return (
    <Navbar
      bg='light'
      expand='lg'
      variant='light'
      className='px-3 align-items-center'
    >
      <Navbar.Brand href='#home' className='text-primary'>
        DioShopping
      </Navbar.Brand>
      <Navbar.Toggle aria-controls='basic-navbar-nav' />
      <Navbar.Collapse id='basic-navbar-nav' className='w-100'>
        <Nav className='w-100 justify-content-end align-items-center'>
          <Link className='nav-link' to='/'>
            Home
          </Link>
          <Link className='nav-link' to='/contato'>
            Contato
          </Link>
          <Cart
            className='d-none d-lg-block'
            variant='outline-primary'
            onShowModal={() => dispatch(cartActions.ShowItems(true))}
          />
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
