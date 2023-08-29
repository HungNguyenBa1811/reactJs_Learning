const getMonthName = (monthNumber) => {
    const date = new Date();
    date.setMonth(monthNumber - 1);

    let longDate = date.toLocaleString('en-US', {
      month: 'long',
    });

    return longDate.toUpperCase().slice(0,3)
}
  
const FullTimer = () => {
    let fullTime = new Date() 
    let date = fullTime.getDate()
    let month = getMonthName(fullTime.getMonth())
    let year = fullTime.getFullYear()

    return (
        <div className="full_date_container">
            <h1 className="date">{date}</h1>
            <div className="month_year">
                <h1 className="month">{month}</h1>
                <h1 className="year">{year}</h1>
            </div>
        </div>
    )
}
export default FullTimer;