import { BrowserRouter, Navigate, Outlet, Route, Routes, useNavigate, } from 'react-router-dom';
import CoreRoutes from './Features/Core/CoreRoutes';
import AuthRoutes from './Features/Auth/AuthRoutes';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import Spinner from './GeneralElements/Spinner/Spinner';
import { userAxios } from './Utils/UserAxios';
import { useDispatch } from 'react-redux';
import { logOutUser, setUser } from './hooks/UserRedux/UserModelSlice';
import UserProvider from './hooks/UserRedux/UserProvider';

import NotFoundPage from './Features/Core/404/NotFoundPage';
import NavBar from './GeneralComponents/NavBar/NavBar';
import Sidebar from './GeneralComponents/SideBar/sidebar';
import { useState, useEffect } from 'react';
import { userStore } from './hooks/UserRedux/UserStore';

const unProtectedRoutes = [
  '/',
  '/login',
  '/register',
  '/user'
]

function MainRoute() {
  //store subreddits in array
  const [recentCommunities, setRecentCommunities] = useState([]);


  const path = window.location.pathname;
  const disp = useDispatch();
  const nav = useNavigate();
  const [OpenSideBar, setOpenSideBar] = useState(false)
  //need to close sidebar when clicking on place on the page except the sidebar
  const handleOpenSideBar = () => {
    OpenSideBar ? setOpenSideBar(false) : setOpenSideBar(true);
  }

  // //this useEffect is to respond to any change in the page to
  // //update the recentCommunities array with the last 5 communities visited
  // //but still need to save it in database as all data vanish when refreshing the page
  useEffect(() => {
    const exp = /\/r\/(.*)/;
    const match = path.match(exp);
    if (match) {
      const communityName = match[1];
      if(!(recentCommunities.includes(communityName)))
      {
        if (recentCommunities.length < 5) {
          setRecentCommunities([...recentCommunities, communityName]);
        } else {
            setRecentCommunities([...recentCommunities.slice(1), communityName]);
        }
      }  
    }
  }, [path]);



  const { isLoading, error, data, refetch } = useQuery(
    "get-client",
    () => userAxios.get('v1/me').then((d) => {
      disp(setUser(d.data.user));
      return d.data.user;
    }),
    {
      refetchOnWindowFocus: false,
      retry: 0,
      enabled: localStorage.getItem('authorization') != null,
    }
  );
  if (isLoading) {
    return <div className='w-screen h-screen flex justify-center items-center'>
      <Spinner className=' text-xl' />
    </div>;
  }


  if (error != null && error.response != null && error.response.status == 403) {
    disp(logOutUser());
    window.location.href = '/';
    return
  }
  if (data != null && localStorage.getItem('authorization') != null) {
    console.log('aaaaaaaaaaaaaaaaaa');
    if (data.verifiedEmail && path == "/verify-email") {
      return <Navigate to={"/"} replace={true} />;
    }
    if (path == "/login" || path == "/register") {
      return <Navigate to={"/"} replace={true} />;
    }
  } else {
    if (!unProtectedRoutes.includes(path)) {


    }
  }
  if ((error != null) && error.response != null && error.response.status == 401) {
    disp(logOutUser());
    nav(0);
    return;
  }
  const store = userStore.getState().user.user;
  return (
    <div className='w-full h-[calc(100%)]'>
      <NavBar SetOpenSiseBar={handleOpenSideBar} IsLogged={store != null} ProfileImageSrc="/Prof.jpg" UserName="jhjfjy" IsOnline={true} />
      <div className="flex my-[73px] px-1 lg:gap-5  h-full mx-auto">
        {
          ![
            "/login",
            "/register",
            "/forget-username",
            "/forget-password",
          ].includes(window.location.pathname) && <Sidebar RecentCommunities={[]} IsOpen={OpenSideBar} />
        }

        <div className='h-full w-full overflow-y-auto lg:p-4'>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

const queryClient = new QueryClient();
function App() {
  return (
    <UserProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route element={<MainRoute />}>
              {AuthRoutes}
              {CoreRoutes}
            </Route>
            <Route path='*' element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </UserProvider>
  )
}

export default App
