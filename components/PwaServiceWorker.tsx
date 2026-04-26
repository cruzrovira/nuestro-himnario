"use client";

import { useEffect } from "react";

export function PwaServiceWorker() {
  useEffect(() => {
    if (
      process.env.NODE_ENV !== "production" ||
      !("serviceWorker" in navigator)
    ) {
      return;
    }

    navigator.serviceWorker.register("/sw.js").catch(() => {
      // Evitamos romper la UI si el registro falla.
    });

    // Track whether a Service Worker was already controlling this page so we
    // can distinguish a first-install from a genuine update.
    const hadController = Boolean(navigator.serviceWorker.controller);

    navigator.serviceWorker.addEventListener("controllerchange", () => {
      if (hadController) {
        // A new Service Worker has taken control – content may have changed.
        window.location.reload();
      }
    });
  }, []);

  return null;
}
