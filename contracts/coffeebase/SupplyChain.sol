pragma solidity ^0.4.24;

import "../coffeeaccesscontrol/ConsumerRole.sol";
import "../coffeeaccesscontrol/DistributorRole.sol";
import "../coffeeaccesscontrol/FarmerRole.sol";
import "../coffeeaccesscontrol/RetailerRole.sol";


contract SupplyChain is ConsumerRole, DistributorRole, FamerRole, RetailerRole {
    address owner;

    uint256 upc;

    uint256 sku;

    mapping(uint256 => Item) items;

    mapping(uint256 => string[]) itemsHistory;

    enum State {
        Harvested, // 0
        Processed, // 1
        Packed, // 2
        ForSale, // 3
        Sold, // 4
        Shipped, // 5
        Received, // 6
        Purchased // 7
    }

    State constant defaultState = State.Harvested;

    struct Item {
        uint256 sku; // Stock Keeping Unit (SKU)
        uint256 upc; // Universal Product Code (UPC), generated by the Farmer, goes on the package, can be verified by the Consumer
        address ownerID; // Metamask-Ethereum address of the current owner as the product moves through 8 stages
        address originFarmerID; // Metamask-Ethereum address of the Farmer
        string originFarmName; // Farmer Name
        string originFarmInformation; // Farmer Information
        string originFarmLatitude; // Farm Latitude
        string originFarmLongitude; // Farm Longitude
        uint256 productID; // Product ID potentially a combination of upc + sku
        string productNotes; // Product Notes
        uint256 productPrice; // Product Price
        State itemState; // Product State as represented in the enum above
        address distributorID; // Metamask-Ethereum address of the Distributor
        address retailerID; // Metamask-Ethereum address of the Retailer
        address consumerID; // Metamask-Ethereum address of the Consumer
    }

    event Harvested(uint256 upc);
    event Processed(uint256 upc);
    event Packed(uint256 upc);
    event ForSale(uint256 upc);
    event Sold(uint256 upc);
    event Shipped(uint256 upc);
    event Received(uint256 upc);
    event Purchased(uint256 upc);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can take this action");
        _;
    }

    modifier verifyCaller(address _address) {
        require(msg.sender == _address, "This caller cannot take this action");
        _;
    }

    modifier paidEnough(uint256 _price) {
        require(msg.value >= _price, "Value is insufficient");
        _;
    }

    modifier checkValue(uint256 _upc) {
        _;
        uint256 _price = items[_upc].productPrice;
        uint256 amountToReturn = msg.value - _price;
        items[_upc].consumerID.transfer(amountToReturn);
    }

    modifier harvested(uint256 _upc) {
        require(
            items[_upc].itemState == State.Harvested,
            "Wrong state, coffee should be harvested first."
        );
        _;
    }

    modifier processed(uint256 _upc) {
        require(
            items[_upc].itemState == State.Processed,
            "Wrong state, coffee should be processed first."
        );
        _;
    }

    modifier packed(uint256 _upc) {
        require(
            items[_upc].itemState == State.Packed,
            "Wrong state, coffee should be packed first."
        );
        _;
    }

    modifier forSale(uint256 _upc) {
        require(
            items[_upc].itemState == State.ForSale,
            "Wrong state, coffee should be for sale first."
        );
        _;
    }

    modifier sold(uint256 _upc) {
        require(
            items[_upc].itemState == State.Sold,
            "Wrong state, coffee should be sold first."
        );
        _;
    }

    modifier shipped(uint256 _upc) {
        require(
            items[_upc].itemState == State.Shipped,
            "Wrong state, coffee should be shipped first."
        );
        _;
    }

    modifier received(uint256 _upc) {
        require(
            items[_upc].itemState == State.Received,
            "Wrong state, coffee should be received first."
        );
        _;
    }

    modifier purchased(uint256 _upc) {
        require(
            items[_upc].itemState == State.Purchased,
            "Wrong state, coffee should be purchased first."
        );
        _;
    }

    constructor() public payable {
        owner = msg.sender;
        sku = 1;
        upc = 1;
    }

    function kill() public {
        if (msg.sender == owner) {
            selfdestruct(owner);
        }
    }

    function harvestItem(
        uint256 _upc,
        address _originFarmerID,
        string _originFarmName,
        string _originFarmInformation,
        string _originFarmLatitude,
        string _originFarmLongitude,
        string _productNotes
    ) public {
        items[_upc] = Item({
            sku: sku,
            upc: _upc,
            ownerID: contractOwner,
            originFarmerID: _originFarmerID,
            originFarmName: _originFarmName,
            originFarmInformation: _originFarmInformation,
            originFarmLatitude: _originFarmLatitude,
            originFarmLongitude: _originFarmLongitude,
            productID: _upc + sku,
            productNotes: _productNotes,
            productPrice: uint256(0),
            itemState: defaultState,
            distributorID: address(0),
            retailerID: address(0),
            consumerID: address(0)
        });

        sku = sku + 1;
        emit Harvested(_upc);
    }

    function processItem(uint256 _upc)
        public
        harvested(_upc)
        onlyFarmer();
    {
        items[_upc].itemState = State.Harvested;
        emit Processed(_upc);
    }

    function packItem(uint256 _upc)
        public
        harvested(_upc)
        onlyFarmer()
    {
        items[_upc].itemState = State.Packed;
        emit Packed(_upc)
    }

    function sellItem(uint256 _upc, uint256 _price)
        public
        packed(_upc)
        onlyFarmer()
    {
        items[_upc].itemState = State.ForSale;
        items[_upc].productPrice = price;
        emit ForSale(_upc)
    }

    function buyItem(uint256 _upc)
        public
        payable
        forSale(_upc)
        paidEnough(items[_upc].productPrice)
        checkValue(_upc)
        onlyDistributor()
    {
        items[_upc].itemState = State.Sold;
        items[_upc].ownerID = msg.sender;
        items[_upc].distributorID = msg.sender;
        msg.sender.transfer(items[_upc].productPrice)
        emit Sold(_upc);
    }

    function shipItem(uint256 _upc)
        public
        sold(_upc)
        onlyDistributor()
    {
        items[_upc].itemState = State.Shipped;
        emit Shipped(_upc);
    }

    function receiveItem(uint256 _upc)
        public
        shipped(_upc)
        onlyRetailer()
    {
        items[_upc].itemState = State.Received;
        items[_upc].ownerID = msg.sender;
        items[_upc].distributorID = msg.sender;
        emit Received(_upc);
    }

    function purchaseItem(uint256 _upc)
        public
        received(_upc)
        onlyConsumer()
    {
        items[_upc].itemState = State.Purchased;
        items[_upc].ownerID = msg.sender;
        items[_upc].distributorID = msg.sender;
        emit Purchased(_upc);
    }

    function fetchItemBufferOne(uint256 _upc)
        public
        view
        returns (
            uint256 itemSKU,
            uint256 itemUPC,
            address ownerID,
            address originFarmerID,
            string originFarmName,
            string originFarmInformation,
            string originFarmLatitude,
            string originFarmLongitude
        )
    {
        return (
            itemSKU,
            itemUPC,
            ownerID,
            originFarmerID,
            originFarmName,
            originFarmInformation,
            originFarmLatitude,
            originFarmLongitude
        );
    }

    function fetchItemBufferTwo(uint256 _upc)
        public
        view
        returns (
            uint256 itemSKU,
            uint256 itemUPC,
            uint256 productID,
            string productNotes,
            uint256 productPrice,
            uint256 itemState,
            address distributorID,
            address retailerID,
            address consumerID
        )
    {
        return (
            itemSKU,
            itemUPC,
            productID,
            productNotes,
            productPrice,
            itemState,
            distributorID,
            retailerID,
            consumerID
        );
    }
}
