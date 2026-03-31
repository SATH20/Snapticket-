const BlurCircle = ({
  top = "auto",
  left = "auto",
  right = "auto",
  bottom = "auto",
  color = "cyan",
}) => {
  const colorMap = {
    cyan: "bg-primary/20",
    violet: "bg-accent/25",
    mixed: "bg-gradient-to-br from-primary/20 to-accent/20",
  };

  return (
    <div
      className={`absolute -z-50 h-64 w-64 aspect-square rounded-full ${colorMap[color] || colorMap.cyan} blur-[100px] animate-pulse`}
      style={{ top, left, right, bottom }}
    ></div>
  );
};

export default BlurCircle;
