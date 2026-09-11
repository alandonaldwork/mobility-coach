import { useEffect, useRef, useState } from "react";

export interface WakeLockState {
  isSupported: boolean;
  isActive: boolean;
  request: () => Promise<void>;
  release: () => Promise<void>;
}

export function useWakeLock(enabled: boolean = true): WakeLockState {
  const wakeLockRef = useRef<WakeLockSentinel | null>(null);
  const [isSupported, setIsSupported] = useState<boolean>(false);
  const [isActive, setIsActive] = useState<boolean>(false);

  useEffect(() => {
    setIsSupported(typeof navigator !== "undefined" && "wakeLock" in navigator);
  }, []);

  const request = async () => {
    if (!isSupported || typeof navigator === "undefined" || !("wakeLock" in navigator)) {
      return;
    }

    try {
      if (document.visibilityState === "visible" && !wakeLockRef.current) {
        const lock = await navigator.wakeLock.request("screen");
        wakeLockRef.current = lock;
        setIsActive(true);

        lock.addEventListener("release", () => {
          if (wakeLockRef.current === lock) {
            wakeLockRef.current = null;
            setIsActive(false);
          }
        });
      }
    } catch (err) {
      console.warn("Screen Wake Lock request failed:", err);
      setIsActive(false);
    }
  };

  const release = async () => {
    if (wakeLockRef.current) {
      try {
        await wakeLockRef.current.release();
      } catch (err) {
        console.warn("Screen Wake Lock release failed:", err);
      } finally {
        wakeLockRef.current = null;
        setIsActive(false);
      }
    }
  };

  useEffect(() => {
    if (!isSupported) return;

    if (enabled) {
      request();
    } else {
      release();
    }

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible" && enabled) {
        request();
      } else if (wakeLockRef.current) {
        release();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      release();
    };
  }, [isSupported, enabled]);

  return { isSupported, isActive, request, release };
}
