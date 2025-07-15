# 🚀 Deployment Guide

This guide covers various deployment options for the News Platform.

## 📋 Prerequisites

- Node.js 18+ installed
- Project built successfully (`npm run build`)
- Environment variables configured (if any)

## 🌐 Vercel (Recommended)

Vercel is the easiest way to deploy Next.js applications.

### Automatic Deployment
1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Vercel will automatically deploy on every push to main branch

### Manual Deployment
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Deploy to production
vercel --prod
```

## 🔷 Netlify

### Using Netlify CLI
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build the project
npm run build

# Deploy to Netlify
netlify deploy --prod --dir=out
```

### Using Git Integration
1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `out`
4. Deploy automatically on git push

## 🐳 Docker Deployment

### Build Docker Image
```bash
# Build the image
docker build -t news-platform .

# Run the container
docker run -p 3000:3000 news-platform
```

### Docker Compose
```yaml
version: '3.8'
services:
  news-platform:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
```

## ☁️ AWS Deployment

### AWS Amplify
1. Connect your GitHub repository to AWS Amplify
2. Configure build settings:
   - Build command: `npm run build`
   - Output directory: `out`
3. Deploy automatically on git push

### AWS EC2
```bash
# SSH into your EC2 instance
ssh -i your-key.pem ubuntu@your-ec2-ip

# Install Node.js and npm
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Clone and setup project
git clone https://github.com/Mrteesoft/Newswebsite.git
cd Newswebsite
npm install
npm run build

# Install PM2 for process management
sudo npm install -g pm2

# Start the application
pm2 start npm --name "news-platform" -- start
pm2 startup
pm2 save
```

## 🔧 Environment Variables

If you need environment variables, create a `.env.local` file:

```bash
# Example environment variables
NEXT_PUBLIC_API_URL=https://api.agcnewsnet.com/api/general
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

## 🔍 Health Checks

Add health check endpoints for monitoring:

```typescript
// pages/api/health.ts
export default function handler(req, res) {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
}
```

## 📊 Performance Monitoring

Consider adding performance monitoring:

- **Vercel Analytics** - Built-in for Vercel deployments
- **Google Analytics** - Web analytics
- **Sentry** - Error tracking
- **New Relic** - Application performance monitoring

## 🔒 Security Considerations

- Enable HTTPS in production
- Configure proper CORS headers
- Set up rate limiting
- Use environment variables for sensitive data
- Regular security updates

## 🚨 Troubleshooting

### Common Issues

1. **Build Failures**
   ```bash
   # Clear cache and reinstall
   rm -rf node_modules package-lock.json
   npm install
   npm run build
   ```

2. **Memory Issues**
   ```bash
   # Increase Node.js memory limit
   NODE_OPTIONS="--max-old-space-size=4096" npm run build
   ```

3. **Port Conflicts**
   ```bash
   # Use different port
   PORT=3001 npm start
   ```

## 📞 Support

For deployment issues:
- Check the [GitHub Issues](https://github.com/Mrteesoft/Newswebsite/issues)
- Review deployment platform documentation
- Contact the maintainers

---

Happy Deploying! 🎉
