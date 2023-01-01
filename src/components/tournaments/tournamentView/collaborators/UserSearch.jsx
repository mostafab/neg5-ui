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
    error: null,
  });
  const [showResults, setShowResults] = useState(true);
  const performSearch = debounce(async (query) => {
    setQueryResults({
      ...queryResults,
      loading: true,
      error: null,
    });
    try {
      const results = await searchForUsers(query);
      setQueryResults({
        loading: false,
        results: orderBy(results, "id"),
      });
    } catch (e) {
      console.error(e);
      setQueryResults({
        loading: false,
        results: [],
        error: true,
      });
    }
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
          top: "75px",
          maxHeight: "30vh",
          overflow: "scroll",
        }}
      >
        {queryResults.results
          .filter((r) => !filterFunction || filterFunction(r))
          .map((res) => (
            <ListGroup.Item
              action
              key={res.id}
              onClick={() => onClickUser(res)}
            >
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
            queryResults.error ? (
              <span className="text-danger">There was an error.</span>
            ) : queryResults.loading ? (
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
