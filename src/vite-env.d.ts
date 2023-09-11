/// <reference types="vite/client" />

type PokeResponse<T> = {
    count: number,
    next: string | null,
    previous: string | null
    results: Array<T>
}

type Poke = {
    name: string
    url: string
}
