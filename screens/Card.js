import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // use FontAwesome from the expo vector  icons

/*permite mostrar las cartas*/
export default class Card extends React.Component {
 
  render() {
     
    /*las variables declaradas por let tienen por alcance el bloque en el que se han definido*/
    
    //toda carta por defecto tiene un simbolo, fuente y color
    let CardSource = FontAwesome; // setea una carta por defecto con un signo de pregunta
    let icon_name = 'question-circle';
    let icon_color = '#393939';
     
    //si se selecciona la carta se le pasan (props) la fuente e icono
    if (this.props.is_open) { 
      CardSource = this.props.src;
      icon_name = this.props.name;
      icon_color = this.props.color;
    }
     
    return (
      <View style={styles.card}>
        <TouchableHighlight onPress={this.props.clickCard} activeOpacity={0.75} underlayColor={"#f1f1f1"}>
          <CardSource 
            name={icon_name} 
            size={50} 
            color={icon_color} 
          />
        </TouchableHighlight>   
      </View>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    alignItems: 'center'
  },
  card_text: {
    fontSize: 50,
    fontWeight: 'bold'
  }
});

/*https://developer.mozilla.org/es/docs/Web/JavaScript/Una_re-introducci%C3%B3n_a_JavaScript --> Objetos personalizados */

/*JavaScript utiliza las funciones como si fueran clases, osea que un objeto puede definirse por medio de una funcion*/
/*en este caso el objeto es Array y Array.prototype.shuffle es un objeto compartido por todas las instancias de Array.*/
/*podria decirse que shuffle es un metodo de Array*/
/*JavaScript te permite modificar el prototipo de algo en cualquier parte de tu programa, lo que significa que puedes 
  agregar métodos adicionales a los objetos que existan en tiempo de ejecución */

/*permite ordenar la matriz de las tarjetas en orden aleatorio para que su orden será diferente cada vez que se reinicia el juego */
  Array.prototype.shuffle = function() {
  var i = this.length, j, temp;
  if (i == 0) return this;
  while (--i) {
    j = Math.floor(Math.random() * (i + 1));
    temp = this[i];
    this[i] = this[j];
    this[j] = temp;
  }
  return this;
}

/*"this" hace referencia al objeto, en este caso es Array*/

