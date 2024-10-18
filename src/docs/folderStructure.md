### Folder Structure

```
📦 src/
├── 📂 app/
│   ├── 📂 components/
│   │   ├── 📂 auth/                   # Auth-related components like login, registration, password reset
│   │   │   ├── AuthLogin.tsx
│   │   │   ├── AuthRegister.tsx
│   │   │   └── AuthResetPassword.tsx
│   │   ├── 📂 container/
│   │   │   ├── 📂 custom-scroll/      # Custom scroll bar component
│   │   │   ├── 📂 dashboards/         # Dashboard UI components
│   │   │   ├── 📂 forms/              # Form elements and components
│   │   │   └── 📂 shared/             # Reusable shared components
│   ├── 📄 app.tsx                     # Main application component
│   ├── 📄 global.css                  # Global styling
│   ├── 📄 layout.tsx                  # Layout structure of the application
│   ├── 📄 loading.tsx                 # Loading state component
│   └── 📄 not-found.tsx               # 404 Page component
├── 📂 hooks/                          # Custom hooks used across the app, Inbuilt React hooks like useState, etc.
│   ├── useAuth.ts
│   ├── useLogout.ts
│   ├── usePermission.ts
│   ├── useProfile.ts
│   ├── useRouteInitializer.ts
│   └── useUnAuth.ts
├── 📂 services/                       # API service handlers for business logic
│   ├── 📂 configs/
│   │   └── axiosConfigs.ts            # Axios configuration for API requests
│   ├── authService.ts                 # Service for authentication
│   ├── dashboardService.ts            # Service for handling dashboard data
│   ├── moduleService.ts               # Service for different modules
│   ├── profileService.ts              # Service for user profile management
│   ├── roleService.ts                 # Service for managing roles and permissions
│   └── userService.ts                 # Service for user-related API calls
├── 📂 store/                          # Redux store for state management
│   ├── 📂 auth/
│   ├── hooks.ts                       # Hooks for interacting with Redux store
│   ├── providers.tsx                  # Providers for Redux and other global state
│   └── store.ts                       # Main Redux store configuration
├── 📂 types/                          # TypeScript types for type checking
├── 📂 utils/                          # Utility functions and helpers
│   ├── 📂 helper/
│   ├── 📂 languages/
│   └── 📂 theme/
│       ├── axios.js                   # Axios utility functions
│       ├── i18n.ts                    # Internationalization setup
├── 📂 docs/                           # Documentation folder
│   ├── Features.md                    # Feature descriptions
│   ├── Design.md                      # Design documentation
│   └── Roadmap.md                     # Roadmap for the project
├── 📄 .env                            # Environment variables
├── 📄 .eslintrc.json                  # ESLint configuration for code listing
├── 📄 .gitignore                      # Files and directories to be ignored by Git
└── 📄 LICENSE                         # License information for the project

```