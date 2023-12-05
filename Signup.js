import React, { Component } from 'react';
import { Text, TextInput, View, Button, StyleSheet } from 'react-native';
import validator from 'validator';

class SignupScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      error: {
        email: '',
        password: '',
      },
      successMessage: ''
    };
  }

  validate = () => {
    let isError = false;
    const errors = {
      email: '',
      password: '',
    };

    if (!this.state.email) {
      isError = true;
      errors.email = 'Email is required';
    } else if (!validator.isEmail(this.state.email)) {
      isError = true;
      errors.email = 'Email is invalid';
    }

    if (!this.state.password) {
      isError = true;
      errors.password = 'Password is required';
    } else if (this.state.password.length < 8) {
      isError = true;
      errors.password = 'Password must be at least 8 characters long';
    }

    this.setState({
      ...this.state,
      error: errors
    });

    return isError;
  };

  login = () => {
    const error = this.validate();
    if (!error) {
      this.setState({
        ...this.state,
        successMessage: `Successful login for ${this.state.email}`,
        email: '',
        password: '',
        error: {
          email: '',
          password: '',
        },
      });
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>{this.state.error.email}</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={this.state.email}
          onChangeText={email => this.setState({ email })}
        />
        <Text style={styles.error}>{this.state.error.password}</Text>
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={true}
          value={this.state.password}
          onChangeText={password => this.setState({ password })}
        />
        <Button title="Log in" onPress={this.login} />
        <Text style={styles.success}>{this.state.successMessage}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  input: {
    width: 200,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10
  }
});

export default SignupScreen;