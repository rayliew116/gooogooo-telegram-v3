const passport = require('passport');
const TwitterStrategy = require('passport-twitter').Strategy;
const User = require('../models/userModel');
require("dotenv").config({ path: "../config.env" });

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user);
    }).catch(err => done(err));
});

passport.use(new TwitterStrategy({
    consumerKey: process.env.TWITTER_CONSUMER_KEY,
    consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
    callbackURL: process.env.TWITTER_CALLBACK_URL,
    passReqToCallback: true
},
(req, token, tokenSecret, profile, done) => {

    // Extract the referral code from the callback URL
    const referralCode = req.query.referral_code;
    console.log('Referral Code in Strategy:', referralCode);

    // Check if the user already exists in our database
    User.findOne({ twitterId: profile.id }).then((currentUser) => {
        if (currentUser) {
            // Already have this user
            done(null, currentUser);
        } else {
            // If not, create a new user in our database
            const now = new Date();
            const hoursToSubtract = 8;
            const pastDate = new Date(now.getTime() - hoursToSubtract * 60 * 60 * 1000);
            const newUser = new User({
                twitterId: profile.id,
                username: profile.username,
                displayName: profile.displayName,
                profileImageUrl: profile.photos[0].value.replace('_normal', '_400x400'),
                referrer: referralCode,
                points: 0,
                referral_points: 0,
                boosters: 0,
                lastClaim: pastDate
            });

            newUser.save().then((savedUser) => {
                console.log('New User Created:', savedUser);

                // Update referrer's boosters
                if (referralCode && referralCode != "default") {
                    updateReferrerBoosters(referralCode);
                }

                return done(null, savedUser);
            }).catch(err => {
                console.error('Error saving new user:', err);
                return done(err);
            });
        }
    }).catch(err => {
        console.error('Error finding user:', err);
        return done(err);
    });
}));

const updateReferrerBoosters = async (referrerUsername) => {
    try {
        const referrer = await User.findOne({ username: referrerUsername });
        if (referrer) {
            referrer.boosters += 3;
            referrer.referral_points = (referrer.referral_points || 0) + 1;
            await referrer.save();
            console.log(`Boosters updated for referrer: ${referrerUsername}`);
        } else {
            console.log(`Referrer not found: ${referrerUsername}`);
        }
    } catch (error) {
        console.error(`Error updating boosters for referrer: ${referrerUsername}`, error);
    }
};