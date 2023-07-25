import { showStats } from "../../Features/alljob/allJobSlice";
import { useEffect } from "react";
import { StatsContainer, Loading, ChartContainer } from "../../component/index";
import { useDispatch, useSelector } from "react-redux";
const Stats = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("useEffect")
    dispatch(showStats());
  }, []);
  const { isLoading, monthlyApplications } = useSelector(
    (store) => store.allJob
  );
  if (isLoading) {
    return <Loading center />;
  }
  // console.log('m',monthlyApplications);
  return (
    <>
      <StatsContainer />
      {monthlyApplications.length > 0 && <ChartContainer />}
    </>
  );
};
export default Stats;
