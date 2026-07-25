# FocusFlow AI - Productivity & Focus Management Platform

A modern, AI-powered productivity application designed to help you achieve peak focus and manage your tasks efficiently. Built with React, TypeScript, and Tailwind CSS.

## 🎯 Project Overview

**GitHub Repository**: https://github.com/230611-harshini/FoucsFlow-Ai-

FocusFlow AI is a comprehensive productivity suite that combines task management, focus tracking, mood detection, and AI-powered suggestions to help users maintain their productivity and well-being.

### ✨ Key Features

- **User Authentication**: Secure local authentication system
- **Task Management**: Create, prioritize, and track tasks with reminders
- **Focus Timer**: Pomodoro-style timer with face detection
- **AI Suggestions**: Smart productivity recommendations based on your tasks
- **Ambient Sounds**: Curated collection of background sounds for focus
- **Mood Detection**: Track your emotional state and get wellness suggestions
- **Daily Streaks**: Gamification to maintain consistency
- **Notifications**: Real-time in-app notifications and reminders
- **Dark/Light Theme**: Customizable appearance settings

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager
- [Install Node.js with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

### Installation

Follow these steps to run the project locally:

```sh
# Step 1: Clone the repository
git clone https://github.com/230611-harshini/FoucsFlow-Ai-.git

# Step 2: Navigate to the project directory
cd FoucsFlow-Ai-

# Step 3: Install dependencies
npm install

# Step 4: Start the development server
npm run dev
```

The application will open in your browser with hot-reload enabled for instant previews of your changes.

## 🛠 Development Workflow

### Using Your Preferred IDE

1. Clone the repository using the Git URL
2. Open the project in your favorite IDE (VS Code, WebStorm, etc.)
3. Install dependencies with `npm install`
4. Make your changes and push to GitHub
5. Changes will be automatically reflected

### Editing Files Directly in GitHub

- Navigate to the desired file(s) in the repository
- Click the "Edit" button (pencil icon) at the top right
- Make your changes and commit directly
- Changes will be pulled to local development environments

### Using GitHub Codespaces

- Visit the repository main page
- Click the green "Code" button
- Select the "Codespaces" tab
- Click "New codespace" to launch a cloud IDE
- Edit files directly and commit changes

## 🛠 Technologies Used

This project is built with modern, production-ready technologies:

- **Vite** - Next-generation frontend build tool for fast development
- **React 18** - UI library for building interactive interfaces
- **TypeScript** - Type-safe JavaScript for better code quality
- **Tailwind CSS** - Utility-first CSS framework for styling
- **shadcn-ui** - High-quality, customizable UI components
- **Framer Motion** - Animation library for smooth interactions
- **Lucide React** - Beautiful icon library
- **Sonner** - Toast notifications library
- **React Router** - Client-side routing
- **Local Storage API** - For persistent data storage (no backend required)

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── dashboard/      # Dashboard-specific components
│   └── ui/             # shadcn-ui components
├── hooks/              # Custom React hooks
├── pages/              # Page components
├── lib/                # Utility functions
├── assets/             # Images and static files
└── integrations/       # Third-party integrations
```

## 🔐 Authentication

The application uses a local, in-browser authentication system:
- Sign up with email and password
- Passwords are stored securely in localStorage
- Sessions persist across browser tabs
- No backend server required

## 💾 Data Storage

All user data is stored locally in the browser:
- Tasks and reminders
- Notifications
- User preferences
- Session information

## 🚀 Deployment

### Lovable Platform
The project was created using Lovable and can be deployed directly:
1. Visit [Lovable](https://lovable.dev/)
2. Connect your GitHub repository
3. Click Share → Publish to deploy

### Alternative Deployment Options

- **Vercel**: `vercel deploy` - Zero-config deployment
- **Netlify**: Connect GitHub repository for automatic deployments
- **GitHub Pages**: Build and deploy to GitHub Pages
- **Docker**: Containerize the application for any hosting platform

## 🌐 Custom Domain

To connect a custom domain to your deployment:
1. Navigate to your hosting platform's settings
2. Add your domain in the domain configuration section
3. Update DNS records as instructed
4. Wait for DNS propagation (24-48 hours)

## 📝 Available Scripts

```sh
npm run dev      # Start development server with hot reload
npm run build    # Build for production
npm run preview  # Preview production build locally
npm run lint     # Run ESLint to check code quality
```

## 🐛 Troubleshooting

### Port Already in Use
If port 5173 is already in use, Vite will automatically use the next available port.

### Build Errors
1. Clear node_modules: `rm -rf node_modules`
2. Clear npm cache: `npm cache clean --force`
3. Reinstall dependencies: `npm install`
4. Rebuild: `npm run build`

### Git Issues
If you encounter git issues:
```sh
# Check remote URL
git remote -v

# Update remote if needed
git remote set-url origin https://github.com/230611-harshini/FoucsFlow-Ai-.git

# Push changes
git push origin main
```

## 📚 Documentation

- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com)
- [shadcn-ui Documentation](https://ui.shadcn.com)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is open source and available under the MIT License.

## 🎓 Project Author

**Harshini** - [@230611-harshini](https://github.com/230611-harshini)

## 🙏 Acknowledgments

- Built with [Lovable](https://lovable.dev)
- UI components from [shadcn-ui](https://ui.shadcn.com)
- Icons from [Lucide React](https://lucide.dev)
- Styling with [Tailwind CSS](https://tailwindcss.com)

## 📞 Support

For issues, feature requests, or questions:
1. Check existing [GitHub Issues](https://github.com/230611-harshini/FoucsFlow-Ai-/issues)
2. Create a new issue with detailed information
3. Include steps to reproduce the problem
4. Attach relevant screenshots or error messages

---

**Happy Coding! 🚀**
