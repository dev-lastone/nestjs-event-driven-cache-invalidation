module.exports = {
  apps: [
    {
      name: 'admin',
      script: './dist/apps/admin/apps/admin/src/main.js',
    },
    {
      name: 'app',
      script: './dist/apps/app/apps/app/src/main.js',
      instances: 2,
      exec_mode: 'cluster',
      instance_var: 'INSTANCE_ID',
    },
  ],
};
