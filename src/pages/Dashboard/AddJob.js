import { useDispatch, useSelector } from "react-redux";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { FormRow } from "../../component/index";
import { toast } from "react-toastify";
import {
  clearValues,
  createJob,
  editJob,
  handleChange,
} from "../../Features/job/jobSlice";
import { FormRowSelect } from "../../component/index";
import { useEffect } from "react";
const AddJob = () => {
  const {
    // isLoading,
    position,
    company,
    jobLocation,
    jobTypeOptions,
    jobType,
    statusOptions,
    status,
    isEditing,
    editJobId,
  } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.user);
  // console.log(user);
  const dispatch = useDispatch();
  const handleInput = (e) => {
    // console.log("e.target");
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    // console.log(name, value);
    dispatch(handleChange({ name, value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!position || !company || !jobLocation) {
      toast.error("please fill out all fields");
      return;
    }
    if (isEditing) {
      dispatch(
        editJob({
          jobId: editJobId,
          job: {
            position,
            company,
            jobLocation,
            jobType,
            status,
          },
        })
      );
      return;
    }
    dispatch(createJob({ position, company, jobLocation, status, jobType }));
  };
  useEffect(() => {
    if (!isEditing) {
      dispatch(handleChange({ name: "jobLocation", value: user.location }));
      return;
    }
  }, []);
  return (
    <Wrapper>
      <form className="form" onSubmit={handleSubmit}>
        <h3>{isEditing ? " Edit Job" : "Add Job"}</h3>
        <div className="form-center">
          <FormRow
            labelText="position"
            type="text"
            name="position"
            value={position}
            onChange={handleInput}
          />
          <FormRow
            labelText="company"
            type="text"
            name="company"
            value={company}
            onChange={handleInput}
          />
          <FormRow
            labelText="job location"
            type="text"
            name="jobLocation"
            value={jobLocation}
            onChange={handleInput}
          />
          <FormRowSelect
            labelText="status"
            name="status"
            value={status}
            list={statusOptions}
            handleChange={handleInput}
          />
          <FormRowSelect
            labelText="Job Type"
            name="jobType"
            value={jobType}
            list={jobTypeOptions}
            handleChange={handleInput}
          />
          <div className="btn-container">
            <button
              type="button"
              className="btn btn-block clear-btn"
              onClick={() => {
                dispatch(clearValues());
              }}
            >
              clear
            </button>
            <button type="submit" className="btn btn-block submit-btn">
              {isEditing ? "save" : "submit"}
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
};
export default AddJob;
