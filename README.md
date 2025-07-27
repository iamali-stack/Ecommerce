

# 🛍️ E-Commerce App

A modern, responsive, and feature-rich e-commerce web application built using the latest React ecosystem tools. Designed for performance, scalability, and a seamless user experience—powered by Vite for fast development.

---

## 🚀 Features

* **Product Catalog** – Browse, search, and filter products by category and brand.
* **Wishlist** – Save items for future reference.
* **Shopping Cart** – Add, remove, and update product quantities.
* **Authentication** – Secure registration, login, password reset, and protected routes.
* **Checkout Flow** – Streamlined checkout experience for faster purchases.
* **Mobile-Responsive** – Fully responsive UI optimized for all screen sizes.
* **Performance-Optimized** – Built with React 19 and Vite for lightning-fast load times.

---

## 🧰 Tech Stack

* **Frameworks & Libraries**

  * [React 19](https://react.dev/)
  * [Redux Toolkit](https://redux-toolkit.js.org/)
  * [React Router v7](https://reactrouter.com/)
  * [Vite](https://vitejs.dev/)
  * [Tailwind CSS](https://tailwindcss.com/)

* **Utilities**

  * [Formik](https://formik.org/) & [Yup](https://github.com/jquense/yup) – Forms & validation
  * [React Query](https://tanstack.com/query/latest) – API data management
  * [Axios](https://axios-http.com/) – HTTP client
  * [FontAwesome](https://fontawesome.com/) – Icon library

---

## ⚙️ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/iamali-stack/E-commerce-APP.git
cd E-commerce-APP/my-app
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start the Development Server

```bash
npm run dev
```

Open your browser at [http://localhost:5173](http://localhost:5173)

---

## 🗂️ Project Structure

```
src/
├── components/       # Reusable UI components (cart, auth, wishlist, etc.)
├── hooks/            # Custom React hooks
├── store.js          # Redux store configuration
├── App.jsx           # Main application and route setup
├── main.jsx          # App entry point
public/               # Static assets
```

---

## 🚢 Deployment

This project is deployable to GitHub Pages or any static hosting provider.

### Deploy to GitHub Pages

1. Update `vite.config.ts` with your repository name:

```ts
export default defineConfig({
  plugins: [react()],
  base: '/E-commerce-APP/', // Replace with your repo name
});
```

2. Build and deploy:

```bash
npm run build
npm run deploy
```

> Deployment is handled using the `gh-pages` package.

---

## 🔐 Environment Variables

No environment variables are required for local development. If integrating a backend API, be sure to update API base URLs in the appropriate hooks or services.

---

## 📸 Screenshots



<img width="1439" height="781" alt="Screenshot 2025-07-27 at 6 12 15 PM" src="https://github.com/user-attachments/assets/69629012-043a-4b8b-a057-46bd681afe68" />
```<img width="1439" height="723" alt="Screenshot 2025-07-27 at 6 13 01 PM" src="https://github.com/user-attachments/assets/4b0802e6-67b0-47ad-85cf-4dda93dac3a7" />
<img width="1439" height="615" alt="Screenshot 2025-07-27 at 6 13 54 PM" src="https://github.com/user-attachments/assets/881519e5-0696-439f-a01a-ba575dc815a6" />
<img width="1439" height="324" alt="Screenshot 2025-07-27 at 6 14 28 PM" src="https://github.com/user-attachments/assets/59dcaeb2-d077-49c1-b3d4-f983874316b3" />


📷 Insert screenshots here (home page, product view, cart, checkout, etc.)
```

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## 🙌 Acknowledgements

* Developed by [Ali Khaled](https://github.com/iamali-stack)
* Inspired by modern e-commerce UI/UX trends

---

