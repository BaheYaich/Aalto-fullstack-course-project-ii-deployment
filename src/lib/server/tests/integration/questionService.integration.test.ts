import { describe, it, expect, vi } from 'vitest';
import { fetchQuestionsByTopic } from '$lib/server/questionService';
import sql from '$lib/server/database';

vi.mock('$lib/server/database', () => ({
    default: vi.fn()
}));

describe('Question Service Integration', () => {
    it('should fetch questions for a topic', async () => {
        const mockQuestions = [
            { id: 1, question_text: 'Test Question', topic_id: 1 }
        ];

        const mockSql = sql as vi.Mock;
        mockSql.mockResolvedValueOnce(mockQuestions);

        const questions = await fetchQuestionsByTopic(1);
        expect(questions).toBeDefined();
        expect(Array.isArray(questions)).toBe(true);
        expect(questions[0].question_text).toBe('Test Question');
    });
}); 