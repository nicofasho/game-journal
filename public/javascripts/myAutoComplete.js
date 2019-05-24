new autoComplete({
  data: {
    src: async () => {
      const source = await fetch(`https://www.giantbomb.com/api/games/?api_key=${token}&field_list=name,guid,original_release_date&format=json&filter=name:${name}`);
      return source.results.name;
    },
    key: ["name"],
    cache: true
  },
  sort: (a,b) => a - b,
  placeHolder: "Game Title",
  selector: "#autoComplete",
  threshold: 3,
  debounce: 300,
  searchEngine: "strict",
  resultsList: {
    destination: document.getElementById('gameTitle'),
    position: "afterend",
    element: "ul"
  },
  resultItem: {
    content: (data, sou) => {
      return `${sou.results.name}`;
    },
    element: "li"
  },
  highlight: true,
  maxResults: 10

});
