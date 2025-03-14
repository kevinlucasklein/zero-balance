# Vercel Deployment Troubleshooting

If you're seeing the raw HTML without your React application rendering properly, follow these steps to troubleshoot:

## 1. Check Browser Console Errors

Open your browser's developer tools (F12 or right-click and select "Inspect") and check the Console tab for any error messages. Common issues include:

- JavaScript errors preventing the application from loading
- Failed network requests to load JavaScript bundles
- CORS errors when connecting to your API

## 2. Fix API Proxy Configuration

The most common issue is with the API proxy configuration. You need to:

1. Edit your `vercel.json` file to include your actual API URL:

```json
{
  "rewrites": [
    {
      "source": "/api/:path*",
      "destination": "https://your-actual-api-url.railway.app/:path*"
    },
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

Replace `https://your-actual-api-url.railway.app` with your actual backend API URL.

**Important**: This URL will be visible in your repository. For a more secure approach, use environment variables and configure rewrites in the Vercel dashboard instead.

## 3. Configure API Rewrites in Vercel Dashboard (More Secure)

For a more secure approach:

1. Go to your project settings in Vercel
2. Navigate to "Settings" > "Rewrites"
3. Add a new rewrite:
   - Source: `/api/:path*`
   - Destination: Your actual backend API URL with path parameter (e.g., `https://your-api.railway.app/:path*`)
4. Remove the API rewrite from your `vercel.json` file

This keeps your API URL out of your code repository.

## 4. Set Up Environment Variables in Vercel

Set environment variables for your API URL:

1. Go to your Vercel dashboard
2. Select your project
3. Go to "Settings" > "Environment Variables"
4. Add the following variables:
   - `VITE_API_URL` - Your complete backend API URL (e.g., `https://your-api.railway.app`)

## 5. Update Your API Service

Make sure your API service is configured to use environment variables:

```typescript
// In your api.ts file
const apiUrl = import.meta.env.VITE_API_URL || '';
```

## 6. Avoid Circular References

Make sure your `vercel.json` doesn't have circular references like:

```json
// INCORRECT - This creates a circular reference
{
  "rewrites": [
    { 
      "source": "/api/:path*", 
      "destination": "/api/:path*" 
    }
  ]
}
```

## 7. Redeploy Your Application

After making changes:

1. Commit and push your changes to your repository
2. Trigger a new deployment in Vercel:
   - Go to your project in the Vercel dashboard
   - Click "Deployments"
   - Click "Redeploy" on your latest deployment

## 8. Check Build Logs

If your application still isn't working:

1. Go to your project in the Vercel dashboard
2. Click "Deployments"
3. Select your latest deployment
4. Click "Build Logs" to see if there were any errors during the build process

## 9. Try a Local Build

Test if your application builds correctly locally:

```bash
cd apps/frontend
npm run build
npx serve -s dist
```

Visit `http://localhost:3000` to see if your application works locally.

## 10. Check CORS Configuration

If you're getting CORS errors, make sure your backend API allows requests from your Vercel domain:

```go
// In your Go backend
func getCorsOrigins() []string {
    if os.Getenv("ENVIRONMENT") == "production" {
        // Add your Vercel domain here
        return []string{"https://your-app.vercel.app"}
    }
    // For development
    return []string{"*"}
}
``` 