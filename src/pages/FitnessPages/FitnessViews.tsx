import { useState } from "react";
import { useFitness } from "../../contexts/FitnessContext";
import FitnessCard from "../../components/FitnessCard";
import { useNavigate } from "react-router-dom";
import { PREVIOUS,NEXT,CANCEL,DELETE, BACK_TO_DASHBOARD,FITNESS_GOALS,LOAD_FITNESS,NO_FITNESS,CONFIRM_DELETE,ARE_U_SURE} from "../../constants";


// This page displays the goal cards.And Pagination of that card
const FitnessViews = () => {
  const { fitnessGoals, loading, error,removeFitnessGoal } = useFitness();
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedGoalId, setSelectedGoalId] = useState(null);
  const goalsPerPage = 3;

  const indexOfLastGoal = currentPage * goalsPerPage;
  const indexOfFirstGoal = indexOfLastGoal - goalsPerPage;
  const currentGoals = fitnessGoals.slice(indexOfFirstGoal, indexOfLastGoal);

  const navigate = useNavigate();

  //handles next button pagination
  const nextPage = () => {
    if (indexOfLastGoal < fitnessGoals.length) setCurrentPage(currentPage + 1);
  };


  //handles prev button pagination
  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  //handles delete button sets which GoalID to delete and sets modal to open
  const handleDeleteClick = (goalId:any) => {
    setSelectedGoalId(goalId);
    setIsModalOpen(true);
  };

  //handles card delete of goal
  const confirmDelete = () => {
    if (selectedGoalId) {
      removeFitnessGoal(selectedGoalId); 
      setIsModalOpen(false);
    }
  };

  // navigation to dashboard
  const handleBack = () => {
    navigate("/");
  };

  return (
    <div className="flex flex-col justify-center items-center h-[500px] bg-gray-100 p-12 mt-32">
      <div className="bg-white p-12 rounded-2xl shadow-2xl w-full max-w-full text-center">
  <h2 className="text-4xl font-extrabold text-gray-800 mb-10">{FITNESS_GOALS}</h2>

    {loading && <p className="text-gray-500">{LOAD_FITNESS}</p>}
    {error && <p className="text-red-500">{error}</p>}

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center">
      {currentGoals.length > 0 ? (
        currentGoals.map((goal) => (
          <FitnessCard
            key={goal.goal_id}
            goal={goal}
            onDelete={handleDeleteClick}
          />
        ))
      ) : (
        <p className="text-gray-500">{NO_FITNESS}</p>
      )}
    </div>

    <div className="flex flex-col">
      <div className="flex justify-center mt-6 space-x-4">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded-lg text-white font-medium ${
            currentPage === 1
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-purple-600 hover:bg-gray-800 cursor-pointer"
          }`}
        >
          {PREVIOUS}
        </button>
        <button
          onClick={nextPage}
          disabled={indexOfLastGoal >= fitnessGoals.length}
          className={`px-4 py-2 rounded-lg text-white font-medium ${
            indexOfLastGoal >= fitnessGoals.length
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-purple-600 hover:bg-gray-800 cursor-pointer"
          }`}
        >
          {NEXT}
        </button>
      </div>

      <button
        onClick={handleBack}
        className="cursor-pointer m-auto w-96 mt-4 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 rounded-md transition duration-200"
      >
        {BACK_TO_DASHBOARD}
      </button>
    </div>
  </div>

  {isModalOpen && (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-bold">{CONFIRM_DELETE}</h2>
        <p>{ARE_U_SURE}</p>
        <div className="flex justify-end mt-4">
          <button
            onClick={() => setIsModalOpen(false)}
            className="cursor-pointer bg-gray-300 px-4 py-2 rounded mr-2"
          >
            {CANCEL}
          </button>
          <button
            onClick={confirmDelete}
            className="cursor-pointer bg-purple-600 hover:bg-gray-800 text-white px-4 py-2 rounded"
          >
            {DELETE}
          </button>
        </div>
      </div>
    </div>
  )}
</div>

  );
};

export default FitnessViews;
