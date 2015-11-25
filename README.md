# Steam OpenID integration for Meteor Accounts

Atmosphere is filled with over dozen Steam packages which provide this functionality, however most of these packages are either outdated or lack even the basic description, such as a README file.

## Installation

`meteor add scholtzm:accounts-steam`

## Usage

`Meteor.loginWithSteam(options, callback)`
* `options` - object containing options, see below (optional)
* `callback` - callback function (optional)
  * `error` - `Meteor.Error` object if error occured; `null` otherwise

*Note:* `callback` will be only called if `loginStyle` is set to `popup`

#### Example

```js
Template.myTemplateName.events({
  'click #login-button': function() {
    Meteor.loginWithSteam();
  }
);
```

## Options

These options override service configuration stored in the database.

* `loginStyle` - `redirect` or `popup`
* `redirectUrl` - where to redirect after successful login

*Note:* `redirectUrl` will be used only if `loginStyle` is set to `redirect`

The value below can be only set via Accounts UI dialog or by inserting the service configuration directly to database:

* `timeout` - timouet value (in milliseconds) for the OpenID handshake

## Accounts UI integration

This package integrates with `accounts-ui` and also provides configuration dialog. The configuration dialog contains field `Timeout`, which can be used to adjust timeout value (in milliseconds) for the OpenID handshake.

You can also skip the config dialog by running a short snippet in your `Meteor.startup` function, see below.

## Manual configuration setup

You can manually configure this package by upserting the service configuration on startup. First, add the service configuration package:

`meteor add service-configuration`

Then in your project:

```js
if(Meteor.isServer) {
  Meteor.startup(function () {
    ServiceConfiguration.configurations.upsert(
      { service: 'steam' },
      {
        $set: {
          loginStyle: 'redirect',
          timeout: 10000 // 10 seconds
        }
      }
    );
  });
}
```

You will most likely want to do this to have your Steam login service always configured.

## Fetching user's profile

This package does not require your Steam API key, because the only information it provides is user's 64 bit Steam ID.

Retrieving user's profile information such as display name or avatar is up to you.

Ideally, you should at least retrieve user's profile information when he logs in for the very first time. This can be accomplished by utilizing [`Accounts.onCreateUser` (server-side)](http://docs.meteor.com/#/full/accounts_oncreateuser).

If you wish to keep user's profile up-to-date, you can use [`Accounts.onLogin` (server-side)](http://docs.meteor.com/#/full/accounts_onlogin) or different approach.

## LICENSE

MIT. See `LICENSE`.
