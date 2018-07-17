const _ = require('lodash');
const Promise = require('bluebird');
const path = require('path');

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;
  return new Promise((resolve, reject) => {
    resolve(
      graphql(
        `
          {
            allContentfulPost(limit: 1000) {
              edges {
                node {
                  title
                  slug
                }
              }
            }
          }
        `
      ).then(result => {
        if (result.errors) {
          console.log(result.errors);
          reject(result.errors)
        }

        // Create blog posts pages.
        const postTemplate = path.resolve('./src/templates/blog-post.js');

        // We want to create a post page for each blog post.
        _.each(result.data.allContentfulPost.edges, edge => {
          // Gatsby uses Redux to manage its internal state.
          // Plugins and sites can use functions like "createPage" to interact with Gatsby.
          createPage({
            // Each page is required to have a `path` as well as a template component. The `context` is optional but is
            // necessary if you need to pass parameter to graphql query.
            path: `/posts/${edge.node.slug}/`,
            component: postTemplate,
            context: {
              slug: edge.node.slug
            },
          })
        })
      })
    )
  })
};
