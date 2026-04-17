# ERD for the Calory Diary Backend

Core entities:

- `User` (id, email, name, hashedPassword, role, dailyCalorieTarget, createdAt, updatedAt) — each person who logs their intake, including their calorie goal.
- `MealEntry` (id, userId, loggedAt, mealType, notes, totalCalories, totalProtein, totalFat, totalCarbs) — one eating event for a user.
- `MealEntryFood` (id, mealEntryId, name, quantity, calories, protein, fat, carbs) — individual foods logged inside a `MealEntry`; stores the name and macros at log time.

Relationships:

- `User` 1:N `MealEntry`
- `MealEntry` 1:N `MealEntryFood`

Notes:

- Store each food line item’ s calculated macros within `MealEntryFood` so logging remains immutable.
- Add a unique constraint on `User.email` and index `MealEntry(userId, loggedAt)` for quick history queries.
