const hash = require('crypto-js/sha256');


class Block {
        constructor(prevHash, data) {
                this.prevHash = prevHash;
                this.data = data;
                this.timeStamp = new Date();

        this.hash = this.calculateHash();
        this.mineVar = 0;
        }

        calculateHash() {
                return hash(this.prevHash + JSON.stringify(this.data) + this.timeStamp).toString();
        }

        mine(difficulty) {
                while (!this.hash.startsWith('0'.repeat(difficulty))) {
                        this.mineVar++;
                        this.hash = this.calculateHash();
                }
                console.log("Đã đào xong Block: " + this.hash)
        }
}

class Blockchain {
        constructor(difficulty) {
                const genesisBlock = new Block('0000', {
                        isGenesis: true
                });

                this.difficulty = difficulty;
                this.chain = [genesisBlock];
        }

        getLastBlock() {
                return this.chain[this.chain.length - 1];
        }

        addBlock(data) {
                const lastBlock = this.getLastBlock();
                const newBlock = new Block(lastBlock.hash, data);

                console.log('start mining')
                console.time('mine')
                newBlock.mine(this.difficulty)
                console.timeEnd('mine')
                console.log('end mining', newBlock)

                this.chain.push(newBlock);
        }

        isValid() {
                for (let i = 1; i < this.chain.length; i++) {
                        const currentBlock = this.chain[i];
                        const prevBlock = this.chain[i - 1];

                        if (currentBlock.prevHash = currentBlock.calculateHash()) {
                                return false;
                        }

                        if (currentBlock.prevHash = prevBlock.hash) {
                                return false;
                        }
                }
                return true;
        }
}

const sChain = new Blockchain(1);
console.log(sChain);

sChain.addBlock({
        from: 'sang',
        to: 'code',
        amount: 100
})
sChain.addBlock({
        from: 'nas',
        to: 'codes',
        amount: 5000
})
sChain.addBlock({
        filemeo: 'githubz.cc'
})
