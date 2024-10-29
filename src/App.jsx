/* eslint-disable no-unused-vars */
import { useState } from "react"
import {initialWorkouts, generateWorkout} from "./workouts.js"
import "./App.css"

function App() {
  const [workouts, setWorkouts] = useState(initialWorkouts);
  const [showDoneOnly, setShowDoneOnly] = useState(false);

  const addNewWorkout = () => {
    const newWorkout = generateWorkout();
    setWorkouts([...workouts, newWorkout]);
  };

  const replaceWorkout = (workoutToReplace) => {
    const newWorkout = generateWorkout();
    const updatedWorkouts = workouts.map(workout => 
      workout === workoutToReplace ? newWorkout : workout);
    setWorkouts(updatedWorkouts);
  };

  const deleteWorkout = (workoutToDelete) => {
    const updatedWorkouts = workouts.filter(workout => workout !== workoutToDelete);
    setWorkouts(updatedWorkouts);
  };

  const completeWorkout = (workoutToComplete) => {
    const updatedWorkouts = workouts.map(
      workout => workout === workoutToComplete ?
      {...workout, done: true} : workout
    )
    setWorkouts(updatedWorkouts);
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
            <button onClick={e=>replaceWorkout(workout)}>Replace</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
