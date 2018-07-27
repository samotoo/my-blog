import React from 'react';
import styled from 'styled-components';
import RightIcon from 'react-icons/lib/fa/caret-right';

const Container = styled.span`
  border: 1px solid #ddd;
  padding: 10px 8px 8px 12px;
  font-size: 0.85rem;
  border-radius: 5px;
  transition: box-shadow 0.2s;
  
  &:hover {
    box-shadow: 0.6px 0.6px #ddd;
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
