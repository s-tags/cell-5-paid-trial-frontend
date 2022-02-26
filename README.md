# Cell 5 Trail Project

This project was bootstrapped with Create react App Typescript template.

### Development Setup

1. Install project dependencies:

   `yarn install`

2. Configure environment variables:

- Add `.env` file in the project's root directory.
- Paste these lines to your `.env` file.

```
REACT_APP_FIREBASE_API_KEY=
REACT_APP_FIREBASE_AUTH_DOMAIN=
REACT_APP_FIREBASE_PROJECT_ID=
REACT_APP_FIREBASE_STORAGE_BUCKET=
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=
REACT_APP_FIREBASE_APP_ID=
REACT_APP_FIREBASE_MEASUREMENT_ID=
```

- Get the values in the firebase console project settings and paste it in your `.env` file.

3. Start the development server:

`yarn start`

### Tools

**React** - User Interface Library

**Typescript** - type safety

**Redux** - state management library

CSS Tools:

- **SASS** - CSS customization
- **Tailwind** - CSS Framework

Third party library used:

- **FingerPrintJS** - Browser Unique Identifier

**Firebase**

- **Firestore** - Database
- **Authentication** - Used anonymous authentication for demo purpose only.

**Git** - Source code Repository

**Netlify** - CI /CD and Project Hosting

### Scope

Direct Messages (Contact List Screen)

- View Direct Messages (Read)
- Filter List
- Sort by name and date

P2P Text chat (Message Screen)

- Send message (Create)
- Receive message (Read)
- Update message (Update)
- Remove message (Delete)

| **Requirement** | **Feature**                   |
| --------------- | ----------------------------- |
| Create          | Send Message                  |
| Read            | View Messages, Contacts       |
| Update          | Update Message                |
| Delete          | Remove Message, Contact       |
| Filter          | Search                        |
| Sort            | Sort Contact by name and date |

### Links

Project mock up:

https://www.figma.com/file/PJZcZ4onFnDlkfLFwR7VaD/Cell-5-Paid-Trial-Project?node-id=7%3A1046

Live demo:

https://cell-5-trail-project.netlify.app/
