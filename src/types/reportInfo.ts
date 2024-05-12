export interface ReportInfo {
  post: {
    id: number;
    title: string;
    user: {
      id: number;
      avatar: string;
      name: string;
    };
  };
  userReport: {
    id: number;
    name: string;
  };
  reason: string;
}
