# User Management Dashboard

Aura Admin is a production-quality, responsive User Management Dashboard designed to simulate a real-world Software-as-a-Service (SaaS) administration panel. It features modular component design, clean state segregation, and robust validation structures. The user interface matches modern design systems (similar to Stripe, Vercel, and Linear) with smooth transitions, interactive animations, and responsive dark mode support.

---

##  Live Demo & Visual Polish
- **Modern SaaS Aesthetics**: Sleek dark and light color palette using zinc and blue primaries, rounded corners, soft shadows, hover transitions, and glassmorphic portal overlays.
- **Micro-Animations**: Hover animations on actionable items, sliding notifications, and fading backdrop animations for modal overlays.
- **Responsiveness**: A desktop-first sticky header table that transforms into cards on mobile and tablet displays to eliminate horizontal scrolling.

---

## 🛠️ Tech Stack
- **React (Vite)**: High-speed, hot-module-reloaded developer experience with a optimized bundler.
- **Tailwind CSS (v4)**: Native CSS-first styling framework. Includes class-based dark mode selector support.
- **Axios**: Promised-based client for fetch queries and CRUD requests.
- **React Hook Form**: Form state manager minimizing unnecessary re-renders.
- **Yup & Resolvers**: Schema validation tool enforcing strict field formats.
- **React Icons**: Icon set using the Feather collection (`react-icons/fi`).

---

## 📂 Project Structure
```
src/
  components/
    Button/         # Custom button elements with loading spinners
    Input/          # Standardized form inputs and selects
    Modal/          # Base overlay layout with esc and backdrop close binds
    Table/          # Desktop tabular user view with sticky headers
    Pagination/     # Page size capacity selectors and navigation indexers
    SearchBar/      # Debounced search bar
    FilterModal/    # Advanced fields filters
    UserForm/       # Form schemas validated with Yup
    Loader/         # Visual shimmers and loading spinners
    EmptyState/     # Visual placeholder shown when list search returns zero matches
    ConfirmDialog/  #Destructive confirmations overlay
    Navbar/         # Sticky branding header with theme switches
    Card/           # Responsive card layouts representing users on mobile viewports
  context/
    ThemeContext    # Controls light/dark state
    ToastContext    # Standardized bottom-right notification stack
  hooks/
    useUsers.js     # Orchestrates user data transformation and mock extensions
  pages/
    Dashboard.jsx   # Grid orchestrator assembling visual elements
  services/
    api.js          # Pre-configured Axios instance pointing to JSONPlaceholder
  utils/
    filterUsers.js  # Field & Search matching logic
    sortUsers.js    # Multi-field sorting helper
    paginateUsers.js# Chunk partitions helper
  constants/
    departments.js  # Constants for department types
    mockUsers.js    # 40 mock users to support deep pagination testing
  App.jsx           # Wrapped providers shell
  index.css         # Tailwind styles loader
```

---

## ⚙️ Installation & Running Locally

1. Clone or extract the project files inside your workspace.
2. Open your terminal in the root directory.
3. Install dependencies:
   ```bash
   npm install
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```
5. Build for production:
   ```bash
   npm run build
   ```

---

## 💡 Key Features
1. **Debounced Search**: Local input changes are reflected immediately, while search matching functions are debounced by `300ms` to prevent layout stutter.
2. **Advanced Multi-field Filters**: Modal interface allows specific querying on First Name, Last Name, Email, and Department. Includes active badges highlighting the count of selected filters.
3. **Responsive Cards Grid**: On viewport sizes below `768px` (md breakpoint), the UI dynamically swaps the desktop table for custom-designed cards.
4. **Toast Context Provider**: Bottom-right floating notifications notify the user on successful CRUD execution (create, edit, delete) or on request failures.
5. **Class-based Dark Mode**: Theme states are persistent in `localStorage` and synchronized with CSS variables and Tailwind utilities.

---

## 📝 Assumptions & Implementations
- **JSONPlaceholder Persistence Limitation**: Since JSONPlaceholder is read-only and does not persist write operations on their database, we update local React state upon successful response triggers.
- **User Name Structure**: The API returns user entries with a unified `name` field. We split this string using a utility that strips standard titles (such as Mr., Ms., Dr.) and splits on spaces into `firstName` and `lastName`.
- **Dynamic Seeding**: The API only provides `10` users, which makes testing pagination dropdown sizes (10/25/50/100) impossible. We seeded the dashboard with `40` additional structured mock users, creating a stable directory size of `50` records.
- **CRUD Operations for Mock Records**: JSONPlaceholder returns a `404` or `500` if edit/delete is performed on IDs > 10. To prevent crashes, we intercept these IDs, simulate standard network latency (`500ms`), and update local state directly.

---

## 🌋 Challenges & Solutions
1. **Native Bindings on Custom Node Versions**: Vite v8 initializes with Rolldown as the compiler, requiring specific Windows native C++ modules. On node `v20.15.0`, compilation failed. We downgraded the bundler to Vite v5, maintaining compatibility and compiling successfully.
2. **Backdrop-scrolling on Open Modals**: Open modals initially allowed scrolling the database list in the background. We solved this by using React's `useEffect` inside `Modal.jsx` to dynamically assign `overflow: hidden` to `document.body` while the modal is open.

---

## 🔮 Future Improvements
- **Local Cache Syncing**: Integrate IndexDB or TanStack Query (React Query) to cache fetched directory data.
- **Bulk Selection Operations**: Multi-checkbox support for batch deletion or department updates.
- **Export Directory**: Export records to CSV or PDF files.
