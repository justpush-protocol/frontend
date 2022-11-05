import JustPushV1 from '@justpush/contracts/build/contracts/JustPushV1.json';

console.log("Using hardcoded shasta network. Change this in the code if you want to use mainnet");
const network = "2";
export class JustPushContract {
    private contract: any;
    private address = JustPushV1.networks[network].address;
    private abi = JustPushV1.abi;
    private tronweb: any;

    constructor(tronweb: any) {
        this.tronweb = tronweb;
    }

    private async getContract() {
        if (!this.contract) {
            this.contract = await this.tronweb.contract(this.abi, this.address);
        }
        return this.contract;
    }

    async createGroup( id: string, owner: string, data : {
        name: string;
        description: string;
        image: string;
        website: string;
    }) {
        const strData = JSON.stringify(data);
        const contract = await this.getContract();
        await contract.createGroup(id, owner, strData).send();
        const groupId = await contract.groupCount().call();
        return groupId.toNumber();
    }
}