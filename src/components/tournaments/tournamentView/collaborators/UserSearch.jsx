import React, { useState } from "react";
import debounce from "lodash/debounce";

import { searchForUsers } from "@api/user";
import { Form, Text } from "@components/common/forms";

const initialValues = {
  query: "",
};

const UserSearch = ({}) => {
  const [queryResults, setQueryResults] = useState({
    loading: false,
    results: [],
  });
  const initiateSearch = debounce(async (query) => {
    const results = await searchForUsers(query);
    console.log(results);
  }, 500);
  const onChange = (value) => {
    if (value.trim().length >= 3) {
      initiateSearch(value.trim());
    }
  };
  return (
    <Form name="UserSearch" initialValues={initialValues} customCtaButtons>
      <Text name="query" label="Add people" onChange={onChange} />
    </Form>
  );
};

export default UserSearch;
