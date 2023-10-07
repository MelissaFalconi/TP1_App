import { StatusBar } from "expo-status-bar";
import { FlatList, StyleSheet, Text, View, Image, TextInput } from "react-native";
import axios from "axios";
import { useState, useEffect } from "react";

export default function App() {
  const [drinks, setDrinks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (text) => {
    setSearchQuery(text);
  };

  const filteredDrinks = drinks.filter((drink) => drink.strDrink.toLowerCase().startsWith(searchQuery.toLowerCase()));

  useEffect(() => {
    const fetchDrinks = async () => {
      const response = await axios.get("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=all");
      setDrinks(response.data.drinks);
    };
    fetchDrinks();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Bebidas</Text>
      <TextInput
        style={styles.searchInput}
        placeholder='Busca bebidas...'
        defaultValue={searchQuery}
        onChangeText={handleSearch}></TextInput>
      {filteredDrinks.length === 0 ? (
        <View style={styles.noResultsContainer}>
          <Text style={styles.noResultsText}>No se encontró resultados</Text>
        </View>
      ) : (
        <FlatList
          data={filteredDrinks}
          renderItem={({ item }) => (
            <View style={styles.drinkContainer}>
              <Image style={styles.drinkImage} source={{ uri: item.strDrinkThumb }}></Image>
              <Text style={styles.drinkName}>{item.strDrink}</Text>
            </View>
          )}
          keyExtractor={(item) => item.idDrink}></FlatList>
      )}

      <StatusBar style='auto' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#37BBDF",
    alignItems: "center",
    justifyContent: "center",
    
  },
  text: {
    fontSize: 40,
    margin: 20,
    fontWeight:"bold",
  },
  drinkContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  drinkImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 20,
  },
  drinkName: {
    fontSize: 18,
  },
  searchInput: {
    width: "80%",
    height: 40,
    borderWidth: 3,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 20,
    marginBottom: 25,
    fontSize: 18,
  },
  noResultsContainer: {
    marginTop: 10,
  },
  noResultsText: {
    fontSize: 18,
    color: "red",
    marginBottom: 600,
    fontWeight:"bold",
  },
});
