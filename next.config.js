const withImages = require('next-images');

const redirects = {
  async redirects() {
    return [
      {
        source: '/communities',
        destination: '/communities/home',
        permanent: true
      }
    ];
  }
};

module.exports = withImages(redirects);
