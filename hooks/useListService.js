import React from "react";

export default function useListService(service, params) {
  const [data, setData] = React.useState([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const refresh = async () => {
    if (!refreshing) {
      setRefreshing(true);
      try {
        const datadata = await service.find({
          query: {
            $limit: 10,
            $sort: { createdAt: -1 },
            ...params,
          },
        });
        setData(datadata.data);
      } catch (error) {
        console.log("Error using list service refresh", service, error);
      }
      setRefreshing(false);
    }
  };

  const fetchMore = async () => {
    if (!loading) {
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
        setData([...data, ...datadata.data]);
      } catch (error) {
        console.log("Error using list service fetchmore", service, error);
      }
      setLoading(false);
    }
  };

  React.useEffect(() => {
    refresh();
  }, []);

  return [data, refresh, refreshing, fetchMore, loading];
}
