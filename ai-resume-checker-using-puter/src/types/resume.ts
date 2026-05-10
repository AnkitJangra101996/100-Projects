export interface ResumeCardOverall {
  id: number;
  title: string;
  createdAt: string;
  score: number;
  tags: string[];
}

export type MessageType =
  | "Uploading Resume...."
  | "Generating Image...."
  | "Calculating ATS score and recommendations...."
  | "Complete"
  | "Failure"
  | "Generating Data...";

export type Tip = {
  type: "good" | "improve";
  tip: string;
  explanation?: string;
};

export type FeedbackCategory = {
  score: number;
  tips: Tip[];
  title: string;
};

export type ResumeFeedback = {
  overallScore: number;
  ATS: FeedbackCategory;
  toneAndStyle: FeedbackCategory;
  content: FeedbackCategory;
  structure: FeedbackCategory;
  skills: FeedbackCategory;
  tags: string[];
};

export interface ResumeResponseType {
  // [x: string]: ResumeResponseFeedbackType;
  id: string;
  resumePath: string;
  imagePath: string;
  jobTitle: string;
  jobDescription: string;
  // data: ResumeResponseFeedbackType;
  feedback: null | ResumeFeedback;
  createdAt: number;
}

export type ResumeResponseFeedbackType = Pick<ResumeResponseType, "feedback">;
