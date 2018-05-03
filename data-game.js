// Constant Variables
var FACTION = {
  GD: 'The Guild',
  RS: 'Resurrectionists',
  NB: 'Neverborn',
  AR: 'Arcanists',
  OU: 'Outcasts',
  TT: 'Ten Thunders',
  GR: 'Gremlins'
};

var REGION = [
  { code: 'R1', name: 'Region #1' },
  { code: 'R2', name: 'Region #2' },
  { code: 'R3', name: 'Region #3' },
  { code: 'R4', name: 'Region #4' },
  { code: 'R5', name: 'Region #5' },
  { code: 'R6', name: 'Region #6' },
  { code: 'R7', name: 'Region #7' },
  { code: 'R8', name: 'Region #8' },
  { code: 'R9', name: 'Region #9' },
  { code: 'R10', name: 'Region #10' }
];

// Game Data
var crew = {
  'test-crew-uuid-1': `Leader: Mr. Cooper - Cache:(2)
      Arcane Reservoir 2ss
      Cabaret Choreography 2ss
      A Ladys Secret 2ss
      Carlos Vasquez 9ss
      Stunt Double 1ss
      Imbued Protection 2ss
      Union Miner 5ss
      December Acolyte 7ss
      Miss Fire 6ss
      Mannequin 4ss
      Anna Lovelace 9ss`,

  'test-crew-uuid-2': `Leader: Von Schill - Cache:(1)
      Nythera Aftermath 1ss
      Oath of the Freikorps 1ss
      Scout the Field 1ss
      Steam Trunk 3ss
      Hodgepodge Emissary 10ss
      Conflux of Conflict 0ss
      Sue 8ss
      Return Fire 1ss
      Freikorps Engineer 6ss
      Freikorps Engineer 6ss
      Hodgepodge Effigy 4ss
      Freikorpsmann 5ss`,

  'test-crew-uuid-3': `Leader: Von Schill - Cache:(1)
      Nythera Aftermath 1ss
      Oath of the Freikorps 1ss
      Scout the Field 1ss
      Steam Trunk 3ss
      Hodgepodge Emissary 10ss
      Conflux of Conflict 0ss
      Sue 8ss
      Return Fire 1ss
      Freikorps Engineer 6ss
      Freikorps Engineer 6ss
      Hodgepodge Effigy 4ss
      Freikorpsmann 5ss`
};

var user = {
  'test-user-uuid-1': {
      uuid: 'test-user-uuid-1',
      name: 'Kitchu',
      picture: 'picture_steve.jpg',
      faction: FACTION.AR,
      crew: crew["test-crew-uuid-1"]
  },
  'test-user-uuid-2': {
      uuid: 'test-user-uuid-2',
      name: 'KimBaek',
      picture: 'picture_elyse.png',
      faction: FACTION.GR,
      crew: crew["test-crew-uuid-2"]
  },
  'test-user-uuid-3': {
      uuid: 'test-user-uuid-3',
      name: 'Behemoth',
      picture: 'picture_matthew.png',
      faction: FACTION.OU,
      crew: crew["test-crew-uuid-3"]
  }
};

var frame_record = {
  region: function () { return getRandomValue(REGION); },
  attacker: {
      info: function () { return getRandomValue(user); },
      point: function () { return getRandomInt(0, 11); },
      // win: false
  },
  defender: {
      // info: function () { return getRandomValue(user); }, // need to be diff with attacker.user
      point: function () { return getRandomInt(0, 11); },
      // win: false
  },
  datetime: function () { return new Date(2018, getRandomInt(1, 5), getRandomInt(1, 28), getRandomInt(12, 20), getRandomInt(0, 60)); }
};

// Post processes

/**
* Initializing battle record data
*/
function post_record () {
  // Import record data (Temporal)
  var recordData = generateRandomData(frame_record, 100);
  // Sorting
  return recordData.map(function (r) {
      r.defender.info = getRandomValue(user, r.attacker.info);
      r.attacker.win = r.attacker.point > r.defender.point;
      r.defender.win = r.attacker.point < r.defender.point;
      return r;
  });
}

/**
* Initializing territory data
*/
function post_territory () {
  // Reading from outer json file
  var territories = region_json || [];

  // Adding custom properties
  territories.features.forEach(function (r, i) {
      r.properties.index = i;
      r.properties.title = `Region #${i + 1}`;
  });

  return territories;
}

// Returning data
function getGameData () {
  return {
      user: user,
      record: post_record(),
      territory: post_territory()
  }
}
