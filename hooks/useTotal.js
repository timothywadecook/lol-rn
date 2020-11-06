import React from "react";

export default function useListService(
  service,
  params,
  dependancies = [],
  alwaysMounted = false
) {
  const isMounted = React.useRef(true);
  const [total, setTotal] = React.useState(0);

  const refresh = async () => {
    if (isMounted.current) {
      try {
        const datadata = await service.find({
          query: {
            $limit: 0,
            ...params,
          },
        });
        if (isMounted.current) {
          setTotal(datadata.total);
        }
      } catch (error) {
        console.log("Error using list service refresh", service, error);
      }
    }
  };

  React.useEffect(() => {
    refresh();
    return () => {
      if (alwaysMounted === false) {
        isMounted.current = false;
      }
    };
  }, dependancies);

  return total
}
