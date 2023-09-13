import InfiniteScroll from 'react-infinite-scroller';
import {useState} from "react";

const ReactInfiniteScrollerTest = () => {
    const [items, setItems] = useState(Array.from({ length: 40 }))
    const fetchData = () => {
        console.log('리랜더');
        setTimeout(() => {
            setItems([...items, Array.from({ length: 40 })])
        }, 100)
    }

    return (
        <div style={{height: 80, overflow: 'auto'}}>
            <InfiniteScroll
                loadMore={fetchData}
                hasMore={items.length <= 200}
                loader={<div key={0}>로딩중</div>}
                useWindow={false}
            >
                <ul>
                    {
                        items.map((_, index) => {
                            return <li>{index}</li>
                        })
                    }
                </ul>
            </InfiniteScroll>
        </div>
    )
}

export default ReactInfiniteScrollerTest
