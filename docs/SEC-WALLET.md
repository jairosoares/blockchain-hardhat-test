# Levanta nó teste da blockchain
npx hardhat node

# Faz deploy do contrato (Endereço do contrato implantado sempre é o mesmo no Hardhat Network localhost)
npx hardhat run scripts/secwallet-deploy.ts --network localhost
npx hardhat run scripts/secwallet-deploy.ts --network sepolia

# Onde fica (pasta) o ABI do contrato que foi feito deploy
./artifacts/contract/<NOME_DO_CONTRATO>.sol

# Abre console pra interagir
npx hardhat console --network localhost

# Importe ethers
const { ethers } = require("hardhat");

# Endereço do contrato implantado Hardhat Network
const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

# Endereço do contrato implantado Sepolia
const contractAddress = "0x3596948f42ad6CF2778f26A45717556Aa18FDb36";
# Consultando o contrato que foi feito deploy com Sepolia Etherscan
https://sepolia.etherscan.io/address/0x3596948f42ad6CF2778f26A45717556Aa18FDb36
# Saldo na rede Sepolia Account ETH1 (0xEd3097B280eA1aa9F2A33A307E72467e3121076C)
0.8826 SepoliaETH


# Obtenha uma instância do contrato
const SecWallet = await ethers.getContractFactory("SecWallet");
const secWallet = await SecWallet.attach(contractAddress);

# Obtenha o proprietário
const [owner] = await ethers.getSigners();
console.log("Owner address:", owner.address);

# Realize uma operação de depósito
await secWallet.deposit({ value: ethers.parseEther("2") });

# Verifique o saldo de uma conta
const balance = await secWallet.balances(owner.address);
console.log("Balance:", ethers.formatEther(balance));

# Realize uma operação de saque
await secWallet.withdraw(ethers.parseEther("1"));

## ESCUTANDO OS DEPOSITOS E OS SAQUES EM OUTRO CONSOLE!
npx hardhat console --network localhost

# Substitua "SecWallet" e "networkName" pelo nome do contrato e o nome da rede em que o contrato está implantado
const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

# Obtenha uma instância do contrato
const SecWallet = await ethers.getContractFactory("SecWallet");
const secWallet = await SecWallet.attach(contractAddress);

# Registre um ouvinte de eventos para o evento "Deposit"
secWallet.on("Deposit", (account, amount) => {
    console.log("Deposit event:", account, amount.toString());
});

# Registre um ouvinte de eventos para o evento "Withdrawal"
secWallet.on("Withdrawal", (account, amount) => {
    console.log("Withdrawal event:", account, amount.toString());
});



event Deposit(address indexed account, uint amount);
event Withdrawal(address indexed account, uint amount);
