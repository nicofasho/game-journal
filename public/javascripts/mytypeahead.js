var gameTitle = new Bloodhound({
  datumTokenizer: Bloodhound.tokenizers.obj.whitespace('value'),
  queryTokenizer: Bloodhound.tokenizers.whitespace,
  remote: {
    url: 'https://www.giantbomb.com/api/games/?api_key=1caccf71c9a065ba4b6ffc5d97d73ec83dc5dfc1&filter=name:%QUERY&field_list=name,guid&format=json',
    wildcard: '%QUERY',
    rateLimitWait: 1000
  }
});

$('#remote .typeahead').typeahead(null, {
  name: 'gameTitle',
  display: 'value',
  source: gameTitle
});
