# Real posting setup (free, your own accounts)

Pulse can publish to X and LinkedIn from the server build. Instagram, TikTok and YouTube are not built yet (they need media uploads and platform review).

Keys live in `.env.local` (copy `.env.example`). That file is gitignored. Never paste keys into chat.

## X (needs a free developer account)
1. Go to developer.x.com and create a project and app.
2. In the app's settings, set User authentication to **Read and write**.
3. Under Keys and tokens, generate: API Key, API Key Secret, Access Token, Access Token Secret. Generate the access token after setting Read and write.
4. Put them in `.env.local` as `X_API_KEY`, `X_API_SECRET`, `X_ACCESS_TOKEN`, `X_ACCESS_SECRET`.
5. The free tier has a monthly post cap, so test with a few posts.

## LinkedIn (your own profile)
1. Go to developer.linkedin.com, create an app and attach any company page it asks for.
2. Under Products, add **Share on LinkedIn** and **Sign In with LinkedIn using OpenID Connect**.
3. In the Auth tab, use the OAuth token tool to create an access token with scopes `w_member_social` and `openid profile`. Tokens last about 60 days, then you create a new one.
4. Your author id is the `sub` value from `https://api.linkedin.com/v2/userinfo` (call it with the token). Set `LINKEDIN_AUTHOR_URN=urn:li:person:<sub>`.
5. Put the token in `LINKEDIN_ACCESS_TOKEN`.

## Run it
```
npm run dev          # the app (server mode)
npm run scheduler    # second terminal: publishes due scheduled posts every minute
```
Check the keys are picked up: open http://localhost:3000/api/channels/ (shows true or false per platform, never the keys).

## Notes
- The posts list is stored in `~/.pulse-marketing/posts.json` (override with `PULSE_DATA_DIR`).
- The website on GitHub Pages, the Windows app and the APK are static builds with no server, so they only keep posts in the browser. Real posting runs from the server build on your machine (or a host you deploy it to).
- A post that fails on some channel is saved as Failed with the reason shown on hover in Your posts. Failed posts are not retried automatically: fix the key, then post again.
