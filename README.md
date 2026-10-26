# Student Reading List Web Application

A responsive, client-side web application for students to track and organize reading material, developed by **Aryan Raj** (JECRC University) using Bolt AI and Vercel.

## Live Deployment
* **Live Demo URL:** [https://reading-list-app-aaryan-raj21.vercel.app](https://reading-list-app-aaryan-raj21.vercel.app)

## Features
1. **Add Books:** Add books with custom titles and initial status (*Want to Read*, *Reading*, *Finished*).
2. **Defect Resolutions Implemented:**
   - **Case-Insensitive Duplicate Prevention:** Rejects duplicate titles regardless of capitalization and extra whitespace with the message: *"This book is already in your reading list."*
   - **60-Character Limit:** Strictly enforces a 60-character maximum per title with the message: *"Book title must be 60 characters or fewer."*
3. **Live Status Management:** Change book status dynamically using inline selectors.
4. **Interactive Filters:** Filter books by reading category (*All*, *Want to Read*, *Reading*, *Finished*).
5. **Delete Capability:** Instant deletion of individual book cards.
6. **Live Summary Dashboard:** Dynamic live counts for Total Books, Currently Reading, and Finished books.
7. **Offline-First Persistence:** Automatically persists state in browser `localStorage`.

## Technologies Used
* HTML5 (Semantic Architecture)
* CSS3 (Custom Variables, Flexbox, Mobile-Responsive Grid)
* JavaScript ES6 (DOM Manipulation, Array Methods, LocalStorage API)
* Vercel (Cloud Deployment)

## Author
* **Aryan Raj**
* GitHub: [@Aaryan-Raj21](https://github.com/Aaryan-Raj21)
