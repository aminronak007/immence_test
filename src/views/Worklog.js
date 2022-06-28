import React from "react";
import moment from "moment";

const Worklog = (props) => {
  const { worklogList } = props;
  return (
    <div className="container">
      <div className="row">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">User</th>
              <th scope="col">Date</th>
              <th scope="col">Hour</th>
              <th scope="col">Notes</th>
            </tr>
          </thead>
          <tbody>
            {worklogList.length > 0 &&
              worklogList.map((item, index) => {
                return (
                  <tr key={`key${index}`}>
                    <th scope="row">{index + 1}</th>
                    <td>{item.userId.name}</td>
                    <td>{moment(item.date).format("DD/MM/YYYY")}</td>
                    <td>{item.hour}</td>
                    <td>{item.notes}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Worklog;
