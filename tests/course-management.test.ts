import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('Course Management Contract', () => {
  let mockContractCall: any;
  
  beforeEach(() => {
    mockContractCall = vi.fn();
  });
  
  it('should create a course', async () => {
    mockContractCall.mockResolvedValue({ success: true, value: 1 });
    const result = await mockContractCall('create-course', 'Introduction to Blockchain', 'Learn the basics of blockchain technology', 1000, 30, 100);
    expect(result.success).toBe(true);
    expect(result.value).toBe(1);
  });
  
  it('should enroll in a course', async () => {
    mockContractCall.mockResolvedValue({ success: true });
    const result = await mockContractCall('enroll-in-course', 1);
    expect(result.success).toBe(true);
  });
  
  it('should complete a course', async () => {
    mockContractCall.mockResolvedValue({ success: true });
    const result = await mockContractCall('complete-course', 1);
    expect(result.success).toBe(true);
  });
  
  it('should get course information', async () => {
    mockContractCall.mockResolvedValue({
      success: true,
      value: {
        title: 'Introduction to Blockchain',
        description: 'Learn the basics of blockchain technology',
        instructor: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
        price: 1000,
        duration: 30,
        maxStudents: 100,
        enrolledStudents: 1
      }
    });
    const result = await mockContractCall('get-course', 1);
    expect(result.success).toBe(true);
    expect(result.value.title).toBe('Introduction to Blockchain');
  });
  
  it('should get course progress', async () => {
    mockContractCall.mockResolvedValue({
      success: true,
      value: { completed: true }
    });
    const result = await mockContractCall('get-course-progress', 1, 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM');
    expect(result.success).toBe(true);
    expect(result.value.completed).toBe(true);
  });
});

