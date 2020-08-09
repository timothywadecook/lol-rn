import React from "react";

export default function useCount(service, params) {
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    service
      .find({ query: { $limit: 0, ...params } })
      .then((res) => setCount(res.total));
  }, []);

  const increment = () => setCount(count + 1);

  const decrement = () => setCount(count - 1);

  return [count, increment, decrement];
}
