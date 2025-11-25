# 🚀 Single URL Deployment - Frontend + Backend

Ek hi URL se dono frontend aur backend deploy karein!

## 📋 Setup

### Frontend URL:

```
https://your-app.vercel.app
```

### Backend GraphQL URL:

```
https://your-app.vercel.app/api/graphql
```

Ya

```
https://your-app.vercel.app/graphql
```

---

## ✅ Files Already Created

1. ✅ `vercel.json` - Vercel configuration
2. ✅ `api/index.js` - Serverless function for backend
3. ✅ `src/lib/apolloClient.ts` - Updated to use relative path

---

## 🎯 Deployment Steps

### Step 1: GitHub Repository

Code ko GitHub par push karo (if not already done):

```bash
git init
git add .
git commit -m "Ready for Vercel deployment"
git remote add origin https://github.com/yourusername/your-repo.git
git push -u origin main
```

### Step 2: Vercel Project Create Karo

1. **Vercel Dashboard**: https://vercel.com/dashboard
2. **"Add New Project"** click karo
3. Apni **GitHub repository** select karo
4. **Project Settings:**

```
Project Name: employee-management

Framework Preset: Vite

Root Directory: . (root - default)

Build Command: npm run build

Output Directory: dist

Install Command: npm install
```

### Step 3: Environment Variables

**Vercel Dashboard → Settings → Environment Variables:**

```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/employee_management?retryWrites=true&w=majority

JWT_SECRET=your_secret_key_minimum_32_characters_long

NODE_ENV=production

FRONTEND_URL=https://your-app.vercel.app
```

**Note:** `FRONTEND_URL` ko deployment ke baad apne actual URL se update karo.

### Step 4: Deploy!

**"Deploy"** button click karo!

---

## 🔗 URLs After Deployment

After successful deployment:

**Frontend:**

```
https://your-app.vercel.app
```

**GraphQL API:**

```
https://your-app.vercel.app/api/graphql
```

Ya

```
https://your-app.vercel.app/graphql
```

---

## 📝 Apollo Client Configuration

Apollo Client automatically:

- Production mein: `/api/graphql` use karega (relative path)
- Development mein: `http://localhost:4000/graphql` use karega
- Custom URL agar `VITE_GRAPHQL_URL` set hai to wo use hoga

---

## ⚙️ How It Works

### Vercel Routing:

```
Request to /api/graphql → api/index.js (serverless function)
Request to /graphql → api/index.js (serverless function)
Request to / → dist/index.html (frontend)
Request to /* → dist/* (frontend static files)
```

### Structure:

```
Root Directory:
├── api/
│   └── index.js (Backend - Serverless Function)
├── backend/
│   └── src/ (Backend source code)
├── src/ (Frontend source code)
├── dist/ (Built frontend - generated)
├── vercel.json (Vercel config)
└── package.json
```

---

## ✅ Deployment Checklist

- [ ] Code GitHub par push ho chuka hai
- [ ] Vercel project create kiya
- [ ] Framework: Vite selected
- [ ] Build Command: `npm run build`
- [ ] Output Directory: `dist`
- [ ] Environment Variables added:
  - [ ] MONGODB_URI
  - [ ] JWT_SECRET
  - [ ] NODE_ENV
  - [ ] FRONTEND_URL
- [ ] Deploy successful
- [ ] Frontend URL tested
- [ ] GraphQL endpoint tested

---

## 🐛 Troubleshooting

### Issue: Build Failed

**Check:**

- Build logs in Vercel dashboard
- `vercel.json` syntax correct hai?
- `api/index.js` file exists?

### Issue: GraphQL Not Working

**Check:**

- `/api/graphql` endpoint accessible hai?
- CORS configuration correct hai?
- Environment variables properly set hain?

### Issue: Frontend Not Loading

**Check:**

- Build successful hai?
- `dist` folder generated hai?
- Root directory correct hai (`.`)?

---

## 🎉 Success!

Deploy hone ke baad:

1. Frontend URL open karo: `https://your-app.vercel.app`
2. GraphQL test karo: `https://your-app.vercel.app/api/graphql`
3. Application use karo!

---

## 📚 Additional Notes

- **Single Project**: Ek hi Vercel project, ek hi URL
- **Serverless Backend**: `api/index.js` serverless function hai
- **Automatic Routing**: Vercel automatically routes handle karta hai
- **Environment Variables**: Sab ek jagah set karte hain

**Happy Deploying! 🚀**
