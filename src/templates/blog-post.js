import React from 'react';
import Head from '../components/head';
import BackToTop from '../components/back-to-top';
import get from 'lodash/get';
import { graphql, Link } from 'gatsby';
import Layout from '../components/layout';
import CalendarIcon from 'react-icons/lib/fa/calendar-plus-o';
import DateTime from '../components/date-time';
import CategoryIcon from 'react-icons/lib/fa/folder-open-o';
import CommentIcon from 'react-icons/lib/fa/commenting-o';
import TagIcon from 'react-icons/lib/fa/tag';
import { getSlug, LEAN_CLOUD_APP_ID, LEAN_CLOUD_APP_KEY, getValinePath } from '../utils/helpers';
import styled from 'styled-components';

const TagLink  = styled(Link)`
  font-size: 90%;
  margin-right: 8px;
`;

class BlogPostTemplate extends React.Component {
  constructor(props) {
    super(props);
    this.valinePath = getValinePath(props.location.pathname);
  }


  componentDidMount() {
    // Load valine after blog post component is mounted. Maybe there's a more
    // elegant way to integrate it with react, but this the best solution I can
    // think of so far.
    // Refer to https://github.com/gatsbyjs/gatsby/issues/309, Valine accesses
    // window.
    const Valine = require('valine');
    new Valine({
      el: '#vcomments',
      appId: LEAN_CLOUD_APP_ID,
      appKey: LEAN_CLOUD_APP_KEY,
      placeholder: '随便写点啥吧',
      // Gatsby uses react-router to manage path, so we can rely on it to get
      // the correct pathname. By default valine uses window.location.pathname,
      // it is strange that it sometimes cannot get the correct path. I guess
      // it is related to react integration.
      path: this.valinePath,
    });
  }

  render() {
    const siteTitle = get(this.props, 'data.site.siteMetadata.title');
    const post = this.props.data.contentfulPost;
    const createdAt = get(post, 'createdAt');
    const category = get(post, 'category.name');
    const tags = get(post, 'tags');

    return (
      <Layout location={this.props.location}>
        <Head title={`${post.title} | ${siteTitle}`} />
        <h1 style={{ marginBottom: '0' }}>{post.title}</h1>
        <div style={{
          fontSize: '0.85rem',
        }}>
          <CalendarIcon style={{
            position: 'relative',
            top: '-0.125em',
            marginRight: '5px',
          }} />
          <DateTime fromNowDuring={24 * 60 * 60 * 1000}>{createdAt}</DateTime>
          <CategoryIcon
            style={{
              marginLeft: '10px',
              marginRight: '5px',
              position: 'relative',
              top: '-0.05em',
            }}
          />
          <Link to={`/categories/${getSlug(category)}`}>{category}</Link>
          <CommentIcon style={{
            marginLeft: '10px',
            marginRight: '5px',
            position: 'relative',
            top: '-0.125em',
          }} />
          <a href={'#vcomments'}><span className="valine-comment-count" data-xid={this.valinePath} /></a>
        </div>
        <hr style={{
          borderBottom: '1px dashed hsla(0,0%,0%,0.2)',
          background: 'none',
          marginBottom: '20px',
        }} />
        <div style={{ marginBottom: '1rem' }}
             dangerouslySetInnerHTML={{ __html: post.content.childMarkdownRemark.html }} />
        <div>{tags.map(tag => {
          return (
            <TagLink
              key={tag.name}
              to={`/tags/${getSlug(tag.name)}`}
            >
              <TagIcon style={{
                position: 'relative',
                top: '-0.125em',
              }} />
              {tag.name}
            </TagLink>);
        })}</div>
        <div style={{ marginTop: '3rem' }} id={'vcomments'} />
        <BackToTop />
      </Layout>
    );
  }
}

export default BlogPostTemplate;

export const pageQuery = graphql`
  query blogPostById($id: String!) {
    site {
      siteMetadata {
        title
      }
    }
    contentfulPost(contentful_id: {eq: $id}) {
      title
      createdAt
      category {
        name
      }
      tags {
        name
      }
      content {
        childMarkdownRemark {
          html
        }
      }
    }
  }
`;
