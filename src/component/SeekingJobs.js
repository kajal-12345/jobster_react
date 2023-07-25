import { useEffect, useState } from "react";
import SeekJob from "./SeekJob";
// import axios from "axios";
const SeekingJob = () => {
  // console.log(getSeekJobThunk());
const [jobs,setJobs]=useState([])
  useEffect(() => {
    fetch("http://localhost:5000/jobSeek",{
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
       setJobs(data?.jobs) ;
      })
      .catch((err) => console.log(err));
  },[]);
  return (
    <>
      <SeekJob jobsData = {jobs} />
    </>
  );
  
};
export default SeekingJob;
