import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import Wrapper from "../assets/wrappers/JobsContainer";
import { Job } from "./index";
import { Loading } from "../component/index";
import { getAllJobs } from "../Features/alljob/allJobSlice";
import PageBtnContainer from "./PageBtnContainer";
const JobsContainer = () => {
  const {
    jobs,
    isLoading,
    numOfPages,
    totalJobs,
    search,
    searchStatus,
    searchType,
    sort,
    page,
  } = useSelector((store) => store.allJob);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllJobs());
  }, [search, searchStatus, searchType, sort, page]);
  if (isLoading) {
    return (
      <Wrapper>
        <Loading center />
      </Wrapper>
    );
  }
  if (jobs.length === 0) {
    return (
      <Wrapper>
        <h2>No Jobs found</h2>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <h5>
        {totalJobs} job{jobs.length > 1 && "s"} found
      </h5>
      <div className="jobs">
        {jobs.map((job) => {
            // console.log(job);
          return <Job key={job._id} {...job} />;
        })}
      </div>
      {numOfPages > 1 && <PageBtnContainer />}
    </Wrapper>
  );
};
export default JobsContainer;
