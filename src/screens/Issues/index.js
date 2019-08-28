import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image,
  Dimensions,
  Linking,
} from 'react-native';
import {ButtonGroup} from 'react-native-elements';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import axios from 'axios';

const {width, height} = Dimensions.get('window');

export default function Issues({navigation}) {
  const [url, setUrl] = useState('');
  const [selected, setSelected] = useState(0);
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getIssues();
  }, []);

  useEffect(() => {
    if (selected === 0) {
      getIssues();
    }

    if (selected === 1) {
      getIssues('open');
    }

    if (selected === 2) {
      getIssues('closed');
    }
  }, [selected]);

  async function getIssues(filter) {
    try {
      setLoading(true);
      const {params} = navigation.state;
      const res = await axios.get(`${params.url}/issues`);
      setLoading(false);
      if (filter) {
        const resFilter = res.data.filter(item => item.state === filter);
        setIssues(resFilter);
        return;
      }
      setIssues(res.data);
    } catch (err) {
      console.log(err.response, 'ERRO');
    }
  }

  async function loadIssues() {
    getIssues();
  }

  const buttons = ['Todas', 'Abertas', 'Fechadas'];

  return (
    <View style={styles.container}>
      <View style={styles.viewAdd}>
        <ButtonGroup
          onPress={select => setSelected(select)}
          selectedIndex={selected}
          buttons={buttons}
          containerStyle={{width: width - 40, height: 50}}
        />
      </View>

      <View style={styles.line} />

      <View>
        <FlatList
          data={issues}
          renderItem={({item}) => (
            <TouchableOpacity
              style={styles.itemRepo}
              onPress={() => Linking.openURL(item.html_url)}>
              <Image
                source={{uri: item.user.avatar_url}}
                style={styles.imgRepo}
              />
              <View>
                <Text numberOfLines={1} style={styles.titleIssue}>
                  {item.title}
                </Text>
                <Text style={styles.loginUser}>{item.user.login}</Text>
              </View>
              <MaterialIcons
                name="keyboard-arrow-right"
                size={30}
                color="#999"
              />
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => String(index)}
          onRefresh={() => loadIssues()}
          refreshing={loading}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEEEEE',
    alignItems: 'center',
    paddingHorizontal: 20,
  },

  viewAdd: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginTop: 15,
  },
  inputAdd: {
    width: '90%',
    padding: 15,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
  },

  line: {
    width: '100%',
    height: 1,
    backgroundColor: '#999',
    marginVertical: 15,
  },

  itemRepo: {
    width: width - 40,
    padding: 10,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    borderRadius: 5,
  },

  imgRepo: {
    width: 60,
    height: 60,
  },

  titleIssue: {
    width: 200,
    fontWeight: 'bold',
  },
});
