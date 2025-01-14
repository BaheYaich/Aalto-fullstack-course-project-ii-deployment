import { describe, it, expect, vi } from 'vitest';
import { updateQuizResult, getQuizResult } from '$lib/server/quizService';
import sql from '$lib/server/database';

vi.mock('$lib/server/database', () => ({
    default: vi.fn()
}));

describe('Quiz Service Integration', () => {
    it('should update quiz result', async () => {
        const mockSql = sql as vi.Mock;
        mockSql.mockResolvedValueOnce([]);

        const result = await updateQuizResult(1, 1, 5, 10);
        expect(result.success).toBe(true);
        expect(mockSql).toHaveBeenCalled();
    });

    it('should get quiz result', async () => {
        const mockSql = sql as vi.Mock;
        mockSql.mockResolvedValueOnce([{ user_score: 5, topic_max_score: 10 }]);

        const result = await getQuizResult(1, 1);
        expect(result.success).toBe(true);
        expect(result.score).toBe(5);
        expect(result.totalQuestions).toBe(10);
    });
}); 