# Uploading Manthan to GitHub

It appears that `git` is not accessible from the current terminal session. However, your project is ready to be uploaded!

Follow these simple steps:

### 1. Initialize the Repository
Open your preferred terminal (where git is installed) and run:

```bash
cd f:\manthan
git init
git add .
git commit -m "Initial launch of Manthan Platform"
```

### 2. Create the Repo on GitHub
1. Go to [https://github.com/new](https://github.com/new).
2. Repository name: `manthan`.
3. Click **Create repository**.

### 3. Push Your Code
Copy the code provided by GitHub (under "…or push an existing repository from the command line") and run it. It will look similar to this:

```bash
git remote add origin https://github.com/<YOUR_USERNAME>/manthan.git
git branch -M main
git push -u origin main
```

**Note:** I have already created a `.gitignore` file for you to ensure `node_modules` and other temporary files are not uploaded.
