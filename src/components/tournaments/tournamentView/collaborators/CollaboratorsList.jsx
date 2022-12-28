import React from "react";
import ListGroup from "react-bootstrap/ListGroup";
import orderBy from "lodash/orderBy";

import Pill from "@components/common/pill";

const CollaboratorsList = ({ collaborators, styles = {} }) => (
  <>
    <h5>People with Access</h5>
    <ListGroup className="shadow-sm" style={styles}>
      {orderBy(
        collaborators,
        [(c) => (c.isAdmin ? 1 : 0), "userId"],
        ["desc", "asc"]
      ).map((c) => (
        <ListGroup.Item key={c.userId}>
          {c.userId}
          {c.isAdmin && (
            <Pill className="float-end" type="success">
              Admin
            </Pill>
          )}
        </ListGroup.Item>
      ))}
    </ListGroup>
  </>
);

export default CollaboratorsList;
