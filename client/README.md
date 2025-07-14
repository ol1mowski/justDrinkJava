# Frontend Configuration

## Environment Variables

The frontend uses environment variables to configure API endpoints.

### Development

For local development, create a `.env` file in the `client` directory:

```bash
# Local development
VITE_API_URL=http://localhost:8080/api

# Production
# VITE_API_URL=https://justdrinkjava-server.onrender.com/api
```

### Production

For production builds, set the environment variable:

```bash
# Windows
set VITE_API_URL=https://justdrinkjava-server.onrender.com/api && npm run build

# Linux/Mac
VITE_API_URL=https://justdrinkjava-server.onrender.com/api npm run build
```

### Available Scripts

- `npm run dev` - Development server with local API
- `npm run dev:prod` - Development server with production API
- `npm run build` - Build for production
- `npm run build:prod` - Build with production API URL

### Default Configuration

If no `VITE_API_URL` is set, the application defaults to:

- **Production**: `https://justdrinkjava-server.onrender.com/api`
- **Development**: `http://localhost:8080/api`
