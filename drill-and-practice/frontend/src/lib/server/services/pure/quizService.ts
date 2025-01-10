export function calculateQuizScore(answers: boolean[]): number {
    return answers.filter(answer => answer).length;
}

export function validateQuizSubmission(submission: {
    userId?: number,
    topicId?: number,
    answers?: boolean[]
}): boolean {
    if (!submission.userId || !submission.topicId || !submission.answers) {
        return false;
    }
    return true;
} 