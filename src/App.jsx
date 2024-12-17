import { useEffect, useState } from 'react';
import './App.css';
import { formatString, saveToStorage, colors, FormatDate } from './Components/Working';
import Skeleton from './Components/Skeleton';
import { FaInfoCircle } from 'react-icons/fa';

const date = new Date();

const times = ["Don't Save", "Tea Time", "Lunch Time"];

function generateWorkedResults(results, setWorkedResults, factor)
{

    // const results = result.includes(", ") ? result.split(", ") : result.split(",");

    if (factor > 0)
    {
        const working = [];
        results.forEach( num => (
            working.push(<div className='row'>{ setLine(num, results, factor) }</div>)
        ))

        setWorkedResults(working);
    }

    else
    {
        const working = [];
        results.forEach( num => (
            working.push(<div className='row'>{ setLine(num, results,factor) }</div>)
        ));
        setWorkedResults(working)
    }


}



function setLine(number, results, fact)
{
    const line  = [];
    if (fact > 0)
    {
        for ( let i = (results.indexOf(number) + 1) ; i < results.length ; i++)
        {
            const y = Math.floor(Math.random() * 6);
            const x = number + results[i] > 49 ? (number + results[i]) % 49 : number + results[i];
            line.push(<div className='ball'
                style={{
                    boxShadow: `5px 5px 15px inset ${ colors[y] }`,
                    borderColor: `${colors[y]}`
                }}
            >{x}</div>);
        }
    }

    else
    {
        for ( let i = (results.indexOf(number) + 1) ; i < results.length ; i++)
        {
            const x = Math.abs(number - results[i]);
            const y = Math.floor(Math.random() * 6);
            line.push(<div className='ball'
                style={{
                    boxShadow: `5px 5px 15px inset ${ colors[y] }`,
                    borderColor: `${colors[y]}`
                }}
            >{x}</div>);
        }
    }
    return line;
}

function Disclaimer(visible, setDisplay)
{
    return(
        <>
            <section id='disclaimer' style={{ display: visible }}>
                <h3><FaInfoCircle/> How To Use "Working" <b onClick={ e => setDisplay("none")}>×</b></h3>
                <span className="steps">step 1
                    <p>Enter Results In the Input Field, Like This <br/> &raquo; <i>1, 2, 5, 48, 29, 19, 41</i></p>
                </span><span className="steps">step 2
                    <p>Select Whether You Want Results Saved or Not</p>
                </span><span className="steps">step 3
                    <p>Click The <i>"Generate"</i> Button To View Working</p>
                </span><span className="steps">step 4
                    <p>Reffere To Previous Working Scroll Down To Previous Section and Click <i>"Show Working"</i></p>
                </span>
            </section>
        </>
    )
}

function historyNumbers(result, resDate, resTime, setWorkedHistory, setNegWorkedHistory, id)
{
    const x = Math.floor(Math.random() * 8);

    const dateTime =
                    <>
                        <p id='date-time'>{ FormatDate(resDate) } &nbsp;&nbsp; { resTime }</p>
                    </>
    const numbers = result.map(number => (
        result.indexOf(number) !== result.length -1 ?
            <>
                <div className='ball'
                    style={{
                        boxShadow: `5px 5px 15px inset ${ colors[Math.floor(Math.random() * 7)] }`,
                        borderColor: colors[x]
                    }}
                >
                    {number}
                </div>
            </>
                :
                <>
                    <h5> &nbsp; + &nbsp; </h5>
                    <div className='ball'
                        style={{
                            boxShadow: `5px 5px 15px inset ${ colors[Math.floor(Math.random() * 7)] }`,
                            borderColor: colors[x]
                        }}
                    >{number}</div>

                </>
    ));

    const show= <button id={id}
                    onClick={ e => {
                        toggleHistoryWorking(id, e.target.innerText);
                        generateWorkedResults(result, setWorkedHistory, 1);
                        generateWorkedResults(result, setNegWorkedHistory, -1);
                        e.target.innerText = e.target.innerText === "Hide" ? "Show" : "Hide"
                    }}
                >Show</button>

    return(
        <div className="row history">
            {dateTime}
            { numbers }
            { show }
        </div>
    )
}

