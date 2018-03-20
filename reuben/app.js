console.log("hey")

// 1a Access the city information using some kind of object notation.

console.log(evanstonWeather.city.name)

// 1b.

// get lat  in a variable
const lat = evanstonWeather.city.coord.lat
// console.log(lat)
// get long in a variable
const long = evanstonWeather.city.coord.lon
// console.log(long)
// print sentence on console
const cityName = evanstonWeather.city.name
console.log("The coordinates of " + cityName + " are "
	+ lat + " latitude and " + long + " longitude."
)

//1c put all of the above logic in a function called getCity that takes the entire object as a parameter and uses that parameter to get the data, and additionally uses it to return the city name (and call the function within your code).


const getCity = (parameter) => {
	const latitude = parameter.city.coord.lat
	const longitude = parameter.city.coord.lon
	const name = parameter.city.name
	console.log("The coordinates of " + name + " are "
	+ latitude + " latitude and " + longitude + " longitude."
	)
	return name
}

const returnedFromGetCity = getCity(evanstonWeather)
// console.log(returnedFromGetCity)















// function add(a, b) {
// 	let result = a + b;

// 	console.log("hey i'm a message")

// 	return result
// 	// asdfasdfasdfasdfasdfasdfasdf
// }

// const answer = add(10, 20)
// // anaswer is now 30



















// console.log(answer)