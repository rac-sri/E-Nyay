//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.6.0;

/**
 * @dev Wrappers over Solidity's arithmetic operations with added overflow
 * checks.
 *
 * Arithmetic operations in Solidity wrap on overflow. This can easily result
 * in bugs, because programmers usually assume that an overflow raises an
 * error, which is the standard behavior in high level programming languages.
 * `SafeMath` restores this intuition by reverting the transaction when an
 * operation overflows.
 *
 * Using this library instead of the unchecked operations eliminates an entire
 * class of bugs, so it's recommended to use it always.
 */
library SafeMath {
    /**
     * @dev Returns the addition of two unsigned integers, reverting on
     * overflow.
     *
     * Counterpart to Solidity's `+` operator.
     *
     * Requirements:
     *
     * - Addition cannot overflow.
     */
    function add(uint256 a, uint256 b) internal pure returns (uint256) {
        uint256 c = a + b;
        require(c >= a, "SafeMath: addition overflow");

        return c;
    }

    /**
     * @dev Returns the subtraction of two unsigned integers, reverting on
     * overflow (when the result is negative).
     *
     * Counterpart to Solidity's `-` operator.
     *
     * Requirements:
     *
     * - Subtraction cannot overflow.
     */
    function sub(uint256 a, uint256 b) internal pure returns (uint256) {
        return sub(a, b, "SafeMath: subtraction overflow");
    }

    /**
     * @dev Returns the subtraction of two unsigned integers, reverting with custom message on
     * overflow (when the result is negative).
     *
     * Counterpart to Solidity's `-` operator.
     *
     * Requirements:
     *
     * - Subtraction cannot overflow.
     */
    function sub(
        uint256 a,
        uint256 b,
        string memory errorMessage
    ) internal pure returns (uint256) {
        require(b <= a, errorMessage);
        uint256 c = a - b;

        return c;
    }

    /**
     * @dev Returns the multiplication of two unsigned integers, reverting on
     * overflow.
     *
     * Counterpart to Solidity's `*` operator.
     *
     * Requirements:
     *
     * - Multiplication cannot overflow.
     */
    function mul(uint256 a, uint256 b) internal pure returns (uint256) {
        // Gas optimization: this is cheaper than requiring 'a' not being zero, but the
        // benefit is lost if 'b' is also tested.
        // See: https://github.com/OpenZeppelin/openzeppelin-contracts/pull/522
        if (a == 0) {
            return 0;
        }

        uint256 c = a * b;
        require(c / a == b, "SafeMath: multiplication overflow");

        return c;
    }

    /**
     * @dev Returns the integer division of two unsigned integers. Reverts on
     * division by zero. The result is rounded towards zero.
     *
     * Counterpart to Solidity's `/` operator. Note: this function uses a
     * `revert` opcode (which leaves remaining gas untouched) while Solidity
     * uses an invalid opcode to revert (consuming all remaining gas).
     *
     * Requirements:
     *
     * - The divisor cannot be zero.
     */
    function div(uint256 a, uint256 b) internal pure returns (uint256) {
        return div(a, b, "SafeMath: division by zero");
    }

    /**
     * @dev Returns the integer division of two unsigned integers. Reverts with custom message on
     * division by zero. The result is rounded towards zero.
     *
     * Counterpart to Solidity's `/` operator. Note: this function uses a
     * `revert` opcode (which leaves remaining gas untouched) while Solidity
     * uses an invalid opcode to revert (consuming all remaining gas).
     *
     * Requirements:
     *
     * - The divisor cannot be zero.
     */
    function div(
        uint256 a,
        uint256 b,
        string memory errorMessage
    ) internal pure returns (uint256) {
        require(b > 0, errorMessage);
        uint256 c = a / b;
        // assert(a == b * c + a % b); // There is no case in which this doesn't hold

        return c;
    }

    /**
     * @dev Returns the remainder of dividing two unsigned integers. (unsigned integer modulo),
     * Reverts when dividing by zero.
     *
     * Counterpart to Solidity's `%` operator. This function uses a `revert`
     * opcode (which leaves remaining gas untouched) while Solidity uses an
     * invalid opcode to revert (consuming all remaining gas).
     *
     * Requirements:
     *
     * - The divisor cannot be zero.
     */
    function mod(uint256 a, uint256 b) internal pure returns (uint256) {
        return mod(a, b, "SafeMath: modulo by zero");
    }

    /**
     * @dev Returns the remainder of dividing two unsigned integers. (unsigned integer modulo),
     * Reverts with custom message when dividing by zero.
     *
     * Counterpart to Solidity's `%` operator. This function uses a `revert`
     * opcode (which leaves remaining gas untouched) while Solidity uses an
     * invalid opcode to revert (consuming all remaining gas).
     *
     * Requirements:
     *
     * - The divisor cannot be zero.
     */
    function mod(
        uint256 a,
        uint256 b,
        string memory errorMessage
    ) internal pure returns (uint256) {
        require(b != 0, errorMessage);
        return a % b;
    }
}

