export interface Tower {
  code: "PTP" | "RTR" | "DFS";
  name: string;
}

// Demo reference-data source. In the company version, replace this module
// with a SQL/API lookup so the tower list is never hardcoded in the UI.
export const towers: Tower[] = [
  { code: "PTP", name: "Procure to Pay" },
  { code: "RTR", name: "Record to Report" },
  { code: "DFS", name: "Disney Financial Services" },
];
