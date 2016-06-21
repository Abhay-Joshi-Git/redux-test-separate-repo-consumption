import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import IssueStore from 'redux-test-separate-math/store.js';
import { connect, Provider } from 'react-redux';


class separateReduxClient extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <View
            style={
                      {
                          alignSelf: 'stretch'
                      }
                }
        >
            {this.getIssuesList()}
        </View>
      </View>
    );
  }

  getIssuesList() {
      return this.props.issues.map(issue => {
          return (
              <View key={issue.id} style={
                        {
                            borderWidth: 1,
                            flex: 1,
                            alignItems: 'center'
                        }
                  }
              >
                  <Text>
                      id: {issue.id}
                  </Text>
                  <Text>
                      summary: {issue.summary}
                  </Text>
              </View>
          )
      })
  }
}

const mapStateToProps = (state) => {
    return {
        issues: state
    }
}

const WrappedClient = connect(
    mapStateToProps
)(separateReduxClient)

const App = () => (
    <Provider store={IssueStore}>
        <WrappedClient />
    </Provider>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('separateReduxClient', () => App);
