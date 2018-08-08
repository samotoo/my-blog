import Typography from 'typography';
import githubTheme from 'typography-theme-github';

githubTheme.overrideThemeStyles = () => ({
  'a.gatsby-resp-image-link': {
    boxShadow: 'none',
  },
  '.gatsby-resp-image-figcaption': {
    textAlign: 'center',
    fontSize: '95%',
    paddingTop: '4px',
    paddingBottom: '8px',
  },
  'h1': {
    borderBottom: 'none',
  },
  'hr': {
    background: '#ddd',
  },
});

delete githubTheme.googleFonts;

const typography = new Typography(githubTheme);

// Hot reload typography in development.
if (process.env.NODE_ENV !== 'production') {
  typography.injectStyles();
}

export default typography;
export const rhythm = typography.rhythm;
export const scale = typography.scale;
// The base font size of the github theme is 16px.
export const BASE_FONT_SIZE = 16;
