import React from 'react';
import styled from 'styled-components';
import RightIcon from 'react-icons/lib/fa/caret-right';

const Container = styled.span`
  border: 1.2px solid #ddd;
  padding: 10px 8px 8px 12px;
  font-size: 0.85rem;
  border-radius: 4px;
  transition: box-shadow 0.2s;
  
  &:hover {
    box-shadow: 0.5px 0.5px grey;
  }
`;

class ReadMore extends React.Component{
  render() {
    return (
      <Container>阅读全文<RightIcon style={{position: 'relative', top: '-0.125em'}} /></Container>
    )
  }
}

export default ReadMore;
