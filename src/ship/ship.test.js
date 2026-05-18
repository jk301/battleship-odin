import { Ship } from "./ship.js";

describe('Ship', () => {
  describe('initial state', () => {
    test('has the correct length', () => {
      const ship = Ship(3);
      expect(ship.length).toBe(3);
    });

    test('defaults to length 1 if no argument given', () => {
      const ship = Ship();
      expect(ship.length).toBe(1);
    });

    test('is not sunk initially', () => {
      const ship = Ship(3);
      expect(ship.isSunk()).toBe(false);
    });
  });

  describe('hit()', () => {
    test('registers a hit', () => {
      const ship = Ship(3);
      ship.hit();
      expect(ship.isSunk()).toBe(false); // 1 hit, not sunk yet
    });

    test('tracks multiple hits', () => {
      const ship = Ship(3);
      ship.hit();
      ship.hit();
      expect(ship.isSunk()).toBe(false); // 2 hits, not sunk yet
    });
  });

  describe('isSunk()', () => {
    test('is not sunk if hits are less than length', () => {
      const ship = Ship(3);
      ship.hit();
      expect(ship.isSunk()).toBe(false);
    });

    test('is sunk when hits equal length', () => {
      const ship = Ship(3);
      ship.hit();
      ship.hit();
      ship.hit();
      expect(ship.isSunk()).toBe(true);
    });
  });
});