import { AccountInterface } from "starknet";
import { Entity, getComponentValue } from "@dojoengine/recs";
import { uuid } from "@latticexyz/utils";
import { ClientComponents } from "./createClientComponents";
import { Direction, updatePositionWithDirection } from "../utils";
import {
    getEntityIdFromKeys,
    getEvents,
    setComponentsFromEvents,
} from "@dojoengine/utils";
import { ContractComponents } from "./generated/contractComponents";
import type { IWorld } from "./generated/generated";

export type SystemCalls = ReturnType<typeof createSystemCalls>;

export function createSystemCalls(
    { client }: { client: IWorld },
    contractComponents: ContractComponents,
    { Player, Game }: ClientComponents
) {
    const register_player = async (account: AccountInterface, name: string) => {
        // const entityId = getEntityIdFromKeys([
        //     BigInt(account.address),
        // ]) as Entity;

        // const positionId = uuid();
        // Position.addOverride(positionId, {
        //     entity: entityId,
        //     value: { player: BigInt(entityId), vec: { x: 10, y: 10 } },
        // });

        // const movesId = uuid();
        // Moves.addOverride(movesId, {
        //     entity: entityId,
        //     value: {
        //         player: BigInt(entityId),
        //         remaining: 100,
        //         last_direction: 0,
        //     },
        // });

        try {
            const { transaction_hash } = await client.lobby.register_player({
                account,
                name
            });

            console.log(
                await account.waitForTransaction(transaction_hash, {
                    retryInterval: 100,
                })
            );

            setComponentsFromEvents(
                contractComponents,
                getEvents(
                    await account.waitForTransaction(transaction_hash, {
                        retryInterval: 100,
                    })
                )
            );
        } catch (e) {
            console.log(e);

        } finally {
            // Position.removeOverride(positionId);
            // Moves.removeOverride(movesId);
        }
    };

    const choose_blobert = async (account: AccountInterface,
        blobert_1: number,
        blobert_2: number,
        blobert_3: number,
        blobert_4: number,
        blobert_5: number,
        blobert_6: number
    ) => {
        try {
            const { transaction_hash } = await client.lobby.choose_blobert({
                account,
                blobert_1,
                blobert_2,
                blobert_3,
                blobert_4,
                blobert_5,
                blobert_6
            });

            console.log(
                await account.waitForTransaction(transaction_hash, {
                    retryInterval: 100,
                })
            );

            setComponentsFromEvents(
                contractComponents,
                getEvents(
                    await account.waitForTransaction(transaction_hash, {
                        retryInterval: 100,
                    })
                )
            );
        } catch (e) {
            console.log(e);
        }
    }
    
    return {
        register_player,
        choose_blobert,
    };
}
