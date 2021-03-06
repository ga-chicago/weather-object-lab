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
console.log(returnedFromGetCity)



//2. Write logic to console.log the weather description for 3-20 at 6pm. Make the output a nice English sentence.

const list = evanstonWeather.list

// build our date for comparison
const year = 2018;
const month = 2;
const day = 20;
const hours = 18;
const mar20at6pm = new Date(year, month, day, hours)
console.log(mar20at6pm.toString());
let theOneWeWant;

// for loop to find the right 3 hr period
for(let i = 0; i < list.length; i++) {

	// console.log(list[i].dt_txt)
	// make a date from this dt_txt for our comparison
	const thisDate = new Date(list[i].dt_txt)

	// if this one is the one that has the right date
	if(mar20at6pm.toString() == thisDate.toString())	{
		// grab it 
		theOneWeWant = list[i]
		console.log(list[i].dt_txt)
		console.log(thisDate.toString())
	}

}
console.log(
	"The weather on March 20 at 6pm will be "
	+ theOneWeWant.weather["0"].description
	+ ". "
)


//3.  Write logic to print out the forecasted temperature for 3-20 at 9am. Make the output a nice English sentence, and code any conversion necessary (Temp is given in Kelvin)

// find the object we need

const year2 = 2018;
const month2 = 2;
const day2 = 20;
const hours2 = 9;
const mar20at9am = new Date(year2, month2, day2, hours2)
let theRightWeatherChunk;
//loop over weather objects
for(let i = 0; i < list.length; i++) {
	// make a date obj for comparison
	const thisDate = new Date(list[i].dt_txt)
	// grab the right one
	if(mar20at9am.toString()===thisDate.toString()) {
		theRightWeatherChunk = list[i]
	}
}
// console.log(theRightWeatherChunk.main.temp)

// get the temp
const someTemp = theRightWeatherChunk.main.temp;

// convert the temp
// 273.15 K = 0
// *9/5 + 32
const someTempC = someTemp - 273.15;
const someTempF = someTempC * (9/5) + 32;
console.log(
	"The temperature in " + evanstonWeather.city.name
	+ " is " + someTempF + "F"
)

// print a sentence
