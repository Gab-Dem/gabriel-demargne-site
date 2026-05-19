"use client";

import { useCallback, useLayoutEffect, useRef, useState } from "react";

const MAX_TIGHTENING_EM = -0.02;
const TIGHTENING_STEP_EM = -0.002;
const LINE_TOLERANCE_PX = 2;

export function AdaptiveIntroParagraph({
  children,
  className,
}: {
  children: string;
  className?: string;
}) {
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const [letterSpacing, setLetterSpacing] = useState(0);

  const fitText = useCallback(() => {
    const paragraph = paragraphRef.current;
    const textNode = paragraph?.firstChild;

    if (!paragraph || textNode?.nodeType !== Node.TEXT_NODE) {
      return;
    }

    let chosenSpacing = MAX_TIGHTENING_EM;

    for (
      let spacing = 0;
      spacing >= MAX_TIGHTENING_EM;
      spacing += TIGHTENING_STEP_EM
    ) {
      paragraph.style.letterSpacing = `${spacing}em`;

      if (!hasSingleWordLastLine(paragraph, textNode)) {
        chosenSpacing = spacing;
        break;
      }
    }

    paragraph.style.letterSpacing = `${chosenSpacing}em`;
    setLetterSpacing(chosenSpacing);
  }, []);

  useLayoutEffect(() => {
    const paragraph = paragraphRef.current;

    if (!paragraph) {
      return;
    }

    let frame = requestAnimationFrame(fitText);
    const resizeObserver = new ResizeObserver(() => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(fitText);
    });

    resizeObserver.observe(paragraph);

    document.fonts?.ready.then(() => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(fitText);
    });

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
    };
  }, [children, fitText]);

  return (
    <p
      ref={paragraphRef}
      className={className}
      style={{ letterSpacing: `${letterSpacing}em` }}
    >
      {children}
    </p>
  );
}

function hasSingleWordLastLine(
  paragraph: HTMLParagraphElement,
  textNode: ChildNode,
) {
  const text = paragraph.textContent ?? "";
  const words = Array.from(text.matchAll(/\S+/g));

  if (words.length < 2) {
    return false;
  }

  const lineTops = words
    .map((word) => getWordTop(textNode, word.index, word[0].length))
    .filter((top): top is number => top !== null);

  if (lineTops.length < 2) {
    return false;
  }

  const lastLineTop = Math.max(...lineTops);
  const wordsOnLastLine = lineTops.filter(
    (top) => Math.abs(top - lastLineTop) <= LINE_TOLERANCE_PX,
  );

  return wordsOnLastLine.length === 1;
}

function getWordTop(textNode: ChildNode, start: number, length: number) {
  const range = document.createRange();
  range.setStart(textNode, start);
  range.setEnd(textNode, start + length);

  const rect = range.getBoundingClientRect();
  range.detach();

  return rect.height > 0 ? rect.top : null;
}
