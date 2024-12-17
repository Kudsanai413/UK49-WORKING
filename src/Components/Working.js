const date = new Date();
const today = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;

function saveToStorage(result, save, resDate="Unspecified")
{
	const results = [];
	// eslint-disable-next-line no-unused-expressions
	if (save !== "Don't Save")
	{
		if (!localStorage.getItem(today))
		{
			results.push({ dateOfResults: resDate, time: save, results: result });
			localStorage.setItem(today, JSON.stringify(results));
		}

		else
		{
			const found = JSON.parse(localStorage.getItem(today));
			found.push({ dateOfResults: resDate, time: save, results: result });
			localStorage.setItem(today, JSON.stringify(found));
		}
	}

	else
	{
		 console.log("This Isn't Supposed To Be Saved: " + save);
	}
}


function formatString(text)
{
	if (text.includes(", ") || text.includes(","))
	{
		let results = text.includes(", ") ? text.split(", ") : text.split(",");
		results = results.map( num => Number(num));
		return results;
	}

	return "Stuff Doesn't Contain Any Commas"
}

function FormatDate(text)
{
	const splitDate = text.split("-");
	const month = parseInt(splitDate[1]) - 1;

	return `${splitDate[2]} ${Months[month]} ${splitDate[0]}`;
}

const colors = [
	"red",
	"blue",
	"blueviolet",
	"brown",
	"yellow",
	"orange",
	"green"
]

const Months  = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
]


export { saveToStorage, formatString, FormatDate, colors }

