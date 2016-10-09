Package.describe({
  name: 'scholtzm:accounts-steam',
  version: '1.2.0',
  summary: 'Steam OpenID integration for Meteor Accounts',
  git: 'https://github.com/scholtzm/meteor-accounts-steam',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.0.2');

  api.use('accounts-base', ['client', 'server']);
  api.imply('accounts-base', ['client', 'server']);

  api.use('accounts-oauth', ['client', 'server']);
  api.use('scholtzm:steam@1.2.0', ['client', 'server']);

  api.addFiles(['steam_login_button.css'], 'client');
  api.addFiles('steam_common.js', ['client', 'server']);
  api.addFiles('steam_server.js', 'server');
  api.addFiles('steam_client.js', 'client');
});
