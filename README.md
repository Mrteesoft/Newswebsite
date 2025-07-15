# 📰 Modern News Platform

A comprehensive, responsive news platform built with **Next.js 15**, **TypeScript**, and **Tailwind CSS**. Features real-time news consumption, advanced search, bookmark management, and a beautiful user interface.

![News Platform](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![React Query](https://img.shields.io/badge/React_Query-FF4154?style=for-the-badge&logo=react-query&logoColor=white)
![Redux](https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white)

## 🚀 Live Demo

**Repository**: [https://github.com/Mrteesoft/Newswebsite](https://github.com/Mrteesoft/Newswebsite)

## ✨ Features

### 🎨 **User Interface**
- **Hero Section** with dynamic background and breaking news
- **Responsive Design** - Mobile-first approach, works on all devices
- **Dark/Light Theme** support with smooth transitions
- **Skeleton Loading** - Beautiful loading states for better UX
- **Smooth Animations** - Hover effects and transitions throughout

### 📱 **Core Functionality**
- **Multiple Story Sections**: Top Stories, Editor's Picks, Featured, Latest, Missed Stories
- **Category Navigation** - Horizontal scrollable category filtering
- **Advanced Search** - Search by title, excerpt, author, or category
- **Bookmark System** - Save and manage favorite stories with localStorage persistence
- **Story Sharing** - Social media sharing (Twitter, Facebook, LinkedIn, WhatsApp)
- **Related Stories** - Intelligent story recommendations

### ⚡ **Performance & UX**
- **React Query Caching** - Intelligent data caching with background updates
- **Error Boundaries** - Comprehensive error handling with retry functionality
- **Progressive Loading** - Load more functionality for large datasets
- **Image Optimization** - Next.js Image component with fallback handling
- **SEO Optimized** - Meta tags and structured data

### 🛠️ **Technical Features**
- **TypeScript** - Full type safety throughout the application
- **Redux Toolkit** - Global state management for bookmarks and search
- **Server-Side Rendering** - Fast initial page loads
- **API Integration** - RESTful API consumption with proper error handling
- **Responsive Grid Layouts** - Adaptive layouts for different screen sizes

## 🏗️ Tech Stack

| Technology | Purpose | Version |
|------------|---------|---------|
| **Next.js** | React Framework | 15.x |
| **TypeScript** | Type Safety | Latest |
| **Tailwind CSS** | Styling | Latest |
| **React Query** | Data Fetching & Caching | @tanstack/react-query |
| **Redux Toolkit** | State Management | Latest |
| **React Redux** | React-Redux Integration | Latest |

## 🌐 API Integration

The application consumes the **AGC News Network API** with the following endpoints:

| Endpoint | Purpose | Caching |
|----------|---------|---------|
| `/categories` | News categories | 5 minutes |
| `/top-stories` | Breaking news | 2 minutes |
| `/editor-picks` | Curated content | 2 minutes |
| `/featured-stories` | Featured articles | 2 minutes |
| `/latest-stories` | Recent news | 1 minute |
| `/missed-stories` | Catch-up content | 2 minutes |
| `/categories/{id}/stories` | Category-specific | 2 minutes |
| `/stories/{id}` | Single article | 5 minutes |

**Base URL**: `https://api.agcnewsnet.com/api/general`

## 🚀 Quick Start

### Prerequisites

Make sure you have the following installed on your machine:

- **Node.js** (version 18.0 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn** - Package manager
- **Git** - [Download here](https://git-scm.com/)

### 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Mrteesoft/Newswebsite.git
   cd Newswebsite
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000) to see the application running.

### 🏗️ Build for Production

```bash
# Build the application
npm run build
# or
yarn build

# Start the production server
npm start
# or
yarn start
```

### 🐳 Docker Support (Optional)

```bash
# Build Docker image
docker build -t news-platform .

# Run container
docker run -p 3000:3000 news-platform
```

## 📁 Project Structure

```
news-platform/
├── 📁 public/                    # Static assets
│   ├── 🖼️ images/               # Image assets
│   └── 📄 favicon.ico           # Favicon
├── 📁 src/
│   ├── 📁 app/                  # Next.js App Router
│   │   ├── 📁 bookmarks/        # Bookmarks page
│   │   ├── 📁 stories/[id]/     # Dynamic story detail pages
│   │   ├── 📄 layout.tsx        # Root layout component
│   │   ├── 📄 page.tsx          # Homepage
│   │   └── 📄 globals.css       # Global styles
│   ├── 📁 components/           # React components
│   │   ├── 📁 sections/         # Page sections
│   │   │   ├── 📄 TopStoriesSection.tsx
│   │   │   ├── 📄 FeaturedStoriesSection.tsx
│   │   │   ├── 📄 LatestStoriesSection.tsx
│   │   │   └── 📄 MissedStoriesSection.tsx
│   │   ├── 📁 ui/               # Reusable UI components
│   │   │   ├── 📄 LoadingStates.tsx
│   │   │   ├── 📄 ErrorBoundary.tsx
│   │   │   ├── 📄 Pagination.tsx
│   │   │   └── 📄 SkeletonLoader.tsx
│   │   ├── 📄 Header.tsx        # Main navigation header
│   │   ├── 📄 Footer.tsx        # Site footer
│   │   ├── 📄 HeroSection.tsx   # Hero banner
│   │   ├── 📄 CategoryNav.tsx   # Category navigation
│   │   ├── 📄 SearchBar.tsx     # Search functionality
│   │   ├── 📄 StoryCard.tsx     # Story card component
│   │   ├── 📄 TrendingStories.tsx # Trending sidebar
│   │   ├── 📄 ShareStory.tsx    # Social sharing
│   │   └── 📄 BackToTop.tsx     # Scroll to top button
│   ├── 📁 hooks/                # Custom React hooks
│   │   ├── 📄 useApi.ts         # React Query hooks for API
│   │   └── 📄 useBookmarks.ts   # Bookmark management
│   ├── 📁 providers/            # Context providers
│   │   ├── 📄 QueryProvider.tsx # React Query setup
│   │   └── 📄 ReduxProvider.tsx # Redux store provider
│   ├── 📁 services/             # API services
│   │   └── 📄 api.ts            # API service functions
│   ├── 📁 store/                # Redux store configuration
│   │   ├── 📁 slices/           # Redux slices
│   │   │   ├── 📄 bookmarksSlice.ts
│   │   │   ├── 📄 searchSlice.ts
│   │   │   └── 📄 categorySlice.ts
│   │   ├── 📄 hooks.ts          # Typed Redux hooks
│   │   └── 📄 index.ts          # Store configuration
│   ├── 📁 types/                # TypeScript type definitions
│   │   └── 📄 api.ts            # API response types
│   └── 📁 utils/                # Utility functions
│       └── 📄 localStorage.ts   # localStorage helpers
├── 📄 package.json              # Dependencies and scripts
├── 📄 tsconfig.json             # TypeScript configuration
├── 📄 tailwind.config.ts        # Tailwind CSS configuration
├── 📄 next.config.js            # Next.js configuration
└── 📄 README.md                 # Project documentation
```

## 🎯 Key Features Implementation

### 🗄️ **State Management Architecture**
```typescript
// Redux Toolkit for global state
├── Bookmarks Management (localStorage persistence)
├── Search Query State
├── Selected Category State
└── UI State (mobile menu, modals)

// React Query for server state
├── API Data Caching (with stale-time configuration)
├── Background Data Refetching
├── Optimistic Updates
└── Error Handling & Retries
```

### 📱 **Responsive Design System**
- **Mobile-First Approach** - Tailwind CSS breakpoints
- **Responsive Navigation** - Collapsible mobile menu
- **Adaptive Grid Layouts** - Dynamic columns based on screen size
- **Touch-Friendly Interface** - Optimized for mobile interactions
- **Cross-Browser Compatibility** - Tested on major browsers

### ⚡ **Performance Optimizations**
- **React Query Caching** - Intelligent data caching with configurable stale times
- **Image Optimization** - Next.js Image component with lazy loading
- **Code Splitting** - Dynamic imports for better bundle size
- **Skeleton Loading** - Smooth loading states for better perceived performance
- **Error Boundaries** - Graceful error handling without app crashes
- **Bundle Optimization** - Tree shaking and minification

### 🛡️ **Error Handling Strategy**
```typescript
// Multi-layer error handling
├── API Level - HTTP error detection and retry logic
├── Component Level - Error boundaries for graceful failures
├── User Level - Friendly error messages with retry options
└── Development Level - Detailed error logging and debugging
```

### 🔍 **Search & Filtering System**
- **Real-time Search** - Instant results as you type
- **Multi-field Search** - Title, excerpt, author, and category
- **Category Filtering** - Filter stories by news categories
- **Search History** - Recent searches persistence
- **No Results Handling** - Helpful suggestions and fallbacks

## 📜 Available Scripts

| Command | Description | Usage |
|---------|-------------|-------|
| `npm run dev` | Start development server | Development |
| `npm run build` | Build for production | Deployment |
| `npm start` | Start production server | Production |
| `npm run lint` | Run ESLint | Code quality |
| `npm run type-check` | Run TypeScript check | Type validation |

## 🚀 Deployment

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Netlify
```bash
# Build the project
npm run build

# Deploy the 'out' folder to Netlify
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
   ```bash
   git fork https://github.com/Mrteesoft/Newswebsite.git
   ```

2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```

3. **Make your changes**
   - Follow the existing code style
   - Add TypeScript types for new features
   - Update tests if applicable

4. **Commit your changes**
   ```bash
   git commit -m 'Add some amazing feature'
   ```

5. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```

6. **Open a Pull Request**

### 📋 Development Guidelines
- Use **TypeScript** for all new code
- Follow **ESLint** rules
- Write **responsive** components
- Add **error handling** for new features
- Update **documentation** for significant changes

## 🐛 Bug Reports & Feature Requests

- **Bug Reports**: [Create an issue](https://github.com/Mrteesoft/Newswebsite/issues/new?template=bug_report.md)
- **Feature Requests**: [Create an issue](https://github.com/Mrteesoft/Newswebsite/issues/new?template=feature_request.md)

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Mrteesoft**
- GitHub: [@Mrteesoft](https://github.com/Mrteesoft)
- Repository: [Newswebsite](https://github.com/Mrteesoft/Newswebsite)

## 🙏 Acknowledgments

- **AGC News Network** for providing the news API
- **Next.js Team** for the amazing framework
- **Tailwind CSS** for the utility-first CSS framework
- **React Query Team** for excellent data fetching solution
- **Redux Toolkit** for simplified state management

## 📊 Project Stats

![GitHub stars](https://img.shields.io/github/stars/Mrteesoft/Newswebsite?style=social)
![GitHub forks](https://img.shields.io/github/forks/Mrteesoft/Newswebsite?style=social)
![GitHub issues](https://img.shields.io/github/issues/Mrteesoft/Newswebsite)
![GitHub license](https://img.shields.io/github/license/Mrteesoft/Newswebsite)

---

⭐ **Star this repository if you found it helpful!**
