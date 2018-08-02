import React from 'react'
import Head from '../components/head'
import BackToTop from '../components/back-to-top'
import get from 'lodash/get'
import { graphql, Link } from 'gatsby'
import Layout from '../components/layout'
import CalendarIcon from 'react-icons/lib/fa/calendar-plus-o'
import DateTime from '../components/date-time'
import CategoryIcon from 'react-icons/lib/fa/list'
import { getSlug } from '../utils/helpers'
import Valine from 'valine'

class BlogPostTemplate extends React.Component {
  componentDidMount() {
    // Load valine after blog post component is mounted. Maybe there's a more
    // elegant way to integrate it with react, but this the best solution I can
    // think of so far.
    new Valine({
      el: '#vcomments',
      appId: '12BFWtsWfSLN9XaKG5NDqlGd-gzGzoHsz',
      appKey: 'hcSnDohUOmgOV7MDQ4E4cKGo',
      placeholder: '随便写点啥吧',
      meta: ['nick', 'mail'],
      // Gatsby uses react-router to manage path, so we can rely on it to get
      // the correct pathname. By default valine uses window.location.pathname,
      // it is strange that it sometimes cannot get the correct path. I guess
      // it is related to react integration.
      path: this.props.location.pathname,
    });
  }

  render() {
    const siteTitle = get(this.props, 'data.site.siteMetadata.title')
    const post = this.props.data.contentfulPost
    const createdAt = get(post, 'createdAt')
    const category = get(post, 'category.name')

    return (
      <Layout location={this.props.location}>
        <Head title={`${post.title} | ${siteTitle}`}/>
        <h1 style={{ marginBottom: '0' }}>{post.title}</h1>
        <div style={{
          fontSize: '0.85rem',
        }}>
          <CalendarIcon style={{
            position: 'relative',
            top: '-0.125em',
            marginRight: '5px',
          }}/>
          <DateTime fromNowDuring={24 * 60 * 60 * 1000}>{createdAt}</DateTime>
          <CategoryIcon style={{ marginLeft: '10px', marginRight: '5px' }}/>
          <Link to={`/categories/${getSlug(category)}`}>{category}</Link>
        </div>
        <hr style={{
          borderBottom: '1px dashed hsla(0,0%,0%,0.2)',
          background: 'none',
          marginBottom: '20px',
        }}/>
        <div dangerouslySetInnerHTML={{ __html: post.content.childMarkdownRemark.html }}/>
        <div style={{marginTop: '3rem'}} id={'vcomments'}></div>
        <BackToTop/>
      </Layout>
    )
  }
}

export default BlogPostTemplate

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
      content {
        childMarkdownRemark {
          html
        }
      }
    }
  }
`
