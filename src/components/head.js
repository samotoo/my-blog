import Helmet from 'react-helmet';
import React from 'react';
import PropTypes from 'prop-types';
import icon32 from "../../static/logo/favicon-32.png";

// Head for all pages.
class Head extends React.Component {
  render() {
    return (
      <Helmet
        title={this.props.title}
        link={[
          {rel: 'shortcut icon', type: 'image/png', href: `${icon32}`}
        ]}
      />
    )
  }
}

Head.propTypes = {
  title: PropTypes.string
};

export default Head;
