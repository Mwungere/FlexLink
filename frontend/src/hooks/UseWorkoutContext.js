import { useContext } from "react"
import { WorkoutContext } from "../context/Workoutcontext"



export const useWorkoutContext = () => {
    const context = useContext(WorkoutContext)

    if(!context){
        throw Error('UseWorkoutContext must be used inside a workoutsContextProvider')
    }

    return context
}