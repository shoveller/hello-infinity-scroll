import {useQuery} from "@tanstack/react-query";
import {useSearchParams} from "react-router-dom";

const Pagination = () => {
    const [params, setParams] = useSearchParams();
    const page = params.get('page') || '0'
    const {data, isLoading} = useQuery({
        queryKey: ['poke', page],
        queryFn: () => fetch(`https://pokeapi.co/api/v2/pokemon?limit=5&offset=${page}`).then<PokeResponse<Poke>>(res => res.json()).then(data => data.results)
    })

    if (isLoading) {
        return <>로딩중</>
    }

    return (
        <>
            <ul>
                {
                    data?.map(item => {
                        return (<li key={item.name}>{item.name}</li>)
                    })
                }
            </ul>
            <button disabled={Number(page) <= 0} onClick={() => setParams({page: `${Number(page) - 1}`})}>이전</button>
            <button onClick={() => setParams({page: `${Number(page) + 1}`})}>다음</button>
        </>
    )
}

export default Pagination
