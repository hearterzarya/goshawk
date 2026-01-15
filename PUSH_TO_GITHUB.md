# Push to GitHub - Instructions

## Step 1: Create a New Repository on GitHub

1. Go to [GitHub.com](https://github.com) and sign in
2. Click the "+" icon in the top right corner
3. Select "New repository"
4. Name your repository (e.g., `goshawk-logistics` or `goshawk-website`)
5. Choose if it should be Public or Private
6. **DO NOT** initialize with README, .gitignore, or license (we already have these)
7. Click "Create repository"

## Step 2: Push Your Code to GitHub

After creating the repository, GitHub will show you commands. Use one of these methods:

### Method 1: Using HTTPS (Recommended)

```bash
# Add the remote repository (replace YOUR_USERNAME and YOUR_REPO_NAME)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# Rename branch to main (if needed)
git branch -M main

# Push to GitHub
git push -u origin main
```

### Method 2: Using SSH (If you have SSH keys set up)

```bash
# Add the remote repository (replace YOUR_USERNAME and YOUR_REPO_NAME)
git remote add origin git@github.com:YOUR_USERNAME/YOUR_REPO_NAME.git

# Rename branch to main (if needed)
git branch -M main

# Push to GitHub
git push -u origin main
```

## Example Commands

If your GitHub username is `johndoe` and repository name is `goshawk-logistics`:

```bash
git remote add origin https://github.com/johndoe/goshawk-logistics.git
git branch -M main
git push -u origin main
```

## Important Notes

- If you're asked for credentials, you may need to use a Personal Access Token instead of your password
- To create a Personal Access Token: GitHub Settings → Developer settings → Personal access tokens → Generate new token
- Make sure to give the token `repo` permissions

## After Pushing

Your code will be available at: `https://github.com/YOUR_USERNAME/YOUR_REPO_NAME`
