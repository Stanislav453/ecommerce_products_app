import { useEffect, useRef } from "react";
import { observe } from "../components/shop/observe";

type useObserverFetchProps = {
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
};

export const useObserverFetch = ({
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
}: useObserverFetchProps) => {
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = loadMoreRef.current;
    if (!el) return;

    const observerValue = observe({
      hasNextPage,
      isFetchingNextPage,
      fetchNextPage,
    });

    observerValue.observe(el);

    return () => observerValue.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  return loadMoreRef;
};
