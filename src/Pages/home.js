import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Item from '../components/Item';
import Card from '../components/Card';
import {
  Container,
  Row,
  Col,
  Button,
  Offcanvas,
  ListGroup,
} from 'react-bootstrap';
import Cart from '../components/Cart';
import * as cartActions from '../components/store/actions/cart';
import * as productActions from '../components/store/actions/product';

const HomePage = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [activatedFilters, setActivatedFilters] = useState({});

  const products = useSelector((state) => state.products.list);
  const filteredProducts = useSelector((state) => state.products.filteredList);
  const dispatch = useDispatch();

  const catagories = products.map((category) => {
    const container = {};
    container['id'] = category.id_categorys;
    container['name'] = category.name_categorys;
    return container;
  });
  const category = catagories
    .map(JSON.stringify)
    .filter(function (item, index, arr) {
      return arr.indexOf(item, index + 1) === -1;
    })
    .map(JSON.parse);

  const arrayCategory = catagories.map((category) => category.name);
  let count = {};

  for (let i = 0; i < arrayCategory.length; i++) {
    let key = arrayCategory[i];
    count[key] = count[key] ? count[key] + 1 : 1;
  }

  useEffect(() => {
    dispatch(productActions.FilterProducts(activatedFilters));
  }, [activatedFilters, dispatch]);

  const checkedHandler = (event) => {
    const { name, checked } = event.target;

    setActivatedFilters((prevState) => {
      return { ...prevState, [name]: checked };
    });
  };

  const productsSelected =
    filteredProducts.length > 0 ? filteredProducts : products;

  return (
    <Container fluid className='bg-dark pt-md-3 flex-grow-1'>
      <Row>
        <Col xs={12} md={4} className='bg-dark'>
          <div className='d-block d-md-none my-3 d-flex justify-content-end'>
            <Button variant='light' onClick={() => setShowMenu(true)}>
              Filtro
              <i className='bi bi-funnel ms-1'></i>
            </Button>
          </div>

          <Container
            fluid
            className='bg-light pt-3 d-none d-md-block'
            style={{ height: '40vh' }}
          >
            <h5 className='text-primary'>Categorias</h5>
            <ListGroup as='ul'>
              {category.map((category) => {
                return (
                  <Item
                    key={category.id}
                    name={category.name}
                    details={count[category.name]}
                    onCheck={checkedHandler}
                  />
                );
              })}
            </ListGroup>
          </Container>

          <Offcanvas
            show={showMenu}
            onHide={() => setShowMenu(false)}
            placement='end'
            className='bg-light'
          >
            <Offcanvas.Header closeButton className='text-primary'>
              <Offcanvas.Title>Categorias</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body className='text-primary'>
              <ListGroup as='ul'>
                {category.map((category) => {
                  return (
                    <Item
                      key={category.id}
                      name={category.name}
                      details={count[category.name]}
                      onCheck={checkedHandler}
                    />
                  );
                })}
              </ListGroup>
            </Offcanvas.Body>
          </Offcanvas>
        </Col>
        <Col xs={12} md={8}>
          <Row xs={2} sm={2} md={3}>
            {productsSelected.map((item) => {
              return (
                <Col key={item.id_product} className='mb-4'>
                  <Card product={item}>{item.name_product}</Card>
                </Col>
              );
            })}
          </Row>
        </Col>
      </Row>
      <Cart
        variant='info'
        className='d-lg-none position-fixed py-0 bottom-0 end-0 me-4 mb-4 fs-4'
        onShowModal={() => dispatch(cartActions.ShowItems(true))}
      />
    </Container>
  );
};

export default HomePage;
