# E-Commerce App

A modern, full-featured e-commerce web application built with React, Redux, React Router, and Tailwind CSS, powered by Vite for lightning-fast development and builds.

---

## Features

- 🛒 **Product Catalog**: Browse, search, and filter products with category and brand support.
- ❤️ **Wishlist**: Add products to your wishlist for later.
- 🛍️ **Cart**: Add, remove, and update product quantities in your shopping cart.
- 🔒 **Authentication**: Register, login, password reset, and protected routes.
- 💳 **Checkout**: Seamless checkout experience.
- 🌙 **Dark Mode**: Toggle between light and dark themes.
- 📱 **Responsive Design**: Mobile-friendly and accessible UI.
- ⚡ **Fast**: Built with Vite, React 19, and optimized for performance.

---

## Tech Stack

- [React 19](https://react.dev/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [React Router v7](https://reactrouter.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vite](https://vitejs.dev/)
- [Formik & Yup](https://formik.org/) for forms and validation
- [React Query](https://tanstack.com/query/latest) for data fetching
- [Axios](https://axios-http.com/)
- [FontAwesome](https://fontawesome.com/) icons

---

## Getting Started

### 1. Clone the Repository

```sh
git clone https://github.com/iamali-stack/E-commerce-APP.git
cd E-commerce-APP/my-app
```

### 2. Install Dependencies

```sh
npm install
```

### 3. Start the Development Server

```sh
npm run dev
```

The app will be available at [http://localhost:5173](http://localhost:5173).

---

## Project Structure

- `src/components/` — All React components (auth, cart, products, wishlist, etc.)
- `src/Hooks/` — Custom React hooks for API and state logic
- `src/store.js` — Redux store setup
- `src/App.jsx` — Main app and route definitions
- `src/main.jsx` — App entry point
- `public/` — Static assets and favicon

---

## Deployment

This project is ready to deploy to GitHub Pages or any static hosting.

### Deploying to GitHub Pages

1. **Set the Vite base path** in `vite.config.ts`:

```js
export default defineConfig({
  plugins: [react()],
  base: '/E-commerce-APP/', // <-- Set to your repo name
})
```

2. **Build and Deploy:**

```sh
npm run build
npm run deploy
```

This uses the `gh-pages` package to publish the `dist/` folder to GitHub Pages.

---

## Environment Variables

- No environment variables are required for local development. If you connect to a backend API, update the API URLs in the relevant hooks/components.

---

## Screenshots

> Add screenshots of your app here for a better showcase!

---

## License

[MIT](LICENSE)

---

## Credits

- Built by [Ali Khaled](https://github.com/iamali-stack)
- Inspired by modern e-commerce UIs
