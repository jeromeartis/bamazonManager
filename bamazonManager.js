const mysql = require('mysql');
const inquirer = require('inquirer');
// require('console-table');
let input = process.argv[2];
let choiceId= "";
var get_item_id = "";
var get_stock_quantity = "";
var total = "";
var pName = "";
var dName = "";
var price = "";
var sQuantity = "";

var connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'password',
  database: 'bamazon',
});


connection.connect(function(err) {
  if (err) return;
  console.log("connected");
  start();
});

const start = () =>{

  inquirer
  .prompt([{
    type: "list",
    name: "choices",
    choices: ["Add New Product","View Products for Sale","View Low Inventory","Add to Inventory"]
  },
]).then(function(response){
  choiceId = parseInt(response.choices); //converts values into Integer equivalents
  let input = response.choices
  // console.log(input)
  switch (input) {

    case "View Products for Sale":
    console.log("View Products")
      viewProducts();
      break;
    case "View Low Inventory":
    console.log("View Inventory")
    viewLowInventory();
    break;
    case "Add to Inventory":
    console.log("Add Inventory")
    getid();
    break;
    case "Add New Product":
    console.log("Add new Products")
    addNewProduct();
    break;
    default:

  }
});
}

const viewProducts = function() {

  // display all items, then...
  connection.query(`SELECT * from products`, function(err, res){
    if (err) throw err;
    console.table(res);

});
}

const viewLowInventory = function(){

  connection.query(`SELECT * from products WHERE stock_quantity < 5`, function(err, res){

    if (err) throw err;
    console.table(res);
  });
}

const getid = ()=>{

  connection.query(`SELECT * from products`, function(err, res){

    if (err) throw err;
    console.table(res);
    });

  inquirer
  .prompt([{
    type: "list",
    name:"selection",
    message: "Choose an Item ID?",
    choices: [1,2,3,4,5,6,7,8,9,10]

  }]).then(function(response){
     get_item_id = response.selection
     console.log(get_item_id)
     get_quantity(get_item_id);
  });
}
const get_quantity = (get_item_id) => {
  console.log(`inside qunatity: ${get_item_id}`)
  connection.query(`SELECT * from bamazon.products WHERE item_id ="${get_item_id}"`, function(err, res){
    if (err) throw err;
    let quanitity = res[0].stock_quantity
    console.log(quanitity)
    add_quantity(quanitity);
  });
}
const add_quantity = (quanitity)=>{

  console.log(get_item_id)
  inquirer
  .prompt([{
    type: "input",
    name:"add",
    message: "How many do you want to add?"
  }]).then(function(response){

    add_more_quantity = response.add
    console.log(add_more_quantity)
    total = Number(quanitity) + Number(add_more_quantity);
    console.log(total);
    update_stock_quantity(total, get_item_id);
  });
}

const update_stock_quantity = (total, get_item_id) => {
  console.log("Updating Stock Quantity")
  connection.query(`UPDATE bamazon.products SET stock_quantity = "${total}" WHERE item_id = "${get_item_id}"`, function(err, res){
    if (err) throw err;
  });
  connection.query(`SELECT * FROM bamazon.products WHERE item_id = "${get_item_id}"`, function (err, res){
  if (err) throw err;
  console.log(`Updated Quantity: ${res[0].stock_quantity}`)
    });
    connection.query(`SELECT * from products`, function(err, res){
      if (err) throw err;
      console.table(res);
    });
}


const addNewProduct = ()=>{
  inquirer
  .prompt ([
    {
      type: "input",
      name:"product",
      message: "Enter New Product Name"
  },
  {
    type: "input",
    name:"department",
    message: "Enter New Department Name"
  },
  {
    type: "input",
    name:"price",
    message: "Enter New Price"
},
{
  type: "input",
  name:"stocks",
  message: "Enter New Stock Quantity"
}
]).then(function (response){
  // console.log(response.product)
  pName = response.product;
  dName = response.department;
  price = response.price;
  sQuantity = response.stocks
  insertNewProduct();
});

}
const insertNewProduct = () => {
console.log("Inserting New Table")
var sql = `INSERT INTO bamazon.products (product_name, department_name,price,stock_quantity) VALUES ('${pName}','${dName}',${price},${sQuantity})`;
connection.query(sql, function(err, res) {
if (err) throw err;

});

connection.query(`SELECT * from products`, function(err, res){
  if (err) throw err;
  console.table(res);
});
}
