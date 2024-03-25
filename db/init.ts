//Script to run manually to initialize the database

import { getCollectionEventsAll } from "@/app/api/opensea/utils";
import { AssetEvent, Events } from "@/types/stats";
import { insertAssetEvents } from "./inserts";

export const initializeAssetEvents = async (collectionToAdd: string) => {
  const after = Math.floor(Date.now() / 1000) - 2592000;
  const before = Math.floor(Date.now() / 1000);
  let events: Events;
  let next = "";
  let i = 0;

  events = await getCollectionEventsAll(collectionToAdd, before, after);
  await insertAssetEvents(events.asset_events);
  next = events.next;
  console.log(`Adding events ${i++}`);
  console.log("next", next);

  while (next != "") {
    console.log(`Adding events ${i++}`);
    console.log("next", next);
    events = await getCollectionEventsAll(collectionToAdd, before, after, next);
    await insertAssetEvents(events.asset_events);
    next = events.next;
  }
};
