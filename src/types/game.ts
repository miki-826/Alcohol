export type Customer = {
  customerName: string;
  mood: string;
  orderText: string;
  constraints: string[];
  difficulty: "Easy" | "Normal" | "Hard";
  icon: string;
};

export type PlayerChoice = {
  drink: string;
  food: string;
  talk: string;
};

export type Evaluation = {
  score: number;
  reaction: string;
  comment: string;
  goodPoints: string[];
  improvement: string;
  title: string;
};

export type GameResult = {
  customer: Customer;
  choice: PlayerChoice;
  evaluation: Evaluation;
};

export type Screen =
  | "title"
  | "rules"
  | "serving"
  | "evaluating"
  | "result"
  | "final";
