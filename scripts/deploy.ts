import hre, { ethers, run } from "hardhat";
// eslint-disable-next-line node/no-missing-import
import { sleep } from "../utils";
// eslint-disable-next-line
import { LiveCGIToken } from "../typechain-types";

async function main() {
  // console.log(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("Mainnet")));
  // console.log(
  //   ethers.utils.keccak256(ethers.utils.toUtf8Bytes("attractive-merope"))
  // );
  console.log(`Current network: ${hre.network.name}`);

  const LiveCGITokenFactory = await ethers.getContractFactory("LiveCGIToken");

  const constructorArguments = [
    "https://bafybeif6iuokmmcuwj7jgscybx3gvlcwkb6ybspwcduivl7mbqmgmmxubi.ipfs.dweb.link/metadata/",
  ];

  if (hre.network.name === "skaleTestnet") {
    constructorArguments.push(
      "0xd2AAa00100000000000000000000000000000000",
      ethers.utils.keccak256(ethers.utils.toUtf8Bytes("Mainnet"))
    );
  } else if (hre.network.name === "rinkeby") {
    constructorArguments.push(
      "0x656fb12abab353FB1875a4e3Dc4D70179CB85BA4",
      ethers.utils.keccak256(ethers.utils.toUtf8Bytes("attractive-merope")),
    );
  }

  const LiveCGIToken = (await LiveCGITokenFactory.deploy(
    ...constructorArguments
  )) as LiveCGIToken;
  await LiveCGIToken.deployed();

  console.log("LiveCGI Token deployed:", LiveCGIToken.address);
  console.log(`Pausing 3-4 blocks in order to verify Contract`);
  await sleep({ seconds: 15 * 4 });
  console.log(`Pause finished. Verifying Contract`);

  try {
    await run("verify:verify", {
      address: LiveCGIToken.address,
      constructorArguments,
    });
    console.log("ERC1155 deployed and verified to:", LiveCGIToken.address);
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
