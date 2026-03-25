import { Course } from "./Course";
import { PracticeTest } from "./PracticeTest";

export interface Search {
  courses: Course[];
  practiceTests: PracticeTest[];
}
