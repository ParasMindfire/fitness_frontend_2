import React, { useState } from "react";
import { WorkoutCard } from "../../components/WorkoutCard";
import { useWorkout } from "../../contexts/WorkoutContext";
import { deleteWorkout } from "../../services/WorkoutAPI";
import { showToast } from "../../helpers/ToastHelper";
import { useNavigate } from "react-router-dom";
import { YOUR_WORKOUTS,LOADING_WORKOUTS,ASC,ASCENDING,DESCENDING,ARE_U_SURE2,NEXT,PREVIOUS,BACK_TO_DASHBOARD, CONFIRM_DELETE, CANCEL, DELETE, NO_WORKOUTS } from "../../constants";


// This page displays all of the user’s recorded workout Cards and pagination has been added on cards
const WorkoutViews: React.FC = () => {
  const { workouts, loading, error,fetchWorkouts } = useWorkout();
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const workoutsPerPage = 4;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [workoutId, setworkoutId] = useState(null);

  const navigate = useNavigate();
  
  //requests for sorting according to ascending or descending order
  const sortedWorkouts = [...workouts].sort((a, b) => {
    const dateA = new Date(a.workout_date).getTime();
    const dateB = new Date(b.workout_date).getTime();
    
    return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
  });
  

  //logic for pagination
  const totalPages = Math.ceil(sortedWorkouts.length / workoutsPerPage);
  
  const indexOfLastWorkout = currentPage * workoutsPerPage;
  const indexOfFirstWorkout = indexOfLastWorkout - workoutsPerPage;
  const currentWorkouts = sortedWorkouts.slice(indexOfFirstWorkout, indexOfLastWorkout);
  
  //handles pagination for next page
  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };
  
  //handles pagination for previous page
  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  //handles sorting
  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  //handles workout id to delete and opens modal
  const handleDeleteClick = (workoutId:any) => {
    setworkoutId(workoutId);
    setIsModalOpen(true);
  };

  //handles delete cutton call and closing modal
  const confirmDelete = async() => {
    const token:any=localStorage.getItem("accessToken");
    if (workoutId){
          await deleteWorkout(token,workoutId);
          showToast("Workout Deleted Successfully", "success");
          fetchWorkouts();
          setIsModalOpen(false);
        }
    }

    const handleBack = () => {
      navigate("/");
    };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 p-8">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-6xl text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">{YOUR_WORKOUTS}</h2>

        {loading && <p className="text-gray-500">{LOADING_WORKOUTS}</p>}
        {error && <p className="text-red-500">{error}</p>}

        {workouts.length > 0 ? (
          <>
            <div className="flex justify-end mb-4">
              <button
                onClick={toggleSortOrder}
                className="bg-blue-500 text-white font-medium px-4 py-2 rounded-lg transition-all hover:bg-blue-600"
              >
                Sort by Date ({sortOrder === ASC ? ASCENDING : DESCENDING})
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 justify-center items-center">
              {currentWorkouts.map((workout) => (
                <WorkoutCard key={workout.workout_id} workout={workout} onDelete={handleDeleteClick}/>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex flex-col justify-center items-center mt-10 space-x-6">
                <div className="flex justify-center items-center mt-10 space-x-6">
                  <button
                    onClick={prevPage}
                    disabled={currentPage === 1}
                    className={`px-6 py-2 rounded-lg text-white font-medium transition ${
                      currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
                    }`}
                  >
                    {PREVIOUS}
                  </button>

                  <span className="text-gray-700 font-semibold text-lg">
                    Page {currentPage} of {totalPages}
                  </span>

                  <button
                    onClick={nextPage}
                    disabled={currentPage === totalPages}
                    className={`px-6 py-2 rounded-lg text-white font-medium transition ${
                      currentPage === totalPages ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
                    }`}
                  >
                    {NEXT}
                  </button>
                </div>

                <button
                  onClick={handleBack}
                  className="m-auto w-96 mt-4 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 rounded-md transition duration-200"
                >
                  {BACK_TO_DASHBOARD}
                </button>


                {isModalOpen && (
                  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                      <h2 className="text-lg font-bold">{CONFIRM_DELETE}</h2>
                      <p>{ARE_U_SURE2}</p>
                      <div className="flex justify-end mt-4">
                        <button onClick={() => setIsModalOpen(false)} className="bg-gray-300 px-4 py-2 rounded mr-2">
                          {CANCEL}
                        </button>
                        <button onClick={confirmDelete} className="bg-red-500 text-white px-4 py-2 rounded">
                          {DELETE}
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </>
        ) : (
          <p className="text-gray-500 mt-4">{NO_WORKOUTS}</p>
        )}
      </div>
    </div>
  );
};

export default WorkoutViews;
