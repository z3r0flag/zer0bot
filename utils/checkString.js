/*
HOW TO USE STRING CHECKER FUNCTION
---------------------------------------------------------
1st argument: the string that you want to parse

2nd argument: an array, this array can take 3 different forms:
			  ["word1", "word2", "word3"] in this form, the function will return false if all the words in the array are present in the string
			  ["word1", ["word2", "word3"]] the sub-array contains an arbitrary number of words, if either of these are present in the string and all the words that are not in sub-arrays are present aswell, the funtion will return false
			  ["word1", [["word2", "word3"]]] if there is a sub-array inside the sub-array, the function will return false if all the elemnts in the sub-sub-array occur consecutively in the string (the previous 2 rules still apply)

3rd argument: an array, this array contains a set of words, if any one of them is present in the string, the function will return true
*/

module.exports = (string, check, exceptions) => {
	string = string.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"")
	string = string.replace(/\s{2,}/g," ")

	string = string.toLowerCase().split(" ")

	let pass = true

	for(let i = 0; i < check.length; i++) {
		if(typeof(check[i]) === "string") {
			if(!string.includes(check[i])) {
				pass = true
				break
			}
		} else {
			for(let j = 0; j < check[i].length; j++) {
				if(typeof(check[i][j]) === "string") {
					if(string.includes(check[i][j])) {
						pass = false
						break
					} else {
						pass = true
					}
				} else {
					try {
						if(check[i][j].every(elem => string.includes(elem))) {
							pass = false
							break
						} else {
							pass = true
						}
					} catch { }
				}
			}
		}
	}

	for(let i = 0; i < exceptions.length; i++) {
		if(string.includes(exceptions[i])) {
			pass = true
			break
		}
	}

	return pass
}