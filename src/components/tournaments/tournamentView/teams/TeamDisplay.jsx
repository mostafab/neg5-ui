import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";

import Card from "@components/common/cards";
import DropdownActions from "@components/common/DropdownActions";
import ActionConfirmationAlert from "@components/common/ActionConfirmationAlert";

import TeamForm from "./TeamForm";
import TeamMatches from "./TeamMatches";

const TeamDisplay = ({ team, matches, teams, onSubmitSuccess }) => {
  const [readOnly, setReadOnly] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  useEffect(() => {
    setIsDeleting(false);
  }, [team.id]);
  return (
    <Card>
      {isDeleting && (
        <Row>
          <Col lg={12} md={12} sm={12}>
            <div className="p-4">
              <ActionConfirmationAlert
                className="mb-0"
                message={`Are you sure you want to delete ${team.name}? This action is unrecoverable.`}
                level="danger"
              />
            </div>
          </Col>
        </Row>
      )}
      {!isDeleting && (
        <Row>
          <Col lg={team.id ? 6 : 12} md={12} sm={12}>
            {team.id && readOnly && !isDeleting && (
              <DropdownActions
                className="mb-3"
                actions={[
                  {
                    label: <span className="text-gray">Edit</span>,
                    onClick: () => setReadOnly(false),
                    separator: <hr className="mt-1 mb-1" />,
                  },
                  {
                    label: (
                      <span className="text-danger">Delete {team.name}</span>
                    ),
                    onClick: () => setIsDeleting(true),
                  },
                ]}
              />
            )}
            <TeamForm
              team={team}
              readOnly={readOnly && team.id}
              onCancel={team.id ? () => setReadOnly(true) : null}
              onSubmitSuccess={
                team.id
                  ? (result) => {
                      setReadOnly(true);
                      onSubmitSuccess(result);
                    }
                  : null
              }
            />
          </Col>
          {team.id && (
            <Col lg={6} md={12} sm={12}>
              <TeamMatches team={team} matches={matches} teams={teams} />
            </Col>
          )}
        </Row>
      )}
    </Card>
  );
};

export default TeamDisplay;
