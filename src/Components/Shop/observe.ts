type ObserverType = {
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
};

export const observe = ({
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
}: ObserverType) => {
  const observerValue = new IntersectionObserver(
    (entries) => {
      const first = entries[0];
      if (!first.isIntersecting) return;

      if (hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    {
      root: null,
      rootMargin: "600px",
      threshold: 0,
    }
  );

  return observerValue;
};
