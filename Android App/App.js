import React, {Component} from 'react'
import { ActivityIndicator,TextInput, View, Text , StyleSheet, Button} from 'react-native';

import { ApolloProvider, graphql, Mutation } from "react-apollo";
import ApolloClient from "apollo-boost";
import gql from "graphql-tag";

const client = new ApolloClient({uri: 'http://192.168.1.199:5000/graphql'});

const custDel = gql`
  mutation custDel($id: String!) {
    custDel(id: $id) {
      id
    }
  }
`;

export default class App extends Component {
	state = {
	id: ''
  };
	
  render(){
    return (
      <ApolloProvider client={client}>
        <View style={styles.container}>
          <Mutation mutation={custDel}>
            {(delIDMutation) => (
              <View>
                <Text style={styles.welcome}>Delete ID:</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={text => this.setState({ id: text })}
                  value={this.state.id}
                  placeholder="ID"
                />
                <Text></Text>
                <Button
                  onPress={() => {
                    delIDMutation({
                      variables: {
                        id: this.state.id
                      }
                    })
                      .then(res => res)
                      .catch(err => <Text>{err}</Text>);
                    this.setState({ id: ''});
                  }}
                  title="Delete Customer"
                />
              </View>
            )}
          </Mutation>
        </View>
      </ApolloProvider>
    );
  }
}


styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  input: {
    backgroundColor: '#dddddd',
    height: 50,
    margin: 20,
    marginBottom: 0,
    paddingLeft: 10
  }
})