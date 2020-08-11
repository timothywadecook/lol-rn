import React from "react";
import { useSelector } from "react-redux";

export default function useService(service, params) {
  const [data, setData] = React.useState([]);
  const creator = useSelector((state) => state.user._id);

  const getData = async () => {
    try {
      const datadata = await service.find({
        query: {
          $limit: 1000,
          $sort: { createdAt: -1 },
          ...params,
        },
      });
      setData(datadata.data);
    } catch (error) {
      console.log("Error using service", service, error);
    }
  };
  const handleCreate = (item) => {
    setData((data) => [item, ...data]);
  };

  React.useEffect(() => {
    getData();
    service.on("created", handleCreate);

    return () => service.removeListener("created", handleCreate);
  }, []);

  return data;
}
