# Contributing to News Platform

Thank you for your interest in contributing to the News Platform! This document provides guidelines and information for contributors.

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Git
- Basic knowledge of React, TypeScript, and Next.js

### Development Setup
1. Fork the repository
2. Clone your fork: `git clone https://github.com/YOUR_USERNAME/Newswebsite.git`
3. Install dependencies: `npm install`
4. Start development server: `npm run dev`

## 📋 Development Guidelines

### Code Style
- Use **TypeScript** for all new code
- Follow **ESLint** rules (run `npm run lint`)
- Use **Tailwind CSS** for styling
- Follow existing naming conventions
- Add proper TypeScript types for all functions and components

### Component Guidelines
- Create reusable components in `/src/components/`
- Use proper prop types and interfaces
- Implement responsive design (mobile-first)
- Add loading states and error handling
- Include accessibility features (ARIA labels, keyboard navigation)

### API Integration
- Use React Query hooks from `/src/hooks/useApi.ts`
- Add proper error handling and retry logic
- Transform API responses in `/src/services/api.ts`
- Update TypeScript types in `/src/types/api.ts`

### State Management
- Use Redux Toolkit for global state
- Use React Query for server state
- Keep components stateless when possible
- Use custom hooks for complex logic

## 🧪 Testing
- Write unit tests for new components
- Test responsive design on different screen sizes
- Verify accessibility features
- Test error scenarios and edge cases

## 📝 Commit Guidelines
- Use clear, descriptive commit messages
- Follow conventional commits format:
  - `feat: add new feature`
  - `fix: resolve bug`
  - `docs: update documentation`
  - `style: formatting changes`
  - `refactor: code restructuring`
  - `test: add or update tests`

## 🐛 Bug Reports
When reporting bugs, please include:
- Clear description of the issue
- Steps to reproduce
- Expected vs actual behavior
- Browser and device information
- Screenshots if applicable

## 💡 Feature Requests
For new features, please provide:
- Clear description of the feature
- Use case and benefits
- Possible implementation approach
- Mockups or examples if applicable

## 📚 Resources
- [Next.js Documentation](https://nextjs.org/docs)
- [React Query Documentation](https://tanstack.com/query/latest)
- [Redux Toolkit Documentation](https://redux-toolkit.js.org/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## 🤝 Code of Conduct
- Be respectful and inclusive
- Provide constructive feedback
- Help others learn and grow
- Follow GitHub community guidelines

Thank you for contributing! 🎉
