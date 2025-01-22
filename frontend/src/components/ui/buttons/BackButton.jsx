import { ChevronsLeft } from "lucide-react";
import { useNavigate } from "react-router";

const BackButton = () => {
    const navigate = useNavigate()
  return (
    <button
      onClick={() => navigate(-1)}
      className="flex gap-2 underline hover:text-green-700 mb-4"
    >
      <ChevronsLeft strokeWidth={3} color="green" />
      <span className="font-semibold text-gray-600">Back</span>
    </button>
  );
}

export default BackButton