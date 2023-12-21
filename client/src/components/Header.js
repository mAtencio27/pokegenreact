import logo from "../Assets/Page1/logo_only.png"
import title from "../Assets/Page1/only_text.png"

const Header = ({japanese, setJapanese}) => {

    const translateSwitchHandler = () => {
        console.log(japanese)
        setJapanese(true)
        console.log(japanese)
    }

    return (
        <div className="HeaderContainer">
            <img className="pokemonLogo" src={logo}></img>
            <img className="title" src={title}></img>
            <div onClick={()=>{translateSwitchHandler()}} className="translateSwitch">
                <p>EN/JP</p>
            </div>
            {/* <img className="translateSwitch" src={logo}></img> */}
            {/* <p>アースシールド　カード生成サイト</p> */}
            {/* <p className="headerTopics">コンセプト</p>
            <p className="headerTopics">環境問題について知ろう</p>
            <p className="headerTopics">ヒントを見る</p>
            <p className="headerTopics">カード一覧</p> */}
        </div>
    )
}

export default Header