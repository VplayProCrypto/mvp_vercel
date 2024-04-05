import { fetchMetadataOne } from "../utils/fetchAxieData";
import { getCollectionByName } from "../db/queries";
console.log("Hello via Bun!");
//console.log(await fetchMetadataOne());
//const axieMetadataOne = await fetchMetadataOne();

// update collection total supply with axies total

// insert into totals table

console.log(await getCollectionByName("cryptokitties"));
