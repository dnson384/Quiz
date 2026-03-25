export interface Course {
  readonly id: string;
  name: string;
  authorAvatar: string;
  authorName: string;
  authorRole: string;
  termCount: number;
}

export interface Term {
  readonly id: string | null;
  term: string;
  definition: string;
}

export interface CourseDetail {
  baseInfo: Course;
  terms: Term[];
}

// Learn
export interface LearnQuestion {
  question: Term;
  options: Term[];
}

export interface CourseLearn {
  baseInfo: Course;
  questions: LearnQuestion[];
}

// Test
export interface TestQuestion {
  question: Term;
  options: Term[];
}
export interface CourseTest {
  baseInfo: Course;
  questions: TestQuestion[];
}

// New
export interface NewTerm {
  term: string | null;
  definition: string | null;
}

export interface NewBaseInfo {
  name: string;
}

export interface NewCourse {
  baseInfo: NewBaseInfo;
  terms: NewTerm[];
}

// Update
export interface UpdateBaseInfo {
  name: string;
}

export interface UpdateTerm {
  id: string | null;
  tempId?: string;
  term: string;
  definition: string;
}

export interface UpdateCourse {
  course?: UpdateBaseInfo;
  details?: UpdateTerm[];
}
