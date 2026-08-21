# Site Typography Guide
**Project:** SIDDHESH GOEL // Blog & Curated Archive  
**Overview:** A clean, human-readable breakdown of every font, size, and text style across all components of the website.

---

## 🎨 The 7 Core Fonts Used
1. **Dirtyline 36DaysOfType 2022** (`--font-dirtyline`): Liquid experimental brutalist display font for the Articles Hero Headline (*"An archive of thoughts..."*).
2. **Oswald** (`--font-heading`): Bold, condensed, uppercase Swiss brutalist headings.
3. **Exo 2** (`--font-exo`): High-tech modern geometric font for article titles (`Digital Brutalism...`), topic titles, and primary action links (`VIEW ALL ARTICLES →`).
4. **Alegreya Sans** (`--font-alegreya`): Humanist, elegant sans-serif paired with Exo 2 for article subtitles and summary descriptions.
5. **Playfair Display** (`--font-serif`): Elegant editorial serif for quotes, essays, and stories.
6. **Space Mono** (`--font-mono`): Monospace font for telemetry, indexes, dates, buttons, and navigation.
7. **Michroma / Chakra Petch** (`--font-modular`): Geometric modular font for the circular `SG` logo.

---

# 1. Navigation Bar (`Navbar`)

### 🏷️ Highlights & Logo
* **Logo Monogram (`SG`)**
  * **Font:** `Michroma` (Modular)
  * **Size:** `14.5px` (inside a `38px` circular badge)
  * **Weight:** Bold (700)
  * **Purpose:** The main interactive brand seal. Inverts color and spins 360° on hover; clicks to replay the entrance animation.
* **Live Status Ticker**
  * **Font:** `Space Mono`
  * **Size:** `0.55rem` (`8.8px`)
  * **Weight:** Regular (400) · Uppercase
  * **Purpose:** Retro animated micro-ticker (`MAKING THINGS PRETTY...`, `HOLD ON...`).

### 🔗 Navigation & Inputs
* **Nav Links (`HOME`, `ARTICLES`, `TOPICS`, `ABOUT`)**
  * **Font:** `Space Mono`
  * **Size:** `0.72rem` (`11.5px`)
  * **Weight:** Bold (700) · Uppercase
  * **Purpose:** Main header navigation with 3D rolling wave hover animations.
* **Search Drawer Input Field**
  * **Font:** `Space Mono`
  * **Size:** `1.25rem` (`20px`)
  * **Weight:** Bold (700)
  * **Purpose:** Large, clear prompt input when clicking the search lens.

---

# 2. Main Page (`Home / Landing`)

### 👑 Head (Main Headings)
* **Giant Hero Headline**
  * **Font:** `Oswald` (Condensed)
  * **Size:** `clamp(3.5rem, 7.5vw, 8.5rem)` (`56px` – `136px`)
  * **Weight:** Bold (700) · Uppercase
  * **Purpose:** The massive primary hero statement (`CURATED ARCHIVE // SYSTEMS ENGINEERING`).
* **Section Titles (`ARTICLES`, `TOPICS`)**
  * **Font:** `Oswald` (Condensed)
  * **Size:** `clamp(2rem, 4vw, 4rem)` (`32px` – `64px`)
  * **Weight:** Bold (700) · Uppercase
  * **Purpose:** Big bold headers introducing major sections on the home page.
* **Manifesto Title (About Section)**
  * **Font:** `Playfair Display` (Serif)
  * **Size:** `clamp(2.2rem, 3.8vw, 3.8rem)` (`35px` – `60px`)
  * **Weight:** Regular (400)
  * **Purpose:** Elegant editorial headline: *"A journal of curiosity, experimentation, and becoming."*

### 📌 Subhead (Card & Item Titles)
* **Featured Article Card Title**
  * **Font:** `Oswald`
  * **Size:** `clamp(1.4rem, 2.5vw, 2.2rem)` (`22px` – `35px`)
  * **Weight:** Bold (700)
  * **Purpose:** Headline for each featured post card.
* **Topic Category Names (`WORK`, `TECH`, `DESIGN & COLORS`, `LIFE`, etc.)**
  * **Font:** `Exo 2`
  * **Size:** `1.0rem` – `1.15rem` (`16px` – `18.4px`)
  * **Weight:** Extra-Bold (800) · Uppercase
  * **Purpose:** High-tech geometric bold titles on each topic card.
* **Call to Action Links (`VIEW ALL ARTICLES →`, `VIEW ALL TOPICS →`, `READ ARTICLE →`)**
  * **Font:** `Exo 2`
  * **Size:** `0.75rem` – `0.875rem` (`12px` – `14px`)
  * **Weight:** Extra-Bold (800) · Uppercase
  * **Purpose:** Prominent interactive links leading to full archive and topic views.

### 📝 Body (Descriptions & Manifesto)
* **Hero Subtitle / Description**
  * **Font:** `Space Mono`
  * **Size:** `0.85rem` (`13.6px`)
  * **Weight:** Regular (400)
  * **Purpose:** Digital garden summary under the hero title.
