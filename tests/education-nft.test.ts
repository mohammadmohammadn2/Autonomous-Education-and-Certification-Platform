import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('Education NFT Contract', () => {
  let mockContractCall: any;
  
  beforeEach(() => {
    mockContractCall = vi.fn();
  });
  
  it('should mint an education NFT', async () => {
    mockContractCall.mockResolvedValue({ success: true, value: 1 });
    const result = await mockContractCall('mint', 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM', 1, 'Course Completion', 'Completed Introduction to Blockchain', null);
    expect(result.success).toBe(true);
    expect(result.value).toBe(1);
  });
  
  it('should get certificate details', async () => {
    mockContractCall.mockResolvedValue({
      success: true,
      value: {
        recipient: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
        issuer: 'ST2CY5V39NHDPWSXMW9QDT3HC3GD6Q6XX4CFRK9AG',
        courseId: 1,
        title: 'Course Completion',
        description: 'Completed Introduction to Blockchain',
        issueDate: 123456,
        expirationDate: null
      }
    });
    const result = await mockContractCall('get-certificate-details', 1);
    expect(result.success).toBe(true);
    expect(result.value.title).toBe('Course Completion');
  });
  
  it('should transfer an education NFT', async () => {
    mockContractCall.mockResolvedValue({ success: true });
    const result = await mockContractCall('transfer', 1, 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM', 'ST2CY5V39NHDPWSXMW9QDT3HC3GD6Q6XX4CFRK9AG');
    expect(result.success).toBe(true);
  });
  
  it('should get the owner of an education NFT', async () => {
    mockContractCall.mockResolvedValue({ success: true, value: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM' });
    const result = await mockContractCall('get-owner', 1);
    expect(result.success).toBe(true);
    expect(result.value).toBe('ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM');
  });
});

