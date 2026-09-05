import type { Tower } from "./towers";

export interface Subprocess {
  id: string;
  towerCode: Tower["code"];
  deliveryCentreId: string;
  name: string;
}

// Demo reference-data contract. Populate from SQL/API reference data in the
// company deployment. Sub-process options should be filtered by tower and delivery centre.
export const subprocesses: Subprocess[] = [];
