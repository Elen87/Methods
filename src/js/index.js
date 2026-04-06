import Bowerman from './Bowerman';
import Swordsman from './Swordsman';
import Magician from './Magician';
import Daemon from './Daemon';
import Undead from './Undead';
import Zombie from './Zombie';

// Примеры создания персонажей
const bowman = new Bowerman('Robin');
const swordsman = new Swordsman('Arthur');
const magician = new Magician('Merlin');
const daemon = new Daemon('Lucifer');
const undead = new Undead('Drake');
const zombie = new Zombie('Walker');

console.log('Bowerman:', bowman);
console.log('Swordsman:', swordsman);
console.log('Magician:', magician);
console.log('Daemon:', daemon);
console.log('Undead:', undead);
console.log('Zombie:', zombie);

// Пример использования методов
console.log('\n--- Testing levelUp ---');
bowman.levelUp();
console.log('After levelUp:', bowman);

console.log('\n--- Testing damage ---');
swordsman.damage(50);
console.log('After damage:', swordsman);
