# ApplyFlow Firestore Architecture

This document defines the official data structure, security rules, and indexing strategy for the ApplyFlow Job Application Tracker.

---

## 1. Collections and Schema

### Users Collection (`users`)
Stores user profile information, keyed by the Firebase Auth `uid`.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `fullName` | String | Yes | User's full name |
| `email` | String | Yes | User's login email |
| `createdAt` | Timestamp | Yes | Profile creation date |
| `updatedAt` | Timestamp | Yes | Last profile update date |

**Sample Document (`/users/{uid}`):**
```json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "createdAt": "2024-03-20T10:00:00Z",
  "updatedAt": "2024-03-20T10:00:00Z"
}
```

---

### Job Applications Collection (`job_applications`)
Stores job tracking details. Each document is a single application.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `userId` | String | Yes | UID of the owner user |
| `companyName` | String | Yes | Company name |
| `jobRole` | String | Yes | Position title |
| `location` | String | No | Office or remote location |
| `jobType` | String | Yes | Full-time, Contract, etc. |
| `status` | String | Yes | Applied, Interview, Rejected, Selected, etc. |
| `appliedDate` | String (ISO) | No | Date of application (YYYY-MM-DD) |
| `interviewDate` | String (ISO) | No | Date of interview (YYYY-MM-DD) |
| `followUpDate` | String (ISO) | No | Proposed follow-up date (YYYY-MM-DD) |
| `salary` | String | No | Proposed salary |
| `jobUrl` | String | No | Link to the job posting |
| `notes` | String | No | User's personal notes |
| `isPriority` | Boolean | Yes | Flag for high-priority applications |
| `createdAt` | Timestamp | Yes | Document creation |
| `updatedAt` | Timestamp | Yes | Last modification |

**Sample Document (`/job_applications/{docId}`):**
```json
{
  "userId": "user_123",
  "companyName": "Google",
  "jobRole": "Frontend Engineer",
  "location": "Mountain View",
  "jobType": "Full-time",
  "status": "Interview Scheduled",
  "appliedDate": "2024-03-15",
  "interviewDate": "2024-03-28",
  "followUpDate": "2024-03-30",
  "salary": "$150,000",
  "jobUrl": "https://careers.google.com/...",
  "notes": "Referral from teammate.",
  "isPriority": true,
  "createdAt": "2024-03-15T14:30:00Z",
  "updatedAt": "2024-03-16T09:00:00Z"
}
```

---

## 2. Firestore Security Rules

Copy these into your `firestore.rules` file in the Firebase Console.

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Helper functions
    function isAuthenticated() {
      return request.auth != null;
    }
    
    function isOwner(userId) {
      return isAuthenticated() && request.auth.uid == userId;
    }

    // User Profile Rules
    match /users/{userId} {
      allow read, write: if isOwner(userId);
    }

    // Job Application Rules
    match /job_applications/{applicationId} {
      allow create: if isAuthenticated() && request.resource.data.userId == request.auth.uid;
      allow read, update, delete: if isOwner(resource.data.userId);
    }
  }
}
```

---

## 3. Recommended Indexes

To support high-performance filtering and sorting on the dashboard, the following composite indexes are recommended:

1. **Applications by Owner and Date**:
   - Collection: `job_applications`
   - Fields: `userId` (ASC), `appliedDate` (DESC)
   
2. **Applications by Status and Owner**:
   - Collection: `job_applications`
   - Fields: `userId` (ASC), `status` (ASC), `appliedDate` (DESC)

3. **Priority Applications by Owner**:
   - Collection: `job_applications`
   - Fields: `userId` (ASC), `isPriority` (DESC), `appliedDate` (DESC)

---

## 4. Best Practices for Scalability

1. **Security-First**: Always use `userId` on the root of documents to enable simple and powerful security rules.
2. **Date Sorting**: Keep `appliedDate` as an ISO string (`YYYY-MM-DD`) for lexicographical sorting while maintaining simplicity on the frontend.
3. **Audit Fields**: Always include `createdAt` and `updatedAt`. Use `serverTimestamp()` when possible to ensure clock consistency across clients.
4. **Denormalization**: Store small, frequently used user data (like `fullName`) directly in applications if you need to display "Application by [Name]", but for single-user apps, this is usually unnecessary.
