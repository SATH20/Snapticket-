# Security Guide

## 🔒 Important Security Notice

Your `.env` files contain sensitive credentials and should **NEVER** be committed to Git or shared publicly.

## ✅ Current Security Status

- ✅ `.env` files are in `.gitignore`
- ✅ `.env` files were NOT committed to Git
- ✅ Example files (`.env.example`) provided for documentation
- ✅ Comprehensive `.gitignore` in place

## 🔄 Rotate Your Credentials (Recommended)

Even though your credentials weren't exposed, it's good practice to rotate them periodically:

### 1. MongoDB Atlas

**Why rotate:** Your database connection string contains username and password.

**Steps:**
1. Go to https://cloud.mongodb.com
2. Navigate to "Database Access"
3. Delete the old user or change password
4. Create a new database user with a strong password
5. Update `MONGODB_URI` in `server/.env`
6. Restart your backend server

**New format:**
```env
MONGODB_URI=mongodb+srv://NEW_USERNAME:NEW_PASSWORD@cluster.mongodb.net/?appName=YourApp
```

### 2. Clerk API Keys

**Why rotate:** If you suspect exposure, regenerate keys.

**Steps:**
1. Go to https://dashboard.clerk.com
2. Navigate to your app → API Keys
3. Click "Regenerate" for both keys
4. Update both `server/.env` and `client/.env`
5. Restart both servers

### 3. Stripe API Keys

**Why rotate:** Payment credentials are critical.

**Steps:**
1. Go to https://dashboard.stripe.com/test/apikeys
2. Click "Roll" next to each key
3. Update both `server/.env` and `client/.env`
4. Update webhook secret if using Stripe CLI
5. Restart both servers

### 4. TMDB API Key

**Why rotate:** Less critical but good practice.

**Steps:**
1. Go to https://www.themoviedb.org/settings/api
2. Request a new API key
3. Update `TMDB_API_KEY` in `server/.env`
4. Restart backend server

## 🛡️ Security Best Practices

### Never Commit These Files:
- ❌ `.env`
- ❌ `.env.local`
- ❌ `.env.production`
- ❌ Any file with real credentials
- ❌ Database dumps with sensitive data
- ❌ API key documentation with real keys

### Always Use:
- ✅ `.env.example` files (with placeholder values)
- ✅ Environment variables for secrets
- ✅ `.gitignore` for sensitive files
- ✅ Strong, unique passwords
- ✅ Different credentials for dev/staging/production

## 🔍 Check for Exposed Secrets

### Before Committing:
```bash
# Check what files will be committed
git status

# Verify .env is not listed
git ls-files | grep .env

# Should only show .env.example files
```

### If You Accidentally Committed Secrets:

**Option 1: Remove from last commit (if not pushed)**
```bash
git reset HEAD~1
git add .
git commit -m "Your message"
```

**Option 2: Remove from history (if already pushed)**
```bash
# Remove file from all history
git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch server/.env" \
  --prune-empty --tag-name-filter cat -- --all

# Force push (WARNING: This rewrites history)
git push origin --force --all
```

**Then immediately:**
1. Rotate ALL credentials in that file
2. Notify your team
3. Check for unauthorized access

## 📋 Credential Checklist

When setting up a new environment:

- [ ] Copy `.env.example` to `.env`
- [ ] Fill in all required credentials
- [ ] Verify `.env` is in `.gitignore`
- [ ] Test the application
- [ ] Never share `.env` file
- [ ] Use different credentials for production

## 🚨 What to Do If Credentials Are Exposed

### Immediate Actions:

1. **Rotate ALL credentials immediately**
   - MongoDB: Change password or delete user
   - Clerk: Regenerate API keys
   - Stripe: Roll API keys
   - TMDB: Request new API key

2. **Check for unauthorized access**
   - MongoDB Atlas: Check "Activity Feed"
   - Stripe: Check "Logs" for suspicious activity
   - Clerk: Check "Events" for unusual logins

3. **Remove from Git history** (if committed)
   - Use `git filter-branch` or BFG Repo-Cleaner
   - Force push to remote
   - Notify all team members to re-clone

4. **Update all environments**
   - Development
   - Staging
   - Production

## 🔐 Environment-Specific Credentials

### Development
- Use test/sandbox credentials
- Stripe: Test mode keys
- MongoDB: Development database
- Lower security requirements

### Production
- Use production credentials
- Enable all security features
- Restrict IP access where possible
- Enable 2FA on all services
- Regular security audits

## 📚 Additional Resources

- [MongoDB Security Checklist](https://docs.mongodb.com/manual/administration/security-checklist/)
- [Stripe Security Best Practices](https://stripe.com/docs/security/guide)
- [Clerk Security](https://clerk.com/docs/security/overview)
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)

## 🆘 Need Help?

If you believe credentials were exposed:
1. Rotate them immediately (don't wait)
2. Check service logs for unauthorized access
3. Enable additional security features (2FA, IP restrictions)
4. Consider security audit if breach suspected

---

**Remember:** Security is not a one-time setup. Regularly review and update your security practices.
