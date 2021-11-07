import {SubstrateExtrinsic} from "@subql/types";
import {RemarkEntity} from "../types";

export async function handleCall(extrinsic: SubstrateExtrinsic): Promise<void> {
    const record = await RemarkEntity.get(extrinsic.block.block.header.hash.toString());
    record.remark = extrinsic.extrinsic.args["_remark"]
    await record.save();
}
