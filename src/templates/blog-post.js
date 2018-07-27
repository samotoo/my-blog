import React from 'react'
import Head from '../components/head';
import BackToTop from '../components/back-to-top';
import get from 'lodash/get'
import {graphql} from 'gatsby';
import Layout from '../components/layout';
import {rhythm} from '../utils/typography';
import CalendarIcon from "react-icons/lib/fa/calendar-plus-o";
import DateTime from "../components/date-time";
import CategoryIcon from "react-icons/lib/fa/list";

class BlogPostTemplate extends React.Component {
  render() {
    const siteTitle = get(this.props, 'data.site.siteMetadata.title');
    const post = this.props.data.contentfulPost;
    const createdAt = get(post, 'createdAt');
    const category = get(post, 'category.name');

    return (
      <Layout location={this.props.location}>
        <Head title={`${post.title} | ${siteTitle}`} />
        <h1 style={{marginBottom: '0'}}>{post.title}</h1>
        <div style={{
          fontSize: '0.85rem'
        }}>
          <CalendarIcon style={{
            position: 'relative',
            top: '-0.125em',
            marginRight: '5px'
          }} />
          <DateTime>{createdAt}</DateTime>
          <CategoryIcon style={{marginLeft: '10px', marginRight: '5px'}} />
          <span>{category}</span>
        </div>
        <hr style={{
          borderBottom: '1px dashed hsla(0,0%,0%,0.2)',
          background: 'none',
          marginBottom: '20px'
        }} />
        <div dangerouslySetInnerHTML={{__html: post.content.childMarkdownRemark.html}} />
        <BackToTop />
      </Layout>
    )
  }
}

export default BlogPostTemplate;

export const pageQuery = graphql`
  query blogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    contentfulPost(slug: {eq: $slug}) {
      title
      createdAt
      category {
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
