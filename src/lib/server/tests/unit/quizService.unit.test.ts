import { describe, it, expect } from 'vitest';
import { calculateQuizScore, validateQuizSubmission } from '$lib/server/services/pure/quizService';

describe('Quiz Service Unit Tests', () => {
    describe('calculateQuizScore', () => {
        it('should calculate correct score', () => {
            const answers = [true, false, true, true];
            const score = calculateQuizScore(answers);
            expect(score).toBe(3);
        });

        it('should handle empty answers', () => {
            expect(calculateQuizScore([])).toBe(0);
        });
    });

    describe('validateQuizSubmission', () => {
        it('should validate complete submission', () => {
            const submission = {
                userId: 1,
                topicId: 1,
                answers: [true, false, true]
            };
            expect(validateQuizSubmission(submission)).toBe(true);
        });

        it('should reject submission with missing data', () => {
            const submission = {
                userId: 1,
                answers: [true, false]
            };
            expect(validateQuizSubmission(submission)).toBe(false);
        });
    });
}); 