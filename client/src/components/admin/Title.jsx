const Title = ({ text1, text2 }) => {
  return (
    <h1 className="font-bold text-2xl text-gray-200">
      {text1}{" "}
      <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
        {text2}
      </span>
    </h1>
  );
};

export default Title;
