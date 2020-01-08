/*El componente principal (App.js) contiene la lógica de la aplicación principal*/

import React from "react";
import { StyleSheet, View, Button } from "react-native";
import { Ionicons, FontAwesome, Entypo } from "@expo/vector-icons";

/*A continuación, se incluyen los componentes y el ayudante que creamos anteriormente*/
import HomeScreen from "./screens/HomeScreen";
import Score from "./screens/Score";
import Card from "./screens/Card";

//import helpers from './helpers';


/*contiene la lógica de la aplicación principal*/
export default class App extends React.Component {
  constructor(props) { //inicio del constructor
    super(props);

    // enlaza las funciones declaradas mas abajo a la clase, osea permite que se usen en App
    this.renderCards = this.renderCards.bind(this);
    this.resetCards = this.resetCards.bind(this);

    // icon sources
    // declara un objeto cuyos atributos son de distinto tipo
    let sources = {
      fontawesome: FontAwesome,
      entypo: Entypo,
      ionicons: Ionicons
    };

    // arreglo que representa las tarjetas generadas
    // the unique icons to be used
    let cards = [
      {
        src: "fontawesome", //fuente del icono
        name: "heart", //nombre del icono
        color: "red" //color del icono
      },
      {
        src: "entypo",
        name: "feather",
        color: "#7d4b12"
      },
      {
        src: "entypo",
        name: "flashlight",
        color: "#f7911f"
      },
      {
        src: "entypo",
        name: "flower",
        color: "#37b24d"
      },
      {
        src: "entypo",
        name: "moon",
        color: "#ffd43b"
      },
      {
        src: "entypo",
        name: "youtube",
        color: "#FF0000"
      },
      {
        src: "entypo",
        name: "shop",
        color: "#5f5f5f"
      },
      {
        src: "fontawesome",
        name: "github",
        color: "#24292e"
      },
      {
        src: "fontawesome",
        name: "skype",
        color: "#1686D9"
      },
      {
        src: "fontawesome",
        name: "send",
        color: "#1c7cd6"
      },
      {
        src: "ionicons",
        name: "ios-magnet",
        color: "#d61c1c"
      },
      {
        src: "ionicons",
        name: "logo-facebook",
        color: "#3C5B9B"
      }
    ];

    // crea el clon y configura las tarjetas
    let clone = JSON.parse(JSON.stringify(cards)); // crea un areglo completamente nuevo a partir del arreglo de tarjetas
    this.cards = cards.concat(clone); // Combina el original y el clon.

    // como cards es un arreglo se le aplica un metodo propio de matrices map
    // agrega ID, la fuente y establece el estado predeterminado para cada tarjeta
    this.cards.map((obj) => { //el mapeo aplica una funcion a cada elemeto de cards, donde obj (parametro) seria cada carta, en este caso tambien agrega otos atributos, id, is_open
      let id = Math.random() //genera un id aleatorio de numeros y letras
                    .toString(36)
                    .substring(7);
          obj.id = id;    //agrega id como atributo a card
          obj.src = sources[obj.src]; // del objeto sources se obtiene src
          obj.is_open = false;  //agrega is_open como atributo a card
    });

    this.cards = this.cards.shuffle(); //ordena las cartas al azar

    // establece el estado predeterminado o inicial
    this.state = {
      current_selection: [], //arreglo que contendrá cartas que están actualmente seleccionados por el usuario. Esto solo contendrá dos objetos a la vez
      selected_pairs: [], // areglo que se utiliza para excluir cartas de la selección posterior
      score: 0, // puntuación de usuario predeterminada
      cards: this.cards // las cartas barajadas
    };
  } //fin constructor

  render() {
    return (
      <View style={ styles.container }>
        <HomeScreen />
        <View style={ styles.body }>
          { this.renderRows.call(this) }
        </View>
        <Score score={ this.state.score } />
        <Button 
          onPress={ this.resetCards } 
          title="Reset"  
          color="#008CFA" 
        />
      </View>
    );
  }
  
