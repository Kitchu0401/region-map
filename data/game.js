// Constant Variables
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

var RESULT = {
    WIN: Symbol('Win'),
    LOSE: Symbol('Lose'),
    DRAW: Symbol('Draw'),
}

var FACTION = {
    GD: {
        name: 'The Guild',
        color: 'red'
    },
    RS: {
        name: 'Resurrectionists',
        color: 'green'
    },
    NV: {
        name: 'Neverborn',
        color: 'purple'
    },
    AR: {
        name: 'Arcanists',
        color: 'blue'
    },
    OU: {
        name: 'Outcasts',
        color: 'yellow'
    },
    TT: {
        name: 'Ten Thunders',
        color: 'orange'
    },
    GR: {
        name: 'Gremlins',
        color: 'brown'
    }
};

// Data object for returning result
var _result = {};

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

    'test-crew-uuid-2': `Leader: Wong - Cache:(3)
        A Gremlin's Luck 1ss
        Old Cranky 4ss
        Sammy LaCroix 7ss
        Ooo Glowy 1ss
        Burt Jebson 8ss
        Dirty Cheater 1ss
        Swine-Cursed 7ss
        Swine-Cursed 7ss
        Lightning Bug 5ss
        Lightning Bug 5ss`,

    'test-crew-uuid-3': `Leader: Collodi - Cache:(3)
        Strum the Threads 1ss 
        Bag of Props 1ss 
        Threads of Fate 1ss 
        Marionette 3ss 
        Marionette 3ss 
        Marionette 3ss 
        Brutal Effigy 4ss 
        Arcane Effigy 4ss 
        Beckoner 6ss 
        Lazarus 10ss 
        Retribution's eye 1ss 
        Hannah 10ss 
        Fears Given Form 1ss`,

    'test-crew-uuid-4': `Leader: Asami Tanaka - Cache:(3)
        Borrowed Time 1ss
        A Heavenly Design 2ss
        Amanjaku 3ss
        Ohaguro Bettari 8ss
        The Fate of Mortals 2ss
        Toshiro The Daimyo 9ss
        Yasunori 13ss
        Mr. Tannen 6ss
        Tengu 4ss`,

    'test-crew-uuid-5': `Leader: Leveticus - Cache:(1)
        Pariah of Iron 1ss 
        Untimely Demise 1ss 
        From Ash 2ss 
        Hollow Waif 0ss 
        Hollow Waif 0ss 
        Rusty Alyce 10ss 
        From the Aether 2ss 
        Peacekeeper 11ss 
        Talos 8ss 
        Lazarus 10ss 
        Abomination 4ss`,

    'test-crew-uuid-6': `Leader: Lucius - Cache:(4)
        Deep Pockets 2ss
        Condescending 1ss
        Secret Assets 2ss
        The Scribe 2ss
        Captain Dashel 8ss
        Watch My Back 2ss
        Arrast Him 0ss
        Guild Rifleman 5ss
        Guild Rifleman 5ss
        Guild Rifleman 5ss
        Guild Rifleman 5ss
        Warden 6ss
        Thalarian Queller 6ss`,

    'test-crew-uuid-7': `Leader: Seamus - Cache:(3)
        AKA, Sebastian Baker 1ss
        Do You Know Who I Am? 1ss
        Sinister Reputation 1ss
        Copycat Killer 3ss
        Madame Sybelle 8ss
        Bleeding Tongue 1ss
        Dead Rider 10ss
        My Little Helper 1ss
        Rogue Necromancy 10ss
        Rotten Belle 5ss
        Rotten Belle 5ss`
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
      faction: FACTION.NV,
      crew: crew["test-crew-uuid-3"]
  },
  'test-user-uuid-4': {
      uuid: 'test-user-uuid-4',
      name: 'Unibuni',
      picture: 'picture_elliot.jpg',
      faction: FACTION.TT,
      crew: crew["test-crew-uuid-4"]
  },
  'test-user-uuid-5': {
      uuid: 'test-user-uuid-5',
      name: '브이',
      picture: 'picture_helen.jpg',
      faction: FACTION.OU,
      crew: crew["test-crew-uuid-5"]
  },
  'test-user-uuid-6': {
      uuid: 'test-user-uuid-6',
      name: '대구총잡이',
      picture: 'picture_molly.png',
      faction: FACTION.GD,
      crew: crew["test-crew-uuid-6"]
  },
  'test-user-uuid-7': {
      uuid: 'test-user-uuid-7',
      name: '푸백곰',
      picture: 'picture_stevie.jpg',
      faction: FACTION.RS,
      crew: crew["test-crew-uuid-7"]
  }
};

var frame_record = {
  region: function () { return getRandomValue(_result.territory.features).properties; },
  attacker: {
      info: function () { return getRandomValue(user); },
      point: function () { return getRandomInt(0, 11); },
      // result: RESULT.(WIN|LOSE|DRAW)
  },
  defender: {
      // info: function () { return getRandomValue(user); }, // need to be diff with attacker.user
      point: function () { return getRandomInt(0, 11); },
      // result: RESULT.(WIN|LOSE|DRAW)
  },
  datetime: function () { return new Date(2018, getRandomInt(1, 5), getRandomInt(1, 28), getRandomInt(12, 20), getRandomInt(0, 60)).getTime(); }
};

// Post processes
var post_process = {
    territory: function () {
        // Reading from outer json file
        var territories = region_json || [];
      
        // Adding custom properties
        territories.features.forEach(function (r, i) {
            r.properties.index = i;
            r.properties.code = `R${i + 1}`;
            r.properties.title = `Region #${i + 1}`;
        });
      
        return territories;
    },
    record: function () {
        // Import record data (Temporal)
        var recordData = generateRandomData(frame_record, 100);
        return _.orderBy(recordData, ['datetime'], ['asc']).map(function (r) {
            var winner;
            r.defender.info = getRandomValue(user, r.attacker.info);
            if (r.attacker.point > r.defender.point) {
                r.attacker.result = RESULT.WIN;
                r.defender.result = RESULT.LOSE;
                winner = r.attacker.info.faction;
            } else if (r.attacker.point < r.defender.point) {
                r.attacker.result = RESULT.LOSE;
                r.defender.result = RESULT.WIN;
                winner = r.defender.info.faction;
            } else {
                r.attacker.result = RESULT.DRAW;
                r.defender.result = RESULT.DRAW;
            }
            
            // Update territory occupation
            if (!!winner) _.find(_result.territory.features, function (t) { return t.properties.code === r.region.code; }).properties.occupiedBy = winner;
            return r;
        });
    }
}

// Returning data
function getGameData () {
    // Do data post-process
    _result.user = user;
    _result.territory = post_process.territory();
    _result.record = post_process.record();

    return _result;
}
