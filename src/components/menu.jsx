export default function Menu(props) {
    return (
        <div className="menu-container">
            <h1>
                <span className="q">Q</span>
                <span className="u">U</span>
                <span className="i">I</span>
                <span className="z">Z</span>
                <span className="z">Z</span>
                <span className="e">E</span>
                <span className="r">R</span>
                
              </h1>
            <button onClick={() => props.start()} className="btn-start">Start</button>
        </div>)

}