import { Component } from "react";

import { Alert, Row, Col, Divider, Statistic } from "antd";

import Word from "./components/Word";
import InputWord from "./components/InputWord";

import ModalAbout from "./components/ModalAbout";
import ModalGameOver from "./components/ModalGameOver";
import ModalHelp from "./components/ModalHelp";

import { data } from "./assets/vocabulary.js";
import { alphabet } from "./assets/alphabet.js";

import './App.css';


class Lingo extends Component {
  state = {
    choosenName: [],
    wordList: [],
    name: [],
    lastCorrectWord: "",
    lastWrongWord: "",
    definition: "",
    counter: 0,
    isInfoModalOpened: true,
    isHelpOpened: false,
    wrongWord: false,
    isGameOverModalOpened: false,
    points: 0,
    wordCount: 0,
    usedHelp: false,
    winInfo: {
      visible: false
    }
  };


  componentDidMount() {
    document.addEventListener("keydown", this.keydownHandler);
    document.addEventListener('contextmenu', (e) => {
      e.preventDefault();
    }); 
    let item =
      data.vocabulary[Math.floor(Math.random() * data.vocabulary.length)];
    this.setState({
      choosenName: [...item.title.toUpperCase()],
      definition: item.definition,
    });
  }


  componentWillUnmount() {
     
    document.removeEventListener("keydown", this.keydownHandler);
    document.removeEventListener("contextmenu", ()=>{});
  }

  listenEvent = (e) => {
    console.log("!!!")
    console.log("event:", e)
  }

  resetGame = () => {
    let item =
      data.vocabulary[Math.floor(Math.random() * data.vocabulary.length)];
    const cleanList = [];

    this.setState({
      wordList: [...cleanList],
      choosenName: [...item.title.toUpperCase()],
      definition: item.definition,
      name: cleanList,
      usedHelp: false,
    });

    this.closeModal();
  };

  keydownHandler = (event) => {
    const {
      name,
      counter,
      wordList,
      choosenName,
      points,
      wordCount,
      usedHelp,
      definition
    } = this.state;

    if (this.state.isGameOverModalOpened) {
      return;
    }

    if (event.key.toUpperCase() === "Q") {
      this.setState({
        isInfoModalOpened: true,
      });
    }

    // HELP ME - būtu jādzēš ārā
    if (event.key.toUpperCase() === "Y") {
      console.log(choosenName)
    }


    if (event.key.toUpperCase() === "X") {
      this.setState({
        isHelpOpened: true,
        usedHelp: true,
      });
    }

    // IZDZEŠAM NO MASĪVA BURTUS
    if (
      event.key.toUpperCase() === "DELETE" ||
      event.key.toUpperCase() === "BACKSPACE"
    ) {
      this.setState({
        name: name.slice(0, -1),
        counter: counter + 1,
        wrongWord: false,
      });
    }

    // LOĢIKA, KUR APSTIPRINA VARDU
    if (name.length == 5 && event.key.toUpperCase() === "ENTER") {
      if (this.findWord(name) === undefined) {
        this.setState({
          wrongWord: true,
        });
      } else {
        let uppercaseName = name.join("").toUpperCase();
        let uppercaseChoosenName = choosenName.join("").toUpperCase();

        // console.log(upercaseName, upercaseChoosenName);

        if (uppercaseName === uppercaseChoosenName) {
          console.log("VĀRDS UZMINĒTS!!! APSVEICU!");

          let addPointCount = 0;
          switch (wordList.length) {
            case 0:
              addPointCount = 10;
              break;
            case 1:
              addPointCount = 5;
              break;
            case 2:
              addPointCount = 3;
              break;
            case 3:
              addPointCount = 2;
              break;
            case 4:
              addPointCount = 1;
              break;
            default:
              addPointCount = 0;
              break;
          }

          if (usedHelp) {
            addPointCount = 0;
          }

          this.setState({
            lastCorrectWord: uppercaseName,
            points: points + addPointCount,
            wordCount: wordCount + 1,
            winInfo: {
              visible: true,
              word: uppercaseChoosenName,
              description: definition
            }
          });

          this.resetGame();
        } else {
          let newWordList = wordList.concat(name.join("").toUpperCase());
          this.setState({
            wordList: newWordList,
            name: "",
          });
        }

        // game over
        if (wordList.length >= 4) {
          this.setState({
            isGameOverModalOpened: true,
            lastWrongWord: uppercaseChoosenName,
            points: 0,
            wordCount: 0,
          });
          return;
        }
      }
    }

    if (name.length > 4) return false;

    if (alphabet.some((element) => event.key.toUpperCase() === element)) {
      //console.log("event key:", event.key);
      this.setState({
        name: [...name, event.key.toUpperCase()],
        counter: this.state.counter + 1,
      });
    }
  };

