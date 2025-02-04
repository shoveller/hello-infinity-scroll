- 인피니트 스크롤 예제: https://github.com/danbovey/react-infinite-scroller/blob/master/docs/src/index.js#L25
- https://goddino.tistory.com/358

- 무한스크롤은 아래의 컴포넌트를 사용하면 쉽게 구현할 수 있다.  
  [react-infinite-scroller](https://www.npmjs.com/package/react-infinite-scroller) 사용예제

```jsx
import InfiniteScroll from "react-infinite-scroller";
import { useState } from "react";

const ReactInfiniteScrollerTest = () => {
  const [items, setItems] = useState(Array.from({ length: 40 }));
  const fetchData = () => {
    console.log("리랜더");
    setTimeout(() => {
      setItems([...items, Array.from({ length: 40 })]);
    }, 100);
  };

  return (
    <div style={{ height: 80, overflow: "auto" }}>
      <InfiniteScroll
        loadMore={fetchData}
        hasMore={items.length <= 200}
        loader={<div key={0}>로딩중</div>}
        useWindow={false}
      >
        <ul>
          {items.map((_, index) => {
            return <li>{index}</li>;
          })}
        </ul>
      </InfiniteScroll>
    </div>
  );
};

export default ReactInfiniteScrollerTest;
```
