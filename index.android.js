import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView
} from 'react-native';
import IssueStore from 'redux-test-separate-math/store.js';
import PMTstore, {modules} from 'project-management-tool-redux';
import { connect, Provider } from 'react-redux';
import InfiniteScrollView from 'react-native-infinite-scroll-view';

class separateReduxClient extends Component {

    constructor(props) {
        super();

        var ds = new ListView.DataSource({
            //rowHasChanged: (r1, r2) => !immutable.is(r1, r2)
            rowHasChanged: (r1, r2) => r1 !== r2
        })
        this.state = {
            dataSource: ds.cloneWithRows(props.issues.toArray()),
            issues: [...props.issues.toArray()]
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(nextProps.issues.toArray()),
            issues: [...nextProps.issues.toArray()]
        })
    }

    componentDidMount() {
        this.loadMoreContentAsync()
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.headerText}>
                    List of Issues
                </Text>
                <View style={styles.listViewContainer}>
                    {this.getIssuesList()}
                </View>
            </View>
        );
    }

    getIssuesList() {
        return (
            <ListView
                renderScrollComponent={props => <InfiniteScrollView {...props} />}
                dataSource={this.state.dataSource}
                renderRow={this.renderRow}
                canLoadMore={true}
                onLoadMoreAsync={this.loadMoreContentAsync.bind(this)}
            />
        )
    }

    loadMoreContentAsync() {
        this.props.loadIssues({
            offset: this.state.issues.length,
            qty: 16
        })
        return Promise.resolve(true)
    }

    renderRow(issue) {
        return (
            <View key={issue.get('id')} style={styles.issueCotainer}>
                <Text>
                    id: {issue.get('id')}
                </Text>
                <Text>
                    summary: {issue.get('summary')}
                </Text>
            </View>
        )
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
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
    },
    listViewContainer: {
        flex: 1
    },
    headerText: {
        fontSize: 30,
        marginBottom: 5
    },
    issueCotainer: {
        backgroundColor: 'rgb(240, 240, 240)',
        alignItems: 'flex-start',
        flex: 1,
        marginBottom: 2,
        paddingLeft: 5
    }
});

AppRegistry.registerComponent('separateReduxClient', () => App);
