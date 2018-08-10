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
      <div
        style={{
          marginLeft: 'auto',
          marginRight: 'auto',
          maxWidth: rhythm(42),
          paddingBottom: '1rem',
          paddingTop: '1rem',
        }}
      >
        <h1
          style={{
            ...scale(1.5),
            marginTop: '0',
            marginBottom: '0',
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
      </div>
    );

    return (
      <div>
        <div
          id={'header'}
          style={{
            backgroundColor: '#ffffff',
            borderBottom: '1px solid #ddd',
            boxShadow: '0 2px 5px -2px rgba(0, 0, 0, 0.05)',
            marginBottom: rhythm(1.5),
            position: 'relative',
            zIndex: 1,
          }}
        >
          {header}
        </div>
        <div
          id={'content'}
          style={{
            marginLeft: 'auto',
            marginRight: 'auto',
            maxWidth: rhythm(42),
          }}
        >
          <div
            id={'mainview'}
            style={{
              width: '75%',
              display: 'inline-block',
            }}
          >
            <div style={{
              padding: '1rem 2rem 1rem 2rem',
              backgroundColor: '#ffffff',
              border: '1px solid #ddd',
              boxShadow: '0 2px 5px -2px rgba(0, 0, 0, 0.05)',
              marginRight: '1rem',
              position: 'relative',
              zIndex: 1,
            }}>
              {children}
            </div>
          </div>
          <div
            id={'sidebar'}
            style={{
              width: '25%',
              display: 'inline-block',
              verticalAlign: 'top',
            }}
          >
            <div style={{
              padding: '1rem 2rem 1rem 2rem',
              backgroundColor: '#ffffff',
              border: '1px solid #ddd',
              boxShadow: '0 2px 5px -2px rgba(0, 0, 0, 0.05)',
              marginLeft: '1rem',
              position: 'relative',
              zIndex: 1,
            }}>
              <Sidebar />
            </div>
          </div>
          <hr style={{
            marginTop: '30px',
            marginBottom: '5px',
            border: 0,
            height: '1px',
            background: 'none',
            backgroundImage: 'linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0))',
          }} />
          <div
            style={{
              textAlign: 'center',
              fontSize: '0.9rem',
              marginTop: '15px',
              marginBottom: '10px',
            }}
          >
            <span
              style={{
                position: 'relative',
                zIndex: '1',
              }}
            >
              &copy; 2018 Leon <a href={'https://creativecommons.org/licenses/by-nc-sa/4.0/'}>CC BY-NC-SA 4.0</a>
              <br />
              Hosted on <a href={'https://www.netlify.com/'}>Netlify</a> |
              Powered by <a href={'https://www.gatsbyjs.org/'}>Gatsby</a> & <a
              href={'https://www.contentful.com/'}>Contentful</a>
              <br />
              Theme inspired by <a href={'https://github.com/tufu9441/maupassant-hexo'}>Maupassant</a> & <a
              href={'https://github.com/lewis-geek/hexo-theme-Aath'}>Aath</a>
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default Template;
