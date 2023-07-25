import axios from "axios";

export const getAllJobThunk = async (state, thunkAPI) => {
  const { page, search, searchStatus, searchType, sort } =
    thunkAPI.getState().allJob;
    const user = JSON.parse(localStorage.getItem('user'));
    const userId = user._id;
    
  let url = `http://localhost:5000/jobs/${userId}?status=${searchStatus}&sort=${sort}&page=${page}&jobType=${searchType}`;
  if (search) {
    url += `&search=${search}`;
  }
  try {
    const resp = await axios.get(url,{
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    // console.log(state);
    return resp.data;
  } catch (error) {
    // return checkForUnauthorizedResponse(error, thunkAPI);
  }
};

export const showStatsThunk = async (state, thunkAPI) => {
  try {
    // console.log("thunk");
    const resp = await axios.get("http://localhost:5000/jobs/stats", {
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
   
    return resp.data;
  } catch (error) {
   
    throw error;
  }
};
