export type FragmentStatus = "locked" | "available" | "owned" | "featured";

export type Fragment = {
  id: string;
  index: number;
  name: string;
  status: FragmentStatus;
  tier: "Signal" | "Vault" | "Proof" | "Beacon";
  proofHash: string;
  ownedAt?: string;
};

export const fragments: Fragment[] = [
  {
    id: "01",
    index: 1,
    name: "Civic Shard",
    status: "owned",
    tier: "Signal",
    proofHash: "0x8b24a71c534a2a9b912c416ed4f19a56c72b44a40dbe5e68c6ac4e0e01000101",
    ownedAt: "2026-05-14 09:42 UTC"
  },
  {
    id: "02",
    index: 2,
    name: "Mint Relay",
    status: "owned",
    tier: "Signal",
    proofHash: "0x2ccadbd2b471baee51b2bb660016240f190e12d21f8ef6d6c4b224ad00010202",
    ownedAt: "2026-05-18 15:11 UTC"
  },
  {
    id: "03",
    index: 3,
    name: "Proof Window",
    status: "available",
    tier: "Proof",
    proofHash: "0xc84e2d11e4e3c28139fd049f825690352b181e44c2b7af71d19afc4300010303"
  },
  {
    id: "04",
    index: 4,
    name: "Split Anchor",
    status: "featured",
    tier: "Beacon",
    proofHash: "0xf59e0b340dc31264cc7d82711d9f3354d2ea720629126c68a4c76e9100010404"
  },
  {
    id: "05",
    index: 5,
    name: "Vault Plane",
    status: "locked",
    tier: "Vault",
    proofHash: "0x648e73a8f1f00d41220ef65adf771d25a6077ef66ca27511a9d8d7f00010505"
  },
  {
    id: "06",
    index: 6,
    name: "Owner Lane",
    status: "owned",
    tier: "Vault",
    proofHash: "0x65e7eb9374a7f2ab02fb7eaf4f222b6f817a0ce5411a8375281e17a00010606",
    ownedAt: "2026-05-24 18:03 UTC"
  },
  {
    id: "07",
    index: 7,
    name: "Claim Gate",
    status: "available",
    tier: "Signal",
    proofHash: "0x2563eb90757dc76ab539d272ef20257d888b77ad2c9336080ef9808f00010707"
  },
  {
    id: "08",
    index: 8,
    name: "Record Pulse",
    status: "locked",
    tier: "Proof",
    proofHash: "0xb58cc7bf30266c143fd479108e9dd5c47b001a2f19ad611af028f1a200010808"
  },
  {
    id: "09",
    index: 9,
    name: "Public Keyline",
    status: "owned",
    tier: "Beacon",
    proofHash: "0xe16cc1bc18b88f71eeb583ffbbdcfcf93f13305cbe77beea341c94500010909",
    ownedAt: "2026-05-29 08:27 UTC"
  },
  {
    id: "10",
    index: 10,
    name: "Grid Echo",
    status: "available",
    tier: "Vault",
    proofHash: "0x1430be3c46fd15974b5b20f4d3a9e232f0c70a4a6ff6b039031fdd1000101010"
  },
  {
    id: "11",
    index: 11,
    name: "Signal Reed",
    status: "locked",
    tier: "Signal",
    proofHash: "0xa9c680ae03410121b8bc72bed4c187f82f0dbf1da67397df998b11300011111"
  },
  {
    id: "12",
    index: 12,
    name: "Final Cell",
    status: "locked",
    tier: "Proof",
    proofHash: "0xeda079c43b102faa24c947d48e5f1063ccce3a65889cc8df497b22800011212"
  }
];

export const publicGalleryRecords = fragments.map((fragment, offset) => ({
  ...fragment,
  wallet: `0x${(offset + 11).toString(16).padStart(2, "0")}a5...${(7400 + offset).toString(16)}`,
  recordId: `REC-${String(offset + 1).padStart(3, "0")}`
}));
