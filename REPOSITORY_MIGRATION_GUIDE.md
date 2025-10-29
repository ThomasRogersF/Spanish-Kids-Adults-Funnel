# Repository Migration Guide

This guide will help you create a new repository with the correct name and migrate the code from the current "Spanish-Kids-Adults-Funnel" repository to the new "spanish-learning-quiz" repository.

## Step 1: Create the New Repository

1. Go to GitHub and create a new repository named `spanish-learning-quiz`
2. Make sure the repository is set to **Private** (same as current repository)
3. Do not initialize with a README, .gitignore, or license (we'll migrate everything)
4. Note the new repository URL (e.g., `https://github.com/your-username/spanish-learning-quiz.git`)

## Step 2: Update Local Repository Configuration

1. Open a terminal in your current project directory
2. Update the remote origin URL to point to the new repository:
   ```bash
   git remote set-url origin https://github.com/your-username/spanish-learning-quiz.git
   ```

## Step 3: Push to the New Repository

1. Stage and commit all recent changes:
   ```bash
   git add .
   git commit -m "Update project name and documentation"
   ```

2. Push to the new repository:
   ```bash
   git push -u origin main
   ```

## Step 4: Update Repository Settings on GitHub

1. Go to your new repository on GitHub
2. Update the repository description to: "A React-based interactive quiz application that helps users discover their perfect Spanish learning path"
3. Add topics/tags: `react`, `typescript`, `quiz`, `spanish-learning`, `spanishvip`
4. Set up branch protection rules if needed
5. Configure any necessary integrations or webhooks

## Step 5: Update Deployment Configuration

If you have any deployment configurations (Vercel, Netlify, etc.), update them to point to the new repository:

1. Go to your deployment platform
2. Update the repository connection to point to `spanish-learning-quiz`
3. Trigger a new deployment to ensure everything works correctly

## Step 6: Update Team Access

1. Add team members to the new repository with appropriate permissions
2. Remove access from the old repository if needed

## Step 7: Archive the Old Repository

Once you've confirmed everything is working correctly in the new repository:

1. Go to the old "Spanish-Kids-Adults-Funnel" repository
2. Go to Settings → General
3. Scroll down to "Danger Zone"
4. Click "Archive repository" to prevent accidental use
5. Add a note explaining that the project has moved to the new repository

## Step 8: Update Documentation and Links

1. Update any external documentation that references the old repository URL
2. Update any README files in other projects that link to this repository
3. Update any CI/CD pipelines that reference the old repository

## Verification Checklist

- [ ] New repository created with correct name
- [ ] All code pushed to new repository
- [ ] Website/application loads correctly from new repository
- [ ] All team members have access
- [ ] Deployment configurations updated
- [ ] Old repository archived
- [ ] All external links updated

## Troubleshooting

If you encounter any issues during migration:

1. **Push fails**: Make sure you have the correct permissions on the new repository
2. **Build errors**: Check that all environment variables are configured in the new repository
3. **Missing files**: Verify that all files were committed before pushing
4. **Permission issues**: Ensure your GitHub account has owner or admin access to both repositories

For additional help, contact the development team or GitHub support.