import logo from "../Assets/Page1/logo_only.png"
import title from "../Assets/Page1/only_text.png"

const Header_language_switch = ({japanese, setJapanese, location}) => {

    const translateSwitchHandler = () => {
        if(japanese === true){
            setJapanese(false)
        }else{
            setJapanese(true)
        }
    }

    return (
        <div className="HeaderContainer">
            <img className="pokemonLogo" src={logo}></img>
            <img className="title" src={title}></img>
             <div onClick={()=>{translateSwitchHandler()}} className="translateSwitch">
                 {japanese ? <p className="languageP">ENGLISH</p> : <p className="languageP">日本語</p>}
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

export default Header_language_switch