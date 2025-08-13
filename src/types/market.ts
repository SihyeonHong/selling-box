export interface Market {
  marketId: string;
  userId: string;
  name: string;
  description?: string;
}

export interface CutLineType {
  id: string;
  type: "vertical" | "horizontal";
  position: number; // 0-100 percentage
}
