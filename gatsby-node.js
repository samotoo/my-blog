const _ = require('lodash');
const Promise = require('bluebird');
const path = require('path');
const XRegExp = require('xregexp');

// I have to duplicate this function (./src/utils/helpers) here because es6 is not supported in this file and I don't
// want to make that module a commonjs module.
function getSlug(name) {
  const regexLetterNum = XRegExp('\\p{L}|\\p{N}');
  let result = '';

  _.forEach(name, function (char, index) {
    if (regexLetterNum.test(char)) {
      result += char;
    } else if (!regexLetterNum.test(char) && index != 0) {
      // If the first character is not a letter or number, just drop it.
      result += '-';
    }
  });

  // Post process using lodash, lodash doesn't support unicode kebab sadly.
  result = _.kebabCase(result);

  return result;
}


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
                  contentful_id
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
            path: `/posts/${getSlug(edge.node.title)}/`,
            component: postTemplate,
            context: {
              id: edge.node.contentful_id
            },
          })
        })
      })
    )
  })
};
