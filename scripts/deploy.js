async function main() {
    const TransferGSN = await ethers.getContractFactory("TokenTransfer");
    const gasPrice = await TransferGSN.signer.getGasPrice();
    console.log(`Current gas price: ${gasPrice}`);
    const estimatedGas = await TransferGSN.signer.estimateGas(
     TransferGSN.getDeployTransaction()
    );
    console.log(`Estimated gas: ${estimatedGas}`);
    const deploymentPrice = gasPrice.mul(estimatedGas);
    const deployerBalance = await TransferGSN.signer.getBalance();
    console.log(`Deployer balance:  ${ethers.utils.formatEther(deployerBalance)}`);
    console.log( `Deployment price:  ${ethers.utils.formatEther(deploymentPrice)}`);
    if (Number(deployerBalance) < Number(deploymentPrice)) {
       throw new Error("You dont have enough balance to deploy.");
    }
    // Start deployment, returning a promise that resolves to a contract object
    const myNFT = await TransferGSN.deploy();
    await myNFT.deployed();
    console.log("Contract deployed to address:", myNFT.address);
    }
    main().then(() => process.exit(0)).catch((error) => {
    console.error("Error:", error);
    process.exit(1);
    });
    