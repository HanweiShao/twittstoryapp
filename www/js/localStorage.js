/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var Contacts = {
	// (1) Open a database connection
	db : openDatabase("accountManagement", "1.0", "Test DB", 20000),
	index : window.localStorage.getItem("Contacts:index"),
	$table : document.getElementById("contacts-table"),
	$form : document.getElementById("contacts-form"),
	$button_save : document.getElementById("contacts-op-save"),
	
	successRemoved : false,
	
	// Default handlers for success or error when running an SQL statement
	successHandler : function(tx, results) {
		console.log("success");
	},
	errorHandler : function(tx, errorInfo) {
		alert(eerrorInfo.message);
	},
	// Methods to create schema using a non-anonymous callback (createTables)
	createTables : function(tx) {
		tx.executeSql('CREATE TABLE IF NOT EXISTS contacts (username VARCHAR(100) UNIQUE, password VARCHAR(500))', [], Contacts.successHandler, Contacts.errorHandler);
	},
	createSchema : function() {
		Contacts.db.transaction(Contacts.createTables);
	},
	// Methods to populate table in the html page. It use a callback method (fillTable)
	selectAndFillTable : function() {
		Contacts.db.transaction(function(tx) {
			tx.executeSql('SELECT * FROM contacts ORDER BY username', [], Contacts.fillTable, Contacts.errorHandler);
		});
	},
	fillTable : function(tx, results) {
		var index;
		for ( index = 0; index < results.rows.length; index++) {
			var entry = {
				username : results.rows.item(index).username,
				password : results.rows.item(index).password
			};
			Contacts.tableAdd(entry);
		}
	},
	// Methods to select a contact and display it in the form. It uses a callback method copyToForm
	selectAndCopyToForm : function(contactId) {
		Contacts.db.transaction(function(tx) {
			tx.executeSql("SELECT * FROM contacts WHERE username = ?", [contactId], Contacts.copyToForm, Contacts.errorHandler);
		});
	},
	copyToForm : function(tx, results) {
		if (results.rows.length >= 1) {
			Contacts.$form.username.value = results.rows.item(0).username;
			Contacts.$form.password.value = results.rows.item(0).password;
		}
	},
	// Methods to select a contact and delete it. It uses a callback method (storeRemove)
	selectAndDelete : function(contactId) {
		Contacts.db.transaction(function(tx) {
			tx.executeSql("SELECT * FROM contacts WHERE username = ?", [contactId], Contacts.storeRemove, Contacts.errorHandler);
		});
	},
	// main
	init : function() {

		// initialize storage index
		if (!Contacts.index) {
			window.localStorage.setItem("Contacts:index", Contacts.index = 1);
		}

		// Create schema
		Contacts.createSchema();

		// initialize form
		Contacts.$form.reset();
		// Submit event handler. The code to add/update is here
		Contacts.$form.addEventListener("submit", function(event) {
			var entry = {
				username : this.username.value,
				password : this.password.value
			};
			
			// add
			Contacts.storeAdd(entry);
			Contacts.tableAdd(entry);
			
			// Set form controls to their default value
			this.reset();
			this.id_entry.value = 0;
			// Prevent the default behaviour (go the server) to happen
			event.preventDefault();
		}, true);

		// initialize table
		Contacts.selectAndFillTable();

		// Event handler for <remove> in the html table
		Contacts.$table.addEventListener("click", function(event) {
			var op = event.target.getAttribute("data-op");
			if (/remove/.test(op)) {
				// Getting a contact from websql and edit it or remove it
				if (op == "remove") {
					Contacts.selectAndDelete(event.target.getAttribute("data-id"));
				}
				// Prevent the default behaviour (go to the link) to happen
				event.preventDefault();
			}
		}, true);
	},
	//(8) add / edit / remove from db
	storeAdd : function(entry) {
		// INSERT SQL
		Contacts.db.transaction(function(tx) {
			tx.executeSql('INSERT INTO contacts (username, password) VALUES (?, ?)', [entry.username, entry.password], Contacts.successHandler, Contacts.errorHandler);
		});
	},
	storeRemove : function(tx, results) {
		if (results.rows.length >= 1) {
			if (confirm('Are you sure you want to remove from your contacts?')) {
				// Remove from database
				tx.executeSql('DELETE FROM contacts WHERE username = ?', [results.rows.item(0).username], Contacts.RemoveSuccessHandler, Contacts.RemoveErrorHandler);
				Contacts.tableRemove({
					username : results.rows.item(0).username
				});
			}

		}
	},
	removeSuccessHandler : function(tx, result) {
		successRemoved = true;
	},
	removeErrorHandler : function(tx, result) {
		successRemoved = false;
	},
	// Add an item to the html table
	tableAdd : function(entry) {
		var $tr = document.createElement("tr"), $td, key;
		for (key in entry) {
			if (entry.hasOwnProperty(key)) {
				$td = document.createElement("td");
				$td.appendChild(document.createTextNode(entry[key]));
				$tr.appendChild($td);
			}
		}
		$td = document.createElement("td");
		$td.innerHTML = '<a data-op="remove" data-id="' + entry.username + '">Remove</a>';
		$tr.appendChild($td);
		$tr.setAttribute("id", "entry-" + entry.username);
		Contacts.$table.appendChild($tr);
	},
	// Modify an item to the html table
	tableEdit : function(entry) {
		var $tr = document.getElementById("entry-" + entry.username), $td, key;
		$tr.innerHTML = "";
		for (key in entry) {
			if (entry.hasOwnProperty(key)) {
				$td = document.createElement("td");
				$td.appendChild(document.createTextNode(entry[key]));
				$tr.appendChild($td);
			}
		}
		$td = document.createElement("td");
		$td.innerHTML = '<a data-op="remove" data-id="' + entry.username + '">Remove</a>';
		$tr.appendChild($td);
	},
	// Remove an item to the html table
	tableRemove : function(entry) {
		Contacts.$table.removeChild(document.getElementById("entry-" + entry.username));
	},
	
	
	//APIs for hanwei
	// insert account
	insertAccount : function(accName, passWord) {
		var entry = {
			username : accName,
			password : passWord
		};
		storeAdd(entry);
	},
	
	// get all accounts
	allAccountResult : new Array(),
	getAllAccount : function() {
		Contacts.db.transaction(function(tx) {
			tx.executeSql('SELECT * FROM contacts ORDER BY username', [], Contacts.returnAllAccount, Contacts.errorHandler);
		});
		return allAccountResult;
	},
	returnAllAccount : function(tx, results) {
		for ( var index = 0; index < results.rows.length; index++) {
			allAccountResult[index] = {
				username : results.rows.item(index).username,
				password : results.rows.item(index).password
			};
		}
	},
	
	// delete account
	deleteAccount : function(accName) {
		selectAndDelete(accName);
		return successRemoved;
	},
	
	// return password of a specific account
	getPwdResult : undefine,
	getPwdByAccount : function(accName) {
		Contacts.db.transaction(function(tx) {
			tx.executeSql("SELECT * FROM contacts WHERE username = ?", [accName], Contacts.returnPwd, Contacts.errorHandler);
		});
		return getPwdResult;
	},
	returnPwd : function(tx, results) {
		if (results.rows.length >= 1) {
			getPwdResult = results.rows.item(0).password;
		}
	}
}; 