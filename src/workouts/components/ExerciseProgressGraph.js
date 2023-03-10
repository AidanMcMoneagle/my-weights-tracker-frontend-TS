import React, { useEffect, useState } from "react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import Card from "../../shared/components/UIElements/Card";

import "./ExerciseProgressGraph.css";

const ExerciseProgressGraph = (props) => {
  const { workoutData, exerciseId, name, sets, reps } = props;
  const [graphData, setGraphData] = useState([]);

  useEffect(() => {
    const arrayOfProgressforExercise = (exerciseId) => {
      const arrayofObjects = workoutData.map((workout) => {
        const workoutDate = workout.date;
        let averageWeightLifted = undefined;
        for (let [key, value] of Object.entries(workout)) {
          if (key !== "exerciseWeights") {
            continue;
          } else {
            value.map((exercise) => {
              if (exercise.exerciseId !== exerciseId) {
                return;
              } else {
                averageWeightLifted = exercise.exerciseSets.reduce(
                  (total, weight, index, array) => {
                    total += parseInt(weight);
                    if (index === array.length - 1) {
                      return total / array.length;
                    } else {
                      return total;
                    }
                  },
                  0
                );
                return averageWeightLifted;
              }
            });
          }
        }
        return {
          date: new Intl.DateTimeFormat("en-GB").format(new Date(workoutDate)),
          Average_Weight: Math.trunc(averageWeightLifted),
        };
      });
      return arrayofObjects;
    };
    const data = arrayOfProgressforExercise(exerciseId);
    setGraphData(data);
  }, [workoutData, exerciseId]);

  return (
    <Card className="exercise-progress-graph">
      <h3>{name}</h3>
      <p>
        Reps: {reps} Sets: {sets}
      </p>
      {graphData && graphData.length > 0 && (
        <ResponsiveContainer width="100%" aspect="2">
          <LineChart
            width={500}
            height={300}
            data={graphData}
            margin={{
              top: 5,
              right: 20,
              left: 0,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="Average_Weight"
              stroke="#1E90FF"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </Card>
  );
};

export default ExerciseProgressGraph;
