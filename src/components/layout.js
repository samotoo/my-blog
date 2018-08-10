import React from 'react';
import { Link } from 'gatsby';
import { rhythm, scale } from '../utils/typography';
import Sidebar from './sidebar';
import get from 'lodash/get';

class Template extends React.Component {
  componentDidMount() {
    // This component is the common parent component. When the component is
    // mounted, try to do the in page anchor jump, because the page may get
    // refreshed.
    const hash = get(this.props, 'location.hash');
    if (hash) {
      setTimeout(() => {
        let id = hash.substring(1);
        // DBCS characters are encoded in react-router hash, we need to decode
        // it to query the element.
        id = decodeURIComponent(id);

        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView();
        }
      }, 0);
    }
  }

  render() {
    const { children } = this.props;
    const header = (
      <h1
        style={{
          ...scale(1.5),
          marginBottom: rhythm(1.5),
          marginTop: 0,
          borderBottom: '1px solid #ddd',
          paddingBottom: '1rem',
        }}
      >
        <Link
          style={{
            boxShadow: 'none',
            textDecoration: 'none',
            color: 'inherit',
          }}
          to={'/'}
        >
          Leon's Blog
        </Link>
      </h1>
    );

    return (
      <div
        style={{
          marginLeft: 'auto',
          marginRight: 'auto',
          maxWidth: rhythm(42),
          padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
        }}
      >
        {header}
        <div style={{
          width: '75%',
          display: 'inline-block',
          paddingRight: '2rem',
        }}>
          {children}
        </div>
        <div style={{
          width: '25%',
          display: 'inline-block',
          verticalAlign: 'top',
          paddingLeft: '2rem',
          borderLeft: '1px solid #ddd',
        }}>
          <Sidebar />
        </div>
        <hr style={{
          marginTop: '30px',
          marginBottom: '5px',
          border: 0,
          height: '1px',
          background: 'none',
          backgroundImage: 'linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0))',
        }} />
        <div style={{ textAlign: 'center', fontSize: '0.9rem', marginTop: '15px' }}>
          &copy; 2018 Leon <a href={'https://creativecommons.org/licenses/by-nc-sa/4.0/'}>CC BY-NC-SA 4.0</a>
          <br />
          Hosted on <a href={'https://www.netlify.com/'}>Netlify</a> |
          Powered by <a href={'https://www.gatsbyjs.org/'}>Gatsby</a> & <a
          href={'https://www.contentful.com/'}>Contentful</a>
          <br />
          Theme inspired by <a href={'https://github.com/tufu9441/maupassant-hexo'}>Maupassant</a>
        </div>
      </div>
    );
  }
}

export default Template;
