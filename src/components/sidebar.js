import React from 'react';
import { StaticQuery, graphql, Link } from 'gatsby';
import size from 'lodash/size';
import map from 'lodash/map';
import isNaN from 'lodash/isNaN';
import { TagCloud } from 'react-tagcloud';
import CategoryIcon from 'react-icons/lib/fa/folder-open-o';
import TagsIcon from 'react-icons/lib/fa/tags';
import { getSlug } from '../utils/helpers';
import { BASE_FONT_SIZE } from '../utils/typography';

const tagRenderer = (tag, size, color) => {
  let fontSize = size;
  // The tagcloud lib has an unresolved issue: https://github.com/madox2/react-tagcloud/issues/5, so the size can be
  // NaN.
  if (isNaN(size))
    fontSize = BASE_FONT_SIZE;

  return (
    <Link
      to={`/tags/${tag.key}`}
      key={tag.key}
      style={{
        margin: '0px 3px',
        fontSize: `${fontSize}px`,
        color: color,
      }}
    >
      {tag.value}
    </Link>
  );
};

class Sidebar extends React.Component {
  render() {
    return (
      <StaticQuery
        query={graphql`
          query SidebarInfo {
            allContentfulCategory {
              edges {
                node {
                  name
                  post {
                    title
                  }
                }
              }
            }
            allContentfulTag {
              edges {
                node {
                  name
                  post {
                    title
                  }
                }
              }
            }
          }
        `}
        render={data => {
          const categoryEdges = data.allContentfulCategory.edges;
          const tagEdges = data.allContentfulTag.edges;
          // Prepare data for react-tagcloud.
          const tags = map(tagEdges, (edge => {
            const tag = edge.node;
            return {
              value: tag.name,
              count: size(tag.post),
              key: getSlug(tag.name),
            };
          }));

          return (
            <div>
              <div style={{ marginBottom: '1.5em' }}>
                <div>
                  <CategoryIcon style={{ marginRight: '0.3em' }} />分类
                </div>
                <hr style={{ marginTop: '0.5em', marginBottom: '0.5em' }} />
                {categoryEdges.map(edge => {
                    const category = edge.node;
                    const slug = getSlug(category.name);
                    return (
                      <div key={slug}>
                        <Link to={`/categories/${slug}`}>{`${category.name} (${size(category.post)})`}</Link>
                      </div>
                    );
                  },
                )}
              </div>
              <div>
                <div>
                  <TagsIcon style={{ marginRight: '0.3em' }} />标签
                </div>
                <hr style={{ marginTop: '0.5em', marginBottom: '0.5em' }} />
                <TagCloud
                  tags={tags}
                  minSize={BASE_FONT_SIZE * 0.5}
                  maxSize={BASE_FONT_SIZE * 1.5}
                  renderer={tagRenderer}
                  shuffle={false}
                />
              </div>
            </div>
          );
        }}
      />
    );
  }
}

export default Sidebar;
