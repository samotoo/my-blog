import React from 'react';
import {Link, graphql} from 'gatsby';
import get from 'lodash/get';
import {rhythm} from '../utils/typography';
import Layout from '../components/layout';
import Head from '../components/head';
import DateTime from '../components/date-time';
import ReadMore from '../components/read-more';
import CalendarIcon from 'react-icons/lib/fa/calendar-plus-o';

class BlogIndex extends React.Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title');
    const posts = get(this, 'props.data.allContentfulPost.edges');

    return (
      <Layout location={this.props.location}>
        <Head title={siteTitle} />
        {posts.map(({node}) => {
          const title = get(node, 'title');
          const excerpt = get(node, 'content.childMarkdownRemark.excerpt');
          const createdAt = get(node, 'createdAt');

          return (
            <div key={node.slug}>
              <h3
                style={{
                  marginBottom: rhythm(1 / 4),
                }}
              >
                <Link to={`/posts/${node.slug}`}>{title}</Link>
              </h3>
              <div style={{
                fontSize: '0.85rem',
                paddingTop: '10px',
                paddingBottom: '14px'
              }}>
                <CalendarIcon style={{
                  position: 'relative',
                  top: '-0.125em',
                  marginRight: '5px'
                }} />
                <DateTime>{createdAt}</DateTime>
              </div>
              <div>
                {excerpt}
              </div>
              <div style={{paddingTop: '10px'}}>
                <Link to={`/posts/${node.slug}`}>
                  <ReadMore />
                </Link>
              </div>
            </div>
          )
        })}
      </Layout>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        title
      }
    }
    allContentfulPost {
      edges {
        node {
          title
          slug
          content {
            childMarkdownRemark {
              excerpt(pruneLength: 320)
            }
          }
          createdAt
        }
      }
    }
  }
`;
