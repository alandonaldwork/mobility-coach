import { useEffect, useRef } from 'react';
import { useWorkoutStore } from '../store/useWorkoutStore';
import { useUserStore } from '../store/useUserStore';
import { speechService, playChimeSound } from '../audio/speech';
import { getExerciseById } from '../data/exercise-catalog';

/**
 * useAudioCues
 *
 * Fires Text-to-Speech and audio chimes at key workout moments:
 * - Exercise start announcement
 * - Bilateral side-switch at halfway
 * - 3-second countdown chime before exercise ends
 * - Transition screen "rest + upcoming exercise" cue
 * - Session complete celebration cue
 */
export function useAudioCues() {
  const {
    playerState,
    currentExerciseIndex,
    filteredExercises,
    exerciseTimerSeconds,
  } = useWorkoutStore();

  const { audioPreferences } = useUserStore();
  const { audioEnabled, voiceEnabled, speechRate, speechVolume, selectedVoiceName } = audioPreferences;

  // Track which exercise index we last announced to avoid repeated announcements
  const lastAnnouncedIndex = useRef<number>(-1);
  const lastAnnouncedTransition = useRef<number>(-1);
  const sidesSwitchFired = useRef<boolean>(false);
  const countdownFired = useRef<boolean>(false);
  const completeFired = useRef<boolean>(false);

  const getSpeechOptions = () => {
    const voices = speechService.getVoices();
    const voice = selectedVoiceName
      ? voices.find((v) => v.name === selectedVoiceName) ?? null
      : null;
    return { rate: speechRate, volume: speechVolume, voice };
  };

  // ── Exercise start announcement ──────────────────────────────────────────
  useEffect(() => {
    if (playerState !== 'exercise') return;
    if (lastAnnouncedIndex.current === currentExerciseIndex) return;

    lastAnnouncedIndex.current = currentExerciseIndex;
    sidesSwitchFired.current = false;
    countdownFired.current = false;

    const exSession = filteredExercises[currentExerciseIndex];
    if (!exSession) return;
    const exDetails = getExerciseById(exSession.exerciseId);
    if (!exDetails) return;

    if (audioEnabled) playChimeSound(523.25, 0.25); // soft C5 start chime

    if (voiceEnabled) {
      const isBilateral = exDetails.isBilateral;
      const text = isBilateral
        ? `${exDetails.name}. ${exSession.dose}. Both sides.`
        : `${exDetails.name}. ${exSession.dose}.`;
      setTimeout(() => speechService.speak(text, getSpeechOptions()), 400);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playerState, currentExerciseIndex]);

  // ── Bilateral side-switch + 3-second countdown ───────────────────────────
  useEffect(() => {
    if (playerState !== 'exercise') return;

    const exSession = filteredExercises[currentExerciseIndex];
    if (!exSession) return;
    const exDetails = getExerciseById(exSession.exerciseId);
    if (!exDetails) return;

    const totalDuration = exSession.durationSeconds;
    const halfwaySeconds = Math.floor(totalDuration / 2);

    // Side-switch cue at halfway for bilateral exercises
    if (
      exDetails.isBilateral &&
      !sidesSwitchFired.current &&
      exerciseTimerSeconds === halfwaySeconds
    ) {
      sidesSwitchFired.current = true;
      if (audioEnabled || voiceEnabled) {
        speechService.switchSides(getSpeechOptions());
      }
    }

    // 3-second countdown before exercise ends
    if (!countdownFired.current && exerciseTimerSeconds === 3) {
      countdownFired.current = true;
      if (audioEnabled) {
        playChimeSound(880, 0.15);
      }
      if (voiceEnabled) {
        speechService.countdown(3, getSpeechOptions());
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [exerciseTimerSeconds, playerState, currentExerciseIndex]);

  // ── Transition screen: "rest + upcoming exercise" ────────────────────────
  useEffect(() => {
    if (playerState !== 'transition') return;
    if (lastAnnouncedTransition.current === currentExerciseIndex) return;
    lastAnnouncedTransition.current = currentExerciseIndex;

    if (!voiceEnabled) return;

    const nextSession = filteredExercises[currentExerciseIndex + 1];
    if (!nextSession) return;
    const nextDetails = getExerciseById(nextSession.exerciseId);
    if (!nextDetails) return;

    setTimeout(() => {
      speechService.speak(
        `Rest. Up next: ${nextDetails.name}.`,
        getSpeechOptions()
      );
    }, 300);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playerState, currentExerciseIndex]);

  // ── Session complete ──────────────────────────────────────────────────────
  useEffect(() => {
    if (playerState !== 'complete') return;
    if (completeFired.current) return;
    completeFired.current = true;

    if (audioEnabled) {
      // ascending celebration chime
      playChimeSound(523.25, 0.2);
      setTimeout(() => playChimeSound(659.25, 0.2), 180);
      setTimeout(() => playChimeSound(783.99, 0.35), 360);
    }

    if (voiceEnabled) {
      setTimeout(
        () => speechService.speak('Great work! Session complete.', getSpeechOptions()),
        600
      );
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playerState]);

  // Reset complete-fired flag when a new session starts
  useEffect(() => {
    if (playerState === 'exercise' || playerState === 'briefing') {
      completeFired.current = false;
    }
  }, [playerState]);
}
