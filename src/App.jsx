/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react"
import {initialWorkouts, generateWorkout} from "./workouts.js"
import "./App.css"

function App() {
  const [workouts, setWorkouts] = useState(initialWorkouts);
  const [showDoneOnly, setShowDoneOnly] = useState(false);

  useEffect(() => {
    console.log("workouts: ", workouts);
    console.log("showDone: ", showDoneOnly);
  }, [workouts, showDoneOnly]);

  const addNewWorkout = () => {
    const newWorkout = generateWorkout()
    setWorkouts([...workouts, newWorkout]);
    console.log("addNewWorkout:", newWorkout)
  };

  const deleteWorkout = (workoutToDelete) => {
    console.log("deleteWorkout:", workoutToDelete)
    const updatedWorkouts = workouts.filter(workout => workout !== workoutToDelete);
    setWorkouts(updatedWorkouts);
  };

  const completeWorkout = (workoutToComplete) => {
    const updatedWorkouts = workouts.map(
      workout => workout === workoutToComplete ?
      {...workout, done: true} : workout
    )
    setWorkouts(updatedWorkouts);
    console.log("completeWorkout:", workoutToComplete);
  };

  const showDone = () => {
    setShowDoneOnly(!showDoneOnly);
  };

  const filteredWorkouts = showDoneOnly
    ? workouts.filter(workout => workout.done)
    : workouts;

  return (
    <div className="App">
      <h1>🏋️‍♀️Workout Generator</h1>
      <button onClick={addNewWorkout}>Add New Workout</button>
      <ul>
        <label>Show Done Only</label>
        <input
          type="checkbox"
          onChange={showDone}
          checked={showDoneOnly}
        />
        {filteredWorkouts.map((workout, index) => (
          <li key={index}>
            <p>
              {workout.sets}x sets of <strong>{workout.reps}x{workout.exercise}</strong> with {workout.rest} seconds rest
            </p>
            {!workout.done &&
              <button onClick={e=>completeWorkout(workout)}>Done</button>}
            {workout.done &&
              <p>✅</p>}
            <button onClick={e=>deleteWorkout(workout)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
