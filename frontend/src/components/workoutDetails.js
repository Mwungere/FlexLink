import { useWorkoutContext } from "../hooks/UseWorkoutContext";
import { Delete } from "@mui/icons-material";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { IconButton, Tooltip } from "@mui/material";
const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutContext();
  const handleClick = async () => {
    const response = await fetch("/api/workouts/" + workout._id, {
      method: "DELETE",
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_WORKOUT", payload: json });
    }
  };
  return (
    <div className="workout-details">
      <div>
        <h4>{workout.title}</h4>
        <p>
          <strong>Load (kg): </strong>
          {workout.load}
        </p>
        <p>
          <strong>Reps: </strong>
          {workout.reps}
        </p>
        <p>
          {formatDistanceToNow(new Date(workout.createdAt), {
            addSuffix: true,
          })}
        </p>
      </div>
      <Tooltip
        title="Delete"
        placement="right"
        arrow
        enterDelay={500}
        leaveDelay={200}
        className="icon"
      >
        <IconButton onClick={handleClick}>
          <Delete />
        </IconButton>
      </Tooltip>
    </div>
  );
};

export default WorkoutDetails;
