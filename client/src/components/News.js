import { useState } from "react"


const News = () => {

    const [news,setNews] = useState([{date:"2023.04.25 15:30", news:"some news announcements"},{date:"2023.04.29 11:30", news:"some news announcements"}]);

    const newsMaker = () =>{
        let articleArr = [];

        for(let article of news){
            articleArr.push(
                <div className="singleNews" key={article.date}>
                    <ul>
                        <li>{article.date}</li>
                    </ul>
                    <p className="newsParagraph">{article.news}</p>
                </div>
            )
        };

        return articleArr
    };

    return (
        <div className="news">
            <div className="newsContainer">
                {newsMaker()}
            </div>
            
        </div>
    )
}

export default News