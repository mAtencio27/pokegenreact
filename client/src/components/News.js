import { useState } from "react"


const News = () => {

    const [news,setNews] = useState([{date:"2023.04.25 15:30", news:"some news announcements"}]);

    return (
        <div className="news">
            <h2>NEWS</h2>
            <p>{news[0].date}</p>
        </div>
    )
}

export default News