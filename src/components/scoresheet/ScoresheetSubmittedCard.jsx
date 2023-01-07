import React from "react";

import Card from "@components/common/cards";
import Icon from "@components/common/icon";

const ScoresheetSubmittedCard = ({ onView }) => (
  <Card>
    <div className="p-4">
      <div className="d-flex justify-content-center">
        <h5>Your scoresheet has been submitted!</h5>
        <Icon
          className="ms-2 mt-1"
          name="CheckCircleFill"
          fill="#18BC9C"
          size="20"
        />
      </div>
      <div className="d-flex justify-content-center">
        <span className="text-dark">
          You can{" "}
          <a
            href=""
            onClick={(e) => {
              e.preventDefault();
              onView();
            }}
          >
            view the match
          </a>
          , or close the scoresheet.
        </span>
      </div>
    </div>
  </Card>
);

export default ScoresheetSubmittedCard;
