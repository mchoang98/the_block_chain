const { SHA256 } = require('crypto-js');

class Block {
  constructor(index, previousHash, timestamp, data, hash) {
    this.index = index;
    this.previousHash = previousHash.toString();
    this.timestamp = timestamp;
    this.data = data;
    this.hash = hash.toString();
  }
  
  calculateHash() {
    return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
  }
}

class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
  }
  
  createGenesisBlock() {
    return new Block(0, "0", Date.now(), "Genesis block", "0");
  }
  
  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }
  
  addBlock(newBlock) {
    newBlock.previousHash = this.getLatestBlock().hash;
    newBlock.hash = newBlock.calculateHash();
    this.chain.push(newBlock);
  }

  deleteBlock(blockIndex) {
    this.chain.splice(blockIndex, 1);
  }
  
  isChainValid() {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];
      
      if (currentBlock.hash !== currentBlock.calculateHash()) {
        return false;
      }
      
      if (currentBlock.previousHash !== previousBlock.hash) {
        return false;
      }
    }
    
    return true;
  }
}

var blockchain = new Blockchain();

var the_block = blockchain.getLatestBlock();
console.log("the block", the_block)

var newBlock = new Block(1, blockchain.getLatestBlock().hash, Date.now(), "This is a new block", "");
var newBlock1 = new Block(2, blockchain.getLatestBlock().hash, Date.now(), "This is a new block", "");
var newBlock2 = new Block(3, blockchain.getLatestBlock().hash, Date.now(), "This is a new block", "");
var newBlock3 = new Block(3, blockchain.getLatestBlock().hash, Date.now(), "This is a new block", "");
blockchain.addBlock(newBlock);
blockchain.addBlock(newBlock1);
blockchain.addBlock(newBlock2);
blockchain.addBlock(newBlock3);
    console.log(blockchain)

//  blockchain.deleteBlock(2);
   console.log(blockchain)


// check valid block 
if(blockchain.isChainValid()){
  console.log("block chain Hop le")
}else{
  console.log("block chain khong hop le")
}
