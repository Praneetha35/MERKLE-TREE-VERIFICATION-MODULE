const { MerkleTree } = require("merkletreejs");
const SHA256 = require("crypto-js/sha256");

//Hashing the transactions
let transactions = ["tx1", "tx2", "tx3", "tx4", "tx5", "tx6"].map((x) =>
  SHA256(x)
);
//Creating the Merkle tree
let merkleTree = new MerkleTree(transactions, SHA256);

//Getting the root of the Merkle tree
const root = merkleTree.getRoot().toString("hex");

//To verify a valid transaction
let transaction = SHA256("tx3");
let proof = merkleTree.getProof(transaction);
console.log(
  "This transaction is ",
  merkleTree.verify(proof, transaction, root) ? "valid" : "invalid"
);

//To show merkle tree
console.log(merkleTree.toString());

//To verify an invalid transaction
transactions = ["tx1", "tx2", "tx3", "tx9", "tx5", "tx6"].map((x) => SHA256(x));
merkleTree = new MerkleTree(transactions, SHA256);
transaction = SHA256("x");
proof = merkleTree.getProof(transaction);
console.log(
  "This transaction is ",
  merkleTree.verify(proof, transaction, root) ? "valid" : "invalid"
);
//To show merkle tree
console.log(merkleTree.toString());

//OUTPUT FOR VALID TRANSACTION

//This transaction is  valid
//└─ 0cd3a4f292616ec326320f9bada830817a0ac7439b192e8b1891cec424ecb3d3
//   ├─ ea59a369466be42d1a4783f09ae0721a5a157d6dba9c4b053d407b5a4b9af145
//   │  ├─ bbea820f07f7f89aeea1ab4a354ecea39f2f72accd05c64371522ee371cd0c48
//   │  │  ├─ 709b55bd3da0f5a838125bd0ee20c5bfdd7caba173912d4281cae816b79a201b
//   │  │  └─ 27ca64c092a959c7edc525ed45e845b1de6a7590d173fd2fad9133c8a779a1e3
//   │  └─ 5709445d1034999688c7261a7c9cd07b521fcd02b97c71fb30ca85b9104487ca
//   │     ├─ 1f3cb18e896256d7d6bb8c11a6ec71f005c75de05e39beae5d93bbd1e2c8b7a9
//   │     └─ 41b637cfd9eb3e2f60f734f9ca44e5c1559c6f481d49d6ed6891f3e9a086ac78
//   └─ 5091b8ec25633ecdc23c8d9b266722556d569daa0e38642d38ab240c08e6b624
//      └─ 5091b8ec25633ecdc23c8d9b266722556d569daa0e38642d38ab240c08e6b624
//         ├─ a8c0cce8bb067e91cf2766c26be4e5d7cfba3d3323dc19d08a834391a1ce5acf
//         └─ d20a624740ce1b7e2c74659bb291f665c021d202be02d13ce27feb067eeec837

//OUTPUT FOR INVALID TRANSACTION

//This transaction is  invalid
//└─ d7f8d60c4a8da9b8c2a12fe8fb011b4a28c33f1a83f10909d5a3a37140e1268c
//├─ 4ad5ffc4405b93445acb4b692a083640a260343074f5dbd9edd830db706a37b1
//│  ├─ bbea820f07f7f89aeea1ab4a354ecea39f2f72accd05c64371522ee371cd0c48
//│  │  ├─ 709b55bd3da0f5a838125bd0ee20c5bfdd7caba173912d4281cae816b79a201b
//│  │  └─ 27ca64c092a959c7edc525ed45e845b1de6a7590d173fd2fad9133c8a779a1e3
//│  └─ 38df1a114947ae46b0c33ee20ccb76c4b82614ef3d45b785972c18b588954a18
//│     ├─ 1f3cb18e896256d7d6bb8c11a6ec71f005c75de05e39beae5d93bbd1e2c8b7a9
//│     └─ 3e812f40cd8e4ca3a92972610409922dedf1c0dbc68394fcb1c8f188a42655e2
//└─ 5091b8ec25633ecdc23c8d9b266722556d569daa0e38642d38ab240c08e6b624
//   └─ 5091b8ec25633ecdc23c8d9b266722556d569daa0e38642d38ab240c08e6b624
//      ├─ a8c0cce8bb067e91cf2766c26be4e5d7cfba3d3323dc19d08a834391a1ce5acf
//      └─ d20a624740ce1b7e2c74659bb291f665c021d202be02d13ce27feb067eeec837
