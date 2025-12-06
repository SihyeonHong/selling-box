export interface Market {
  userId: string;
  marketName: string;
  description: string | null;
  profileImg: string | null;
}

export interface CutLineType {
  id: string;
  type: "vertical" | "horizontal";
  position: number; // 0-100 percentage
}