function toggleHistoryWorking(key, btnText)
{
    const historyWork = document.querySelectorAll(".history-workings");

    if (btnText === "Show")
    {
        historyWork.forEach( work => (
            work.id === key ? work.style.display = "flex" : work.style.display = "none"
        ))
    }

    else
    {
        historyWork.forEach( work => (
            work.style.display = "none"
        ))
    }
}


function App() {
    const [results, setResults] = useState("");
    const [working, setWorking] = useState([]);
    const [workingNeg, setWorkingNeg] = useState(0);
    const [history, setHistory] = useState([]);
    const [visible, setVisible] = useState("flex");
    const [workedHistory, setWorkedHistory] = useState([]);
    const [workedNegHistory, setWorkedNegHistory] = useState([]);
    const [time, setTime] = useState(0);
    const [resultsDate, setResultsDate] = useState("")
    useEffect(() => {
        const localKeys = Object.keys(localStorage);
        setHistory(localKeys);

    }, [working, workingNeg]);


    let cycle = 0;

    return (
        <>
            <header>

                <h1>49's <span>Working</span></h1>
                <button
                    onClick={ e => {
                        setWorking([])
                        setWorkingNeg([])
                    }}
                >Clear</button>

            </header>
            <main>

                <section id="input">
                    <div>
                        <span id="title">Enter Results</span>
                        <input type="date" name="" id=""
                        placeholder='Date Of Entered Results
                        +.'
                            value={ resultsDate }
                            onChange={ e => setResultsDate(e.target.value) }
                        />
                        <select name="" id=""
                            onChange={ e => {
                                setTime(e.target.selectedIndex)
                            } }
                            selectedIndex={time}
                        >

                            <option value="">Don't Save</option>
                            <option value="">Tea Time</option>
                            <option value="">Lunch Time</option>
                        </select>
                    </div>
                    <input type="text" id="results" placeholder='1, 2, 3, 4, 5, 6, 7'
                        value={results}
                        onChange={ e => setResults(e.target.value)}
                    />
                    <button
                        onClick={ e => {
                            saveToStorage(formatString(results), times[time], resultsDate)
                            generateWorkedResults(formatString(results), setWorking, 1);
                            generateWorkedResults(formatString(results), setWorkingNeg, -1);

                        }}
                    > Generate </button>
                </section>

                <section id="workings">
                <div className="row">
                {
                    results.length <= 20 && results.includes(",") &&  typeof results == "string"?
                        formatString(results).map( number => (
                            <div className="ball"
                                style={{
                                    boxShadow: `0px 0px 10px inset ${ colors[Math.floor(Math.random() * 7)] }`,
                                    borderColor: `${colors[Math.floor(Math.random() * 7)]}`
                                }}
                            >{ number }</div>
                        ))
                            : <></>
                }
                </div>
                <h1>+&nbsp;+&nbsp;+&nbsp;+&nbsp;+</h1>
                {
                    working.length ?
                        working
                            : <Skeleton item="working"/>

                }
                <h1>-&nbsp;-&nbsp;-&nbsp;-&nbsp;-</h1>
                {
                    workingNeg.length ?
                        workingNeg
                            : <Skeleton item="working" />

                }
                </section>
            </main>
            <section id="history">
            {
                history.length ?
                history.map( key => (
                    <>
                        <h3><div/><h4>{key}</h4><div/></h3>
                        {
                            JSON.parse(localStorage.getItem(key)).map(item => (
                                <>
                                    <p style={{ display: "none"}}>{ cycle += 1 }</p>
                                    { historyNumbers(item.results, item.dateOfResults, item.time, setWorkedHistory, setWorkedNegHistory, `${key}-${ cycle }` ) }
                                    <section className='history-workings'
                                        id={ `${key}-${ cycle }` }
                                    >
                                        <p><i>Plus</i></p>
                                    { workedHistory }
                                    <p><i>Minus</i></p>
                                    { workedNegHistory }
                                    </section>

                                </>
                            ))
                        }

                    </>
                ))
                    : Disclaimer(visible, setVisible)
            }
            </section>
            <footer>
                <h3>Copyright &copy; { date.getFullYear() }</h3>
            </footer>
        </>
  );
}

export default App;
