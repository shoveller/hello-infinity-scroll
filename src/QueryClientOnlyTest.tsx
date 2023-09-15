import {atom, useAtomValue} from "jotai";
import {client} from "./main.tsx";
import {atomFamily} from "jotai/utils";
import {useSearchParams} from "react-router-dom";
import {loadable} from "jotai/utils"

const pokeAtomFamily = atomFamily((page: string) => {
    return atom(async () => {
        return await client.fetchQuery({
            queryKey: ['poke2', page],
            queryFn: () => fetch(`https://pokeapi.co/api/v2/pokemon?limit=5&offset=${page}`).then<PokeResponse<Poke>>(res => res.json()).then(data => data.results)
        })
    })
})

const Contents = () => {
    const [params] = useSearchParams()
    const page = params.get('page') || '0'
    const data = useAtomValue(loadable(pokeAtomFamily(page)));

    if (data.state !== 'hasData') {
        return <>로딩중</>
    }

    return (
        <ul>
            {
                data.data.map(item => {
                    return <li key={item.url}><a href={item.url}>{item.name}</a></li>
                })

            }
        </ul>
    )

}

const QueryClientOnlyTest = () => {
    const [params, setParams] = useSearchParams()
    const page = params.get('page') || '0'

    return (
        <>
            <Contents/>
            <div>
                <button onClick={() => setParams({ page: `${Number(page) - 1}` })}>이전페이지</button>
                <button onClick={() => setParams({ page: `${Number(page) + 1}` })}>다음페이지</button>
            </div>
        </>
    )
}

export default QueryClientOnlyTest