interface IERC20 {
    /**
     * @dev Returns the amount of tokens in existence.
     */
    function totalSupply() external view returns (uint256);

    /**
     * @dev Returns the amount of tokens owned by `account`.
     */
    function balanceOf(address account) external view returns (uint256);

    /**
     * @dev Moves `amount` tokens from the caller's account to `recipient`.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * Emits a {Transfer} event.
     */
    function transfer(address recipient, uint256 amount)
        external
        returns (bool);

    /**
     * @dev Returns the remaining number of tokens that `spender` will be
     * allowed to spend on behalf of `owner` through {transferFrom}. This is
     * zero by default.
     *
     * This value changes when {approve} or {transferFrom} are called.
     */
    function allowance(address owner, address spender)
        external
        view
        returns (uint256);

    /**
     * @dev Sets `amount` as the allowance of `spender` over the caller's tokens.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * IMPORTANT: Beware that changing an allowance with this method brings the risk
     * that someone may use both the old and the new allowance by unfortunate
     * transaction ordering. One possible solution to mitigate this race
     * condition is to first reduce the spender's allowance to 0 and set the
     * desired value afterwards:
     * https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729
     *
     * Emits an {Approval} event.
     */
    function approve(address spender, uint256 amount) external returns (bool);

    /**
     * @dev Moves `amount` tokens from `sender` to `recipient` using the
     * allowance mechanism. `amount` is then deducted from the caller's
     * allowance.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * Emits a {Transfer} event.
     */
    function transferFrom(
        address sender,
        address recipient,
        uint256 amount
    ) external returns (bool);

    /**
     * @dev Emitted when `value` tokens are moved from one account (`from`) to
     * another (`to`).
     *
     * Note that `value` may be zero.
     */
    event Transfer(address indexed from, address indexed to, uint256 value);

    /**
     * @dev Emitted when the allowance of a `spender` for an `owner` is set by
     * a call to {approve}. `value` is the new allowance.
     */
    event Approval(
        address indexed owner,
        address indexed spender,
        uint256 value
    );
}

interface IAaveLendingPoolAddressesProvider {
    function getLendingPool() external view returns (address);

    function getLendingPoolCore() external view returns (address payable);
}

interface IAaveLendingPool {
    function deposit(
        address _reserve,
        uint256 _amount,
        uint16 _referralCode
    ) external payable;
}

interface IAToken {
    function redeem(uint256 _amount) external;
    function redirectInterestStream(address _to) external;
    
    function underlyingAssetAddress() external returns (address);
}

