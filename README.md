$or -> The $or operator in MongoDB is used to specify a logical OR condition.
-> It takes an array of conditions and returns documents that match any of the conditions in the array

$regex -> The $regex operator is used to perform a regular expression search on a string field in MongoDB.
-> Regular expressions allow you to search for patterns within strings.

$options -> The $options: 'i' part is used to make the regular expression search case-insensitive.
-> Without this option, the search would be case-sensitive, meaning "Apple" and "apple" would be treated as different strings.
