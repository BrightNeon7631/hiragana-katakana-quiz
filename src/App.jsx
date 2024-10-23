import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from 'react-router-dom';
import Home from './pages/Home';
import Quiz from './pages/Quiz';
import Layout from './components/Layout';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route index element={<Home />} />
      <Route path='quiz' element={<Quiz />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
