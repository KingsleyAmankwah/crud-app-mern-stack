import React, { useEffect } from "react";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../features/users/userSlice";
function UsersTable({ _id, Name, Location }) {
  // const { users } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers);
  }, [dispatch]);

  return (
    <div>
      <Table bordered className="mt-4">
        <thead>
          <tr>
            <th>No.</th>
            <th>Name</th>
            <th>Location</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{_id}</td>
            <td> {Name} </td>
            <td> {Location} </td>
            <td>
              <Button variant="info">Edit</Button>
              <Button className="ms-2" variant="danger">
                Delete
              </Button>
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}

export default UsersTable;