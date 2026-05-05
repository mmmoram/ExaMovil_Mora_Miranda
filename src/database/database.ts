import * as SQLite from "expo-sqlite";

let dbInstance: SQLite.SQLiteDatabase | null = null;

export const getDatabase = async (): Promise<SQLite.SQLiteDatabase> => {
  if (dbInstance === null) {
    dbInstance = await SQLite.openDatabaseAsync("mycourses.db");
    await createTables(dbInstance);
  }
  return dbInstance;
};

const createTables = async (db: SQLite.SQLiteDatabase): Promise<void> => {
  await db.execAsync(`
        CREATE TABLE IF NOT EXISTS courses(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        code TEXT NOT NULL,
        credits INTEGER NOT NULL,
        teacher TEXT NOT NULL
        )`);
};
