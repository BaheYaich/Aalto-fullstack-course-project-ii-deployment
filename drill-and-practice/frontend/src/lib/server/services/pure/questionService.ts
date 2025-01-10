export function validateQuestionText(text: string): boolean {
    if (!text || text.length === 0) return false;
    if (!text.trim().endsWith('?')) return false;
    return /^[a-zA-Z0-9\s\-?]+$/.test(text);
}

export function isAuthorizedToDelete(questionUserId: number, currentUserId: number, isAdmin: boolean): boolean {
    if (isAdmin) return true;
    return questionUserId === currentUserId;
} 