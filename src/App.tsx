import {Link, Outlet} from "react-router-dom";

function App() {
  return (
      <>
          <ul>
              <li><Link to="/pagination">useQuery 예제</Link></li>
              <li><Link to="/qrOnlyTest">queryClient 만으로 구현하는 예제</Link></li>
              <li><Link to="/atomWithQrTest">react-router-dom + atomWithQuery 예제</Link></li>
              <li><Link to="/advAtomWithQrTest">향상된 react-router-dom + atomWithQuery 예제</Link></li>
              <li><Link to="/ric">react-infinite-scroller 패키지 사용 예제</Link></li>
              <li><Link to="/infTest">useInfiniteQuery 예제</Link></li>
          </ul>
          <Outlet/>
      </>
  )
}

export default App
