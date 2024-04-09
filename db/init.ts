//Script to run manually to initialize the database

import { getCollectionEventsAll } from "@/backend/apis/opensea/utils";
import { AssetEvent, Events } from "@/types/opensea/stats";
import { insertAssetEvents } from "./queries";

export const initializeAssetEvents = async (
  collectionToAdd: string,
  nextOption?: string
) => {
  const after = Math.floor(Date.now() / 1000) - 2592000;
  const before = Math.floor(Date.now() / 1000);
  let events: Events;
  let next = "";
  if (nextOption) {
    next = nextOption;
  }
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
