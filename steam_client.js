Meteor.loginWithSteam = function(options, callback) {
  if (!callback && typeof options === 'function') {
    callback = options;
    options = {};
  }

  var credentialRequestCompleteCallback = Accounts.oauth.credentialRequestCompleteHandler(callback);
  Steam.requestCredential(options, credentialRequestCompleteCallback);
};
