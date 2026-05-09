import { getDatabase } from "../database/database";
import { Course, NewCourse } from "../types/gadget";

export const courseService = {
  //CREATE
  async create(course: NewCourse): Promise<number> {
    const db = await getDatabase();
    const result = await db.runAsync(
      "INSERT INTO courses(name, code, credits, teacher) VALUES (?, ?, ?, ?)",
      [course.name, course.code, course.credits!, course.teacher],
    );
    return result.lastInsertRowId;
  },

  //READ (ALL)
  async getAll(): Promise<Course[]> {
    const db = await getDatabase();
    const courses = await db.getAllAsync<Course>(
      "SELECT * FROM courses ORDER BY name ASC",
    );
    return courses;
  },

  //READ (BY ID)
  async getById(id: number): Promise<Course | null> {
    const db = await getDatabase();
    const course = await db.getFirstAsync<Course>(
      "SELECT * FROM courses WHERE id = ?",
      [id],
    );
    return course ?? null;
  },

  //UPDATE
  async update(id: number, course: NewCourse): Promise<void> {
    const db = await getDatabase();
    await db.runAsync(
      "UPDATE courses SET name=?, code=?, credits=?, teacher=? WHERE id=?",
      [course.name, course.code, course.credits!, course.teacher, id],
    );
  },

  //DELETE
  async delete(id: number): Promise<void> {
    const db = await getDatabase();
    await db.runAsync("DELETE FROM courses WHERE id = ?", [id]);
  },
};
