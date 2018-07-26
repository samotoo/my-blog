import React from 'react';
import {Link, graphql} from 'gatsby';
import get from 'lodash/get';
import Layout from '../components/layout';
import Head from '../components/head';
import {rhythm} from '../utils/typography';
import icon32 from '../../static/logo/favicon-32.png';

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

          return (
            <div key={node.slug}>
              <h3
                style={{
                  marginBottom: rhythm(1 / 4),
                }}
              >
                <Link to={`/posts/${node.slug}`}>{title}</Link>
              </h3>
              <div>
                {excerpt}
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
        }
      }
    }
  }
`;
