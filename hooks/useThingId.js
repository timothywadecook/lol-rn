import React from "react";
import { thingsService } from "../services/feathersClient";

const getThingId = async (thing) => {
  const { category, api, api_id } = thing;
  const params = { category, api_id, api };

  const res = await thingsService.find({ query: params });
  if (res.total) {
    return res.data[0]._id;
  } else {
    const newThing = await thingsService.create(thing);
    return newThing._id;
  }
};

const useThingId = (thing) => {
  const [thingId, setThingId] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (!thingId) {
      if (thing._id) {
        setThingId(thing._id);
      } else if (thing.category && !loading) {
        setLoading(true);
        getThingId(thing)
          .then((id) => {
            setThingId(id);
            setLoading(false);
          })
          .catch((e) => {
            console.log(
              "Error getting thingId for ThingItemWithAddToList",
              e.message
            );
            setLoading(false);
          });
      }
    }
  }, [thing]);

  return thingId;
};

export default useThingId;
