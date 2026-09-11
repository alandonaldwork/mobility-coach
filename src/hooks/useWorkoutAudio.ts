import { useEffect, useRef } from "react";
import { getExerciseById } from "../data/exercise-catalog";
import { useWorkoutStore } from "../store/useWorkoutStore";
import { speechService } from "../audio/speech";

export function useWorkoutAudio() {
  const {
    playerState,
    currentExerciseIndex,
    filteredExercises,
    exerciseTimerSeconds,

    audioEnabled,
    voiceEnabled,

    speechRate,
    speechVolume,
  } = useWorkoutStore();

  const previousExerciseIndex = useRef<number | null>(null);
  const hasSwitchedSidesRef = useRef<boolean>(false);

  /*
   * Reset side switch status on index change or when timer is before halfway
   */
  useEffect(() => {
    const sessionExercise = filteredExercises[currentExerciseIndex];
    if (!sessionExercise) return;
    const exercise = getExerciseById(sessionExercise.exerciseId);
    const totalDuration = sessionExercise.durationSeconds || exercise?.durationSeconds || 30;
    const halfwaySeconds = Math.floor(totalDuration / 2);

    if (exerciseTimerSeconds > halfwaySeconds) {
      hasSwitchedSidesRef.current = false;
    }
  }, [exerciseTimerSeconds, currentExerciseIndex, filteredExercises]);

  /*
   * Announce exercise name
   */
  useEffect(() => {
    if (!audioEnabled || !voiceEnabled) {
      return;
    }

    if (playerState !== "exercise") {
      return;
    }

    if (previousExerciseIndex.current === currentExerciseIndex) {
      return;
    }

    previousExerciseIndex.current = currentExerciseIndex;

    const sessionExercise = filteredExercises[currentExerciseIndex];

    if (!sessionExercise) return;

    const exercise = getExerciseById(sessionExercise.exerciseId);

    if (!exercise) return;

    const announcement = `${exercise.name}. Perform for ${sessionExercise.dose}.`;
    speechService.speak(announcement, {
      rate: speechRate,
      volume: speechVolume,
    });
  }, [
    playerState,
    currentExerciseIndex,
    filteredExercises,
    audioEnabled,
    voiceEnabled,
    speechRate,
    speechVolume,
  ]);

  /*
   * Bilateral "Switch Sides" cue at halfway mark
   */
  useEffect(() => {
    if (!audioEnabled || !voiceEnabled) {
      return;
    }

    if (playerState !== "exercise") {
      return;
    }

    if (hasSwitchedSidesRef.current) {
      return;
    }

    const sessionExercise = filteredExercises[currentExerciseIndex];
    if (!sessionExercise) return;

    const exercise = getExerciseById(sessionExercise.exerciseId);
    if (!exercise || !exercise.isBilateral) return;

    const totalDuration = sessionExercise.durationSeconds || exercise.durationSeconds || 30;
    const halfwaySeconds = Math.floor(totalDuration / 2);

    if (exerciseTimerSeconds === halfwaySeconds && halfwaySeconds > 0) {
      hasSwitchedSidesRef.current = true;
      speechService.switchSides({
        rate: speechRate,
        volume: speechVolume,
      });
    }
  }, [
    exerciseTimerSeconds,
    playerState,
    currentExerciseIndex,
    filteredExercises,
    audioEnabled,
    voiceEnabled,
    speechRate,
    speechVolume,
  ]);

  /*
   * Exercise countdown (Ending countdown):
   *
   * 3
   * 2
   * 1
   */
  useEffect(() => {
    if (!audioEnabled || !voiceEnabled) {
      return;
    }

    if (playerState !== "exercise") {
      return;
    }

    if (exerciseTimerSeconds >= 1 && exerciseTimerSeconds <= 3) {
      speechService.speak(String(exerciseTimerSeconds), {
        rate: speechRate,
        volume: speechVolume,
      });
    }
  }, [
    exerciseTimerSeconds,
    playerState,
    audioEnabled,
    voiceEnabled,
    speechRate,
    speechVolume,
  ]);
}
