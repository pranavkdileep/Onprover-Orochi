# Orochi OnProver Automation

Automate interactions with [onprover.orochi.network](https://onprover.orochi.network/) using Puppeteer and Node.js.

---

## 🚀 Getting Started

### 1. Obtain Your Access Token

Before running, you **must** obtain your personal `accessToken` from [onprover.orochi.network](https://onprover.orochi.network/).  
InspectElement -> Application -> Cookies -> `accessToken`.
Set this as an environment variable named `acess_token` (note the spelling).
![Screenshot from 2025-06-27 12-08-43](https://github.com/user-attachments/assets/354bcf83-d96d-4a52-b7de-9fb37df97890)


---


### 2. Run with Docker

You can use the prebuilt image:  
[`docker.io/pranavkdileep/onproverorochi:latest`](https://hub.docker.com/r/pranavkdileep/onproverorochi)

```sh
docker run -e acess_token="YOUR_ACCESS_TOKEN_HERE" docker.io/pranavkdileep/onproverorochi:latest
```

---

### 3. Run Locally

#### Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [Chromium](https://www.chromium.org/getting-involved/download-chromium/) installed and accessible at `/usr/bin/chromium`

#### Steps

```sh
git clone https://github.com/pranavkdileep/onprover-orochi.git
cd onprover-orochi
npm install
export acess_token="YOUR_ACCESS_TOKEN_HERE"
node app.js
```

---

---

## 📝 Notes

- The environment variable is named `acess_token` (not `access_token`).
- The script will run in a loop, periodically interacting with the website.
- For troubleshooting, check the logs printed to the console.

---
