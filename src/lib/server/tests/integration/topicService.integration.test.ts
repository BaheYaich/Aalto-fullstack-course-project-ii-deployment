import { describe, it, expect, vi } from 'vitest';
import { fetchTopics } from '$lib/server/topicService';
import sql from '$lib/server/database';
import type { Topic } from '$lib/types';

vi.mock('$lib/server/database', () => ({
    default: vi.fn()
}));

describe('Topic Service Integration', () => {
    it('should fetch topics', async () => {
        const mockTopics = [
            { id: 1, name: 'Science', user_id: 1 }
        ];

        const mockSql = sql as vi.Mock;
        mockSql.mockResolvedValueOnce(mockTopics);

        const topics = await fetchTopics();
        expect(topics).toBeDefined();
        expect(Array.isArray(topics)).toBe(true);
        expect(topics[0].name).toBe('Science');
    });
}); 