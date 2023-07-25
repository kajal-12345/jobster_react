import "bootstrap/dist/css/bootstrap.css";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { FaLocationArrow } from "react-icons/fa";
import { FaBriefcase } from "react-icons/fa";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { toast } from "react-toastify";
const getAppliedJobsId = (jobId) => {
  fetch(`http://localhost:5000/applied-jobs/${jobId}`, {
    headers: {
      authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      if (data.message) {
        // console.log(data.user);
        localStorage.setItem('appliedJobId',jobId);
        toast.success(data.message);
      } else if (data.errorMessage) {
        toast.error("failed to apply");
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

const SeekJob = (props) => {
  return (
    <>
      <Container>
        <Row>
          {props.jobsData.map((job) => {
            return (
              <Col>
                <Card className="col-sm-6 mb-5" style={{ width: "18rem" }}>
                  <Card.Body>
                    <Card.Title>{job.position}</Card.Title>
                    <Card.Text>{job.company}</Card.Text>
                    <Card.Text>
                      <FaLocationArrow /> {job.jobLocation}
                    </Card.Text>
                    <Card.Text>
                      <FaBriefcase /> {job.jobType}
                    </Card.Text>
                    <Button
                      variant="primary"
                      onClick={() => {
                        getAppliedJobsId(job._id);
                      }}
                    >
                      Apply
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
};
export default SeekJob;
