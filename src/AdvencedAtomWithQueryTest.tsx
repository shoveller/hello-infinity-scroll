import {atomsWithQuery} from "jotai-tanstack-query";
import {Params, useParams, useSearchParams} from "react-router-dom";
import {atom, useAtomValue, useSetAtom} from "jotai";
import {Suspense, useEffect} from "react";

const pathParamAtom = atom<Params>({})
const searchParamAtom = atom<Record<string, string>>({})

const [pokeAtom] = atomsWithQuery((get) => {
  const { page } = get(searchParamAtom);

  return {
    queryKey: ['poke', page],
    queryFn: () => fetch(`https://pokeapi.co/api/v2/pokemon?limit=5&offset=${page}`).then<PokeResponse<Poke>>(res => res.json()).then(data => data.results)
  }
})

const useReactRouterDomEffect = () => {
  const [params] = useSearchParams();
  const searchData = Object.fromEntries(params.entries())
  const searchHash = JSON.stringify(searchData)
  const setSearchParamAtom = useSetAtom(searchParamAtom)
  useEffect(() => {
    setSearchParamAtom(searchData)
  }, [searchData, searchHash, setSearchParamAtom]);

  const path = useParams();
  const pathHash = JSON.stringify(path)
  const setPathParamAtom = useSetAtom(pathParamAtom)
  useEffect(() => {
    setPathParamAtom(path)
  }, [path, pathHash, setPathParamAtom, setSearchParamAtom]);
}

const Contents = () => {
  const data = useAtomValue(pokeAtom)

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
  useReactRouterDomEffect()
  const { page = '0'} = useAtomValue(searchParamAtom);
  const [,setSearchParams] = useSearchParams()

  return (
      <>
        <Suspense fallback="로딩중"><Contents/></Suspense>
        <button onClick={() => setSearchParams({ page: `${Number(page) -1}` })}>이전페이지</button>
        <button onClick={() => setSearchParams({ page: `${Number(page) +1}` })}>다음페이지</button>
      </>
  )
}

export default AtomWithQueryTest
