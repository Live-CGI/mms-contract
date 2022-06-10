// contracts/GameItem.sol
// SPDX-License-Identifier: MIT
pragma solidity 0.8.7;

import "@openzeppelin/contracts/token/ERC1155/presets/ERC1155PresetMinterPauser.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

interface MessageProxy {
    function postOutgoingMessage(
        bytes32 targetChainHash,
        address targetContract,
        bytes calldata data
    ) external;
}

contract ERC1155TokenETH is ERC1155PresetMinterPauser, ERC1155Supply {
    using Strings for uint256;

    string internal _baseUri;
    MessageProxy public messageProxy;
    bytes32 public targetChainHash;
    address public targetContract;

    constructor(
        string memory uri_,
        address _messageProxy,
        bytes32 _targetChainHash
    ) ERC1155PresetMinterPauser(uri_) {
        _baseUri = uri_;
        messageProxy = MessageProxy(_messageProxy);
        targetChainHash = _targetChainHash;
    }

    function uri(uint256 _id)
        public
        view
        virtual
        override
        returns (string memory)
    {
        return string(abi.encodePacked(_baseUri, _id.toString()));
    }

    function setURI(string memory newuri) external {
        require(
            hasRole(DEFAULT_ADMIN_ROLE, _msgSender()),
            "ERC1155Token: must have admin role"
        );
        _setURI(newuri);
        _baseUri = newuri;
    }

    function setMessageProxy(address _messageProxy) external {
        require(
            hasRole(DEFAULT_ADMIN_ROLE, _msgSender()),
            "ERC1155Token: must have admin role"
        );
        messageProxy = MessageProxy(_messageProxy);
    }

    function setTargetChainHash(bytes32 _targetChainHash) external {
        require(
            hasRole(DEFAULT_ADMIN_ROLE, _msgSender()),
            "ERC1155Token: must have admin role"
        );
        targetChainHash = _targetChainHash;
    }

    function setTargetContract(address _targetContract) external {
        require(
            hasRole(DEFAULT_ADMIN_ROLE, _msgSender()),
            "ERC1155Token: must have admin role"
        );
        targetContract = _targetContract;
    }

    function bridgeToSKALE(
        address from,
        address to,
        uint256 id,
        uint256 amount,
        bytes memory data
    ) external {
        require(
            from == _msgSender() || isApprovedForAll(from, _msgSender()),
            "ERC1155: caller is not owner nor approved"
        );

        _burn(from, id, amount);

        bytes memory bridgedData = abi.encode(to, id, amount, data);

        messageProxy.postOutgoingMessage(
            targetChainHash,
            targetContract,
            bridgedData
        );
    }

    function postMessage(
        bytes32 schainHash,
        address sender,
        bytes calldata bridgedData
    ) external returns (address) {
        require(
            address(messageProxy) == _msgSender(),
            "ERC1155Token: Invalid Message Proxy"
        );
        require(
            schainHash == targetChainHash,
            "ERC1155Token: Invalid source chain"
        );

        (address to, uint256 id, uint256 amount, bytes memory data) = abi
            .decode(bridgedData, (address, uint256, uint256, bytes));

        _mint(to, id, amount, data);

        return sender;
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        virtual
        override(ERC1155, ERC1155PresetMinterPauser)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    function _beforeTokenTransfer(
        address operator,
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) internal virtual override(ERC1155PresetMinterPauser, ERC1155Supply) {
        require(!paused(), "ERC1155Pausable: token transfer while paused");
        ERC1155Supply._beforeTokenTransfer(
            operator,
            from,
            to,
            ids,
            amounts,
            data
        );
    }
}
