import { useNavigate } from "react-router-dom";
import type { Lp } from "../../types/lp";

interface LpCardProps {
  lp: Lp;
}

const LpCard = ({ lp }: LpCardProps) => {
  const navigate = useNavigate();

  const uploadedAt = new Date(lp.createdAt).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div
      className="relative rounded-lg overflow-hidden cursor-pointer group"
      onClick={() => navigate(`/lp/${lp.id}`)}
    >
      <img
        src={lp.thumbnail}
        alt={lp.title}
        className="object-cover w-full aspect-square transition-transform duration-300 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-300 flex flex-col justify-end p-3 opacity-0 group-hover:opacity-100">
        <h3 className="text-white text-sm font-semibold truncate">{lp.title}</h3>
        <p className="text-gray-300 text-xs mt-1">{uploadedAt}</p>
        <p className="text-gray-300 text-xs mt-1">♥ {lp.likes.length}</p>
      </div>
    </div>
  );
};

export default LpCard;