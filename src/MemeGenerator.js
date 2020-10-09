import React from "react"

class MemeGenerator extends React.Component {
    state = {
        topText: "",
        bottomText: "",
        randomImg: "http://i.imgflip.com/1bij.jpg",
        allMemeImgs: []
    }

    componentDidMount() {
        fetch("https://api.imgflip.com/get_memes")
            .then(response => response.json())
            .then(response => {
                const {memes} = response.data
                this.setState ({ allMemeImgs: memes })
            })
    }

    handleChange = (event) => {
        const {name, value} = event.target
        this.setState({ [name]: value })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        const randNum = Math.floor(Math.random() * this.state.allMemeImgs.length)
        const randMemeImg = this.state.allMemeImgs[randNum].url
        this.setState({ randomImg: randMemeImg })
    }

    render() {
        return (
            <div>
                <form className="meme-form" onSubmit={this.handleSubmit}>
                    <input
                        name="topText"
                        type="text"
                        value={this.state.topText}
                        placeholder="Top Text"
                        onChange={this.handleChange}
                        maxLength="15"
                        autoComplete="off"
                    />
                    <input
                        name="bottomText"
                        type="text"
                        value={this.state.bottomText}
                        placeholder="Bottom Text"
                        onChange={this.handleChange}
                        maxLength="13"
                        autoComplete="off"
                    />
                    <button>Change meme</button>
                </form>
                <div className="meme">
                    <img src={this.state.randomImg} alt="Random meme"/>
                    <h2 className="top">{this.state.topText}</h2>
                    <h2 className="bottom">{this.state.bottomText}</h2>
                </div>
            </div>
        )
    }
}

export default MemeGenerator