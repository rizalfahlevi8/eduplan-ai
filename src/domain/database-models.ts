export enum Gender {
  MALE = "MALE",
  FEMALE = "FEMALE",
}

export interface ChildProfile {
  id: string;
  userId: string;
  age: number;
  gender: Gender;
  hobbies: string;
  createdAt: Date;
  updatedAt?: Date | null;
}

export interface LearningPlan {
  id: string;
  userId: string;
  goal: string;
  interests: string;
  numberOfDays: number;
  planJson: object; // JSON type
  createdAt: Date;
  updatedAt?: Date | null;
}