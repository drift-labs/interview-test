import { DriftClient, EventSubscriber, Wallet } from "@drift-labs/sdk";
import { Connection, Keypair } from "@solana/web3.js";

async function main() {
  const connection = new Connection('https://api.mainnet-beta.solana.com');
  const wallet = new Wallet(new Keypair());
  const driftClient = new DriftClient({ 
    connection,
    wallet,
    accountSubscription: {
      type: 'websocket',
    }
  });
  const eventSubscriber = new EventSubscriber(connection, driftClient.program, {
    maxTx: 8192,
    maxEventsPerType: 4096,
    orderBy: 'client',
    orderDir: 'desc',
    commitment: 'confirmed',
    logProviderConfig: {
      type: 'websocket',
    },
  
  })
  await eventSubscriber.subscribe()
  eventSubscriber.eventEmitter.on('newEvent', (event) => {
    console.log(event)
  });
}
  

main();