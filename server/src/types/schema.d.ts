declare namespace Schema {
  interface NetworkInfo {
    chain: string;
    nodeName: string;
    nodeVersion: string;
  }

  interface Block {
    createdAt: string;
    blockHeight: number;
    parentHash: string;
  }

  interface NetworkSnapshot {
    createdAt: string;
    nodeCount: number;
  }
}