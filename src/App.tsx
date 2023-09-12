import {Link, Outlet} from "react-router-dom";

function App() {
  return (
      <>
          <ul>
              <li><Link to="/pagination">useQuery 예제</Link></li>
              <li><Link to="/ric">react infinite scroller 예제</Link></li>
          </ul>
          <Outlet/>
      </>
  )
}

export default App