  findWord = (word) => {
    const w = word.join("").toLowerCase();
    return data.vocabulary.find((name) => name.title === w);
  };

  closeModal = () => {
    this.setState({
      isInfoModalOpened: false,
      isHelpOpened: false,
      isGameOverModalOpened: false,
    });
  };

  closeGameOverModel = () => {
    this.setState({
      isGameOverModalOpened: false,
    });
  };

  render() {
    const {
      name,
      choosenName,
      definition,
      wrongWord,
      isHelpOpened,
      isInfoModalOpened,
      wordList,
      lastCorrectWord,
      lastWrongWord,
      isGameOverModalOpened,
      points,
      wordCount,
      winInfo
    } = this.state;

    return (
      <div style={{width:"445px", margin: "0 auto"}}>
        <Row>
          <Col>
            <Word
              firstChar={choosenName[0]}
              choosenName={choosenName}
              name={!!wordList[0] ? wordList[0] : ""}
            />
          </Col>
          <Col>
            <Word
              choosenName={choosenName}
              name={!!wordList[1] ? wordList[1] : ""}
            />
          </Col>
          <Col>
            <Word
              choosenName={choosenName}
              name={!!wordList[2] ? wordList[2] : ""}
            />
          </Col>
          <Col>
            <Word
              choosenName={choosenName}
              name={!!wordList[3] ? wordList[3] : ""}
            />
          </Col>
          <Col>
            <Word
              choosenName={choosenName}
              name={!!wordList[4] ? wordList[4] : ""}
            />
          </Col>
          <Col>
            <Divider style={{ margin: "4px 0" }} />
            <InputWord wrongWord={wrongWord} name={name} />
          </Col>
        </Row>
        <Divider style={{ margin: "4px 0" }} />
        <Row>
          <Col span={6}>
            <Statistic title="Punkti" value={points} />
          </Col>
          <Col span={6}>
            <Statistic title="Atminētie vārdi" value={wordCount + "/1268"} />
          </Col>
          <Col span={6}>
            <Statistic
              title="Zinu vārdu"
              value={!!lastCorrectWord ? lastCorrectWord : "-"}
            />
          </Col>
          <Col span={6}>
            <Statistic
              title="Nezinu vārdu"
              value={!!lastWrongWord ? lastWrongWord : "-"}
            />
          </Col>
        </Row>
        <ModalHelp
          title="Palīdzība"
          open={isHelpOpened}
          definition={definition}
          closeModal={this.closeModal}
        />

        <ModalAbout
          title="Īsumā par react Lingo lietotni"
          open={isInfoModalOpened}
          closeModal={this.closeModal}
        />

        <ModalGameOver
          title="Ui, nekas, tā gadās..."
          open={isGameOverModalOpened}
          closeModal={this.resetGame}
          choosenName={choosenName}
          definition={definition}
        />
        
        { winInfo.visible &&
              <Alert message={"Atminētais vārds: " + winInfo.word || ""} description={winInfo.description || ""} type="success" showIcon closable />
        }
      </div>
    );
  }
}

export default Lingo;
