import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Loading = () => {
  const { nextUrl } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (nextUrl) {
      setTimeout(() => {
        navigate("/" + nextUrl);
      }, 8000);
    }
  }, []);

  return (
    <div className="flex flex-col justify-center items-center h-[80vh] gap-4">
      <div className="relative h-14 w-14">
        <div className="absolute inset-0 rounded-full border-2 border-primary/20"></div>
        <div className="absolute inset-0 rounded-full border-2 border-t-primary border-r-accent animate-spin"></div>
      </div>
      <p className="text-primary/60 text-sm tracking-widest uppercase animate-pulse">Loading...</p>
    </div>
  );
};

export default Loading;
