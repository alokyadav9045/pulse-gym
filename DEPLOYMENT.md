# Vitalize Fitness - Production Deployment Guide

## Pre-Deployment Checklist

- [x] All tests passing (16/16)
- [x] No linting errors
- [x] Production build successful
- [x] Environment variables configured
- [x] MongoDB Atlas connection verified
- [x] Cloudinary API keys obtained
- [x] JWT secret generated
- [x] CORS and security headers configured

## Environment Variables (Required on Vercel)

Set these environment variables in your Vercel project settings for the relevant Environment (Preview/Production) — sensitive keys should be added to Production and marked as encrypted.

```env
# Required
MONGODB_URI=mongodb+srv://[username]:[password]@[cluster].mongodb.net/vitalize-fitness?retryWrites=true&w=majority
JWT_SECRET=[generate-a-strong-32-character-random-string]
CLOUDINARY_CLOUD_NAME=[your-cloud-name]
CLOUDINARY_API_KEY=[your-api-key]
CLOUDINARY_API_SECRET=[your-api-secret]
NODE_ENV=production
LOG_LEVEL=info
NEXT_PUBLIC_API_URL=https://your-domain.com
NEXT_PUBLIC_BASE_URL=https://your-domain.com

# Optional (for notifications)
TWILIO_ACCOUNT_SID=[your-twilio-account-sid]
TWILIO_AUTH_TOKEN=[your-twilio-auth-token]
TWILIO_WHATSAPP_FROM=whatsapp:+1415...
```

Tip: run `npm run check-env` in CI or locally prior to `npm run build` to validate required settings.
## Deployment Steps (Render)

### 1. Prepare Your Repository

```bash
# Ensure all changes are committed
git status

# Push to GitHub
git push origin main
```

### 2. Create a Render Web Service

1. Go to https://dashboard.render.com and create a new **Web Service**.
2. Connect your GitHub repository and select branch `main`.
3. Configure the service:
   - Environment: **Static or Web Service** (choose Web Service for Next.js Server)
   - Branch: `main`
   - Build Command: `npm install; npm run build`
   - Start Command: `npm run start`  <-- IMPORTANT (do not use `npm run dev`)
   - Runtime: Node 18+ (Render auto-detects; set to 18.x if you need)

> Important: In Render service settings set **NODE_ENV** to `production` under Environment -> Environment Variables. This ensures Next.js runs in production mode and CSS/PostCSS/Tailwind are processed correctly and avoids the `Module parse failed: Unexpected character '@'` error that occurs when running the dev server in a production deployment.
### 3. Add Environment Variables (Build & Runtime)

In Render Dashboard, add these env vars (set for both **Build** and **Runtime** if your app needs DB access at build time):

```env
# Required
MONGODB_URI=mongodb+srv://[username]:[password]@[cluster].mongodb.net/vitalize-fitness?retryWrites=true&w=majority
JWT_SECRET=[strong-32+ char string]
CLOUDINARY_CLOUD_NAME=[your-cloud-name]
CLOUDINARY_API_KEY=[your-api-key]
CLOUDINARY_API_SECRET=[your-api-secret]
NODE_ENV=production
NEXT_PUBLIC_API_URL=https://your-domain.com
NEXT_PUBLIC_BASE_URL=https://your-domain.com

# Optional for notifications
TWILIO_ACCOUNT_SID=[your-twilio-account-sid]
TWILIO_AUTH_TOKEN=[your-twilio-auth-token]
TWILIO_WHATSAPP_FROM=whatsapp:+1415...
```

> Tip: If you prefer not to provide `MONGODB_URI` at build time, ensure admin pages that access the DB are marked dynamic (server-rendered) to avoid DB calls during static generation. (This repo now marks `src/app/admin` as dynamic to avoid build-time DB calls.)

### 4. Deploy

Push to `main` (auto-deploys) or trigger a manual deploy from Render.

```bash
git push origin main
```

