import { describe, it, expect } from 'vitest';
import { validateQuestionText, isAuthorizedToDelete } from '$lib/server/services/pure/questionService';

describe('Question Service Unit Tests', () => {
    describe('validateQuestionText', () => {
        it('should validate proper question text', () => {
            const validText = 'What is the capital of France?';
            expect(validateQuestionText(validText)).toBe(true);
        });

        it('should reject empty questions', () => {
            expect(validateQuestionText('')).toBe(false);
        });

        it('should reject questions without question mark', () => {
            expect(validateQuestionText('What is this')).toBe(false);
        });
    });

    describe('isAuthorizedToDelete', () => {
        it('should allow admin to delete any question', () => {
            expect(isAuthorizedToDelete(1, 2, true)).toBe(true);
        });

        it('should allow owner to delete their question', () => {
            expect(isAuthorizedToDelete(1, 1, false)).toBe(true);
        });

        it('should not allow non-admin to delete others questions', () => {
            expect(isAuthorizedToDelete(1, 2, false)).toBe(false);
        });
    });
}); 