import { BrowserRouter, Navigate, Outlet, Route, Routes, useNavigate, } from 'react-router-dom';
import CoreRoutes from './Features/Core/CoreRoutes';
import AuthRoutes from './Features/Auth/AuthRoutes';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import Spinner from './GeneralElements/Spinner/Spinner';
import { userAxios } from './Utils/UserAxios';
import { useDispatch } from 'react-redux';
import { logOutUser, setUser } from './hooks/UserRedux/UserModelSlice';
import UserProvider from './hooks/UserRedux/UserProvider';
import userModel from './Models/UserModel';
import { userStore } from './hooks/UserRedux/UserStore';
import NotFoundPage from './Features/Core/404/NotFoundPage';
import NavBar from './GeneralComponents/NavBar/NavBar';
import Sidebar from './GeneralComponents/SideBar/sidebar';
import settingapp from './GeneralComponents/SettingApp/settingapp';
import EmailSetting from './GeneralComponents/SettingApp/EmailSetting';


const unProtectedRoutes = [
  '/',
  '/login',
  '/register',
]

function MainRoute() {

  const path = window.location.pathname;
  const disp = useDispatch();
  const nav = useNavigate();
  const [OpenSideBar, setOpenSideBar] = useState(false)
  const handleOpenSideBar = () => {
    OpenSideBar ? setOpenSideBar(false) : setOpenSideBar(true);
    console.log(OpenSideBar);
  }

  const { isLoading, error, data, refetch } = useQuery(
    "get-client",
    () => userAxios.post('login/token').then((d) => {
      const user = userModel.parse(d.data.user);
      if (user != null) {
        disp(setUser(d.data.user));
      }
      return user;
    }),
    {
      refetchOnWindowFocus: false,
      retry: 0,
      enabled: localStorage.getItem('token') != null,
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
  if (data != null && localStorage.getItem('token') != null) {
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
  // if (userStore.getState().user.user == null && localStorage.getItem('token') != null) {
  //   return <></>
  // }

  return (
    <div className='w-full h-[calc(100%-72px)]'>
      <EmailSetting />
      {/* <NavBar />
      <Sidebar />
      <div className="max-w-[95%] lg:max-w-[80%] mt-[40px] h-full mx-auto">
        <Outlet />
      </div> */}
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
              {settingapp}
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
