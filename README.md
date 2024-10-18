# OscuroBok Frontend Codebase

Welcome to the OscuroBok Frontend Codebase! This README provides a comprehensive yet simple guide for new contributors to understand the key components and flow of this Next.js project. The codebase primarily focuses on user authentication, OTP verification, and role-based access, using various modern technologies like React, Redux, MUI, Formik, and more.

## Tech Stack

![OscuroBok-Tech Stack](https://github.com/user-attachments/assets/23c4d751-a1a4-427d-89a7-1582465acbf7)

- **Frontend**: Next.js, React, Redux
- **Styling**: Material-UI (MUI) components, custom styles
- **API Requests**: Axios (via services)
- **State Management**: Redux Toolkit
- **Form Handling**: Formik & Yup (for validation)
- **Authentication**: OTP-based (Simulated)

---

## Key Features

### Email-to-OTP Workflow
- Users enter their email, triggering an OTP form. The OTP is verified against the backend to initiate a password reset.

### Role-Based Routing
- Based on the user type (Admin/User), redirection occurs after login using a single API call.

### Smooth Transitions
- Components like email and OTP forms have smooth UI transitions for better user experience.

### Form Validation & Feedback
- Uses Formik to handle form state, and validation provides real-time feedback. Alerts are shown using `react-toastify`.


    
## State Management
- The Redux store manages global authentication and user data. Key actions include login, verifyOtp, and fetchUserData

## Documentations

- [MUI]:- https://mui.com/material-ui/getting-started/
- [NextJS App router]:- https://nextjs.org/docs/app
- Check [FAQ Page](https://www.creative-tim.com/faq)


## Versions
OscuroBok 1.0

## Pages

- [Dashboard page](https://demos.creative-tim.com/material-tailwind-dashboard-react/#/dashboard/home?ref=readme-mtdr)
- [Profile page](https://demos.creative-tim.com/material-tailwind-dashboard-react/#/dashboard/profile?ref=readme-mtdr)
- [Sign in page](https://demos.creative-tim.com/material-tailwind-dashboard-react/#/auth/sign-in?ref=readme-mtdr)
- [Sign up page](https://demos.creative-tim.com/material-tailwind-dashboard-react/#/auth/sign-up?ref=readme-mtdr)
- [Forget Password page](https://demos.creative-tim.com/material-tailwind-dashboard-react/#/auth/sign-up?ref=readme-mtdr)

## Components

 AuthForgotPassword
- Located in app/auth/forgot-password/page.tsx
- Handles email input and OTP verification using the useFormik hook for state management.

## Deploy

:rocket: You can deploy your own version of the template to Genezio with one click:

[![Deploy to Genezio](https://raw.githubusercontent.com/Genez-io/graphics/main/svg/deploy-button.svg)](https://app.genez.io/start/deploy?repository=https://github.com/creativetimofficial/material-tailwind-dashboard-react&utm_source=github&utm_medium=referral&utm_campaign=github-creativetim&utm_term=deploy-project&utm_content=button-head)

## Terminal Commands

1. Download and Install NodeJs LTS version from [NodeJs Official Page](https://nodejs.org/en/download/).
2. Navigate to the root ./ directory of the product and run `npm install` or `yarn install` or `pnpm install` to install our local dependencies.
   
    ### OscuroBok_Dashboard_FE
        * git init
        * git clone https://github.com/OscuroBok/OscuroBok_dashboard.git(Clone from master)
        * git clone -b dashboard-sign-in https://github.com/OscuroBok/OscuroBok_dashboard_FE.git(Clone from specific branch)
        * git add --all
        * git commit -m "Some mesage"
        * git push or git push --set-upstream origin master
        * Navigate to the root ./ directory of the project and run `npm i` or `yarn install` (Install dependencies in package.json)
        * npm run dev(Start application)


## Licensing

- Copyright 2024 [OscuroBok](https://github.com/OscuroBok/OscuroBok_dashboard_FE/blob/master/LICENSE)

## Useful Links

- [More products](https://www.creative-tim.com/templates?ref=readme-mtdr) 

## Social Media

Twitter: <>

Facebook: <https://www.facebook.com/CreativeTim>

Google+: <>

Instagram: <https://www.instagram.com/lesorcoscuro8>

Gmail: <lesorc4202@gmail.com>

LinkedIn: <https://www.linkedin.com/company/lesorc>


## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.


## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
