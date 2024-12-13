export interface User {
    id: number;
    email: string;
    admin: boolean;
    password?: string; // Optional since we might not always want to expose this
    session_token?: string; // Optional since it's session-specific
}

export interface Topic {
    id: number;
    user_id: number;
    name: string;
}

export interface Question {
    id: number;
    user_id: number;
    topic_id: number;
    question_text: string;
}

export interface QuestionAnswerOption {
    id: number;
    question_id: number;
    option_text: string;
    is_correct: boolean;
}

export interface QuestionAnswer {
    id: number;
    user_id: number;
    question_id: number;
    question_answer_option_id: number;
}
