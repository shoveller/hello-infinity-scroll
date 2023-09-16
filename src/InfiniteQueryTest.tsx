import {useInfiniteQuery} from "@tanstack/react-query";

const defaultPageParam = 'https://pokeapi.co/api/v2/pokemon?limit=5'

const InfiniteQueryTest = () => {
    const {data, fetchNextPage, hasNextPage, isFetchingNextPage} = useInfiniteQuery({
        queryKey: ['pokeList'],
        queryFn: ({ pageParam = defaultPageParam }) => {
            // pageParam.getNextPageParam()
            return fetch( pageParam).then<PokeResponse<Poke>>(res => res.json());
        },
        /**
         *
         * @param lastPage 마지막으로 받아온 페이지 데이터
         * @param allPages 전체 페이지 데이터
         */
        getNextPageParam: (lastPage) => {
            // 이 지점에서 다음 url을 만들어 주어야 한다.
            // infinite query 를 자원하는 api들은 next 라는 프로퍼티에 담아서 주는 것이 관례이다.
            // 원리를 이해하고 있다면, 이 지점에서 url을 만들어 주면 구현할 수 있다.
            return lastPage.next
        },
        getPreviousPageParam: (firstPage) => {
            // 이 지점에서 이전 url을 만들어 주어야 한다.
            // infinite query 를 자원하는 api들은 next 라는 프로퍼티에 담아서 주는 것이 관례이다.
            // 원리를 이해하고 있다면, 이 지점에서 url을 만들어 주면 구현할 수 있다.
            debugger
            return firstPage.previous
        }
    })
    // data?.pages // pageParams 로 가져온 데이터
    // data?.pageParams // 데이터를 호출하는 주소. getNextPageParam 과 getPreviousPageParam 에서 만들어 주어야 한다.
    // fetchNextPage // 다음 데이터가 필요할 때 호출하는 함수
    // hasNextPage // 다음 데이터가 있는지를 나타내는 프로퍼티. getNextPageParam 의 반환값에 영향을 받는다.

    return (
        <>
            {
                data?.pages.map(page => {
                    return <ul key={page.next}>{
                        page.results.map(item => {
                            return <li key={item.url}><a href={item.url}>{item.name}</a></li>
                        })
                    }</ul>
                })
            }
            <button disabled={!hasNextPage || isFetchingNextPage} onClick={() => fetchNextPage()}>{isFetchingNextPage ? '로딩중' : '더 가져오기'}</button>
        </>
    )
}

export default InfiniteQueryTest
