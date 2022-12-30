import React from "react";
import ListGroup from "react-bootstrap/ListGroup";
import orderBy from "lodash/orderBy";

import Pill from "@components/common/pill";
import DropdownActions from "@components/common/DropdownActions";

const CollaboratorsList = ({ collaborators, styles = {} }) => (
  <>
    <h5>People with Access</h5>
    <ListGroup className="shadow-sm" style={styles}>
      {orderBy(collaborators, ["userId"], ["asc"]).map((c) => {
        const firstAction = {
          label: c.isAdmin ? "Remove Admin Access" : "Grant Admin Access",
        };
        return (
          <ListGroup.Item
            key={c.userId}
            className="d-flex justify-content-between"
          >
            <span>
              {c.userId} {c.isAdmin && <Pill type="success">Admin</Pill>}
            </span>
            <DropdownActions
              actions={[
                firstAction,
                {
                  label: <span className="text-danger">Remove</span>,
                },
              ]}
            />
          </ListGroup.Item>
        );
      })}
    </ListGroup>
  </>
);

export default CollaboratorsList;