* **Manifesto Reflection Prose**
  * **Font:** `Space Mono`
  * **Size:** `0.85rem` (`13.6px`)
  * **Weight:** Regular (400) · `line-height: 2.5`
  * **Purpose:** *"I write to understand. To connect the dots..."*

### ✨ Highlights & Metadata
* **Hero Section Coordinate Tag**
  * **Font:** `Space Mono`
  * **Size:** `0.8rem` (`12.8px`)
  * **Weight:** Bold (700)
  * **Purpose:** Left index marker (`01 // ARCHIVE & RESEARCH`).
* **Card Index & Dates**
  * **Font:** `Space Mono`
  * **Size:** `0.7rem` – `0.75rem` (`11px` – `12px`)
  * **Weight:** Bold (700) for numbers, Regular (400) for dates
  * **Purpose:** `01`, `02`, `14.08.2026`, and category tags (`01 // TECH`).
* **Topic Article Counters**
  * **Font:** `Space Mono`
  * **Size:** `0.75rem` (`12px`)
  * **Weight:** Regular (400) · Opacity 60%
  * **Purpose:** Shows article counts (`02`, `00`) in the top right of each topic card.

---

# 3. Articles Archive & Search (`Blogs View`)

### 👑 Head (Hero Main Headline)
* **Articles Hero Headline**
  * **Font:** `Dirtyline 36DaysOfType 2022` (`--font-dirtyline`)
  * **Size:** `clamp(2.4rem, 4.2vw, 4.4rem)` (`38.4px` – `70.4px`)
  * **Weight:** Normal · Uppercase
  * **Purpose:** The iconic liquid brutalist headline in the articles hero section (*"An archive of thoughts, experiments, observations, and things worth remembering."*).

### 📌 Subhead & Body (List Items)
* **Article Row Title**
  * **Font:** `Exo 2`
  * **Size:** `1.5rem` (`24px`)
  * **Weight:** Extra-Bold (800)
  * **Purpose:** Article titles in the archive list (`Digital Brutalism in Modern Interfaces`...).
* **Article Row Subtitle / Excerpt**
  * **Font:** `Alegreya Sans`
  * **Size:** `1.02rem` (`16.3px`)
  * **Weight:** Regular (400) · `line-height: 1.5`
  * **Purpose:** Clean, highly readable article description summary text directly beneath the title.

### ✨ Highlights & Filter Tabs
* **Category Filter Pills (`ALL`, `TECH`, `DESIGN`, etc.)**
  * **Font:** `Space Mono`
  * **Size:** `0.75rem` (`12px`)
  * **Weight:** Bold (700) · Uppercase
  * **Purpose:** Topic filter buttons and search tags.
* **Row Indexes & Dates**
  * **Font:** `Space Mono`
  * **Size:** `0.75rem` – `0.85rem` (`12px` – `13.6px`)
  * **Weight:** Bold (700) for index (`[01]`), Regular (400) for dates.
  * **Purpose:** List row timestamps and category badges.

---

# 4. Article Reader (`CMS / Reading View`)

### 👑 Head (Article Titles)
* **Article Main Headline (`h1`)**
  * **Font:** `Oswald`
  * **Size:** `clamp(2.5rem, 5vw, 5rem)` (`40px` – `80px`)
  * **Weight:** Bold (700) · `line-height: 1.0`
  * **Purpose:** The main article title on individual article pages.
* **Article Section Headings (`h2`)**
  * **Font:** `Oswald`
  * **Size:** `1.85rem` (`29.6px`)
  * **Weight:** Bold (700)
  * **Purpose:** Major section breaks inside the article content.
* **Article Sub-Headings (`h3`)**
  * **Font:** `Oswald`
  * **Size:** `1.4rem` (`22.4px`)
  * **Weight:** Bold (700)
  * **Purpose:** Sub-points inside articles.

### 📝 Body (Article Prose)
* **Article Paragraph Text (`<p>`)**
  * **Font:** `Playfair Display` (Serif)
  * **Size:** `1.12rem` (`17.9px`)
  * **Weight:** Regular (400) · `line-height: 1.75`
  * **Purpose:** Long-form article reading text optimized for maximum readability.
* **Blockquotes & Pull Quotes**
  * **Font:** `Playfair Display` (Serif Italic)
  * **Size:** `1.2rem` (`19.2px`)
  * **Weight:** Regular (400) *Italic* · `line-height: 1.6`
  * **Purpose:** Highlighted quotes, callouts, and key takeaways.

### ✨ Highlights & Code
* **Metadata Sidebar**
  * **Font:** `Space Mono`
  * **Size:** `0.75rem` (`12px`)
  * **Weight:** Semi-bold (600)
  * **Purpose:** Author name, published date, read time, and topic category.
* **Inline Code & Code Snippets**
  * **Font:** `Space Mono`
  * **Size:** `0.82rem` – `0.85rem` (`13px` – `13.6px`)
  * **Weight:** Regular (400)
  * **Purpose:** Syntax code blocks, terminal commands, and technical terms.

