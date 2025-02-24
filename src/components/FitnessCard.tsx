import { useFitness } from "../contexts/FitnessContext";
import { useNavigate } from "react-router-dom";
import { FitnessCardProps } from "../interfaces/FitnessInterface";
import { TARGET, PROGRESS, START, END, PERCENT_ACHIEVED, EDIT, DELETE} from "../constants";



//shows contents for fitness form has edit , delete button to edit or delete fitness goal datas
const FitnessCard = ({ goal, onDelete }: FitnessCardProps) => {
  const { setId, setFormData } = useFitness();
  const navigate = useNavigate();

  //calculates percentage of goal completed and is 100% when goal exceeds target
  let percentage = (goal.current_progress / goal.target_value) * 100;
  if (percentage > 100) {
    percentage = 100;
  }

  // Handle the edit button click, which sets form data and navigates to the edit page
  const handleEdit = (id: any) => {
    setFormData(goal);
    navigate("/fitnessFormPage");
    setId(id);
  };

  return (
    <div className="relative bg-white shadow-md rounded-xl p-4 border border-gray-200 w-96 transition-transform hover:scale-105 hover:shadow-lg">
      <h2 className="text-lg font-bold text-gray-700 uppercase truncate">
        {goal.goal_type.replace("_", " ")}
      </h2>

      <div className="text-gray-600 text-sm mt-2 space-y-1">
        <p>
          <span className="font-semibold">{TARGET}</span> {goal.target_value}
        </p>
        <p>
          <span className="font-semibold">{PROGRESS}</span> {goal.current_progress}
        </p>
        <p>
          <span className="font-semibold">{START}</span> {new Date(goal.start_date).toLocaleDateString()}
        </p>
        {goal.end_date && (
          <p>
            <span className="font-semibold">{END}</span> {new Date(goal.end_date).toLocaleDateString()}
          </p>
        )}
      </div>

      <span
        className={`absolute top-3 right-3 text-xs font-semibold px-2 py-1 rounded-full ${
          goal.status === "complete"
            ? "bg-green-100 text-green-600"
            : "bg-yellow-100 text-yellow-600"
        }`}
      >
        {goal.status.toUpperCase()}
      </span>

        <div className="mt-4">
          <div className="flex mb-2 items-center justify-between">
            <span className="text-sm font-semibold inline-block py-1 px-2 uppercase rounded-full text-green-600 bg-green-100">
              {Math.round(percentage)}{PERCENT_ACHIEVED}
            </span>
          </div>
          <div className="relative pt-1">
            <div className="flex">
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-green-500 h-2.5 rounded-full"
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

      <div className="flex justify-between mt-4">
        <button
          onClick={() => handleEdit(goal.goal_id)}
          className="bg-blue-500 hover:bg-blue-600 text-white text-xs font-medium px-3 py-1 rounded-lg transition-all"
        >
          {EDIT}
        </button>
        <button
          onClick={() => onDelete(goal.goal_id)}
          className="bg-red-500 hover:bg-red-600 text-white text-xs font-medium px-3 py-1 rounded-lg transition-all"
        >
          {DELETE}
        </button>
      </div>
    </div>
  );
};

export default FitnessCard;
