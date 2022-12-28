import React from "react";
import ListGroup from "react-bootstrap/ListGroup";
import orderBy from "lodash/orderBy";

const CollaboratorsList = ({ collaborators, styles = {} }) => (
  <>
    <h5>People with Access</h5>
    <ListGroup className="shadow-sm" style={styles}>
      {orderBy(collaborators, "userId").map((c) => (
        <ListGroup.Item key={c.userId}>{c.userId}</ListGroup.Item>
      ))}
    </ListGroup>
  </>
);

export default CollaboratorsList;
