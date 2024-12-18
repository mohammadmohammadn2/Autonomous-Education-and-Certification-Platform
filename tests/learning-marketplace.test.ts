import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('Learning Marketplace Contract', () => {
  let mockContractCall: any;
  
  beforeEach(() => {
    mockContractCall = vi.fn();
  });
  
  it('should create a tutoring offer', async () => {
    mockContractCall.mockResolvedValue({ success: true, value: 1 });
    const result = await mockContractCall('create-tutoring-offer', 'Blockchain Basics', 100, 'Weekdays 6-8 PM');
    expect(result.success).toBe(true);
    expect(result.value).toBe(1);
  });
  
  it('should book a tutoring session', async () => {
    mockContractCall.mockResolvedValue({ success: true, value: 1 });
    const result = await mockContractCall('book-tutoring-session', 1, 2);
    expect(result.success).toBe(true);
    expect(result.value).toBe(1);
  });
  
  it('should complete a tutoring session', async () => {
    mockContractCall.mockResolvedValue({ success: true });
    const result = await mockContractCall('complete-tutoring-session', 1);
    expect(result.success).toBe(true);
  });
  
  it('should get tutoring offer information', async () => {
    mockContractCall.mockResolvedValue({
      success: true,
      value: {
        tutor: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
        subject: 'Blockchain Basics',
        hourlyRate: 100,
        availability: 'Weekdays 6-8 PM'
      }
    });
    const result = await mockContractCall('get-tutoring-offer', 1);
    expect(result.success).toBe(true);
    expect(result.value.subject).toBe('Blockchain Basics');
  });
  
  it('should get tutoring session information', async () => {
    mockContractCall.mockResolvedValue({
      success: true,
      value: {
        tutor: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
        student: 'ST2CY5V39NHDPWSXMW9QDT3HC3GD6Q6XX4CFRK9AG',
        subject: 'Blockchain Basics',
        duration: 2,
        totalCost: 200,
        completed: true
      }
    });
    const result = await mockContractCall('get-tutoring-session', 1);
    expect(result.success).toBe(true);
    expect(result.value.subject).toBe('Blockchain Basics');
    expect(result.value.completed).toBe(true);
  });
});

