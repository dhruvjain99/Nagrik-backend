const google_client_id = process.env.GOOGLE_CLIENT_ID;
const google_client_secret = process.env.GOOGLE_CLIENT_SECRET;
const google_callback_url = (process.env.DOMAIN || 'http://localhost:3000') + '/users/auth/google/callback';

module.exports = {google_client_id, google_callback_url, google_client_secret};