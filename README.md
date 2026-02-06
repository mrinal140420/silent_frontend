# 🔐 Silent Drop — Frontend

**Silent Drop** is a privacy-first, zero-knowledge file sharing platform.
All encryption and decryption happen **locally in the user’s browser**.
The server **never sees plaintext files, encryption keys, or passwords**.

🌐 **Live Site:**
👉 [https://silent-frontend-gamma.vercel.app/](https://silent-frontend-gamma.vercel.app/)

🔗 **Backend API:**
👉 [https://silent-backend-2l1v.onrender.com](https://silent-backend-2l1v.onrender.com)

🔗 **Backend Repo:**
👉 [https://github.com/mrinal140420/silent_backend](https://github.com/mrinal140420/silent_backend)
---

## 🚀 What Silent Drop Does

Silent Drop allows users to:

* Upload **any type of file** (documents, images, videos, archives, binaries)
* Encrypt files **client-side** using modern cryptography
* Share files via a **secure link**
* Protect downloads with:

  * Expiry time
  * Download limits
  * Optional password protection
* Ensure the backend never has access to:

  * Encryption keys
  * Plaintext files
  * Passwords

This makes Silent Drop suitable for **secure communication**, **academic projects**, and **privacy-sensitive sharing**.

---

## 🧠 Core Security Principles

✔ Zero-knowledge architecture
✔ Client-side encryption & decryption
✔ No plaintext storage on server
✔ No encryption keys stored or transmitted
✔ Passwords are hashed client-side
✔ Backend only enforces access rules
✔ Resistant to replay, enumeration & brute-force attacks

---

## 🖥️ Frontend Tech Stack

| Technology                | Purpose                             |
| ------------------------- | ----------------------------------- |
| **React 18 + TypeScript** | UI & application logic              |
| **Vite**                  | Fast development & optimized builds |
| **Tailwind CSS**          | Styling & responsive design         |
| **Web Crypto API**        | AES-GCM encryption & decryption     |
| **Lucide Icons**          | Clean, modern icons                 |
| **Vercel**                | Hosting & CDN                       |

---

## 🧩 Application Pages

### 🏠 Home — Create a Secure Drop

* Drag & drop file upload
* Expiry selection (time-based)
* Download limit selection
* Optional password protection
* Local encryption before upload
* Secure link + encryption key generation

### 📥 Receive — Download Securely

* Accepts drop link or token
* Fetches **safe metadata only**
* Requires encryption key
* Requires password (if set)
* Decrypts file **locally**
* Triggers browser download

### 🔐 Security

* Explains zero-knowledge design
* Shows encryption & threat model
* Educates users on secure sharing

### 📚 Docs

* Architecture overview
* Encryption flow explanation
* Backend API summary
* Deployment & testing notes

---

## 🔒 Encryption Flow (Simplified)

1. User selects a file
2. Browser generates a random AES-256 key
3. File is encrypted locally using **AES-GCM**
4. Encrypted bytes are uploaded to backend
5. Encryption key is **never sent**
6. Receiver downloads encrypted data
7. Receiver decrypts locally using the key

> The server only stores encrypted data + metadata.

---

## 🔑 Password Protection (How It Works)

* Password is **never sent in plaintext**
* Password is hashed client-side (SHA-256)
* Backend stores only the hash
* On download:

  * Hash must match
  * Otherwise access is denied
* Password is never logged or recoverable

---

## ⚙️ Environment Configuration

Create a `.env` file in the frontend root:

```env
VITE_API_URL=https://silent-backend-2l1v.onrender.com
```

> ⚠️ Only variables prefixed with `VITE_` are exposed to the browser.

---

## 🛠️ Local Development

### 1️⃣ Install dependencies

```bash
npm install
```

### 2️⃣ Run development server

```bash
npm run dev
```

App will be available at:

```
http://localhost:5173
```

---

## 🏗️ Build for Production

```bash
npm run build
```

Output directory:

```
dist/
```

---

## 🌍 Deployment (Vercel)

* **Framework:** Vite
* **Root Directory:** `frontend`
* **Build Command:** `npm run build`
* **Output Directory:** `dist`
* **Routing:** Hash-based (`#/drop/...`) → no rewrites required

---

## 🧪 Security & Functional Testing

✔ Upload & download different file types
✔ Verify encryption key never appears in network requests
✔ Confirm backend cannot decrypt files
✔ Test password enforcement
✔ Test expiry & download limits
✔ Verify auto-destruction after max downloads

---

## 🚨 What Silent Drop Does NOT Do

* ❌ No file previews
* ❌ No server-side decryption
* ❌ No user accounts (by design)
* ❌ No recovery of lost keys/passwords

> If the key is lost, the file is permanently unrecoverable.

---

## 🧠 Ideal Use Cases

* Secure academic submissions
* Private document sharing
* Sending sensitive files
* Temporary confidential transfers
* Demonstrating zero-knowledge systems



## 🏁 Final Note

Silent Drop proves that **strong security does not require trust**.

> “If the server can’t see your data, it can’t leak it.”

---


