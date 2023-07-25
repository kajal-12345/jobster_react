import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import { TbLocationFilled } from "react-icons/tb";
import { FaBriefcase } from "react-icons/fa";
// console.log(jobId)
const MyJob = () => {
  const [jobs, setJobs] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:5000/my-job`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setJobs(data?.myJobs));
  }, []);
  return (
    <>
      <div>
        <Container>
          <Row>
            {jobs.map((job) => {
              return (
                <Col>
                  <Card className="col-sm-6 mb-5" style={{ width: "18rem" }}>
                    <Card.Body>
                      <Card.Title>{job.position}</Card.Title>
                      <Card.Subtitle className="mb-2 text-muted">
                        {job.company}
                      </Card.Subtitle>
                      <Card.Text>
                        {" "}
                        <TbLocationFilled /> {job.jobLocation}
                      </Card.Text>
                      <Card.Text>
                        {" "}
                        <FaBriefcase /> {job.jobType}
                      </Card.Text>
                      <div
                        style={{
                          height: "30px",
                          width: "100px",
                          backgroundColor: "#E0E8F9",
                          color: "#647ACB",
                          padding: "0 0 0 15px ",
                          borderRadius: "4px",
                        }}
                      >
                        {" "}
                        {job.status}
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </Container>
      </div>
    </>
  );
};

export default MyJob;
