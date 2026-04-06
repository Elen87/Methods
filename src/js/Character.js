export default class Character {
  constructor(name, type) {
    const validTypes = ['Bowman', 'Swordsman', 'Magician', 'Daemon', 'Undead', 'Zombie'];
    const stats = {
      Bowman: { attack: 25, defence: 25 },
      Swordsman: { attack: 40, defence: 10 },
      Magician: { attack: 10, defence: 40 },
      Daemon: { attack: 10, defence: 40 },
      Undead: { attack: 25, defence: 25 },
      Zombie: { attack: 40, defence: 10 },
    };

    if (typeof name !== 'string' || name.length < 2 || name.length > 10) {
      throw new Error('Name must be a string between 2 and 10 characters');
    }

    if (!validTypes.includes(type)) {
      throw new Error(`Type must be one of: ${validTypes.join(', ')}`);
    }

    this.name = name;
    this.type = type;
    this.health = 100;
    this.level = 1;
    this.attack = stats[type].attack;
    this.defence = stats[type].defence;
  }

  levelUp() {
    if (this.health <= 0) {
      throw new Error('Cannot level up a dead character');
    }

    this.level += 1;
    this.attack += this.attack * 0.2;
    this.defence += this.defence * 0.2;
    this.health = 100;
  }

  damage(points) {
    if (this.health <= 0) {
      return;
    }

    const damageTaken = points * (1 - this.defence / 100);
    this.health -= damageTaken;

    if (this.health < 0) {
      this.health = 0;
    }
  }
}
