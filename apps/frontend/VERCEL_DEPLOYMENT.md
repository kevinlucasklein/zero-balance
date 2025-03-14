# Deploying the Frontend to Vercel

This guide provides step-by-step instructions for deploying the ZeroBalance frontend to Vercel.

## Prerequisites

- A Vercel account (https://vercel.com)
- The Vercel CLI installed (optional, but recommended)
- Your backend API already deployed to Railway or another platform

## Deployment Steps

### 1. Prepare Your Project

Ensure your project has the following files:
- `vercel.json` - Configuration for Vercel deployment
- `.env.production` - Production environment variables (not committed to Git)

### 2. Update the Vercel Configuration

Edit the `vercel.json` file to update the API URL in the rewrites section:

```json
{
  "rewrites": [
    {
      "source": "/api/:path*",
      "destination": "https://your-api-url.railway.app/:path*"
    }
  ]
}
```

Replace `https://your-api-url.railway.app` with your actual backend API URL.

### 3. Deploy to Vercel

#### Option 1: Using the Vercel Dashboard

1. Log in to your Vercel account
2. Click "Add New" > "Project"
3. Import your Git repository
4. Configure the project:
   - Set the root directory to `apps/frontend` (if using a monorepo)
   - Set the framework preset to "Vite"
   - Set the build command to `npm run build`
   - Set the output directory to `dist`
5. Set environment variables:
   - Add `VITE_API_URL` with the value of your backend API URL
6. Click "Deploy"

#### Option 2: Using the Vercel CLI

1. Log in to Vercel CLI:
   ```
   vercel login
   ```

2. Navigate to your frontend directory:
   ```
   cd apps/frontend
   ```

3. Deploy your project:
   ```
   vercel
   ```

4. Follow the prompts to configure your project
5. Set environment variables when prompted or later in the Vercel dashboard

### 4. Configure Environment Variables

In the Vercel dashboard:

1. Go to your project
2. Click on "Settings" > "Environment Variables"
3. Add the following variables:
   - `VITE_API_URL` - The URL of your backend API

## Verifying the Deployment

1. Once deployed, Vercel will provide a URL for your frontend
2. Visit the URL to ensure your frontend is working correctly
3. Test the connection to your backend API by performing actions that make API calls

## Troubleshooting

### API Connection Issues

If your frontend can't connect to the backend:

1. Check that `VITE_API_URL` is set correctly in Vercel environment variables
2. Ensure your backend API is running and accessible
3. Verify that CORS is properly configured on your backend
4. Check the rewrites configuration in `vercel.json`

### Build Failures

If your build fails:

1. Check the build logs in Vercel
2. Ensure all dependencies are properly installed
3. Verify that your `vercel.json` file is correctly configured

## Continuous Deployment

Vercel automatically deploys when changes are pushed to your repository. To configure this:

1. Go to your project settings in Vercel
2. Under "Git", you can configure which branches trigger deployments

## Custom Domains

To use a custom domain:

1. Go to your project settings in Vercel
2. Click on "Domains"
3. Add your custom domain
4. Follow the DNS configuration instructions provided by Vercel

## Preview Deployments

Vercel automatically creates preview deployments for pull requests. To view a preview:

1. Create a pull request in your repository
2. Vercel will comment on the PR with a link to the preview deployment
3. Click the link to view the preview 