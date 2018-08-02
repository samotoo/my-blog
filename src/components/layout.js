import React from 'react'
import { Link } from 'gatsby'
import { rhythm, scale } from '../utils/typography'

class Template extends React.Component {
  render() {
    const { location, children } = this.props;
    const rootPath = `${__PATH_PREFIX__}/`;
    let header;

    if (location.pathname === rootPath) {
      header = (
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
      )
    } else {
      header = (
        <h3
          style={{
            fontFamily: 'Montserrat, sans-serif',
            marginTop: 0,
            marginBottom: rhythm(-1),
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
        </h3>
      )
    }
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
        {children}
        <hr style={{
          marginTop: '30px',
          marginBottom: '5px',
          border: 0,
          height: '1px',
          background: 'none',
          backgroundImage: 'linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0))'
        }} />
        <div style={{textAlign: 'center', fontSize: '0.9rem', marginTop: '15px'}}>
          &copy; 2018 Leon <a href={'https://creativecommons.org/licenses/by-nc-sa/4.0/'}>CC BY-NC-SA 4.0</a>
          <br />
          Hosted on <a href={'https://www.netlify.com/'}>Netlify</a> |
          Powered by <a href={'https://www.gatsbyjs.org/'}>Gatsby</a> & <a href={'https://www.contentful.com/'}>Contentful</a>
          <br />
          Theme inspired by <a href={'https://github.com/tufu9441/maupassant-hexo'}>Maupassant</a>
        </div>
      </div>
    )
  }
}

export default Template
