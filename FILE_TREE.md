# File Tree (Depth ≤ 4)

```
avocat-frontend/
├── .env.example
├── Dockerfile
├── README.md
├── eslint.config.js
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.ts
├── vite.config.js
├── public/
│   ├── favicon.ico
│   ├── manifest.json
│   ├── splash-image.jpg
│   ├── splash-image.png
│   └── assets/
│       └── fonts/
├── src/
│   ├── App.tsx
│   ├── main.tsx
│   ├── index.css
│   ├── api/                 # API clients + typed services
│   │   ├── axiosConfig.ts
│   │   ├── adminAuth.service.ts
│   │   ├── clients.service.ts
│   │   ├── legalCases.service.ts
│   │   └── websiteAdmin.service.ts
│   ├── assets/              # images/icons/fonts
│   │   ├── icons/
│   │   ├── images/
│   │   └── styles/
│   ├── components/
│   │   ├── Archives/
│   │   ├── ClientsAndUnClients/
│   │   ├── Courts/
│   │   ├── Financially/
│   │   ├── Lawyers/
│   │   ├── LegalCases/
│   │   ├── LegalServices/
│   │   ├── Procedures/
│   │   ├── Reports/
│   │   ├── Sessions/
│   │   ├── auth/
│   │   ├── common/
│   │   ├── dashboard/
│   │   ├── layout/
│   │   └── ui/              # shared UI (Radix-based)
│   ├── config/
│   │   ├── config.jsx
│   │   ├── iconography.ts
│   │   └── sidebar.js
│   ├── contexts/            # Auth/Theme/Alert/etc.
│   │   ├── AlertContext.jsx
│   │   ├── AuthContext.jsx
│   │   ├── DataContext.jsx
│   │   ├── LanguageContext.jsx
│   │   ├── SidebarContext.jsx
│   │   └── SpinnerContext.jsx
│   ├── hooks/
│   │   ├── useClients.ts
│   │   ├── useLegalCases.tsx
│   │   ├── useNotifications.ts
│   │   └── useWebsiteContent.ts
│   ├── locales/             # i18n dictionaries
│   │   ├── ar.js
│   │   └── en.js
│   ├── pages/               # route-level pages
│   │   ├── ClientUnClientList.jsx
│   │   ├── DashboardPage.jsx
│   │   ├── HomePage.jsx
│   │   ├── LegalCaseList.jsx
│   │   ├── LegalServicList.jsx
│   │   ├── LawyerList.jsx
│   │   ├── Login.jsx
│   │   ├── ProceduresList.jsx
│   │   ├── SearchCourtsApi.jsx
│   │   └── Signup.jsx
│   ├── services/
│   │   ├── api/             # API service modules (axios)
│   │   └── auth/
│   ├── store/               # Redux store + slices
│   │   ├── clientsSlice.js
│   │   └── store.js
│   ├── styles/
│   │   ├── dashboard-shell.css
│   │   ├── radix-vars.css
│   │   └── theme-tokens.css
│   ├── types/
│   │   ├── clients.ts
│   │   ├── legalCase.ts
│   │   └── website.ts
│   └── utils/
│       ├── SidebarContext.jsx
│       ├── Transition.jsx
│       └── Utils.js
└── scripts/
    └── export-css.
```

**Highlighted Areas**
- `src/` ✅
- `src/pages/` ✅
- `src/components/` ✅
- `src/services/api/` ✅
- `src/hooks/` ✅
- `src/store/` ✅
- `src/utils/` ✅
- `src/assets/` ✅
- `src/styles/` ✅
- `src/locales/` ✅ (i18n)
- `public/` ✅ (static assets)
