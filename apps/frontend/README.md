# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

## Environment Setup

This project uses environment variables to configure the API connection. The following files are used:

- `.env.development` - Used during local development
- `.env.production` - Used during production builds
- `.env.example` - Example file showing required environment variables

### Required Environment Variables

- `VITE_API_URL` - The URL of the backend API

### Local Development

1. Copy `.env.example` to `.env.development` if it doesn't exist
2. Update the values in `.env.development` as needed
3. Run `npm run dev` to start the development server

### Production Deployment

When deploying to production, set the environment variables in your hosting platform:

#### Vercel Deployment

This project is configured for easy deployment to Vercel. See [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md) for detailed instructions.

Key points:
- Vercel automatically detects Vite projects
- Set `VITE_API_URL` in Vercel environment variables
- The `vercel.json` file includes API proxy configuration

#### Railway Deployment

Alternatively, you can deploy to Railway. See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.

## API Service

The application uses a centralized API service located at `src/services/api.ts` for all API calls. This service:

- Automatically uses the correct API URL based on the environment
- Handles common error scenarios
- Provides a consistent interface for all API requests

Example usage:

```typescript
import api from './services/api';

// GET request
const response = await api.get('/endpoint');

// POST request
const response = await api.post('/endpoint', { data: 'value' });
```

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
