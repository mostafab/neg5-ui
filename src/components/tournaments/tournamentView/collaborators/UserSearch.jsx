import React, { useState } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import Spinner from "react-bootstrap/Spinner";
import debounce from "lodash/debounce";
import orderBy from "lodash/orderBy";

import { searchForUsers } from "@api/user";
import { Form, Text } from "@components/common/forms";

const initialValues = {
  query: "",
};

const UserSearch = ({
  filterFunction = null,
  placeholder = "Search for users",
}) => {
  const [queryResults, setQueryResults] = useState({
    loading: false,
    results: [],
  });
  const [showResults, setShowResults] = useState(true);
  const performSearch = debounce(async (query) => {
    setQueryResults({
      ...queryResults,
      loading: true,
    });
    const results = (await searchForUsers(query)).filter(
      (item) => !filterFunction || filterFunction(item)
    );
    setQueryResults({
      loading: false,
      results: orderBy(results, "id"),
    });
  }, 500);
  const onChange = (value) => {
    if (value.trim().length >= 3) {
      performSearch(value.trim());
    }
    if (value.trim().length === 0 && queryResults.results.length > 0) {
      setQueryResults({
        loading: false,
        results: [],
      });
    }
    setShowResults(true);
  };

  const onClickUser = (user) => {
    console.log(user);
    setShowResults(false);
  };

  const renderResults = () => {
    if (!showResults) {
      return null;
    }
    return (
      <ListGroup
        className="shadow"
        style={{
          width: "93.5%",
          position: "absolute",
          zIndex: 2,
          top: "15.5%",
          maxHeight: "30vh",
          overflow: "scroll",
        }}
      >
        {queryResults.results.map((res) => (
          <ListGroup.Item action key={res.id} onClick={() => onClickUser(res)}>
            {res.id} {res.name && `(${res.name})`}
          </ListGroup.Item>
        ))}
      </ListGroup>
    );
  };

  return (
    <>
      <Form name="UserSearch" initialValues={initialValues} customCtaButtons>
        <Text
          name="query"
          label={
            queryResults.loading ? (
              <span>
                Loading <Spinner animation="border" size="sm" />
              </span>
            ) : (
              placeholder
            )
          }
          onChange={onChange}
          onBlur={() => setShowResults(false)}
          onFocus={() => setShowResults(true)}
        />
      </Form>
      {renderResults()}
    </>
  );
};

export default UserSearch;
