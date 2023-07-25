import Table from "react-bootstrap/Table";
import React, { useEffect } from "react";
// import updateStatus from "../updateStatus";
import { useState } from "react";
export const AppliedJobs = () => {
  const [jobs, setJobs] = useState([]);
  // const jobId = localStorage.getItem('appliedJobId');
  useEffect(() => {
    fetch(`http://localhost:5000/applied-jobs`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((job) => {
        return job.json();
      })
      .then((data) => {
        setJobs(data?.appliedJobs);

        console.log(data?.appliedJobs);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const updateStatus = (e) => {
    console.log("updated");
    const jobId = e.target.getAttribute("jobId");

    fetch(
      `http://localhost:5000/update-status/demo/${e.target.value}/${jobId}`,
      {
        method: "post",
        body: JSON.stringify({
          status: e.target.value,
        }),
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) =>
        localStorage.setItem("selectedValue", data?.appliedJob?.status)
      );
  };
  return (
    <>
      <Table striped="columns" variant="dark">
        <thead>
          <tr>
            <th>user_name</th>
            <th>#job_id</th>
            <th>company</th>
            <th>position</th>
            <th>status</th>
            <th>job type</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job) => job.appliedBy.map((user) => {
              return (
                <tr>
                  <td>{user.name}</td>
                  <td>{job._id}</td>
                  <td>{job.company}</td>
                  <td>{job.position}</td>
                  <td>
                    <form method="POST" action="update-status">
                      <select
                        name="status"
                        id="status"
                        jobId={job._id}
                        style={{
                          backgroundColor: "#2c3034",
                          border: "none",
                          color: "#ffff",
                        }}
                        onChange={updateStatus}
                        defaultValue={job.status}
                      >
                        {/* {console.log(job.status)} */}
                        <option value="interview" id="status1">
                          interview
                        </option>
                        <option value="declined" id="status2">
                          declined
                        </option>
                        <option value="pending" id="status3">
                          pending
                        </option>
                      </select>
                    </form>
                  </td>
                  <td>{job.jobType}</td>
                </tr>
              );
            })
          )}
        </tbody>
      </Table>
    </>
  );
};
