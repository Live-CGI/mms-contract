import { ethers, run } from "hardhat";
// eslint-disable-next-line node/no-missing-import
import { sleep } from "../utils";
// eslint-disable-next-line
import { ERC1155TokenSKALE, ERC1155TokenSKALE__factory, } from "../typechain-types";

async function main() {
  const ERC1155TokenFactory = (await ethers.getContractFactory(
    "ERC1155TokenSKALE"
    // eslint-disable-next-line camelcase
  )) as any as ERC1155TokenSKALE__factory;

  console.log(ethers.utils.hexZeroPad(ethers.utils.hexValue(4), 32));

  const constructorArguments = [
    "https://bafybeif6iuokmmcuwj7jgscybx3gvlcwkb6ybspwcduivl7mbqmgmmxubi.ipfs.dweb.link/metadata/",
    "0xd2AAa00100000000000000000000000000000000",
    ethers.utils.hexZeroPad(ethers.utils.hexValue(4), 32),
  ];

  const ERC1155Token: ERC1155TokenSKALE = await (
    ERC1155TokenFactory as any
  ).deploy(...constructorArguments);
  await ERC1155Token.deployed();

  console.log("ERC1155 deployed:", ERC1155Token.address);
  console.log(`Pausing 3-4 blocks in order to verify Contract`);
  await sleep({ seconds: 15 * 4 });
  console.log(`Pause finished. Verifying Contract`);

  try {
    await run("verify:verify", {
      address: ERC1155Token.address,
      constructorArguments,
    });
    console.log("ERC1155 deployed and verified to:", ERC1155Token.address);
  } catch (err) {
    console.error("Error verifying Contract. Reason:", err);
  }

  console.log(`Contract deployed successfully`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
