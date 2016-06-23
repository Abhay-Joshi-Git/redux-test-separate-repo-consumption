import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import IssueStore from 'redux-test-separate-math/store.js';
import PMTstore, {modules} from 'project-management-tool-redux';
import { connect, Provider } from 'react-redux';

class separateReduxClient extends Component {

    componentDidMount() {
        this.props.loadIssues({
            offset:40,
            qty:6
        });
    }

  render() {
    return (
      <View style={styles.container}>
        <Text>
            List of Issues
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
              <View key={issue.get('id')} style={
                        {
                            borderWidth: 1,
                            flex: 1,
                            alignItems: 'center'
                        }
                  }
              >
                  <Text>
                      id: {issue.get('id')}
                  </Text>
                  <Text>
                      summary: {issue.get('summary')}
                  </Text>
              </View>
          )
      })
  }
}

const mapStateToProps = (state) => {
    return {
        issues: state.get('issues')
    }
}

const WrappedClient = connect(
    mapStateToProps,
    {loadIssues: modules.issues.loadIssues}
)(separateReduxClient)

const App = () => (
    <Provider store={PMTstore}>
        <WrappedClient />
    </Provider>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});

AppRegistry.registerComponent('separateReduxClient', () => App);
