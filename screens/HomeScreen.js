import React from "react";
import { StyleSheet, Text, View } from "react-native";

/*Los componentes permiten separar la interfaz de usuario en piezas independientes, 
reutilizables y pensar en cada pieza de forma aislada*/

/* los componentes se defienen como clases o funciones de java Sript*/

/* los componentes aceptan entradas arbitrarias (llamadas “props”) 
y devuelven a React elementos que describen lo que debe aparecer en la pantalla.*/

/*los componentes pueden ser basicos (sin estados/Stateless) o de estado*/

/*componentes Stateless pueden declararse por medio de una clase o por medio de una funcion*/

/*sintaxis para uso como funcion --> 
  const name = ({prop1, prop2}) => ()
  ej: conts title = ({message}) => (
    <Text> {message} </Text>
  )

  ej: conts app = () => (
    <View>
      <Title title = ejemplo de componente sin estado/>
    </view>
  )
*/

/*componentes con estados, necesitan metodos de ciclo de vida*/

/*ej:
class Example extends Component {
  constructor (props) {
  super(props)
  this.state = {
    name: "Sriraman"
  }
}
  render () {
    return (
      <View>
        <Text> Hi, {this.state.name}</Text>
      </View>
    )
  }
}
*/


//genera un estilo para que coincida con la interfaz de usuario de nuestra aplicación
export default class HomeScreen extends React.Component { /*extender React.Component, permite definir una clase como componente */

  /*la funcion render() es el único componente que le da bola un componente de clase*/

  /* la re utilización de código se consigue principalmente a través de la composición en lugar de la herencia
  https://es.reactjs.org/docs/composition-vs-inheritance.html*/

  render() { 
    return (
      <View style={StyleSheet.homeSreen}>
        <Text style={StyleSheet.homeSreen_text}> MEMORY GAME </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({ /*permite definir varios estilos en un solo lugar */
  homeScreen: {
    flex: 1,
    flexDirection: 'column',
    alignSelf: 'stretch',
    paddingTop: 20,
    paddingBottom: 5,
    backgroundColor: '#f3f3f3'
  },
  homeScreen_text: {
    fontWeight: 'bold',
    fontSize: 17,
    textAlign: 'center'
  }
});

/*
"const" representa la declaracion de una variable, un objeto, un elemento
 
const name = 'Josh Perez'; --> declara una variable

const user = { --> declara un objeto y sus atributos
  firstName: 'Harper',
  lastName: 'Perez'
};

const element = ( --> declara un elemnto (algo que se va a representar)
  <h1>
    Hello, {formatName(user)}! --> cuando se inserta una expresion se hace siempre entre {}
  </h1>
);

function formatName(user) { --> funcion usada en element, la cual usa los atributos del objeto user
  return user.firstName + ' ' + user.lastName;
}

*/