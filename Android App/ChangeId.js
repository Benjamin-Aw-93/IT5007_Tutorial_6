import React, { Component } from 'react'
import { TouchableHighlight, View, Text, TextInput, StyleSheet , Button} from 'react-native'

export default class ChangeText extends Component {
  constructor(props) {
    super(props);
    this.state = { id: '' };
  }
  
  delAndClear = () => {
  this.props.updateID(this.state.id)
  
  this.setState({
    id: ''
  })
}

  render() {
    return (
      <View>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(id) => this.setState({id})}
          value={this.state.id}
        />
		<Text style={{textAlign: 'center'}}></Text>
        <Button
          onPress={this.delAndClear}
          title='Delete Customer'
          accessibilityLabel='Learn more about this purple button'      
          placeholder='Enter text...'
          />
      </View>
    );
  }
}