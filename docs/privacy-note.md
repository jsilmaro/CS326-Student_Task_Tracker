# Privacy Note – Student Task Tracker

> This is an academic project built for CS326. It is not a commercial product. This privacy note describes how data is handled within the system.

## Data Collected

| Data | Why It Is Collected | Required? |
|------|---------------------|-----------|
| Full name | Display in the UI and personalize greetings | Yes |
| Email address | Used as login identifier | Yes |
| Password | Authentication (stored as bcrypt hash — never in plain text) | Yes |
| University name | Optional profile field for personalization | No |
| Task details (title, description, category, due date, priority) | Core app functionality | Yes |
| Task completion timestamps | Used to calculate streaks and daily progress | Yes |
| Notification preferences | Stored to remember user settings | No |

## What Is NOT Collected

- Location data
- Device information
- Browser fingerprints
- Payment information
- Any data from third parties

## How Data Is Used

- Data is used solely to provide the task tracking functionality
- No data is sold, shared, or used for advertising
- No analytics or tracking services are integrated

## Data Storage

- Data is stored in a PostgreSQL database hosted on Neon (cloud, US East region)
- Passwords are hashed using bcrypt before storage — plain text passwords are never stored
- Authentication tokens (JWT) are stored in the user's browser localStorage

## Data Retention

- Data is retained as long as the user account exists
- Users can delete their account at any time via Settings → Danger Zone → Delete Account
- Account deletion permanently removes all associated tasks and profile data (cascading delete)

## User Rights

| Right | How to Exercise |
|-------|----------------|
| Access your data | Log in and view your tasks and profile |
| Update your data | Edit profile in Settings |
| Delete your data | Delete account in Settings → Danger Zone |
| Change your password | Settings → Security → Change Password |

## Third-Party Services

| Service | Purpose | Privacy Policy |
|---------|---------|----------------|
| Neon | PostgreSQL database hosting | https://neon.tech/privacy |
| Vercel | Frontend hosting | https://vercel.com/legal/privacy-policy |
| Render | Backend hosting | https://render.com/privacy |
