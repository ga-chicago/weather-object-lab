//I called my object weather instead of evanstonWeather
//dates and times are expected to be entered in the UTC timezone
//dates are expected to be entered in the "MM-DD-YYYY" or "MM-DD" formats
//times are expected to be entered in the "H AM/PM" format

//1

function getCity(weatherObj) {

    //log the city name
    console.log(weather.city.name);

    //log a formatted string with the city name and its longitude and latitude
    console.log("The coordinates of "+weather.city.name+" are "+weather.city.coord.lat+" latitude and "+weather.city.coord.lon+" longitude.");
	
    //return the city name
    return weatherObj.city.name;
}

console.log("City info:");
console.log("--------------");
getCity(weather);
console.log(" ");

//2
function weatherAtDateTime(date,time,weatherObj) {

    //find the nearest date and time in the data
    let day = findDay(date,time,weatherObj);

    //get the weather description
    let weatherDes = buildWeatherDes(day);

    //log a formatted output string with the date, time, and weather description
	console.log("On "+date+" at "+time+", the weather will be "+weatherDes+".");
}

function buildWeatherDes(day) {
    let weatherDes = "";

    //loop through the weather descriptions array and combine the with an "and" in between
    for (let i in day.weather) {
        weatherDes += day.weather[i].description + " and "
    }

    //return the description string with the extra "and" sliced off the end
    return weatherDes = weatherDes.slice(0,weatherDes.length-5);
}

function getDateAndTimeInUnix(date, time) {

    //split the date on "-"
    date = date.split("-");

    //split out the hour and AMPM
    let hour = parseInt(time.slice(0,time.indexOf("m")-1));
    let AMPM = time.slice(time.indexOf("m")-1,time.length).toUpperCase()
    
    //default the year to the current year if it wasn't entered
    let year = "";
    if (date[2]) {
        year = date[2];
    }
    else {
        year = (new Date()).getFullYear().toString()
    }

    //rebuild the date and the time
    date = date[0] + "/" + date[1].toString() + "/" + year;
    time = hour.toString() + ":00 " + AMPM;

    //Parse the date into Unix format using the Date.parse method
    let dt = Date.parse(date + " " + time + " UTC");
    return dt/1000;
}

function findDay(date,time,weatherObj) {

    //format the date and time in Unix format
    let dt = getDateAndTimeInUnix(date, time);

    //find the nearest date and time in the data
    return findTimestamp(dt,weatherObj);
}

function findTimestamp(dt, weatherObj) {

    /*
    //removed for performance because it can be caught in the diff loop below
    
    //search for our date and time in the weather object
    for (let i in weatherObj.list) {
        if (weatherObj.list[i].dt === dt) {
            return weatherObj.list[i];
        }
    }
    */

    //initialize variables with the first date and time in the weather object
    let diff = Math.abs(weatherObj.list[0].dt - dt);
    let prevDiff = [weatherObj.list[0],diff];
    
    //for each date and time in the weather object, calculate how far it is from the inputted date and time
    //if it's closer than the ones we already checked then save it as the date and time to use
    for (let i in weatherObj.list) {
        diff = Math.abs(weatherObj.list[i].dt - dt);
        if (diff < prevDiff[1]) {
            prevDiff = [weatherObj.list[i],diff];
        }
    }

    //If we didn't find the exact date and time. Log a warning
    if (prevDiff[1] !== 0) {
        console.log("Couldn't find the specified day. Using " + (new Date(prevDiff[0].dt*1000)).toUTCString() + " instead.");
    }

    //Return the object for that date and time or the closest date and time
    return prevDiff[0];
}

console.log("Weather description:");
console.log("--------------");
weatherAtDateTime("3-20","6pm",weather);
console.log(" ");

//3
function logTempAtDateTime(date,time,weatherObj) {
    let temp = tempAtDateTime(date,time,weatherObj);

    //Log a formatted string with the date, time, and temperature
    console.log("On " + date + " at " + time + ", the temperature will be " + Math.round(temp) + "\u00B0F.");
}

function tempAtDateTime(date,time,weatherObj) {
    //get the date and time in the data that are nearest to the inputted date and time
    let day = findDay(date, time, weatherObj);

    //grab and format the temperature
    let temp = day.main.temp;
    temp = kelvinToFahrenheit(temp);

    //return the temperature
    return temp;
}

function kelvinToFahrenheit(temp) {
    return Math.round((temp * 9/5 - 459.67)*100)/100;
}

console.log("Temperature:");
console.log("--------------");
logTempAtDateTime("3-20","9am",weather);
console.log(" ");

//4
function windSpdAndDirAtDateTime(date,time,weatherObj) {
    //get the date and time in the data that are nearest to the inputted date and time
    let day = findDay(date, time, weatherObj);

    //grab and format the direction
    let direction = convertWindDirToCard(day.wind.deg);

    //grab and format the speed
    let speed = Math.round((day.wind.speed * 2.2369)).toString() + "mph";

    //log the output
	console.log("On "+date+" at "+time+", the wind will be blowing "+direction+" at "+speed+".");
}