contract Court {
    using SafeMath for uint;
    
    address public owner;
    modifier onlyOwner() {
        if (msg.sender != owner) {
            revert();
        }
        _;
    }
    
    IAaveLendingPoolAddressesProvider
        private constant lendingPoolAddressProvider = IAaveLendingPoolAddressesProvider(
        0x1c8756FD2B28e9426CDBDcC7E3c4d64fa9A54728
    );
    IAToken aETH = IAToken(0x2433A1b6FcF156956599280C3Eb1863247CFE675);
    address ETH = 0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE;
    uint256 courtFees = 5000000000000000;                      // 0.005 ETH in wei
    
    struct Lawyer {
        string name;
        address addr;
        string pubkey;
        mapping(uint => string) encryptedKeys;     //for each case
    }
    
    struct Judge {
        string name;
        address payable addr;
        string pubkey;
        mapping(uint => string) encryptedKeys;
    }
    
    Lawyer[] public lawyers;
    Judge[] public judges;
    
    struct Case {
        address payable judge;
        address lawyer1;
        address lawyer2;
        string[] evidenceFileHash;
        string[] evidenceFileType;
        
        string party_1_name;
        string party_2_name;
        string details;
        
        uint aTokensReceived;
        
        bool isOpen;
    }
    
    Case[] public cases;
    
    event lawyerRegistered(uint _lawyerId);
    event judgeRegistered(uint _judgeId);
    event caseCreated(uint _caseId);
    
    constructor() public {
        owner = msg.sender;
    }
    
    function registerLawyer(string memory _name, address _addr, string memory _pubkey) public {
        Lawyer memory l = Lawyer(_name, _addr, _pubkey);
        lawyers.push(l);
        emit lawyerRegistered(lawyers.length-1);
    }
    function registerJudge(string memory _name, address payable _addr, string memory _pubkey) public {
        Judge memory j = Judge(_name, _addr, _pubkey);
        judges.push(j);
        emit judgeRegistered(judges.length-1);
    }
    
    function newCase(uint _judgeId, uint _lawyer1Id, uint _lawyer2Id, string memory _party_1_name, string memory _party_2_name, string memory _details) public payable {
        require(msg.value == courtFees, "Err: 0.05 Eth not sent");
        string[] memory empty;

        uint aTokensReceived = IERC20(address(aETH)).balanceOf(address(this));
        IAaveLendingPool(lendingPoolAddressProvider.getLendingPool())
                .deposit{value: msg.value}(
                    ETH, courtFees, 0
                );
        aTokensReceived = IERC20(address(aETH)).balanceOf(address(this)).sub(aTokensReceived);
        aETH.redirectInterestStream(msg.sender);

        Case memory tcase = Case(judges[_judgeId].addr, lawyers[_lawyer1Id].addr, lawyers[_lawyer2Id].addr, empty, empty, _party_1_name, _party_2_name, _details, aTokensReceived, false);
        cases.push(tcase);
        
        emit caseCreated(cases.length-1);
    }
    
    function closeCase(uint _caseId) external {
        require(cases[_caseId].lawyer1 == msg.sender || cases[_caseId].lawyer2 == msg.sender, "Err: Not a Lawyer");
        
        uint etherReceived = address(this).balance;
        aETH.redeem(cases[_caseId].aTokensReceived);
        etherReceived = (address(this).balance).sub(etherReceived);

        cases[_caseId].judge.transfer(etherReceived);
    }
    
    // Evidence
    function uploadEvidence(uint _caseId, string memory _fileHash, string memory _fileType) public {
        // to compare String without importing StringUtils Contract:
        require(keccak256(bytes(_fileHash)) != keccak256(bytes("")) && keccak256(bytes(_fileType)) != keccak256(bytes("")));    //here checking string Not Null
        cases[_caseId].evidenceFileHash.push(_fileHash);
        cases[_caseId].evidenceFileType.push(_fileType);
    }
    
    function getEvidenceCount(uint _caseId) public view returns(uint) {
        return cases[_caseId].evidenceFileHash.length;
    }
    function getEvidence(uint _caseId, uint _evidenceNo) public view returns(string memory FileHash, string memory FileType) {
        return (cases[_caseId].evidenceFileHash[_evidenceNo], cases[_caseId].evidenceFileType[_evidenceNo]);
    }
    
    //EncryptedKeys
    function addEncryptedKey(bool _isLawyer, uint _ljId, uint _caseId, string memory _key) public {
        if(_isLawyer) {
            lawyers[_ljId].encryptedKeys[_caseId] = _key;
        } else {
            judges[_ljId].encryptedKeys[_caseId] = _key;
        }
    }
    function getEncryptedKey(bool _isLawyer, uint _ljId, uint _caseId) public view returns(string memory) {
        if(_isLawyer) {
            return lawyers[_ljId].encryptedKeys[_caseId];
        } else {
            return judges[_ljId].encryptedKeys[_caseId];
        }
    }
    
    function getCaseAddresses(uint _caseId) public view returns(address judge, address lawyer1, address lawyer2) {
        return(cases[_caseId].judge, cases[_caseId].lawyer1, cases[_caseId].lawyer2);
    }
    
    function getJudgesCount() external view returns(uint) {
        return judges.length;
    }
    function getLawyersCount() external view returns(uint) {
        return lawyers.length;
    }
    function getCasesCount() external view returns(uint) {
        return cases.length;
    }
    
    receive() external payable{}
}