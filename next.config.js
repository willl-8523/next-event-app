const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');

module.exports = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      env: {
        mongodb_username: 'symfonypropar',
        mongodb_password: '3Fc8bFpQN2kqsR5e',
        mongodb_clustername: 'cluster0',
        mongodb_database: 'my-blog-dev-mode',
      },
    };
  }

  return {
    env: {
      mongodb_username: 'symfonypropar',
      mongodb_password: '3Fc8bFpQN2kqsR5e',
      mongodb_clustername: 'cluster0',
      mongodb_database: 'my-blog',
    },
  };
};