function convertWindDirToCard(dir) {
    //handle negative degrees
    if (dir < 0) {
        dir += 360;
    }
    //handle degrees that are greater than 360
    dir = parseInt(dir)%360;

    //break the degrees of the compass into regions
    //for instance, the northeast region goes from 22.5 degrees to 67.5 degrees
    
    let seg = 360/16;
    let oct = 360/8;
    let cardInd = 0;
    let cards = ["northeast","east","southeast","south","southwest","west","northwest","north"];
    
    do{
        if (dir >= seg && dir < (seg + oct)) {
            return cards[cardInd];
        }
        cardInd++
        seg += oct;
    } while(seg !== 22.5)
}

console.log("Wind speed:");
console.log("--------------");
windSpdAndDirAtDateTime("3-17","3pm",weather);
console.log(" ");

//5
function getHumidity(weatherObj) {

    //get the first day and the last day to determine where we should start and stop looping
    let start = new Date(weatherObj.list[0].dt*1000);
    let end = new Date(weatherObj.list[weatherObj.list.length - 1].dt*1000);

    //break out the day, month, and year so that we can put it back together in the correct format for getDateAndTimeInUnix
    let startDay = start.getDate();
    let endDay = end.getDate();
    let startMonth = start.getMonth()+1;
    let endMonth = end.getMonth()+1;
    let startYear = start.getFullYear();
    let endYear = end.getFullYear();

    //go back to the Unix format because it's easier to loop through
    startdt = getDateAndTimeInUnix(startMonth+"-"+startDay+"-"+startYear,"12pm");
    enddt = getDateAndTimeInUnix(endMonth+"-"+endDay+"-"+endYear,"12pm");

    //initialize variables
    let day = {};
    let humidity = 0;
    let date = "";
    let month = "";

    //loop through days starting at noon the first day and ending at noon the last day
    //86400 is the number of seconds in a day
    for (let i = startdt; i <= enddt; i += 86400) {
        //find the nearest date and time to noon on our day
        day = findTimestamp(i,weatherObj);

        //get the humidity
        humidity = day.main.humidity;

        //get the date and format it
        date = (new Date(i*1000));
        month = date.getMonth()+1;
        if (month < 10) {
            month = "0"+month;
        }
        date = date.getFullYear()+"-"+month+"-"+date.getDate()

        //If the humidity is greater than 75, add (gross)
        if (humidity > 75) {
            console.log(date + ": " + humidity + " (gross)");
        }
        else {
            console.log(date + ": " + humidity);
        }
    }
}

console.log("Humidity:");
console.log("--------------");
getHumidity(weather);
console.log(" ");

//6 and 7
function getWeatherArray(weatherObj) {

    //Initialize variables
    let day = "";
    let dayObj = {};
    let temp = 0;
    let myWeather = [];
    let desArr = [];
    let freqArr = [];

    //loop through the list of dates and times in the weather object
    for (let i in weatherObj.list) {
        //get the date and time for an element in the list
        day = new Date(weatherObj.list[i].dt*1000);

        //if it's a new day, reinitialize the day object
        if (day.getDate() !== dayObj.day) {

            //Cleanup the old day
            //calculate the weather description for the previous day
           getMostFreqDes(desArr,freqArr,dayObj);
           //push the previous day to the myWeather array
           myWeather.push(dayObj);

           //initialize a new day object
           freqArr = [];
           desArr = [];
           dayObj = {
            day: day.getDate(),
            date: day.toLocaleString("en-US").slice(0,9),
            highTemp: 0,
            lowTemp: Infinity,
            weatherDes: ""
           };
        }

        //calculate the temperature for the date and time
        temp = weatherObj.list[i].main.temp;
        temp = kelvinToFahrenheit(temp);

        //determine if the temp is the low temp for the day
        if (temp < dayObj.lowTemp) {
            dayObj.lowTemp = temp;
        }

        //determine if the temp is the high temp for the day
        if (temp > dayObj.highTemp) {
            dayObj.highTemp = temp;
        }

        //get the weather description for the date and time and store it in a frequency array for later
        buildDesArrs(buildWeatherDes(weatherObj.list[i]),desArr,freqArr);
    }

    //Do cleanup for the last day in the list
    getMostFreqDes(desArr,freqArr,dayObj);
    myWeather.push(dayObj);

    //Remove the extra weather description that we got from initializing the first day
    myWeather.shift();

    //return the final array
    return myWeather;
}

function buildDesArrs(des,desArr,freqArr) {

    let desIndex = desArr.indexOf(des);

    //If the description has been seen before then increment the frequency
    if (desIndex >= 0) {
        freqArr[desIndex] += 1;
    }
    //else add the description to the array and start recording frequency
    else {
        desArr.push(des);
        freqArr.push(1);
    }
}

function getMostFreqDes(desArr,freqArr,dayObj) {
    //Getting the largest frequency
    let mostFreq = Math.max(...freqArr);

    //Finding the description that matches up with the frequency
    //They should be at the same index
    let freqDes = desArr[freqArr.indexOf(mostFreq)];

    //Saving to the day object
    dayObj.weatherDes = freqDes;
}

const myWeatherArray = getWeatherArray(weather);
//console.log(myWeatherArray);
//console.log(" ");

//8
function printForecast(weatherArr) {
    for (day of weatherArr) {
        console.log("----------------");
        console.log("Date: " + day.date);
        console.log("Weather: " + day.weatherDes);
        console.log("High Temp: " + day.highTemp + "\u00B0F");
        console.log("Low Temp: " + day.lowTemp + "\u00B0F");
        console.log("----------------");
    }
}

console.log("Weather Forecast:");
console.log("----------------------------");
console.log(" ");
printForecast(myWeatherArray);








