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

export interface DeleteDialogData {
  message: string;
  id: number;
  type: string;
}

export interface Document {
  id: number;
  title: string;
  url: string;
  subject_id: number;
  class_id: number;
  teacher_id: number;
  document_uuid: string;
  public: string;
  create_at: string;
  update_at: string;
}
