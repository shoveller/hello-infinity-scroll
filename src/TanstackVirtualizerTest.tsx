import { useVirtual } from '@tanstack/react-virtual';
import {useRef} from "react";

const TanstackVirtualizerTest = () => {
  // The scrollable element for your list
  const parentRef = useRef<HTMLDivElement>(null)
// debugger
  // The virtualizer
  const rowVirtualizer = useVirtual({
    parentRef,
    size: 10000,
    useObserver(ref, initialRect) {
      return {
        width: 0,
        height: 0
      }
    },
    estimateSize: () => 35
  })

  const rowVirtualizer = useVirtualizer({
    count: hasNextPage ? allRows.length + 10 : allRows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 50,
    overscan: 5,
    debug: true,
    enableSmoothScroll: false,
  });

  return (
      <>
         The scrollable element for your list
        <div
            ref={parentRef}
            style={{
              height: `400px`,
              overflow: 'auto', // Make it scroll!
            }}
        >
          {/* The large inner element to hold all of the items */}
          <div
              style={{
                height: `${rowVirtualizer.totalSize}px`,
                width: '100%',
                position: 'relative',
              }}
          >
            {/* Only the visible items in the virtualizer, manually positioned to be in view */}
            {rowVirtualizer.virtualItems.map((virtualItem) => (
                <div
                    key={virtualItem.key}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: `${virtualItem.size}px`,
                      transform: `translateY(${virtualItem.start}px)`,
                    }}
                >
                  Row {virtualItem.index}
                </div>
            ))}
          </div>
        </div>
      </>
  )
}

export default TanstackVirtualizerTest
