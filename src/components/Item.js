import React from 'react';
import { Form, FormCheck, ListGroupItem } from 'react-bootstrap';

const Item = ({ name, details, onCheck }) => {
  return (
    <ListGroupItem as='li' className='border-0 bg-transparent ps-0'>
      <Form.Check
        type='checkbox'
        id={`checkbox-${name}`}
        label={`${name} (${details})`}
      >
        <FormCheck.Input
          type='checkbox'
          name={name}
          onChange={onCheck}
        ></FormCheck.Input>
        <FormCheck.Label>{`${name} (${details})`}</FormCheck.Label>
      </Form.Check>
    </ListGroupItem>
  );
};

export default Item;
