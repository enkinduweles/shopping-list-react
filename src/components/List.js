import React from 'react';

const List = ({ children }) => {
  return <ul style={{ listStyle: 'none' }}>{children}</ul>;
};

export default List;
