# ⚔️ Life RPG

<div align="center">

### 🎮 Turn Your Real Life Into an Adventure

**Life RPG** is a gamified productivity and personal growth application that transforms everyday activities into meaningful quests. Complete tasks, earn XP, level up your character, unlock achievements, defeat bosses, and build a better version of yourself — one quest at a time.

<br />

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge\&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-Ready-3178C6?style=for-the-badge\&logo=typescript\&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-Backend-3ECF8E?style=for-the-badge\&logo=supabase\&logoColor=white)
![Status](https://img.shields.io/badge/Status-Active%20Development-success?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)

</div>

---

## 🌟 Overview

Most productivity applications focus only on checking tasks off a list.

**Life RPG takes a different approach.**

Your real-life goals become **quests**.
Your consistency becomes **XP**.
Your progress becomes **character growth**.
Your biggest challenges become **boss battles**.

The goal is simple:

> **Make self-improvement feel like playing a game.**

Whether you are studying, working, building habits, exercising, or pursuing personal goals, Life RPG helps turn consistent effort into a rewarding progression system.

---

# 🎯 Core Concept

```text
Real-Life Activity
       ↓
     Quest
       ↓
 Complete Task
       ↓
Earn XP + Rewards
       ↓
Level Up Character
       ↓
Unlock Skills & Achievements
       ↓
Explore New Adventures
       ↓
Become a Better Version of Yourself
```

---

# ✨ Key Features

## 🗡️ Quest System

Transform your daily tasks into interactive quests.

* Create custom quests
* Track quest progress
* Assign difficulty levels
* Categorize activities
* Earn XP for completion
* Receive rewards
* Build quest chains
* Complete daily quests

---

## 🧙 Character Progression

Your productivity directly affects your character.

Track and improve:

* ⭐ Experience Points
* 🆙 Character Level
* ❤️ Health Points
* ⚡ Energy
* 🔥 Streaks
* 🎯 Combo Multipliers
* 📊 Character Attributes
* 🏆 Character Titles

Choose and develop your own character identity as you progress.

---

## 👹 Boss Battles

Turn difficult goals into epic challenges.

Boss battles can represent:

* Major projects
* Exam preparation
* Long-term goals
* Habit challenges
* Personal milestones

Complete quests to reduce boss health and unlock rewards after victory.

---

## 🗺️ Adventure System

Progress beyond your daily routine.

Explore different worlds and regions as you grow.

Possible adventure progression:

```text
🏘️ Village
   ↓
🌲 Forest
   ↓
🏰 Dungeon
   ↓
👑 Castle
   ↓
🐉 Dragon Realm
```

New regions can be unlocked based on player progress and achievements.

---

## 🏆 Achievements

Celebrate important milestones.

Achievements may be unlocked for:

* Completing quests
* Maintaining streaks
* Reaching new levels
* Defeating bosses
* Unlocking skills
* Exploring new regions
* Building consistent habits

---

## 🌳 Skill Tree

Develop your personal abilities through a progression system.

Players can unlock skills and upgrade their character through structured skill branches.

Possible areas include:

* 📚 Knowledge
* 💪 Discipline
* ⚡ Productivity
* 🧠 Focus
* 🔥 Consistency

---

## 🛍️ Shop & Inventory

Earn rewards and manage your in-game items.

Features include:

* Item collection
* Equipment management
* Inventory system
* Rarity levels
* Item categories
* Virtual economy
* Wallet tracking
* Purchase history

---

## ⏱️ Focus Mode

Stay productive with a dedicated focus system.

Features include:

* Focus timer
* Session tracking
* Timer controls
* Focus history
* Productivity sessions

---

## 📊 Analytics Dashboard

Understand your progress with meaningful insights.

Track:

* XP growth
* Activity patterns
* Weekly progress
* Monthly summaries
* Category performance
* Productivity trends
* Activity history

---

## 🎲 Random Events

Make productivity less predictable and more exciting.

Random events can introduce:

* Bonus rewards
* Special challenges
* Surprise XP
* Limited-time opportunities
* Event-based progression

---

## 🎨 Theme System

Personalize your Life RPG experience.

The application includes a flexible theme architecture with:

* Theme switching
* Theme previews
* Unlockable themes
* Persistent preferences

---

# 🖥️ Application Modules

| Module          | Description                                    |
| --------------- | ---------------------------------------------- |
| 🏠 Dashboard    | Overview of player progress and daily activity |
| ⚔️ Quests       | Create, manage, and complete real-life quests  |
| 🧙 Character    | View character identity, level, and attributes |
| 🗺️ Adventure   | Explore worlds and unlock new regions          |
| 👹 Boss         | Complete major challenges through boss battles |
| 🛍️ Shop        | Browse and purchase virtual items              |
| 🎒 Inventory    | Manage collected and equipped items            |
| 🏆 Achievements | Track unlocked milestones                      |
| 🌳 Skill Tree   | Unlock new abilities and progression paths     |
| 📜 History      | View previous activities and completed quests  |
| 📊 Analytics    | Analyze productivity and growth                |
| ⏱️ Focus        | Track focused productivity sessions            |
| ⚙️ Settings     | Manage application preferences                 |

---

# 🏗️ Architecture

Life RPG follows a modular architecture designed to keep the application scalable and maintainable.

```text
Life RPG
│
├── App Layer
│   ├── Authentication
│   ├── Dashboard
│   ├── Quests
│   ├── Character
│   ├── Adventure
│   ├── Boss Battles
│   ├── Shop
│   ├── Analytics
│   └── Focus
│
├── Component Layer
│   ├── UI Components
│   ├── Layout Components
│   ├── RPG Components
│   └── Feature Components
│
├── Feature Layer
│   ├── Authentication
│   ├── Quests
│   ├── Progression
│   ├── Character
│   ├── Economy
│   ├── Achievements
│   └── Analytics
│
├── Backend Layer
│   └── Supabase
│
└── Database
    ├── Users
    ├── Profiles
    ├── Characters
    ├── Quests
    ├── Achievements
    ├── Inventory
    ├── Wallet
    ├── Bosses
    └── Progress Data
```

---

# 🛠️ Tech Stack

### Frontend

* **Next.js**
* **TypeScript**
* **React**
* **CSS / Modern Styling**
* **Responsive UI**

### Backend & Database

* **Supabase**
* **PostgreSQL**
* **Row Level Security**
* **Authentication**

### Development Tools

* ESLint
* PostCSS
* TypeScript
* Environment Configuration

---

# 📂 Project Structure

```text
life-rpg/
│
├── app/                 # Application routes and pages
├── components/          # Reusable UI and game components
├── features/            # Business logic and feature modules
├── lib/                 # Shared utilities and services
├── hooks/               # Custom React hooks
├── types/               # TypeScript definitions
├── config/              # Game configuration
├── supabase/            # Database migrations and seed files
├── public/              # Images, avatars, worlds and sounds
├── tests/               # Unit, integration and E2E tests
└── scripts/             # Development utilities
```

---

# 🔐 Authentication

Life RPG includes a structured authentication flow.

Supported pages include:

* Login
* Sign Up
* Forgot Password
* Reset Password
* Authentication Callback

The application architecture is designed to work with Supabase authentication and protected user sessions.

---

# 🗄️ Database Design

The backend structure supports multiple interconnected systems.

### Core Data

```text
User
 │
 ├── Profile
 │
 └── Character
      │
      ├── Character Stats
      ├── Quests
      ├── Achievements
      ├── Skills
      ├── Inventory
      ├── Wallet
      ├── Boss Progress
      ├── Adventure Progress
      └── Focus Sessions
```

The project includes database migrations for profiles, characters, quests, achievements, inventory, wallets, bosses, worlds, skills, themes, notifications, and security policies.

---

# 🚀 Getting Started

## 1️⃣ Clone the Repository

```bash
git clone <your-repository-url>
```

## 2️⃣ Navigate to the Project

```bash
cd life-rpg
```

## 3️⃣ Install Dependencies

```bash
npm install
```

## 4️⃣ Configure Environment Variables

Create a `.env.local` file based on the provided environment example.

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 5️⃣ Run the Development Server

```bash
npm run dev
```

Open your browser and visit:

```text
http://localhost:3000
```

---

# 🧪 Testing

The project structure supports multiple testing layers.

### Unit Testing

Tests core systems such as:

* XP calculation
* Levels
* Attributes
* Streaks
* Combo systems
* Energy
* Rewards
* Achievements
* Shop logic

### Integration Testing

Tests interactions between major systems including:

* Authentication
* Quests
* Character progression
* Purchases
* Achievements
* Security policies

### End-to-End Testing

Tests complete user flows such as:

```text
Authentication
     ↓
Create Quest
     ↓
Complete Quest
     ↓
Earn XP
     ↓
Level Up
     ↓
Unlock Rewards
```

---

# 📸 Screenshots

> Screenshots of the application will be added here.

```text
screenshots/
├── dashboard.png
├── quests.png
├── character.png
├── adventure.png
├── boss-battle.png
├── analytics.png
└── focus-mode.png
```

---

# 🗺️ Future Roadmap

* [ ] Multiplayer challenges
* [ ] Friends and social features
* [ ] AI-powered quest suggestions
* [ ] Smart productivity insights
* [ ] Advanced character customization
* [ ] Mobile application
* [ ] Additional worlds and regions
* [ ] Seasonal events
* [ ] Leaderboards
* [ ] Community challenges

---

# 💡 Why Life RPG?

Life RPG is built around one idea:

> **Consistency should feel rewarding.**

Instead of treating productivity as a repetitive checklist, Life RPG transforms progress into a visual and interactive journey.

Every completed task matters.

Every streak matters.

Every small improvement contributes to something bigger.

### Your real life becomes the game.

---

# 🤝 Contributing

Contributions, ideas, and improvements are welcome.

If you would like to contribute:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Commit your work
5. Push the branch
6. Open a Pull Request

---

# 📜 License

This project is licensed under the **MIT License**.

---

<div align="center">

## ⚔️ Start Your Quest Today

### Turn Goals Into Quests.

### Turn Effort Into XP.

### Turn Progress Into Power.

<br />

**Life RPG — Level Up Your Real Life. 🎮**

⭐ If you like this project, consider giving it a star!

</div>
