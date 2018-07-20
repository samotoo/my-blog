module.exports = {
  siteMetadata: {
    title: 'Leon\'s Blog',
    author: 'Leon Chen',
    description: 'My personal blog.',
    siteUrl: 'https://samotoo.netlify.com/',
  },
  plugins: [
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: `n60m2sizc79s`,
        accessToken: `121a555da7e950df298c9f621a44624eab5d6b78f2a687692674238b8db58af8`,
        host: `cdn.contentful.com`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          'gatsby-remark-autolink-headers',
          {
            resolve: `gatsby-remark-images-contentful`,
            options: {
              maxWidth: 590,
              showCaptions: true
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          'gatsby-remark-prismjs',
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-smartypants',
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-offline`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: 'gatsby-plugin-typography',
      options: {
        pathToConfigModule: 'src/utils/typography',
      },
    },
    // This plugin must be put in the last of the array.
    `gatsby-plugin-netlify`
  ],
};
