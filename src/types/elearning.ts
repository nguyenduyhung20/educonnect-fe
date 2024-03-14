export interface Score {
  id: number;
  fifteen_minutes_score: number;
  midterm_score: number;
  final_score: number;
  gpa: number;
  semester: string;
  subjectName: string;
}

export interface Transcript {
  label: string;
  sum: number;
  scores: Score[];
}

export interface TranscriptRespone {
  id: number;
  studentName: string;
  transcript: Transcript[];
}

