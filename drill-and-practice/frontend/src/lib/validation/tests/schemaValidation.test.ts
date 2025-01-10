import { describe, it, expect } from 'vitest';
import { topicSchema } from '$lib/validation/topicSchema';
import { questionSchema } from '$lib/validation/questionSchema';
import { questionOptionSchema } from '$lib/validation/questionOptionSchema';

describe('Schema Validation', () => {
    describe('Topic Schema', () => {
        it('should validate correct topic name', () => {
            const input = { name: 'Valid Topic 123' };
            const result = topicSchema.safeParse(input);
            expect(result.success).toBe(true);
        });

        it('should fail on empty topic name', () => {
            const input = { name: '' };
            const result = topicSchema.safeParse(input);
            expect(result.success).toBe(false);
            if (!result.success) {
                expect(result.error.errors[0].message).toBe('Topic name cannot be empty');
            }
        });

        it('should fail on invalid characters', () => {
            const input = { name: 'Invalid@Topic!' };
            const result = topicSchema.safeParse(input);
            expect(result.success).toBe(false);
            if (!result.success) {
                expect(result.error.errors[0].message).toBe('Topic name can only contain letters, numbers, spaces, and hyphens');
            }
        });
    });

    describe('Question Schema', () => {
        it('should validate correct question', () => {
            const input = { question_text: 'What is the capital of France?' };
            const result = questionSchema.safeParse(input);
            expect(result.success).toBe(true);
            if (result.success) {
                expect(result.data.question_text).toBe('What is the capital of France?');
            }
        });

        it('should fail on missing question mark', () => {
            const input = { question_text: 'What is the capital of France' };
            const result = questionSchema.safeParse(input);
            expect(result.success).toBe(false);
            if (!result.success) {
                expect(result.error.errors[0].message).toBe('Question must end with a question mark');
            }
        });

        it('should fail on invalid characters', () => {
            const input = { question_text: 'What is this @#$%?' };
            const result = questionSchema.safeParse(input);
            expect(result.success).toBe(false);
            if (!result.success) {
                expect(result.error.errors[0].message).toBe('Question can only contain letters, numbers, spaces, hyphens, and question marks');
            }
        });
    });

    describe('Question Option Schema', () => {
        it('should validate correct option', () => {
            const input = { 
                option_text: 'This is a valid option!',
                is_correct: true 
            };
            const result = questionOptionSchema.safeParse(input);
            expect(result.success).toBe(true);
            if (result.success) {
                expect(result.data.option_text).toBe('This is a valid option!');
                expect(result.data.is_correct).toBe(true);
            }
        });

        it('should fail on empty option text', () => {
            const input = { 
                option_text: '',
                is_correct: false 
            };
            const result = questionOptionSchema.safeParse(input);
            expect(result.success).toBe(false);
            if (!result.success) {
                expect(result.error.errors[0].message).toBe('Option text is required');
            }
        });

        it('should capitalize first letter and lowercase rest', () => {
            const input = { 
                option_text: 'tEST oPTION',
                is_correct: false 
            };
            const result = questionOptionSchema.safeParse(input);
            expect(result.success).toBe(true);
            if (result.success) {
                expect(result.data.option_text).toBe('Test option');
            }
        });
    });
}); 