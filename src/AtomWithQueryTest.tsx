import {atomFamily} from "jotai/utils";
import {atomsWithQuery} from "jotai-tanstack-query";
import {useSearchParams} from "react-router-dom";
import {useAtomValue} from "jotai";
import {Suspense} from "react";

const pokeAtomFamily = atomFamily((page: string) => {
  const [atom] = atomsWithQuery(() => {
    return {
      queryKey: ['poke', page],
      queryFn: () => fetch(`https://pokeapi.co/api/v2/pokemon?limit=5&offset=${page}`).then<PokeResponse<Poke>>(res => res.json()).then(data => data.results),
    }
  })

  return atom;
})


const usePage = () => {
  const [params, setParams] = useSearchParams()
  const page = params.get('page') || '0'

  return {
    page,
    prev: () => setParams({ page: `${Number(page) -1}` }),
    next: () => setParams({ page: `${Number(page) +1}` }),
  }
}

const Contents = () => {
  const {page} = usePage();
  const data = useAtomValue(pokeAtomFamily(page))

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

const AtomWithQueryTest = () => {
  const {next, prev} = usePage();

  return (
      <>
        <Suspense fallback="로딩중"><Contents/></Suspense>
        <button onClick={prev}>이전페이지</button>
        <button onClick={next}>다음페이지</button>
      </>
  )
}

export default AtomWithQueryTest
