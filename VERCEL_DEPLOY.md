# 🚀 Vercel Deployment - Simple Steps

## 📋 Prerequisites

1. ✅ GitHub repository ready (code push ho chuka hai)
2. ✅ MongoDB Atlas account + Database setup

---

## 🎯 Quick Deployment Steps

### Step 1: Vercel Project Create Karo

1. **Vercel Dashboard** jao: https://vercel.com/dashboard
2. **"Add New Project"** click karo
3. Apni **GitHub repository** select karo
4. **Settings** configure karo:

```
Framework Preset: Vite
Build Command: npm run build
Output Directory: dist
Install Command: npm install
```

5. **Environment Variables** section mein ye **4 variables** add karo:

```
MONGODB_URI
=
mongodb+srv://username:password@cluster.mongodb.net/employee_management?retryWrites=true&w=majority

JWT_SECRET
=
your_random_secret_key_minimum_32_characters_long_123456789

NODE_ENV
=
production

FRONTEND_URL
=
(pehle leave karo, deployment ke baad add karoge)
```

6. **"Deploy"** button click karo
7. ⏳ Wait karo (2-3 minutes)
8. ✅ Deployment complete!

---

## 📝 Environment Variables (Summary)

**Total: 4 Variables**

| Variable Name  | Value                        | Example                                                                          |
| -------------- | ---------------------------- | -------------------------------------------------------------------------------- |
| `MONGODB_URI`  | MongoDB connection string    | `mongodb+srv://user:pass@cluster.mongodb.net/dbname?retryWrites=true&w=majority` |
| `JWT_SECRET`   | Random secret (min 32 chars) | `my_super_secret_jwt_key_1234567890123456`                                       |
| `NODE_ENV`     | Always `production`          | `production`                                                                     |
| `FRONTEND_URL` | Vercel deployment URL        | `https://your-app.vercel.app`                                                    |

---

## ✅ After Deployment

### Step 2: Frontend URL Update

1. Deployment ke baad aapko **URL milega**: `https://your-app.vercel.app`
2. **Settings** → **Environment Variables** jao
3. `FRONTEND_URL` variable add/update karo:
   ```
   FRONTEND_URL = https://your-app.vercel.app
   ```
4. **"Redeploy"** karo

---

## 🔗 URLs After Deployment

**Frontend:**

```
https://your-app.vercel.app
```

**GraphQL API:**

```
https://your-app.vercel.app/api/graphql
```

---

## ✅ Checklist

**Before Deploy:**

- [ ] Code GitHub par push ho chuka hai
- [ ] MongoDB Atlas setup complete
- [ ] Connection string ready hai

**During Deploy:**

- [ ] Vercel project create kiya
- [ ] Framework: Vite selected
- [ ] Build Command: `npm run build`
- [ ] Output Directory: `dist`
- [ ] Environment Variables add kiye:
  - [ ] MONGODB_URI
  - [ ] JWT_SECRET
  - [ ] NODE_ENV

**After Deploy:**

- [ ] Frontend URL copy kiya
- [ ] FRONTEND_URL variable add kiya
- [ ] Redeploy kiya
- [ ] Test kiya

---

## 🎉 Done!

Ab aapka app live hai! 🚀

**Frontend URL:** `https://your-app.vercel.app`

---

## 💡 Tips

- **JWT_SECRET** generate karne ke liye: `openssl rand -base64 32`
- **MONGODB_URI** MongoDB Atlas dashboard se copy karo
- Agar koi error aaye to Vercel logs check karo

**That's it! Simple hai! 😊**
