const _ = require('lodash');
const Promise = require('bluebird');
const path = require('path');
const XRegExp = require('xregexp');
const fs = require('fs');

// I have to duplicate this function (./src/utils/helpers) here because es6 is not supported in this file and I don't
// want to make that module a commonjs module.
function getSlug(name) {
  const regexLetterNum = XRegExp('\\p{L}|\\p{N}');
  let result = '';

  _.forEach(name, function(char, index) {
    if (regexLetterNum.test(char)) {
      result += char;
    } else if (!regexLetterNum.test(char) && index !== 0) {
      // If the first character is not a letter or number, just drop it.
      result += '-';
    }
  });

  // Post process using lodash, lodash doesn't support unicode kebab sadly.
  result = _.kebabCase(result);

  return result;
}

exports.onPostBuild = () => {
  // Copy the particles.js file into public folder so we refer to it in html.js.
  fs.copyFileSync('./node_modules/particles.js/particles.js', './public/particles.js');
};

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;
  return new Promise((resolve, reject) => {
    resolve(
      graphql(
        `
          {
            allContentfulPost(
              sort: {fields: [createdAt], order: DESC}
              ) {
              edges {
                next {
                  title
                }
                previous {
                  title
                }
                node {
                  title
                  contentful_id
                }
              }
            }
            allContentfulCategory {
              edges {
                node {
                  name
                  contentful_id
                }
              }
            }
            allContentfulTag {
              edges {
                node {
                  name
                  contentful_id
                }
              }
            }
          }
        `,
      ).then(result => {
        if (result.errors) {
          console.log(result.errors);
          reject(result.errors);
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
              id: edge.node.contentful_id,
              // Since the query is descending sorted by creation date, the
              // previous post by date is actually the next node returned in
              // graphql query, similarly for the next post by date.
              previousTitle: _.get(edge, 'next.title'),
              nextTitle: _.get(edge, 'previous.title'),
            },
          });
        });

        // Create category pages.
        const categoryTemplate = path.resolve('./src/templates/category.js');
        _.forEach(result.data.allContentfulCategory.edges, edge => {
          createPage({
            path: `/categories/${getSlug(edge.node.name)}/`,
            component: categoryTemplate,
            context: {
              id: edge.node.contentful_id,
            },
          });
        });

        // Create tag pages.
        const tagTemplate = path.resolve('./src/templates/tag.js');
        _.forEach(result.data.allContentfulTag.edges, edge => {
          createPage({
            path: `/tags/${getSlug(edge.node.name)}/`,
            component: tagTemplate,
            context: {
              id: edge.node.contentful_id,
            },
          });
        });
      }),
    );
  });
};
