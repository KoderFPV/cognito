import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { Db } from 'mongodb';
import { ROLE } from '@/domain/user';
import { registrationSchema, createUserAccount } from './registration.service';
import { setupMongoTest, teardownMongoTest, IMongoTestContext } from '@/test/utils/mongoTestUtils';

describe('registration.service', () => {
  let context: IMongoTestContext;
  let db: Db;

  beforeEach(async () => {
    context = await setupMongoTest();
    db = context.db;
  });

  afterEach(async () => {
    await teardownMongoTest(context);
  });

  describe('registrationSchema', () => {
    it('should validate correct data', () => {
      const validData = {
        email: 'test@example.com',
        password: 'password123',
        firstName: 'John',
        lastName: 'Doe',
        phone: '123456789',
        address: 'Test Street 123',
        city: 'Warsaw',
        postal: '00-000',
        country: 'Poland',
      };

      const result = registrationSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it('should reject invalid email', () => {
      const invalidData = {
        email: 'notanemail',
        password: 'password123',
        firstName: 'John',
        lastName: 'Doe',
        phone: '123456789',
        address: 'Test Street',
        city: 'Warsaw',
        postal: '00-000',
        country: 'Poland',
      };

      const result = registrationSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });

    it('should reject short password', () => {
      const invalidData = {
        email: 'test@example.com',
        password: 'short',
        firstName: 'John',
        lastName: 'Doe',
        phone: '123456789',
        address: 'Test Street',
        city: 'Warsaw',
        postal: '00-000',
        country: 'Poland',
      };

      const result = registrationSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });

    it('should reject short first name', () => {
      const invalidData = {
        email: 'test@example.com',
        password: 'password123',
        firstName: 'J',
        lastName: 'Doe',
        phone: '123456789',
        address: 'Test Street',
        city: 'Warsaw',
        postal: '00-000',
        country: 'Poland',
      };

      const result = registrationSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });

    it('should reject short phone', () => {
      const invalidData = {
        email: 'test@example.com',
        password: 'password123',
        firstName: 'John',
        lastName: 'Doe',
        phone: '12345',
        address: 'Test Street',
        city: 'Warsaw',
        postal: '00-000',
        country: 'Poland',
      };

      const result = registrationSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });

    it('should reject short address', () => {
      const invalidData = {
        email: 'test@example.com',
        password: 'password123',
        firstName: 'John',
        lastName: 'Doe',
        phone: '123456789',
        address: 'Abc',
        city: 'Warsaw',
        postal: '00-000',
        country: 'Poland',
      };

      const result = registrationSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });

    it('should reject short postal code', () => {
      const invalidData = {
        email: 'test@example.com',
        password: 'password123',
        firstName: 'John',
        lastName: 'Doe',
        phone: '123456789',
        address: 'Test Street',
        city: 'Warsaw',
        postal: '00',
        country: 'Poland',
      };

      const result = registrationSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });
  });

  describe('createUserAccount', () => {
    it('should create user account with validated data', async () => {
      const validData = {
        email: 'account@example.com',
        password: 'password123',
        firstName: 'Test',
        lastName: 'Account',
        phone: '987654321',
        address: 'Account Street',
        city: 'Krakow',
        postal: '11-111',
        country: 'Poland',
      };

      const user = await createUserAccount(db, validData);

      expect(user).toBeDefined();
      expect(user.email).toBe('account@example.com');
      expect(user.role).toBe(ROLE.CUSTOMER);
      expect(user.activated).toBe(false);
      expect(user.deleted).toBe(false);
    });

    it('should throw error for duplicate email', async () => {
      const validData = {
        email: 'duplicate@example.com',
        password: 'password123',
        firstName: 'Test',
        lastName: 'User',
        phone: '987654321',
        address: 'Test Street',
        city: 'Warsaw',
        postal: '00-000',
        country: 'Poland',
      };

      await createUserAccount(db, validData);

      await expect(createUserAccount(db, validData)).rejects.toThrow(
        'User with this email already exists'
      );
    });
  });
});
