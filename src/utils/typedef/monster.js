const { Condition } = require("../enums/condition");

/**
 * @typedef Monster
 * @property {string} id
 * @property {string} name
 * @property {Status} status
 * @property {Attributes} attributes
 */


/**
 * @typedef Attributes
 * @property {number} strength
 * @property {number} dexterity
 * @property {number} constitution
 * @property {number} intelligence
 * @property {number} wisdom // most healing wisdom based?
 * @property {number} charisma //bonus money for winning matches
 */

/**
 * @typedef Status
 * @property {number} damage
 * @property {Condition[]} conditions
 */