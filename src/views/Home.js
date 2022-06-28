import React, { useEffect, useState } from "react";
import { addUser, userList } from "../services/userServices";
import { toast, ToastContainer } from "react-toastify";
import Worklog from "./Worklog";
import { worklogsList, addWorklog } from "../services/worklogServices";

const Home = () => {
  const [userDetails, setUserDetails] = useState({});
  const [usersList, setUserList] = useState([]);
  const [worklogList, setWorklogList] = useState([]);

  const [worklogData, setWorklogData] = useState({});

  const handleChange = (e) => {
    let { name, value } = e.target;
    setUserDetails({
      ...userDetails,
      [name]: value,
    });
  };

  const handleWorklogDataChange = (e) => {
    let { name, value } = e.target;
    setWorklogData({
      ...worklogData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    await addUser(userDetails).then((res) => {
      if (res.message) {
        toast.success(res.message);
        setUserDetails({});
        loadUserList();
      } else {
        toast.error(res.message);
      }
    });
  };

  const loadUserList = async () => {
    await userList().then((res) => {
      setUserList(res.data);
    });
  };

  const handleAddWorklogData = async () => {
    await addWorklog(worklogData).then((res) => {
      if (res.message) {
        toast.success(res.message);
        setWorklogData({});
        loadWorklogsList();
      } else {
        toast.error(res.message);
      }
    });
  };

  const loadWorklogsList = async () => {
    await worklogsList().then((res) => {
      setWorklogList(res.data);
    });
  };

  useEffect(() => {
    loadUserList();
    loadWorklogsList();
  }, []);
  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-12">
          <h3>Please Enter below details</h3>
        </div>
      </div>

      <div className="row">
        <div className="col-4">
          <input
            type="text"
            placeholder="Enter your name"
            className="form-control"
            name="name"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="col-4">
          <select
            type="text"
            className="form-control"
            name="preferred_working_hour_per_day"
            onChange={(e) => handleChange(e)}
          >
            <option disabled>Select Preferred Hours</option>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
            <option value={6}>6</option>
            <option value={7}>7</option>
            <option value={8}>8</option>
          </select>
        </div>
        <div className="col-4">
          <button
            type="button"
            onClick={handleSubmit}
            className="btn btn-primary"
          >
            Save
          </button>
        </div>
      </div>

      <div className="row py-5">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Name</th>
              <th scope="col">Preferred Working Hour Per Day</th>
            </tr>
          </thead>
          <tbody>
            {usersList.length > 0 &&
              usersList.map((item, index) => {
                return (
                  <tr key={`key${index}`}>
                    <th scope="row">{index + 1}</th>
                    <td>{item.name}</td>
                    <td>{item.preferred_working_hour_per_day}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
      <hr />

      <div className="row pt-3">
        <h3>Add Worklogs</h3>
        <div className="col-4">
          <select
            className="form-control"
            onChange={(e) => handleWorklogDataChange(e)}
            name="userId"
          >
            <option>Please select user</option>
            {usersList.length > 0 &&
              usersList.map((item, index) => {
                return (
                  <option value={item._id} key={`key${index}`}>
                    {item.name}
                  </option>
                );
              })}
          </select>
        </div>
        <div className="col-4">
          <input
            type="date"
            onChange={(e) => handleWorklogDataChange(e)}
            className="form-control"
            name="date"
          />
        </div>
        <div className="col-4">
          <input
            type="number"
            onChange={(e) => handleWorklogDataChange(e)}
            placeholder="Please enter hours"
            className="form-control"
            name="hour"
          />
        </div>

        <div className="row pt-3">
          <div className="col-4">
            <textarea
              type="text"
              onChange={(e) => handleWorklogDataChange(e)}
              placeholder="Please enter notes"
              className="form-control"
              name="notes"
            />
          </div>
          <div className="col-4">
            <button onClick={handleAddWorklogData} className="btn btn-primary">
              Add Worklog
            </button>
          </div>
        </div>
      </div>

      <hr />
      <Worklog worklogList={worklogList} />
      <ToastContainer />
    </div>
  );
};

export default Home;
