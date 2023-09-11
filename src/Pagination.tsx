import {useQuery} from "@tanstack/react-query";
import {useState} from "react";

const Pagination = () => {
  const [page, setPage] = useState(0);
  const { data, isLoading } = useQuery({
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
        <button disabled={page <= 0} onClick={() => setPage(page -1)}>이전</button>
        <button onClick={() => setPage(page + 1)}>다음</button>
      </>
  )
}

export default Pagination
