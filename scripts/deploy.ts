import { ethers, run } from "hardhat";
// eslint-disable-next-line node/no-missing-import
import { sleep } from "../utils";
// eslint-disable-next-line
import { ERC1155Token__factory } from "../typechain-types";

async function main() {
  const ERC1155TokenFactory = (await ethers.getContractFactory(
    "ERC1155Token"
    // eslint-disable-next-line camelcase
  )) as any as ERC1155Token__factory;

  const ERC1155Token = await ERC1155TokenFactory.deploy(
    "https://bafybeif6iuokmmcuwj7jgscybx3gvlcwkb6ybspwcduivl7mbqmgmmxubi.ipfs.dweb.link/metadata/"
  );
  await ERC1155Token.deployed();

  console.log("ERC1155 deployed:", ERC1155Token.address);
  console.log(`Pausing 3-4 blocks in order to verify Contract`);
  await sleep({ seconds: 15 * 5 });
  console.log(`Pause finished. Verifying Contract`);

  try {
    await run("verify:verify", {
      address: ERC1155Token.address,
      constructorArguments: [
        "https://bafybeif6iuokmmcuwj7jgscybx3gvlcwkb6ybspwcduivl7mbqmgmmxubi.ipfs.dweb.link/metadata/",
      ],
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
