import {Link, Outlet} from "react-router-dom";

function App() {
  return (
      <>
          <ul>
              <li><Link to="/pagination">페이지네이션</Link></li>
          </ul>
          <Outlet/>
      </>
  )
}

export default App
