import { Landing, Register, Error } from "./pages/index";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  AddJob,
  AllJobs,
  Profile,
  SharedLayedout,
  Stats,
  SeekingJob,
  AppliedJobs,
} from "./pages/Dashboard/index";
import Protectedroute from "./pages/Protectedroute";
import MyJob from "./component/MyJob";
function App() {
  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Protectedroute>
                <SharedLayedout />
              </Protectedroute>
            }
          >
            <Route path="/" element={<Stats />} />
            <Route path="add-job" element={<AddJob />} />
            <Route path="all-jobs" element={<AllJobs />} />
            <Route path="profile" element={<Profile />} />
            <Route path="seeking-job" element={<SeekingJob />} />
            <Route path="applied-jobs" element={<AppliedJobs />} />
            <Route path="my-job" element={<MyJob />} />
          </Route>
          <Route index path="/landing" element={<Landing />} />
          <Route path="register" element={<Register />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
