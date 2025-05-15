import { Rpc, createRpc } from "@lightprotocol/stateless.js";

export const RPC_ENDPOINT = process.env.NEXT_PUBLIC_HELIUM_RPC_URL;
export const connection: Rpc = createRpc(
  RPC_ENDPOINT,
);