  //permite representar las filas de cartas individual. La pantalla tendrá seis filas que contiene cuatro cartas:
  renderRows() {
    let contents = this.getRowContents(this.state.cards);
    //index esto va como props de la funcion
    return contents.map((cards) => {  //map genera cards e index y son usados por la funcion commo parametros
      {console.log("INDEX256")}
      //{console.log(45)}
      //key={index} esto estaba dentro de view  
      return (
        <View style={styles.row}>
          { this.renderCards(cards) }
          
        </View>
      );
    });     
  }

  //saca cartas del arreglo generado de cartas y forma una matriz que contiene N arreglos de 4 elementos cada uno 
  getRowContents(cards) {
    let contents_r = []; //arreglo 1 
    let contents = [];  //arreglo 2
    let count = 0;
    cards.forEach((item) => { //saca elementos del arreglo de cartas generado
      count += 1;
      contents.push(item);  //coloca una carta en arreglo 2
      if (count == 4) {
        contents_r.push(contents); //cuando arreglo 2 tiene 4 elementos lo guarda en arreglo 1
        count = 0;
        contents = [];
      }
    });
    return contents_r;
  }

  //agrega una key a cada carta  y el click para det cuando una carta fue elegida 
  renderCards(cards) {
    return cards.map((card, index) => { //map realiza un mapeo sobre cada elemento de cards y su indice, los coloca como parametros
      //console.log(index); //Key={index}
      return ( 
        <Card 
          Key={index}
          src={card.src}
          name={card.name}
          color={card.color}
          is_open={card.is_open}
          clickCard={this.clickCard.bind(this, card.id)}
        />
      );
    });
  }

  //actualiza el estado para mostrar el icono de la tarjeta
  clickCard(id) {
    let selected_pairs = this.state.selected_pairs; //contendrá cartas que están actualmente seleccionados por el usuario. Esto solo contendrá dos objetos a la vez
    let current_selection = this.state.current_selection; //areglo que se utiliza para excluir cartas de la selección posterior
    let score = this.state.score;

    // obtiene el índice de la tarjeta seleccionada actualmente 
    let index = this.state.cards.findIndex(card => { 
      return card.id == id;
    });

    let cards = this.state.cards;

    // la tarjeta no debería estar abierta y no se encuentra en el conjunto de tarjetas cuyos pares ya están seleccionados
    if (
      cards[index].is_open == false &&
      selected_pairs.indexOf(cards[index].name) === -1
    ) {
      // codigo para procesar la tarjeta selecionada
      cards[index].is_open = true;
      current_selection.push({
        index: index,
        name: cards[index].name
      });

      

      //código para determinar si el usuario ha seleccionado el par correcto o no
      if (current_selection.length == 2) {
        if (current_selection[0].name == current_selection[1].name) {
          score += 1;
          console.log("PUNTAJE")
          console.log(score);
          selected_pairs.push(cards[index].name);
        } else {
          cards[current_selection[0].index].is_open = false;
          setTimeout(() => {
            // retrasar el cierre de la tarjeta actualmente seleccionada por medio segundo.
            cards[index].is_open = false;
            this.setState({
              cards: cards
            });
          }, 500);
        }
      }
      current_selection = [];
    }

    // para actualizar el estado
    this.setState({
      score: score,
      cards: cards,
      current_selection: current_selection
    });
  }

  resetCards() {
    // cierra todas las tarjetas
    let cards = this.cards.map(obj => {
      obj.is_open = false;
      return obj;
    });
    cards = cards.shuffle(); // volver a barajar las cartas

    // actualizar al estado predeterminado
    this.setState({
      current_selection: [],
      selected_pairs: [],
      cards: cards,
      score: 0
    });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: "stretch",
    backgroundColor: "#fff"
  },
  row: {
    flex: 1,
    flexDirection: "row"
  },
  body: {
    flex: 18,
    justifyContent: "space-between",
    padding: 10,
    marginTop: 20
  }
});
