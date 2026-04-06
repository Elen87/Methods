import Character from '../src/js/Character';
import Bowerman from '../src/js/Bowerman';
import Swordsman from '../src/js/Swordsman';
import Magician from '../src/js/Magician';
import Daemon from '../src/js/Daemon';
import Undead from '../src/js/Undead';
import Zombie from '../src/js/Zombie';

describe('Character constructor and validation', () => {
  test('should create character with valid data', () => {
    const c = new Character('John', 'Bowman');
    expect(c.name).toBe('John');
    expect(c.type).toBe('Bowman');
    expect(c.health).toBe(100);
    expect(c.level).toBe(1);
    expect(c.attack).toBe(25);
    expect(c.defence).toBe(25);
  });

  test('should throw error if name is too short', () => {
    expect(() => new Character('J', 'Bowman')).toThrow('Name must be a string between 2 and 10 characters');
  });

  test('should throw error if name is too long', () => {
    expect(() => new Character('VeryLongName', 'Bowman')).toThrow('Name must be a string between 2 and 10 characters');
  });

  test('should throw error if name is not string', () => {
    expect(() => new Character(123, 'Bowman')).toThrow('Name must be a string between 2 and 10 characters');
  });

  test('should throw error if type is invalid', () => {
    expect(() => new Character('John', 'Invalid')).toThrow('Type must be one of: Bowman, Swordsman, Magician, Daemon, Undead, Zombie');
  });
});

describe('levelUp method', () => {
  test('should increase level, attack, defence and set health to 100', () => {
    const c = new Character('John', 'Bowman');
    c.health = 50;
    c.levelUp();

    expect(c.level).toBe(2);
    expect(c.attack).toBe(30);
    expect(c.defence).toBe(30);
    expect(c.health).toBe(100);
  });

  test('should throw error if health is 0', () => {
    const c = new Character('John', 'Bowman');
    c.health = 0;
    expect(() => c.levelUp()).toThrow('Cannot level up a dead character');
  });

  test('should throw error if health is negative', () => {
    const c = new Character('John', 'Bowman');
    c.health = -10;
    expect(() => c.levelUp()).toThrow('Cannot level up a dead character');
  });

  test('should work correctly with Swordsman stats', () => {
    const c = new Swordsman('Arthur');
    c.levelUp();
    expect(c.attack).toBe(48);
    expect(c.defence).toBe(12);
  });
});

describe('damage method', () => {
  test('should reduce health correctly with defence', () => {
    const c = new Character('John', 'Bowman');
    c.damage(50);
    expect(c.health).toBe(62.5);
  });

  test('should not reduce health below 0', () => {
    const c = new Character('John', 'Bowman');
    c.damage(200);
    expect(c.health).toBe(0);
  });

  test('should do nothing if health is 0', () => {
    const c = new Character('John', 'Bowman');
    c.health = 0;
    c.damage(50);
    expect(c.health).toBe(0);
  });

  test('should do nothing if health is negative', () => {
    const c = new Character('John', 'Bowman');
    c.health = -10;
    c.damage(50);
    expect(c.health).toBe(-10);
  });

  test('should calculate correctly with high defence', () => {
    const c = new Magician('Merlin');
    c.damage(50);
    expect(c.health).toBe(70);
  });

  test('should calculate correctly with low defence', () => {
    const c = new Swordsman('Arthur');
    c.damage(50);
    expect(c.health).toBe(55);
  });
});

describe('All character types creation', () => {
  test('Bowerman', () => {
    const c = new Bowerman('Robin');
    expect(c.type).toBe('Bowman');
    expect(c.attack).toBe(25);
    expect(c.defence).toBe(25);
  });

  test('Swordsman', () => {
    const c = new Swordsman('Arthur');
    expect(c.type).toBe('Swordsman');
    expect(c.attack).toBe(40);
    expect(c.defence).toBe(10);
  });

  test('Magician', () => {
    const c = new Magician('Merlin');
    expect(c.type).toBe('Magician');
    expect(c.attack).toBe(10);
    expect(c.defence).toBe(40);
  });

  test('Daemon', () => {
    const c = new Daemon('Lucifer');
    expect(c.type).toBe('Daemon');
    expect(c.attack).toBe(10);
    expect(c.defence).toBe(40);
  });

  test('Undead', () => {
    const c = new Undead('Drake');
    expect(c.type).toBe('Undead');
    expect(c.attack).toBe(25);
    expect(c.defence).toBe(25);
  });

  test('Zombie', () => {
    const c = new Zombie('Walker');
    expect(c.type).toBe('Zombie');
    expect(c.attack).toBe(40);
    expect(c.defence).toBe(10);
  });
});

describe('Integration tests', () => {
  test('levelUp after damage', () => {
    const c = new Character('John', 'Bowman');
    c.damage(30);
    c.levelUp();
    expect(c.level).toBe(2);
    expect(c.health).toBe(100);
  });

  test('cannot levelUp after death', () => {
    const c = new Character('John', 'Bowman');
    c.damage(200);
    expect(c.health).toBe(0);
    expect(() => c.levelUp()).toThrow('Cannot level up a dead character');
  });
});
