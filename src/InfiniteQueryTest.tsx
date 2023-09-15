import {useInfiniteQuery} from "@tanstack/react-query";

const InfiniteQueryTest = () => {
  useInfiniteQuery({
      queryKey: [],
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,

  })

  return (
    <>테스트</>
  )
}

export default InfiniteQueryTest
