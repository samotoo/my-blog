import React from 'react';
import ScrollToTop from 'react-scroll-up';
import UpIcon from 'react-icons/lib/fa/chevron-circle-up';
import styled from 'styled-components';

const StyledUpIcon = styled(UpIcon)`
  opacity: 0.4;
  transition: opacity 0.2s;
  &:hover {
    opacity: 1;
  }
`;

class BackToTop extends React.Component {
  render() {
    return (
      <ScrollToTop showUnder={768}>
        <StyledUpIcon size={60} />
      </ScrollToTop>
    );
  }
}

export default BackToTop;
