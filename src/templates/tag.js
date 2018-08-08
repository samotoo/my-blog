import React from 'react';
import Head from '../components/head';
import get from 'lodash/get';
import orderBy from 'lodash/orderBy';
import groupBy from 'lodash/groupBy';
import keys from 'lodash/keys';
import Layout from '../components/layout';
import { graphql, Link } from 'gatsby';
import { getSlug } from '../utils/helpers';
import moment from 'moment';

class TagTemplate extends React.Component {
  render() {
    const siteTitle = get(this.props, 'data.site.siteMetadata.title');
    const tag = this.props.data.contentfulTag;
    // Order the posts by create time desc and group by create year.
    const postsByYear = groupBy(
      orderBy(tag.post, ['createdAt'], ['desc']),
      post => moment(post.createdAt).format('YYYY'),
    );

    return (
      <Layout location={this.props.location}>
        <Head title={`${tag.name} | ${siteTitle}`} />
        <h1 style={{ marginTop: '0' }}>{`标签：${tag.name}`}</h1>
        {keys(postsByYear).map(year => {
          return (
            <div key={year}>
              <h3>{year}</h3>
              <ul>
                {postsByYear[year].map(post => {
                  const slug = getSlug(post.title);
                  const createDate = moment(post.createdAt).format('YYYY-MM-DD');
                  return (
                    <li key={slug}>
                      {createDate}&nbsp;<Link to={`/posts/${slug}/`}>{post.title}</Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </Layout>
    );
  }
}

export default TagTemplate;

export const pageQuery = graphql`
  query tagById($id: String!) {
    site {
      siteMetadata {
        title
      }
    }
    contentfulTag(contentful_id: {eq: $id}) {
      name
      post {
        title
        createdAt
      }
    }
  }
`;
