import React from 'react';
import PropTypes from 'prop-types';

export default class HTML extends React.Component {
  render() {
    return (
      <html {...this.props.htmlAttributes}>
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        {this.props.headComponents}
      </head>
      <body {...this.props.bodyAttributes}>
      {this.props.preBodyComponents}
      <div
        key={`body`}
        id="___gatsby"
        dangerouslySetInnerHTML={{ __html: this.props.body }}
      />
      {/*
          Put the background here because I want to keep the backgroud unchanged
          when route changes. I tried to use react-particles-js but I failed to
          make it work. When the route changes, the page template component is
          unmounted and new template is mounted, so is the child particles component.
          As a result, the particles is refreshed and that's annoying. The wrapRootComponent
          API may be a more elegant solution but I didn't have time to try. So I use
          the "old" way to make particles persistent when route changes.
        */}
      <div id="particles-js" />
      <script src="/particles.js" />
      <script
        dangerouslySetInnerHTML={{
          __html: `
           particlesJS.load('particles-js', '/particles-config.json');
        `,
        }}
      />
      {this.props.postBodyComponents}
      </body>
      </html>
    );
  }
}

HTML.propTypes = {
  htmlAttributes: PropTypes.object,
  headComponents: PropTypes.array,
  bodyAttributes: PropTypes.object,
  preBodyComponents: PropTypes.array,
  body: PropTypes.string,
  postBodyComponents: PropTypes.array,
};
