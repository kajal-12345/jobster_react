

const updateStatus = (event) => {
    const selectedStatus = event.target.value; 
    const jobId = event.target.getAttribute("jobId"); 

    // const updatedJobs = jobs.map((job) => {
    //   if (job._id === jobId) {
    //     // Update the status property of the job
    //     job.status = selectedStatus;
    //   }
    //   return job;
    // });
   fetch("http://localhost:5000/update-status",{
    method:'post',
    body:{
      ""
      
    },
    headers:{
        authorization: `Bearer ${localStorage.getItem("token")}`,
    },
   }).then(res => {
    return res.json()
   }).then(data=>{
    console.log(data);
    console.log(selectedStatus);
    return data?.jobs.map((job) => {
      if (job._id === jobId) {
        // Update the status property of the job

        job.status = selectedStatus;
      }
      return job;
    });
   })
}

export default updateStatus