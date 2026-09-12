"use client";

import { useCallback, useEffect, useState } from "react";

export type ToastType = "success" | "error" | "warning" | "info";

export interface Toast {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  duration?: number;
}

interface ToastOptions {
  title: string;
  message?: string;
  duration?: number;
}

const DEFAULT_DURATION = 4000;

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((current) =>
      current.filter((toast) => toast.id !== id),
    );
  }, []);

  const addToast = useCallback(
    (type: ToastType, options: ToastOptions) => {
      const id = crypto.randomUUID();

      const toast: Toast = {
        id,
        type,
        title: options.title,
        message: options.message,
        duration: options.duration ?? DEFAULT_DURATION,
      };

      setToasts((current) => [...current, toast]);

      return id;
    },
    [],
  );

  const success = useCallback(
    (options: ToastOptions) =>
      addToast("success", options),
    [addToast],
  );

  const error = useCallback(
    (options: ToastOptions) =>
      addToast("error", options),
    [addToast],
  );

  const warning = useCallback(
    (options: ToastOptions) =>
      addToast("warning", options),
    [addToast],
  );

  const info = useCallback(
    (options: ToastOptions) =>
      addToast("info", options),
    [addToast],
  );

  const clearAll = useCallback(() => {
    setToasts([]);
  }, []);

  useEffect(() => {
    const timers = toasts
      .filter((toast) => toast.duration && toast.duration > 0)
      .map((toast) => {
        return window.setTimeout(() => {
          removeToast(toast.id);
        }, toast.duration);
      });

    return () => {
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, [toasts, removeToast]);

  return {
    toasts,
    success,
    error,
    warning,
    info,
    removeToast,
    clearAll,
  };
}