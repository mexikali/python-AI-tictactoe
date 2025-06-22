# 🧠 Tic-Tac-Toe Game (Flask + JavaScript)

This is a modern implementation of the classic **Tic-Tac-Toe** game built using **Flask (Python)** for the backend and **JavaScript (Vanilla)** for the frontend UI. It supports multiple game modes, player selection, and dynamic board rendering — all without refreshing the page.

---

## 🎮 Features

- ✅ **Game Modes**:
  - 3x3 Classic
  - 7x7 Challenge (Connect 4)
  - Ultimate Tic-Tac-Toe (3x3x3 Grid)
- 🧠 **Play Modes**:
  - Player vs Player
  - Player vs AI
- ⚡️ Fully dynamic board rendering
- 🖥 Single-page interface (AJAX-based interactions)
- 🧩 Backend handles all game logic and winner detection

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/tic-tac-toe-flask.git
cd tic-tac-toe-flask
```

### 2. Create virtual environment and install dependencies

```bash
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

> Make sure you have `Flask` and `python-dotenv` listed in your `requirements.txt`.

### 3. Create a `.env` file

```env
SECRET_KEY=your_secret_key_here
```

### 4. Run the Flask server

```bash
python main.py
```

The game will be available at [http://localhost:5000](http://localhost:5000)

---

## 📁 Project Structure

```
.
├── main.py                # Flask backend
├── templates/
│   └── index.html         # Main game interface
├── static/
│   └── styles/
│       └── index.css      # Custom styles
├── .env                   # Secret key
├── requirements.txt       # Python dependencies
└── README.md              # This file
```

---

## 🔧 Planned Improvements

- Refactor game logic into separate modules
- Add session-based game state
- Persist game scores
- Add unit tests for backend logic

---

## 📸 Screenshots

*(SOON)*

---

---

## 🤝 Contributing

Pull requests are welcome! If you’d like to add new game modes or improve UI responsiveness, feel free to fork and contribute.