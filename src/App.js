import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import Main from './Components/Main/Main';
import Home from './Components/Home/Home';
import SignUp from './Components/SignUp/SignUp';
import SignIn from './Components/SignIn/SignIn';
import DashboardLayout from './Components/DashboardLayout/DashboardLayout';
import Dashboard from './Components/Dashboard/Dashboard';
import AllTask from './Components/AllTask/AllTask';

function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Main />,
      children: [
        {
          path: '/',
          element: <Home />
        },
        {
          path: '/signUp',
          element: <SignUp />
        },
        {
          path: '/signIn',
          element: <SignIn />
        },
        {
          path: '/signUp',
          element: <SignUp />
        },
        {
          path: '*',
          element: <p className='text-5xl text-center font-bold'>404!!! Page Not Found</p>
        }
      ]
    },
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        {
          path: '/dashboard',
          element: <Dashboard />
        },
        {
          path: '/dashboard/allTask',
          element: <AllTask />
        },
        {
          path: '/dashboard/*',
          element: <p className='text-5xl text-center font-bold'>404!!! Page Not Found</p>
        }
      ]
    }
  ])

  return (
    <div className="bg-white">
      <RouterProvider router={router}>
        {router}
      </RouterProvider>
    </div>
  );
}

export default App;
