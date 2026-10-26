# Quiz Builder

## Database Setup

1. Navigate to the backend directory:
```bash
cd backend
```
2. Install dependencies:
```bash
npm install
```
3. Initialize the SQLite database and apply Prisma schema:
```bash
npx prisma db push
```

---

## Starting Backend and Frontend

### 1. Backend

1. Check a `.env` file in the `backend` folder (content should be like this):
```env
PORT=4000
DATABASE_URL="file:./dev.db"
```
2. Start the development server:
```bash
npm run dev
```
The API will run at `http://localhost:4000`.

### 2. Frontend

1. In a new terminal, navigate to the `frontend` folder:
```bash
cd frontend
```
2. Install dependencies:
```bash
npm install
```
3. Check a `.env` file in the `frontend` folder (content should be like this):
```env
VITE_API_URL=http://localhost:4000/quizzes
```
4. Start the frontend application:
```bash
npm run dev
```
The client app will run at `http://localhost:5173`.

---

## Creating a Sample Quiz

### Method 1: Via Web Interface
1. Open `http://localhost:5173` in your browser.
2. Click **Create new Quizz** (or go to `/create`).
3. Enter a title (e.g., `JavaScript Fundamentals`).
4. Click **Add Question** to add questions:
   - **Boolean:** Select `True` or `False`.
   - **Input:** Enter the question text and expected string answer.
   - **Checkbox:** Add options, provide labels, and check the box next to correct answers.
5. Click **Save Quiz** to submit.

### Method 2: Via API (cURL)
Run this command in your terminal:

```bash
curl -X POST http://localhost:4000/quizzes \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Sample General Knowledge Quiz",
    "questions": [
      {
        "type": "BOOLEAN",
        "text": "Is JavaScript single-threaded?",
        "booleanAnswer": true,
        "order": 0
      },
      {
        "type": "INPUT",
        "text": "What keyword is used to declare a constant variable in JS?",
        "textAnswer": "const",
        "order": 1
      },
      {
        "type": "CHECKBOX",
        "text": "Select primitive data types in JavaScript:",
        "order": 2,
        "options": [
          { "text": "string", "isCorrect": true },
          { "text": "boolean", "isCorrect": true },
          { "text": "Object", "isCorrect": false }
        ]
      }
    ]
  }'
```