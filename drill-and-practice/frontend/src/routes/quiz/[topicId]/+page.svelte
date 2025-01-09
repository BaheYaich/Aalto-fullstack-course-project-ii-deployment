<script lang="ts">
    import { getModalStore } from '@skeletonlabs/skeleton';
    import type { ModalSettings } from '@skeletonlabs/skeleton';
    import QuizModal from './QuizModal.svelte';
    import ErrorAlert from '$lib/components/common/ErrorAlert.svelte';
    import { errorState } from '$lib/state/errorState.svelte';

    const modalStore = getModalStore();
    let props = $props();
    let answeredQuestions = $state<Set<number>>(new Set());
    let correctAnswers = $state(0);
    let totalQuestions = $state(props.data.totalQuestions);

    $effect(() => {
        if (props.data.noQuestions) return;
        
        // Reset all state
        answeredQuestions = new Set();
        correctAnswers = 0;
        
        showNextQuestion();
    });

    function showNextQuestion() {
        const modalComponent: ModalSettings = {
            type: 'component',
            component: {
                ref: QuizModal,
                props: {
                    questionId: props.data.randomQuestion.id,
                    questionText: props.data.randomQuestion.question_text,
                    topicId: props.data.topic.id,
                    onComplete: handleQuestionComplete
                }
            },
            backdropClasses: '!bg-surface-900/90',
            modalClasses: 'w-modal'
        };

        modalStore.trigger(modalComponent);
    }

    async function handleQuestionComplete(isCorrect: boolean) {
        if (isCorrect && !answeredQuestions.has(props.data.randomQuestion.id)) {
            correctAnswers++;
        }
        
        answeredQuestions.add(props.data.randomQuestion.id);

        if (answeredQuestions.size >= totalQuestions) {
            try {
                const response = await fetch('/api/quiz/result', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        topicId: props.data.topic.id,
                        userScore: correctAnswers,
                        topicMaxScore: totalQuestions
                    })
                });

                if (!response.ok) throw new Error('Failed to save quiz result');
                window.location.href = `/quiz/${props.data.topic.id}/results`;
                return;
            } catch (error) {
                console.error('Error saving quiz result:', error);
                errorState.showError('Failed to save quiz result');
                return;
            }
        }

        try {
            const response = await fetch(`/api/quiz/${props.data.topic.id}/random-question`);
            if (!response.ok) throw new Error('Failed to fetch next question');
            
            const nextQuestion = await response.json();
            
            if (answeredQuestions.has(nextQuestion.id)) {
                const remainingQuestions = totalQuestions - answeredQuestions.size;
                if (remainingQuestions > 0) {
                    handleQuestionComplete(isCorrect);
                    return;
                }
                window.location.href = `/quiz/${props.data.topic.id}/results`;
                return;
            }

            props.data.randomQuestion = nextQuestion;
            showNextQuestion();
        } catch (error) {
            console.error('Error:', error);
            errorState.showError('Failed to load next question');
        }
    }
</script>

<div class="container mx-auto p-8 text-center">
    {#if props.data.noQuestions}
        <div class="card p-8 shadow-xl bg-surface-100-800-token">
            <h2 class="h2 mb-4">No Questions Available</h2>
            <p class="text-lg mb-4">This topic doesn't have any questions yet.</p>
            <a href="/quiz" class="btn variant-filled-primary">Back to Topics</a>
        </div>
    {:else}
        <ErrorAlert />
    {/if}
</div> 