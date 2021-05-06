import { merge, cloneDeep } from "lodash";
import { jsonToGraphQLQuery } from "json-to-graphql-query";
import queries from "./queries.json";

export const request = async (key, jsonQuery) => {
  jsonQuery = key
    ? merge(cloneDeep(queries[key]), cloneDeep(jsonQuery))
    : jsonQuery;

  const query =
    typeof jsonQuery === "string"
      ? jsonQuery
      : jsonToGraphQLQuery({ query: jsonQuery });
  const res = await fetch(
    "https://api.thegraph.com/subgraphs/name/balancer-labs/balancer-beta",
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    }
  );
  try {
    const { data } = await res.json();
    return data;
  } catch (e) {
    console.log(e);
    return Promise.reject(e);
  }
};
