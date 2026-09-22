"use client";

import { useEffect } from "react";

export function ImageProtection() {
  useEffect(() => {
    const isImageTarget = (target: EventTarget | null): target is HTMLImageElement =>
      target instanceof HTMLImageElement;

    const preventImageContextMenu = (event: MouseEvent) => {
      if (isImageTarget(event.target)) event.preventDefault();
    };
    const preventImageDrag = (event: DragEvent) => {
      if (isImageTarget(event.target)) event.preventDefault();
    };

    document.addEventListener("contextmenu", preventImageContextMenu, true);
    document.addEventListener("dragstart", preventImageDrag, true);
    return () => {
      document.removeEventListener("contextmenu", preventImageContextMenu, true);
      document.removeEventListener("dragstart", preventImageDrag, true);
    };
  }, []);

  return null;
}
