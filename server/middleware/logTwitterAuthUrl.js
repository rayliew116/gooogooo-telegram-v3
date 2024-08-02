const url = require('url');
const querystring = require('querystring');

module.exports = (req, res, next) => {
    // Construct the Twitter auth URL with the necessary parameters
    const oauthCallback = encodeURIComponent(process.env.TWITTER_CALLBACK_URL);
    const referralCode = req.query.referral_code || '';
    const state = JSON.stringify({ referralCode });

    // Log the constructed URL
    const authUrl = `https://api.twitter.com/oauth/authenticate?oauth_callback=${oauthCallback}&state=${encodeURIComponent(state)}`;
    console.log('Twitter Auth URL:', authUrl);

    // Call the next middleware in the stack
    next();
};
