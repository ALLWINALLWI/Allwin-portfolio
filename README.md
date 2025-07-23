# Terminal-Style Interactive Portfolio

A responsive, interactive portfolio web app that mimics a command-line terminal. Users can type commands to explore your profile, projects, skills, and contact information—all in a fun, terminal-inspired interface.

## Features

- **Terminal UI:** Looks and feels like a real command-line terminal.
- **Command Support:**
  - `about` — About Me (education, college, interests)
  - `projects` — Showcases clickable project links
  - `skills` — Lists categorized skills
  - `contact` — Email, LinkedIn, GitHub
  - `clear` — Clears the terminal
  - `help` — Lists available commands
- **Command History:** Use ↑/↓ arrows to recall previous commands.
- **Command Chaining:** Use `&&`, `;`, or `|` to run multiple commands in sequence.
- **Fake SSH:** Type `ssh allwin@portfolio` to simulate a remote login; use `exit` to return.
- **Fake Progress Bar:** Type `install` to see a progress animation.
- **Copy/Paste:** Click any output to copy; paste into the input field is visually highlighted.
- **Responsive Design:** Works on desktop and mobile.

## Demo

![screenshot](screenshot.png) <!-- Add a screenshot if available -->

## Usage

1. Clone or download this repository.
2. Open `index.html` in your browser.
3. Type commands in the terminal input (try `help` to get started).

## Customization

- **Edit `script.js`** to change commands, projects, skills, or contact info.
- **Edit `styles.css`** to tweak the look and feel.
- **Update ASCII art** in `index.html` for a custom banner.

## Example Commands

```
about
projects
skills
contact
ssh allwin@portfolio
install
clear
help
```

## Credits

- Built by Allwin ([GitHub](https://github.com/ALLWINALLWI))
- Inspired by classic terminal UIs

## Project Links

- [NEXT-MEET](https://github.com/ALLWINALLWI/NEXT-MEET)
- [Python Virtual Drums](https://github.com/ALLWINALLWI/Drums-player-using-motion-detection)

---

Feel free to fork, customize, and use for your own portfolio! 