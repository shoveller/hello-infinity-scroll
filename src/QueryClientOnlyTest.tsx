import {Suspense} from "react";
import {atom, useAtom, useAtomValue} from "jotai";
import {client} from "./main.tsx";

const pageAtom = atom(0)

const pokeAtom = atom(async (get) => {
    const page = get(pageAtom);

    return await client.fetchQuery({
        queryKey: ['poke', page],
        queryFn: () => fetch(`https://pokeapi.co/api/v2/pokemon?limit=5&offset=${page}`).then<PokeResponse<Poke>>(res => res.json()).then(data => data.results),
        staleTime: 2000,
    })
})

const Contents = () => {
    const data = useAtomValue(pokeAtom);

    return (
        <ul>
            {
                data.map(item => {
                    return <li key={item.url}><a href={item.url}>{item.name}</a></li>
                })

            }
        </ul>
    )

}

const QueryClientOnlyTest = () => {
    const [page, setPage] = useAtom(pageAtom)

    return (
        <>
            <Suspense fallback="로딩중"><Contents/></Suspense>
            <div>
                <button onClick={() => setPage(page - 1)}>이전페이지</button>
                <button onClick={() => setPage(page + 1)}>다음페이지</button>
            </div>
        </>
    )
}

export default QueryClientOnlyTest
