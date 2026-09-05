import type { Tower } from "./towers";

export interface DeliveryCentre {
  id: string;
  towerCode: Tower["code"];
  name: string;
}

// Demo reference-data contract. Populate this list from SQL/API reference data
// for the company deployment; do not hardcode production delivery-centre values in UI components.
export const deliveryCentres: DeliveryCentre[] = [];
