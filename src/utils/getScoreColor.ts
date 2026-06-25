export const getScoreColor = (score: number) => {
  if (score < 50) return "bg-destructive";
  if (score < 80) return "bg-secondary";
  return "bg-success";
};

export const getScoreBorderColor = (score: number) => {
  if (score < 50) return "border-l-destructive";
  if (score < 80) return "border-l-secondary";
  return "border-l-success";
};
