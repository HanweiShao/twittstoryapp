/*
 * API Samples:
 *
 * accManagement.init();
 *
 * accManagement.insertAccount("haoxin1990", "haoxin", function(rs) {
 * 		if (rs) {
 * 			console.log("insert success");
 * 		}
 * });
 * 
 * accManagement.deleteAccount("haoxin1990", function(rs) {
 * 		if (rs) {
 * 			console.log("delete success");
 * 		}
 * });
 * 
 * accManagement.getPwdByAccount("haoxin1990", function(rs) {
 * 		if (rs) {
 * 			console.log("password is: " + rs);
 * 		}
 * });
 * 
 * accManagement.getAllAccount(function(rs) {
 * 		console.log(rs);
 * });
 * 
 * 
 * accManagement.changeUsingAccount("haoxin", function(rs) {
 * 		if (rs) {
 * 			console.log("changeUsingAccount success");
 * 		}
 * });
 *
 * accManagement.getUsingAccount(function(rs) {
 * 		console.log(rs);
 * });
 * 
 */

var accManagement = {
	// Open a database connection
	db : openDatabase("accountManagement", "1.0", "Test DB", 20000),

	init : function() {
		/*accManagement.db.transaction(function(tx) {
			tx.executeSql('DROP TABLE accounts', [], function(tx, rs) {
				console.log("database drop success!");
			}, function(tx, err) {
				console.log("database drop error: " + err.message);
			});
		});*/
		accManagement.db.transaction(function(tx) {
			tx.executeSql('CREATE TABLE IF NOT EXISTS accounts (username VARCHAR(100) UNIQUE, password VARCHAR(500), twitterid VARCHAR(50), isusing INT)', [], function(tx, rs) {
				console.log("database initialize success!");
			}, function(tx, err) {
				console.log("database initialize error: " + err.message);
			});
		});
	},

	// insert account
	insertAccount : function(accName, passWord, twitterid, isUsing, callBack) {
		accManagement.db.transaction(function(tx) {
			tx.executeSql('INSERT INTO accounts (username, password, twitterid, isusing) VALUES (?, ?, ?, ?)', [accName, passWord, twitterid, isUsing], function(tx, rs) {
				callBack(true);
			}, function(tx, err) {
				callBack(false);
			});
		});
	},

	// delete account
	deleteAccount : function(accName, callBack) {
		accManagement.db.transaction(function(tx) {
			tx.executeSql('DELETE FROM accounts WHERE username = ?', [accName], function(tx, rs) {
				callBack(true);
			}, function(tx, err) {
				callBack(false);
			});
		});
	},

	// return password of a specific account
	getPwdByAccount : function(accName, callBack) {
		var result;
		accManagement.db.transaction(function(tx) {
			tx.executeSql("SELECT * FROM accounts WHERE username = ?", [accName], function(tx, rs) {
				if (rs.rows.length >= 1) {
					result = rs.rows.item(0).password;
				}
				callBack(result);
			}, function(tx, err) {
				callBack("getPwdByAccount Error!");
			});
		});
	},

	// get all accounts
	getAllAccount : function(callBack) {
		var result = [];
		accManagement.db.transaction(function(tx) {
			tx.executeSql('SELECT * FROM accounts', [], function(tx, rs) {
				for (var index = 0; index < rs.rows.length; index++) {
					result[index] = {
						username : rs.rows.item(index).username,
						password : rs.rows.item(index).password,
                        twitterid : rs.rows.item(index).twitterid,
                        isusing : rs.rows.item(index).isusing
					};
				}
				callBack(result);
			}, function(tx, err) {
				callBack("getAllAccount Error!");
			});
		});
	},
	
	// get Using Account
	getUsingAccount : function(callBack) {
		var result;
		accManagement.db.transaction(function(tx) {
			tx.executeSql("SELECT * FROM accounts WHERE isusing = 1", [], function(tx, rs) {
				if (rs.rows.length >= 1) {
					result = {
						username : rs.rows.item(0).username,
						password : rs.rows.item(0).password
					};
				}
				callBack(result);
			}, function(tx, err) {
				callBack("getUsingAccount Error!");
			});
		});
	},
	
	// change Using Account
	changeUsingAccount : function(accName, callBack) {
		var result;
		accManagement.db.transaction(function(tx) {
			tx.executeSql('UPDATE accounts SET isusing = 0 WHERE isusing = 1', [], function(tx, rs) {
				result = 1;
			}, function(tx, err) {
				callBack(false);
			});
		});
		accManagement.db.transaction(function(tx) {
			tx.executeSql('UPDATE accounts SET isusing = 1 WHERE username = ?', [accName], function(tx, rs) {
				result *= 1;
				if (result == 1) {
					callBack(true);
				}
			}, function(tx, err) {
				callBack(false);
			});
		});
	}
};

