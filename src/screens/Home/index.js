import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import axios from 'axios';

const {width, height} = Dimensions.get('window');

export default function Home({navigation}) {
  const [repo, setRepo] = useState('react-community/react-navigation');
  const [repositories, setRepositories] = useState([]);
  useEffect(() => {}, []);

  async function addRepository(item) {
    try {
      const res = await axios.get(`https://api.github.com/repos/${item}`);
      const data = {
        id: res.data.id,
        name: res.data.name,
        organization: res.data.organization,
        avatar: res.data.organization.avatar_url,
        url: res.data.url,
      };
      setRepositories([...repositories, data]);
    } catch (err) {
      console.log(err.response);
      if (err.response.status === 404) {
        alert('Nenhum repositório encontrado');
        return;
      }
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.viewAdd}>
        <TextInput
          placeholder="Adicionar novo repositório"
          onChangeText={text => setRepo(text)}
          value={repo}
          style={styles.inputAdd}></TextInput>
        <TouchableOpacity
          style={styles.btnAdd}
          onPress={() => addRepository(repo)}>
          <Ionicons name="md-add" size={40} color="#333" />
        </TouchableOpacity>
      </View>

      <View style={styles.line} />

      <View>
        <FlatList
          data={repositories}
          renderItem={({item}) => (
            <TouchableOpacity
              style={styles.itemRepo}
              onPress={() => navigation.navigate('Issues', {url: item.url})}>
              {console.log(item, 'ITEM')}
              <Image source={{uri: item.avatar}} style={styles.imgRepo} />
              <View>
                <Text style={styles.titleRepo}>{item.name}</Text>
              </View>
              <MaterialIcons
                name="keyboard-arrow-right"
                size={40}
                color="#333"
              />
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => String(index)}
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
    justifyContent: 'space-between',
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

  titleRepo: {
    width: 200,
    fontWeight: 'bold',
  },
});