---

# 5. Site Footer (`Footer`)

### 👑 Head & Subhead (Quote & Columns)
* **Stardust Quote (Opening)**
  * **Font:** `Playfair Display` (Serif Italic)
  * **Size:** `1.05rem` (`16.8px`)
  * **Weight:** Regular (400) *Italic*
  * **Purpose:** *"You are made of stardust—the remnants of stars that died billions of years ago."*
* **Stardust Quote (Body & Action)**
  * **Font:** `Playfair Display` (Serif Italic)
  * **Size:** `0.96rem` (`15.3px`)
  * **Weight:** Regular (400) *Italic* with **Bold (700)** accents
  * **Purpose:** *"You are not ordinary, so **do not dream ordinary dreams...**"*
* **Column Headers (`[01] DIRECTORY`, `[02] ELSEWHERE`, `[03] TELEMETRY`)**
  * **Font:** `Space Mono`
  * **Size:** `0.75rem` (`12px`)
  * **Weight:** Bold (700) · Uppercase · `letter-spacing: 0.15em`
  * **Purpose:** Section headers for the footer grid columns.

### 🔗 Body (Links & Telemetry Values)
* **Directory & Social Links (`HOME`, `GITHUB`, `LINKEDIN`, `EMAIL`, etc.)**
  * **Font:** `Space Mono`
  * **Size:** `0.85rem` (`13.6px`)
  * **Weight:** Regular (400)
  * **Purpose:** Footer navigation links with 3D rolling hover effects.
* **Telemetry Values (`BUILDING THINGS`, `20.08.2026`, `BENGALURU, INDIA`, `STILL FIGURING IT OUT`)**
  * **Font:** `Space Mono`
  * **Size:** `0.8rem` (`12.8px`)
  * **Weight:** Semi-bold (600) · Uppercase
  * **Purpose:** Real-time personal telemetry readouts.

### ✨ Highlights & Bottom Bar
* **Footer Logo (`SG` Emblem)**
  * **Font:** `Michroma` (Modular)
  * **Size:** `20px` (inside a `52px` circular badge)
  * **Weight:** Bold (700)
  * **Purpose:** Static theme-adaptive brand seal.
* **Telemetry Field Labels (`CURRENTLY`, `LAST UPDATED`, `LOCATION`, `STATUS`)**
  * **Font:** `Space Mono`
  * **Size:** `0.6rem` (`9.6px`)
  * **Weight:** Bold (700) · Uppercase · `letter-spacing: 0.15em`
  * **Purpose:** Micro-labels above each telemetry item.
* **Back to Top Button**
  * **Font:** `Space Mono`
  * **Size:** `0.65rem` (`10.4px`)
  * **Weight:** Bold (700) · Vertical writing mode
  * **Purpose:** `BACK TO TOP` vertical trigger on the right edge.
* **Bottom Meta Bar (`© 2026`, `BUILT WITH LOVE... ❤️`, `RELEASE V1.0.2`)**
  * **Font:** `Space Mono`
  * **Size:** `0.68rem` (`10.8px`)
  * **Weight:** Semi-bold (600) · `letter-spacing: 0.1em`
  * **Purpose:** Bottom copyright and automatic dynamic version tracking.

---

# 6. Entrance Animation (`Vault Door Lock`)

### ✨ Highlights & Brand Mark
* **Vault Lock Emblem (`SG`)**
  * **Font:** `Michroma` (Modular)
  * **Size:** `33px` (inside an `88px` solid white circle)
  * **Weight:** Bold (700)
  * **Purpose:** Centered circular dial that rotates 180° like a vault lock before dropping and splitting the screen.

---

## 📊 Quick Reference Cheat Sheet

| Category | Typical Font | Size Range | Key Example |
| :--- | :--- | :--- | :--- |
| **Big Display Headings** | `Oswald` | `3.5rem` – `8.5rem` (`56px` – `136px`) | Hero Title, Page Headers |
| **Section & Card Titles** | `Oswald` | `1.4rem` – `2.4rem` (`22px` – `38px`) | Article Cards, `h2`, Topic Names |
| **Long-Form Reading Prose** | `Playfair Display` | `1.05rem` – `1.15rem` (`17px` – `18px`) | Article Paragraphs (`<p>`) |
| **Quotes & Reflections** | `Playfair Display` (Italic) | `0.96rem` – `1.20rem` (`15px` – `19px`) | Footer Stardust Quote, Blockquotes |
| **Navigation & Links** | `Space Mono` | `0.72rem` – `0.85rem` (`11.5px` – `13.6px`) | Navbar Links, Footer Elsewhere Links |
| **Telemetry, Tags & Dates** | `Space Mono` | `0.60rem` – `0.75rem` (`9.6px` – `12px`) | Timestamps, Telemetry Labels, Index Tags |
| **Brand Monogram (`SG`)** | `Michroma` | `14.5px` – `33px` | Circular Logo & Vault Lock |
