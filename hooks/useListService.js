import React from "react";

export default function useListService(service, params) {
  const [data, setData] = React.useState([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [moreAvailable, setMoreAvailable] = React.useState(true);
  const [total, setTotal] = React.useState(0);

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
        setMoreAvailable(datadata.total > datadata.data.length);
        setTotal(datadata.total);
      } catch (error) {
        console.log("Error using list service refresh", service, error);
        setMoreAvailable(false);
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
        setMoreAvailable(datadata.total > datadata.skip);
      } catch (error) {
        console.log("Error using list service fetchmore", service, error);
        setMoreAvailable(false);
      }
      setLoading(false);
    }
  };

  React.useEffect(() => {
    refresh();
  }, [params && params.category]);

  return [data, refresh, refreshing, fetchMore, loading, moreAvailable, total];
}
