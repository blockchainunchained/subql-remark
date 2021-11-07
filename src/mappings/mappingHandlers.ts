import {SubstrateExtrinsic} from "@subql/types";
import {RemarkEntity} from "../types";

export async function handleCall(extrinsic: SubstrateExtrinsic): Promise<void> {
    const record = await RemarkEntity.get(extrinsic.block.block.header.hash.toString());
    if(extrinsic.extrinsic.isSigned){
        const index = extrinsic.extrinsic.args.findIndex(args => args.toString() === "_remark");
        if (index >= 0) {
            record.remark = extrinsic.extrinsic.args[index].toString();
            await record.save();
        }
    }
}
