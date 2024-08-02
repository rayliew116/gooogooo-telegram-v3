const router = require('express').Router();
const passport = require('passport');
const logTwitterAuthUrl = require('../middleware/logTwitterAuthUrl');
// require("dotenv").config({ path: "../config.env" });

// Twitter authentication route
router.get('/twitter', logTwitterAuthUrl, (req, res, next) => {
    const referralCode = req.query.referral_code;
    console.log('Referral Code in /twitter:', referralCode);

    // passport.authenticate('twitter', {
    //     state: JSON.stringify({ referralCode })
    // })(req, res, next);

    const callbackURLWithReferral = `${process.env.TWITTER_CALLBACK_URL}?referral_code=${encodeURIComponent(referralCode || '')}`;

    passport.authenticate('twitter', {
        callbackURL: callbackURLWithReferral
    })(req, res, next);
});

// Callback route for Twitter to redirect to
router.get('/twitter/callback', (req, res, next) => {
    console.log('Callback State:', req.query.state);
    passport.authenticate('twitter', (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.redirect('/login_failed');
        }
        req.logIn(user, (err) => {
            if (err) {
                return next(err);
            }
            return res.redirect('http://localhost:5173');
        });
    })(req, res, next);
});

// Logout
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

// Check if user is authenticated
router.get('/current_user', (req, res) => {
    res.send(req.user);
});

module.exports = router;