---

### Troubleshooting (Render)

- If you see `MongooseServerSelectionError` during build: either provide `MONGODB_URI` in Build environment or mark pages that require DB as dynamic (server-rendered). We added `src/app/admin/layout.tsx` with `export const dynamic = 'force-dynamic'` to prevent admin pages from being statically exported.
- If Render starts `npm run dev` instead of `npm run start`, update the **Start Command** in your Render service to `npm run start` (dev uses non-standard NODE_ENV and is not suitable for production).
- To ensure `npm run check-env` validates envs at build, set `NODE_ENV=production` in build environment so the script enforces required env vars.

---

For detailed verification steps and post-deployment checks, see the Buyer's Guide above in this document.

## Post-Deployment Verification

### 1. Health Checks

```bash
# Check API health
curl https://your-domain.com/api/health

# Check admin login
curl https://your-domain.com/admin/login
```

### 2. Test Core Features

- [ ] Admin login works
- [ ] Dashboard loads real-time data
- [ ] File uploads work (gallery, trainers, partners)
- [ ] Member management functional
- [ ] Reports generate correctly
- [ ] Settings save properly

### 3. Monitor Logs

In Vercel Dashboard:

1. Go to Deployments
2. Click on your deployment
3. View logs for errors

### 4. Setup Monitoring

- [x] Error tracking via console.error
- [ ] Consider adding: Sentry, LogRocket, or similar
- [ ] Setup alerts for API failures

## Database Seeding (First Time)

After deployment, seed the database:

```bash
curl -X POST https://your-domain.com/api/seed \
  -H "Content-Type: application/json"
```

## Security Best Practices

- [x] JWT secret is strong and unique
- [x] MongoDB URI uses Atlas with IP whitelist
- [x] Cloudinary API secret not exposed in client code
- [x] Environment variables not committed to git
- [x] CORS properly configured
- [x] Input validation on all API routes
- [ ] Enable rate limiting (consider Vercel Pro)
- [ ] Setup HTTPS (auto with Vercel)
- [ ] Enable Content Security Policy (CSP) headers

## Performance Optimization

- [x] Next.js Image component used for optimization
- [x] API routes are serverless
- [x] Real-time updates via SSE
- [x] Database connection pooling enabled
- [ ] Consider adding: Redis for caching
- [ ] Enable Vercel Analytics

## Troubleshooting

### Database Connection Issues

- Verify MONGODB_URI is correct
- Check MongoDB Atlas IP whitelist includes Vercel IPs
- Enable network access from anywhere (0.0.0.0/0) for testing

### Cloudinary Upload Failures

- Verify API credentials are correct
- Check Cloudinary account has valid API access
- Ensure environment variables are properly set

### SSE Connection Issues

- Check browser console for errors
- Verify API route `/api/sse` is accessible
- Ensure long-lived connections are supported

### JWT Authentication Failures

- Verify JWT_SECRET matches between routes
- Check token expiration time
- Ensure localStorage is available in browser

## Rollback Procedure

If issues occur:

1. In Vercel Dashboard, go to Deployments
2. Find the previous working deployment
3. Click "..." → "Promote to Production"

## Support Resources

- [Vercel Docs](https://vercel.com/docs)
- [Next.js Docs](https://nextjs.org/docs)
- [MongoDB Atlas](https://docs.atlas.mongodb.com)
- [Cloudinary Docs](https://cloudinary.com/documentation)

## Success Indicators

After deployment, verify:

- ✅ Site loads without errors
- ✅ Admin dashboard displays metrics
- ✅ Real-time updates work (SSE)
- ✅ File uploads complete successfully
- ✅ API responses are fast (<200ms)
- ✅ No console errors in browser
- ✅ All 16 tests still pass locally

## Contact Support

For deployment issues, check:

1. Vercel logs
2. Browser DevTools console
3. Network tab for failed requests
4. MongoDB Atlas activity logs
