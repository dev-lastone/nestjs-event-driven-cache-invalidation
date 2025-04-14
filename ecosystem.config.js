module.exports = {
  apps: [
    {
      name: 'admin',
      script: 'node dist/apps/admin/apps/admin/src/main.js',
    },
    {
      name: 'app',
      script: 'node dist/apps/app/apps/app/src/main.js',
    },
  ],
};
