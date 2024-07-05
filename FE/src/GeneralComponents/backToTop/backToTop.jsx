import React, { useEffect, useState, useRef } from "react";
import { ChevronsUp } from "lucide-react";

/**
 * Component for displaying a "Back to Top" button that appears when scrolling down the page.
 * Clicking the button scrolls the page back to the top.
 */
export default function BackToTop() {
  const [showGoUp, setShowGoUp] = useState(false);
  const headerRef = useRef(null); // create a ref for the header
  const scrollableRef = useRef(null); // create a ref for the scrollable content

  useEffect(() => {
    /**
     * Callback function for the IntersectionObserver.
     * Sets the visibility of the "Back to Top" button based on whether the header is in the viewport.
     * @param {IntersectionObserverEntry[]} entries - The entries being observed.
     */
    const handleIntersection = ([entry]) => {
      // entry.isIntersecting will be true when the header is in the viewport
      setShowGoUp(!entry.isIntersecting);
    };

    const observer = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin: "0px",
      threshold: 0.1, // adjust this value to control when the callback is called
    });

    if (headerRef.current) {
      observer.observe(headerRef.current);
    }

    // cleanup function
    return () => {
      if (headerRef.current) {
        observer.unobserve(headerRef.current);
      }
    };
  }, []); // empty dependency array means this effect runs once on mount and cleanup on unmount

  return (
    <div role="backtotop">
      <div role="topDecker" className="absolute -top-24" ref={scrollableRef} />
      <div role="bottomDecker" className="absolute top-96" ref={headerRef} />
      {showGoUp && (
        <button
          id="backToTop"
          role="backToTopButton"
          onClick={() =>
            scrollableRef.current.scrollIntoView({
              behavior: "smooth",
              block: "start",
            })
          }
          className="fixed flex gap-1 z-40 bottom-5 right-10 shadow-inner ring-2 ring-gray-300 hover:opacity-100 opacity-50 mx-auto py-2 px-3 text-sm bg-gray-200 rounded-full min-w-fit min-h-fit"
        >
          <ChevronsUp className="h-4 my-auto w-4" /> back to top
        </button>
      )}
    </div>
  );
}
