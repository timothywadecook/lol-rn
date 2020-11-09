import React from "react";
import { useDispatch } from "react-redux";

export default function useListService(
  service,
  params,
  dependancies = [],
  alwaysMounted = false,
  successAction = null
) {
  const dispatch = useDispatch();
  const isMounted = React.useRef(true);
  const [data, setData] = React.useState([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [moreAvailable, setMoreAvailable] = React.useState(true);
  const [total, setTotal] = React.useState(0);

  const refresh = async () => {
    if (isMounted.current && !refreshing) {
      setRefreshing(true);
      try {
        const datadata = await service.find({
          query: {
            $limit: 10,
            $sort: { createdAt: -1 },
            ...params,
          },
        });
        if (isMounted.current) {
          if (successAction) {
            dispatch(successAction(datadata.data));
          }
          setData(datadata.data);
          setMoreAvailable(datadata.total > datadata.data.length);
          setTotal(datadata.total);
        }
      } catch (error) {
        console.log("Error using list service refresh", service, error);
        if (isMounted.current) {
          setMoreAvailable(false);
        }
      }
      if (isMounted.current) {
        setRefreshing(false);
      }
    }
  };

  const fetchMore = async () => {
    if (isMounted.current && !loading && moreAvailable) {
      setLoading(true);
      try {
        const datadata = await service.find({
          query: {
            $limit: 10,
            $sort: { createdAt: -1 },
            $skip: data.length,
            ...params,
          },
        });
        if (isMounted.current) {
          if (successAction) {
            dispatch(successAction(datadata.data));
          }
          setData([...data, ...datadata.data]);
          setMoreAvailable(datadata.total > datadata.skip);
        }
      } catch (error) {
        console.log("Error using list service fetchmore", service, error);
        if (isMounted.current) {
          setMoreAvailable(false);
        }
      }
      if (isMounted.current) {
        setLoading(false);
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

  return {
    data,
    refresh,
    refreshing,
    fetchMore,
    loading,
    moreAvailable,
    total,
  };
}
