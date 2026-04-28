export interface Course {
  id: number;
  name: string;
  code: string;
  credits: number;
  teacher: string;
}

export interface NewCourse {
  name: string;
  code: string;
  credits: number | undefined;
  teacher: string;
}
 

