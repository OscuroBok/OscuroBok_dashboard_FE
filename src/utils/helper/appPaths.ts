export const appPaths = {
    AUTH_ROUTES: {
      SIGNIN: "/auth/login",
      SIGNUP:"/auth/register",
      FORGET_PASSWORD: "/auth/forgot-password",
      RESET_PASSWORD: "/auth/reset-password/:token",
      CREATE_PASSWORD: "/auth/create-password/:token",
      DASHBOARD: "/",
      PROFILE: "/profile",
      ACCESS_DENIED: "/403",
    },
    COMMON: {
      ERROR: "/404",
    },
    USERS: {
      LIST: "/users",
      CREATE: "/users/create-user",
      EDIT: (id: string) => (`/users/edit-user/${id}`),
      VIEW: (id: string) => (`/users/view-user-details/${id}`),
    },
    DOMAINS: {
      LIST: "/domains",
      BULK_IMPORT: "/domains/bulk-import",
      BULK_IMPORT_DOMAIN: "/domains/bulk-import-domain",
      BULK_IMPORT_RECORDS: (id: string) => ( `/domains/bulk-import/view-records/${id}`),
      BULK_IMPORT_DOMAIN_RECORDS: (id: string) => ( `/domains/bulk-import-domain/view-records/${id}`),
      VIEW: (id: string) => (`/domains/view-domain/${id}`),
      DNS_RECORDS: (id: string) => (`/domains/dns-records/${id}`),
      REDIRECT_RULES: (id: string) => (`/domains/redirect-rules/${id}`),
    },
    SITE_SETTINGS: {
      LIST: "/site-settings",
    },
    LOGS: {
      ACTIVITY_LOGS: "/logs",
      ERROR_LOGS: "/logs/error-logs"
    },
    DNS_RECORDS_TEMPLATE: {
      LIST: "/dns-record-templates",
    },
    ROLES_AND_PERMISSIONS: {
      LIST: "/roles-and-permissions",
    }
  };
  
